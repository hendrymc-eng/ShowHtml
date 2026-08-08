/* ============================================
 * 4499 品牌官网 · 动效与交互
 * brand-motion.js · 2026-08-06
 * 依赖：GSAP 3.x + ScrollTrigger（CDN）
 * ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('[brand-motion] GSAP not loaded, skipping motion');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-motion-from]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  /* ============================================
   * 1. Hero 入场动画（首屏）
   * ============================================ */
  function heroEntrance() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    var eyebrow = hero.querySelector('[data-hero-eyebrow]');
    var title = hero.querySelector('[data-hero-title]');
    var subtitle = hero.querySelector('[data-hero-subtitle]');
    var ctas = hero.querySelectorAll('[data-hero-cta]');
    var decor = hero.querySelectorAll('[data-hero-decor]');

    if (eyebrow) tl.from(eyebrow, { y: 12, opacity: 0, duration: 0.5 }, 0);
    if (title) {
      var words = title.textContent.split(/(\s+)/);
      title.innerHTML = words.map(function (w) {
        if (w.match(/^\s+$/)) return w;
        return '<span class="hero-word" style="display:inline-block;opacity:0;">' + w + '</span>';
      }).join('');
      tl.to(title.querySelectorAll('.hero-word'), {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.04
      }, 0.1);
    }
    if (subtitle) tl.from(subtitle, { y: 12, opacity: 0, duration: 0.6 }, 0.4);
    if (ctas.length) tl.from(ctas, { y: 12, opacity: 0, duration: 0.5, stagger: 0.1 }, 0.6);
    if (decor.length) tl.from(decor, { scale: 0.9, opacity: 0, duration: 1, stagger: 0.15 }, 0.3);
  }

  /* ============================================
   * 2. Section 入场（滚动触发）
   * ============================================ */
  function sectionReveal() {
    var sections = document.querySelectorAll('[data-section]');
    if (!sections.length || typeof ScrollTrigger === 'undefined') return;
    sections.forEach(function (sec) {
      var eyebrow = sec.querySelector('.eyebrow, [data-section-eyebrow]');
      var title = sec.querySelector('.section-title, [data-section-title]');
      var body = sec.querySelectorAll('[data-section-body]');
      var cards = sec.querySelectorAll('.card, .metric-card, .pillar, .feature, .reason, [data-card]');

      var tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top 90%', toggleActions: 'play none none none' }
      });
      if (eyebrow) tl.from(eyebrow, { y: 10, opacity: 0, duration: 0.4 });
      if (title) tl.from(title, { y: 16, opacity: 0, duration: 0.5 }, '-=0.2');
      if (body.length) tl.from(body, { y: 12, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.3');
      if (cards.length) tl.from(cards, { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');
    });
  }

  /* ============================================
   * 3. 数字 KPI 计数（滚动到时）
   * ============================================ */
  function kpiCount() {
    var counters = document.querySelectorAll('[data-kpi-count]');
    if (!counters.length) return;
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-kpi-count')) || 0;
      var suffix = el.getAttribute('data-kpi-suffix') || '';
      var prefix = el.getAttribute('data-kpi-prefix') || '';
      var decimals = parseInt(el.getAttribute('data-kpi-decimals') || '0', 10);
      var isPercent = el.hasAttribute('data-kpi-percent');
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: function () {
          var formatted = decimals > 0 ? obj.v.toFixed(decimals) : Math.floor(obj.v);
          el.textContent = prefix + formatted + (isPercent ? '%' : '') + suffix;
        }
      });
    });
  }

  /* ============================================
   * 4. 进度条（data-bar-target="75"）
   * ============================================ */
  function barGrow() {
    var bars = document.querySelectorAll('[data-bar-target]');
    if (!bars.length) return;
    bars.forEach(function (bar) {
      var target = parseFloat(bar.getAttribute('data-bar-target')) || 0;
      var fill = bar.querySelector('[data-bar-fill]') || bar;
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.to(fill, {
          width: target + '%', duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' }
        });
      } else {
        fill.style.width = target + '%';
      }
    });
  }

  /* ============================================
   * 5. 滚动进度条（页面顶部）
   * ============================================ */
  function scrollProgress() {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;
    bar.style.position = 'fixed';
    bar.style.top = '0';
    bar.style.left = '0';
    bar.style.height = '2px';
    bar.style.background = 'var(--color-accent)';
    bar.style.zIndex = '9999';
    bar.style.width = '0%';
    bar.style.transition = 'width 80ms linear';
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }, { passive: true });
  }

  /* ============================================
   * 6. 装饰元素视差（极弱）
   * ============================================ */
  function parallax() {
    if (typeof ScrollTrigger === 'undefined') return;
    var elements = document.querySelectorAll('[data-parallax]');
    elements.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      gsap.to(el, {
        y: -50 * speed,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ============================================
   * 7. CTA 按钮悬停微动效
   * ============================================ */
  function ctaHover() {
    var ctas = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctas.forEach(function (btn) {
      btn.addEventListener('mouseenter', function () { gsap.to(btn, { scale: 1.02, duration: 0.2, ease: 'power2.out' }); });
      btn.addEventListener('mouseleave', function () { gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' }); });
    });
  }

  /* ============================================
   * 8. 抽象几何装饰旋转（hero 区）
   * ============================================ */
  function decorSpin() {
    var decors = document.querySelectorAll('[data-decor-spin]');
    decors.forEach(function (el) {
      gsap.to(el, { rotation: 360, duration: 60, ease: 'none', repeat: -1 });
    });
  }

  /* ============================================
   * 9. 表单反馈
   * ============================================ */
  function formFeedback() {
    var forms = document.querySelectorAll('[data-form]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = '提交中…'; }
        setTimeout(function () {
          if (btn) { btn.disabled = false; btn.textContent = '已提交，我们会尽快联系您'; }
          if (window.toast) window.toast('已提交，我们会在 24 小时内联系您', 'success');
        }, 800);
      });
    });
  }

  /* ============================================
   * 初始化
   * ============================================ */
  function init() {
    heroEntrance();
    sectionReveal();
    kpiCount();
    barGrow();
    scrollProgress();
    parallax();
    ctaHover();
    decorSpin();
    formFeedback();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
