/* ============================================
 * 4499 平台 · 品牌官网动效脚本
 * brand-anim.js · 2026-08-06
 * 依赖：GSAP 3.12.5 + ScrollTrigger 3.12.5
 * 用途：hero 逐字入场、滚动 fade-up、视差、
 *      数字计数、CTA 悬停、滚动进度条
 * ============================================ */

(function () {
  'use strict';

  /* ============================================
   * 0. 初始化守卫：等 GSAP + DOM ready
   * ============================================ */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function whenGSAP(fn) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      fn();
    } else {
      // 最多等 2 秒
      var t0 = Date.now();
      (function wait() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') fn();
        else if (Date.now() - t0 < 2000) setTimeout(wait, 50);
      })();
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ============================================
   * 1. 注册 ScrollTrigger
   * ============================================ */
  function registerScrollTrigger() {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /* ============================================
   * 2. 滚动进度条
   * ============================================ */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar || typeof ScrollTrigger === 'undefined') return;
    bar.style.opacity = '1';
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        bar.style.width = (self.progress * 100) + '%';
      }
    });
  }

  /* ============================================
   * 3. 文字逐字/逐词 split（仅作用于 .js-title-split）
   *    保留 <br>，按词切分；中文按字切分（更细腻）
   * ============================================ */
  function splitTextNodes(el) {
    // 提取所有文本节点 + <br> 节点
    var parts = [];
    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var t = node.textContent;
        // 中英文混排：中文按字切，英文/数字按词切，空格保留
        for (var i = 0; i < t.length; i++) {
          var c = t[i];
          if (/[\s\n]/.test(c)) {
            parts.push({ type: 'space', value: c });
          } else if (/[一-鿿]/.test(c)) {
            parts.push({ type: 'char', value: c });
          } else if (/[A-Za-z0-9]/.test(c)) {
            // 连续英文/数字合并为词
            var j = i;
            while (j < t.length && /[A-Za-z0-9]/.test(t[j])) j++;
            parts.push({ type: 'word', value: t.substring(i, j) });
            i = j - 1;
          } else {
            parts.push({ type: 'char', value: c });
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') {
          parts.push({ type: 'br' });
        } else {
          // 遍历子节点（不要 walk(node) 自身！）
          var child = node.firstChild;
          while (child) {
            walk(child);
            child = child.nextSibling;
          }
        }
      }
    }
    walk(el);
    // 重建 DOM
    el.innerHTML = '';
    parts.forEach(function (p) {
      if (p.type === 'br') {
        el.appendChild(document.createElement('br'));
      } else {
        var span = document.createElement('span');
        span.className = 'word';
        var inner = document.createElement('span');
        inner.textContent = p.value;
        span.appendChild(inner);
        el.appendChild(span);
      }
    });
    el.classList.add('is-split-ready');
    return el.querySelectorAll('.word > span');
  }

  /* ============================================
   * 4. Hero 标题逐字入场
   * ============================================ */
  function initHeroTitle() {
    var titles = document.querySelectorAll('.hero-title.js-title-split');
    if (!titles.length) return;
    var reduced = prefersReducedMotion();

    titles.forEach(function (title) {
      var spans = splitTextNodes(title);
      if (reduced) {
        gsap.set(spans, { y: 0, opacity: 1 });
        return;
      }
      gsap.from(spans, {
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
        delay: 0.1
      });
    });

    // 副标题 + CTA + 装饰
    var heroBlocks = document.querySelectorAll('.hero .hero-eyebrow, .hero .hero-subtitle, .hero .hero-cta, .hero .hero-trustline');
    if (reduced) {
      gsap.set(heroBlocks, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(heroBlocks,
        { y: 16, opacity: 0.85 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.1 }
      );
    }
  }

  /* ============================================
   * 5. Hero 装饰视差（极弱）
   * ============================================ */
  function initHeroParallax() {
    if (prefersReducedMotion()) return;
    var decor = document.querySelector('.hero-decor');
    if (!decor) return;
    decor.classList.add('js-parallax');
    gsap.to(decor, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: decor,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });

    // 装饰球/网格
    var orbs = document.querySelectorAll('.decor-orb');
    orbs.forEach(function (orb) {
      gsap.to(orb, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: orb,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });
  }

  /* ============================================
   * 6. 滚动 fade-up（ScrollTrigger）
   * ============================================ */
  function initFadeUp() {
    var els = document.querySelectorAll('.js-fade-up');
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      document.querySelectorAll('.js-fade-stagger').forEach(function (s) { s.classList.add('is-revealed'); });
      return;
    }

    if (typeof ScrollTrigger === 'undefined') {
      // 退化：直接显示
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    els.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () { el.classList.add('is-revealed'); }
      });
    });

    // 容器级 stagger
    document.querySelectorAll('.js-fade-stagger').forEach(function (stagger) {
      ScrollTrigger.create({
        trigger: stagger,
        start: 'top 95%',
        once: true,
        onEnter: function () { stagger.classList.add('is-revealed'); }
      });
    });
  }

  /* ============================================
   * 7. 数字计数（GSAP 接管）
   *    data-target="0" 或留空 → 跳过
   *    "待补充" 文本 → 跳过
   * ============================================ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = parseFloat(el.getAttribute('data-dur')) || 1.2;
    var decimals = (el.getAttribute('data-target').indexOf('.') >= 0) ? 1 : 0;
    var obj = { v: 0 };
    el.textContent = prefix + '0' + suffix;
    gsap.to(obj, {
      v: target,
      duration: dur,
      ease: 'power2.out',
      onUpdate: function () {
        var val = decimals ? obj.v.toFixed(decimals) : Math.floor(obj.v);
        el.textContent = prefix + val + suffix;
      },
      onComplete: function () {
        el.textContent = prefix + (decimals ? target.toFixed(decimals) : target) + suffix;
      }
    });
  }

  function initCounters() {
    var els = document.querySelectorAll('.js-counter');
    if (!els.length) return;
    if (prefersReducedMotion()) {
      els.forEach(function (el) {
        var target = el.getAttribute('data-target');
        if (target && !isNaN(parseFloat(target))) {
          el.textContent = (el.getAttribute('data-prefix') || '') + target + (el.getAttribute('data-suffix') || '');
        }
      });
      return;
    }
    if (typeof ScrollTrigger === 'undefined') {
      els.forEach(function (el) {
        var target = el.getAttribute('data-target');
        if (target && !isNaN(parseFloat(target))) el.textContent = target;
      });
      return;
    }
    els.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () { animateCount(el); }
      });
    });
  }

  /* ============================================
   * 8. 8 维度进度条动画
   * ============================================ */
  function initTrustFlow() {
    var bars = document.querySelectorAll('.trust-flow-fill');
    if (!bars.length) return;
    if (prefersReducedMotion()) {
      bars.forEach(function (b) { b.style.width = (b.getAttribute('data-target') || 0) + '%'; });
      return;
    }
    if (typeof ScrollTrigger === 'undefined') {
      bars.forEach(function (b) { b.style.width = (b.getAttribute('data-target') || 0) + '%'; });
      return;
    }
    bars.forEach(function (bar) {
      var target = parseFloat(bar.getAttribute('data-target')) || 0;
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(bar, {
            width: target + '%',
            duration: 1.2,
            ease: 'power3.out'
          });
        }
      });
    });
  }

  /* ============================================
   * 9. CTA 按钮悬停动效（GSAP）
   * ============================================ */
  function initButtonHover() {
    if (prefersReducedMotion()) return;
    var buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-on-dark, .btn-on-dark-outline');
    buttons.forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        gsap.to(btn, { scale: 1.03, duration: 0.18, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { scale: 1, duration: 0.22, ease: 'power2.out' });
      });
      btn.addEventListener('mousedown', function () {
        gsap.to(btn, { scale: 0.98, duration: 0.08, ease: 'power2.out' });
      });
      btn.addEventListener('mouseup', function () {
        gsap.to(btn, { scale: 1.03, duration: 0.12, ease: 'power2.out' });
      });
    });
  }

  /* ============================================
   * 10. FAQ 折叠（不在此处理 - contact.html 已有原生单选 accordion 脚本）
   * 避免 listener 重复触发导致状态错乱
   * ============================================ */
  function initFAQToggle() {
    // noop: contact.html 自带 inline accordion 脚本（单选模式）
    // 不要在 brand-anim.js 里再加 listener，会与 inline 脚本冲突
  }

  /* ============================================
   * 11. 资源分类 tab 切换（增强）
   * ============================================ */
  function initResourceTabs() {
    var tabs = document.querySelectorAll('.cat-tab');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        if (prefersReducedMotion()) return;
        gsap.fromTo(tab, { scale: 0.96 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      });
    });
  }

  /* ============================================
   * 主流程
   * ============================================ */
  function init() {
    registerScrollTrigger();
    initScrollProgress();
    initHeroTitle();
    initHeroParallax();
    initFadeUp();
    initCounters();
    initTrustFlow();
    initButtonHover();
    initFAQToggle();
    initResourceTabs();
  }

  ready(function () {
    whenGSAP(init);
  });
})();
