/* ============================================
 * 4499 平台 · 共享交互框架
 * app.js · 2026-08-06
 * 纯 vanilla JS · 零依赖
 * ============================================ */

(function () {
  'use strict';

  /* ============================================
   * 11.5 Sidebar 多主体渲染 (PRD V1.1 IAM-003)
   * 用法: <aside class="sidebar" id="appSidebar"></aside>
   * 读 localStorage.mvs_subject_type → 调 renderSidebar()
   * ============================================ */
  function getSubjectType() {
    try {
      return localStorage.getItem('mvs_subject_type') || 'member';
    } catch (e) { return 'member'; }
  }
  function setSubjectType(t) {
    try { localStorage.setItem('mvs_subject_type', t); } catch (e) {}
  }

  function renderSidebar() {
    var container = document.getElementById('appSidebar');
    if (!container) return;
    if (!window.SIDEBAR_CONFIG || !window.SIDEBAR_ICONS) return;

    var subjectType = getSubjectType();
    var cfg = window.SIDEBAR_CONFIG[subjectType] || window.SIDEBAR_CONFIG.member;
    var currentPath = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    var html = '';

    // 顶部"我的工作台"快速入口 (admin 页面在前面加管理后台段)
    if (container.getAttribute('data-admin') === 'true') {
      html += '<div class="sidebar-section">';
      html += '<div class="sidebar-section-title" style="color: var(--color-warn-2);">管理后台</div>';
      var adminItems = [
        { id: 'admin-dashboard', label: '总览', href: 'admin-dashboard.html', icon: 'dashboard' },
        { id: 'admin-users', label: '用户管理', href: 'admin-users.html', icon: 'team' },
        { id: 'admin-roles', label: '角色权限', href: '#', icon: 'key' },
        { id: 'admin-audit', label: '审计日志', href: '#', icon: 'shield' },
        { id: 'admin-config', label: '系统配置', href: '#', icon: 'settings' }
      ];
      adminItems.forEach(function (it) {
        var active = (it.href && it.href.toLowerCase() === currentPath) ? ' is-active' : '';
        var hrefAttr = it.href || '#';
        var disabled = (!it.href || it.href === '#') ? ' aria-disabled="true"' : '';
        var icon = window.SIDEBAR_ICONS[it.icon === 'dashboard' ? 'passport' : (it.icon === 'team' ? 'team' : (it.icon === 'key' ? 'key' : (it.icon === 'shield' ? 'shield' : 'settings')))] || '';
        html += '<a href="' + hrefAttr + '" class="sidebar-item' + active + '"' + disabled + ' data-subject="admin">';
        html += '<span class="sidebar-icon">' + icon + '</span>';
        html += '<span>' + it.label + '</span>';
        html += '</a>';
      });
      html += '</div>';
    } else {
      html += '<div class="sidebar-section">';
      html += '<a href="workbench-' + (subjectType === 'member' ? 'recommender' : subjectType) + '.html" class="sidebar-item">';
      html += '<span class="sidebar-icon">' + window.SIDEBAR_ICONS.profile + '</span>';
      html += '<span>我的工作台</span>';
      html += '<span class="sidebar-badge badge badge-accent badge-sm">' + cfg.label + '</span>';
      html += '</a></div>';
    }

    cfg.sections.forEach(function (sec) {
      html += '<div class="sidebar-section">';
      html += '<div class="sidebar-section-title">' + sec.title + '</div>';
      sec.items.forEach(function (it) {
        var active = (it.href && it.href.toLowerCase() === currentPath) ? ' is-active' : '';
        var hrefAttr = it.href || '#';
        var disabled = (!it.href || it.href === '#') ? ' aria-disabled="true"' : '';
        var badge = it.badge ? '<span class="sidebar-badge badge ' +
          (it.id === 'pro-support-apply' ? 'badge-warn' : 'badge-accent') +
          ' badge-sm">' + it.badge + '</span>' : '';
        var icon = window.SIDEBAR_ICONS[it.icon] || '';
        html += '<a href="' + hrefAttr + '" class="sidebar-item' + active + '"' + disabled + ' data-subject="' + subjectType + '">';
        html += '<span class="sidebar-icon">' + icon + '</span>';
        html += '<span>' + it.label + '</span>';
        html += badge;
        html += '</a>';
      });
      html += '</div>';
    });

    // 工作台入口 (在底部)
    html += '<div class="sidebar-section" style="margin-top: var(--space-3); border-top: 1px solid var(--color-line); padding-top: var(--space-3);">';
    html += '<a href="workbench-' + (subjectType === 'member' ? 'recommender' : subjectType) + '.html" class="sidebar-item">';
    html += '<span class="sidebar-icon">' + window.SIDEBAR_ICONS.profile + '</span>';
    html += '<span>我的工作台</span>';
    html += '<span class="sidebar-badge badge badge-accent badge-sm">' + cfg.label + '</span>';
    html += '</a></div>';

    container.innerHTML = html;
  }

  /* ============================================
   * 1. Tab 切换
   * 用法: <div class="tabs js-tabs" data-target="panel-id">
   *        <div class="tab" data-tab="1">...</div>
   *        </div>
   *        <div class="tab-panels">
   *        <div class="tab-panel" data-panel="1">...</div>
   *        </div>
   * ============================================ */
  function initTabs() {
    document.querySelectorAll('.js-tabs').forEach(function (tabsRoot) {
      var tabs = tabsRoot.querySelectorAll('.tab');
      var targetId = tabsRoot.getAttribute('data-target');
      var panelsRoot = targetId ? document.getElementById(targetId) : tabsRoot.nextElementSibling;
      if (!panelsRoot) return;
      var panels = panelsRoot.querySelectorAll('.tab-panel');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var key = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          tab.classList.add('is-active');
          panels.forEach(function (p) {
            p.style.display = p.getAttribute('data-panel') === key ? '' : 'none';
          });
        });
      });
    });
  }

  /* ============================================
   * 2. Segmented 控件（同 tab，单组内互斥）
   * 用法: <div class="segmented js-segmented">
   *        <div class="segmented-item">A</div>
   *        <div class="segmented-item is-active">B</div>
   *        </div>
   * ============================================ */
  function initSegmented() {
    document.querySelectorAll('.js-segmented').forEach(function (root) {
      var items = root.querySelectorAll('.segmented-item');
      items.forEach(function (item) {
        item.addEventListener('click', function () {
          items.forEach(function (i) { i.classList.remove('is-active'); });
          item.classList.add('is-active');
        });
      });
    });
  }

  /* ============================================
   * 3. Filter chip 切换（多选）
   * 用法: <div class="filter-chip js-filter" data-target-row="c-payer">付费</div>
   * 点击切换 is-active 状态
   * ============================================ */
  function initFilterChips() {
    document.querySelectorAll('.js-filter').forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.classList.toggle('is-active');
      });
    });
  }

  /* ============================================
   * 4. Check pill（单选 / 多选）
   * 用法: <label class="check-pill js-check-pill"><input type="radio">选项</label>
   * ============================================ */
  function initCheckPills() {
    document.querySelectorAll('.js-check-pill').forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        // 让原生 input 行为接管，这里只同步视觉态
        var input = pill.querySelector('input');
        if (!input) return;
        setTimeout(function () {
          if (input.type === 'radio') {
            var name = input.name;
            if (name) {
              document.querySelectorAll('.js-check-pill input[name="' + name + '"]').forEach(function (other) {
                other.parentElement.classList.toggle('is-active', other.checked);
              });
            } else {
              pill.classList.toggle('is-active', input.checked);
            }
          } else {
            pill.classList.toggle('is-active', input.checked);
          }
        }, 0);
      });
    });
  }

  /* ============================================
   * 5. Check box（点击整块切换）
   * 用法: <label class="check-box js-check-box"><input type="checkbox">...</label>
   * ============================================ */
  function initCheckBoxes() {
    document.querySelectorAll('.js-check-box').forEach(function (box) {
      box.addEventListener('click', function () {
        var input = box.querySelector('input');
        if (!input) return;
        setTimeout(function () { box.classList.toggle('is-active', input.checked); }, 0);
      });
    });
  }

  /* ============================================
   * 6. Task check 切换
   * 用法: <div class="task-check js-task-check" data-task="row-1"></div>
   * ============================================ */
  function initTaskChecks() {
    document.querySelectorAll('.js-task-check').forEach(function (el) {
      el.addEventListener('click', function () {
        el.classList.toggle('is-done');
        var row = el.closest('.task-row');
        if (row) row.classList.toggle('is-done');
      });
    });
  }

  /* ============================================
   * 7. Row selection（点击行高亮 + 触发 callback）
   * 用法: <tr class="js-row-select" data-id="x">...</tr>
   * ============================================ */
  function initRowSelect() {
    document.querySelectorAll('.js-row-select').forEach(function (row) {
      row.addEventListener('click', function (e) {
        if (e.target.closest('input,button,a')) return;
        var group = row.parentElement;
        group.querySelectorAll('.js-row-select').forEach(function (r) { r.classList.remove('is-selected'); });
        row.classList.add('is-selected');
        var id = row.getAttribute('data-id');
        document.querySelectorAll('.js-row-dependent').forEach(function (dep) {
          dep.classList.toggle('is-active', dep.getAttribute('data-id') === id);
        });
      });
    });
  }

  /* ============================================
   * 8. Modal / Drawer
   * 用法: <button data-modal-open="modal-id">打开</button>
   *       <div class="modal" id="modal-id" data-modal>...</div>
   *       <div class="modal-backdrop" data-modal-backdrop="modal-id"></div>
   *       <button data-modal-close="modal-id">关闭</button>
   * ============================================ */
  function initModals() {
    document.addEventListener('click', function (e) {
      var open = e.target.closest('[data-modal-open]');
      if (open) { openModal(open.getAttribute('data-modal-open')); return; }
      var close = e.target.closest('[data-modal-close]');
      if (close) { closeModal(close.getAttribute('data-modal-close')); return; }
      var backdrop = e.target.closest('[data-modal-backdrop]');
      if (backdrop) { closeModal(backdrop.getAttribute('data-modal-backdrop')); return; }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.is-open, .drawer.is-open').forEach(function (m) { m.classList.remove('is-open'); });
        document.querySelectorAll('.modal-backdrop.is-open').forEach(function (b) { b.classList.remove('is-open'); });
        document.body.style.overflow = '';
      }
    });
  }
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    var backdrop = document.querySelector('[data-modal-backdrop="' + id + '"]');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.remove('is-open');
    var backdrop = document.querySelector('[data-modal-backdrop="' + id + '"]');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ============================================
   * 9. Toast（轻量提示）
   * 用法: toast('操作成功')
   *      toast('操作失败', 'error')
   * ============================================ */
  function toast(msg, type) {
    type = type || 'success';
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    var el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-show'); });
    setTimeout(function () { el.classList.remove('is-show'); setTimeout(function () { el.remove(); }, 240); }, 2400);
  }
  window.toast = toast;

  /* ============================================
   * 10. Counter 数字动画
   * 用法: <span class="js-counter" data-target="86">0</span>
   * ============================================ */
  function initCounters() {
    var counters = document.querySelectorAll('.js-counter');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (c) { c.textContent = c.getAttribute('data-target'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var dur = 800;
    var start = performance.now();
    function step(t) {
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = Number.isInteger(target) ? Math.floor(val) : val.toFixed(1);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ============================================
   * 11. Search filter（行级过滤）
   * 用法: <input class="js-row-search" data-target-rows=".js-searchable">
   *       <tr class="js-searchable" data-search="林秀华 M-2024-0381">...</tr>
   * ============================================ */
  function initSearch() {
    document.querySelectorAll('.js-row-search').forEach(function (input) {
      var target = input.getAttribute('data-target-rows');
      input.addEventListener('input', function () {
        var q = input.value.trim().toLowerCase();
        document.querySelectorAll(target + '.js-searchable').forEach(function (row) {
          var key = (row.getAttribute('data-search') || '').toLowerCase();
          row.style.display = !q || key.indexOf(q) >= 0 ? '' : 'none';
        });
      });
    });
  }

  /* ============================================
   * 11.6 主体切换监听 (PRD IAM-003)
   * - 同 tab: 监听 mvs:subject-changed 自定义事件
   * - 跨 tab: 监听 storage 事件
   * 触发后: 重渲染 sidebar + 更新 chip + 滚动到 active 项
   * ============================================ */
  function updateSubjectChip() {
    var cur = 'member';
    try { cur = localStorage.getItem('mvs_subject_type') || 'member'; } catch (e) {}
    var labels = { user: '普通参与者', member: '个人会员', enterprise: '企业经营', organization: '组织运营' };
    var chip = document.getElementById('jsSubjectChip');
    var lbl = document.getElementById('jsSubjectLabel');
    if (chip) chip.setAttribute('data-subject', cur);
    if (lbl) lbl.textContent = labels[cur] || '个人会员';
  }
  function initSubjectListener() {
    // 跨 tab
    window.addEventListener('storage', function (e) {
      if (e.key === 'mvs_subject_type') {
        renderSidebar();
        updateSubjectChip();
        initSidebarActiveScroll();
      }
    });
    // 同 tab
    window.addEventListener('mvs:subject-changed', function () {
      renderSidebar();
      updateSubjectChip();
      initSidebarActiveScroll();
    });
  }

  /* ============================================
   * 12. Sidebar 折叠
   * 用法: <button class="js-sidebar-toggle">...</button>
   * ============================================ */
  function initSidebarToggle() {
    document.querySelectorAll('.js-sidebar-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.body.classList.toggle('is-sidebar-collapsed');
      });
    });
  }

  /* ============================================
   * 12.5 Sidebar 自动滚动到 active 项
   * 进入页面后, 把 sidebar 里 is-active 菜单项滚到视口内,
   * 避免侧栏太短时点下面菜单跳到新页面又看不见当前项
   * ============================================ */
  function initSidebarActiveScroll() {
    var sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;
    var active = sidebar.querySelector('.sidebar-item.is-active');
    if (!active) return;
    // 等一帧, 让其他 JS (counter 动画等) 先布局
    requestAnimationFrame(function () {
      try {
        active.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      } catch (e) {
        // 老浏览器 fallback: 手动算 scrollTop
        var r = active.getBoundingClientRect();
        var sr = sidebar.getBoundingClientRect();
        if (r.top < sr.top) {
          sidebar.scrollTop += r.top - sr.top - 8;
        } else if (r.bottom > sr.bottom) {
          sidebar.scrollTop += r.bottom - sr.bottom + 8;
        }
      }
    });
  }

  /* ============================================
   * 13. Smooth scroll to anchor
   * ============================================ */
  function initAnchorScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ============================================
   * 14. 状态色自动绑定
   * 用法: <span data-status="active|warning|danger|success|info">...</span>
   * ============================================ */
  function initStatusColor() {
    document.querySelectorAll('[data-status]').forEach(function (el) {
      var s = el.getAttribute('data-status');
      if (s && !el.classList.contains('badge-' + s)) {
        el.classList.add('badge-' + s);
      }
    });
  }

  /* ============================================
   * 15. Live region announcement（无障碍）
   * ============================================ */
  function announce(msg) {
    var live = document.getElementById('js-live-region');
    if (!live) {
      live = document.createElement('div');
      live.id = 'js-live-region';
      live.setAttribute('aria-live', 'polite');
      live.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(live);
    }
    live.textContent = msg;
  }

  /* ============================================
   * 初始化
   * ============================================ */
  function init() {
    renderSidebar();
    initSubjectListener();
    initTabs();
    initSegmented();
    initFilterChips();
    initCheckPills();
    initCheckBoxes();
    initTaskChecks();
    initRowSelect();
    initModals();
    initCounters();
    initSearch();
    initSidebarToggle();
    initAnchorScroll();
    initStatusColor();
    initSidebarActiveScroll();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
