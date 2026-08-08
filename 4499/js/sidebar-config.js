/* ============================================
 * 4499 平台 · 4 主体 sidebar 配置
 * sidebar-config.js · 2026-08-08
 *
 * 4 类主体 (PRD V1.1 L256-265):
 *   - User: 普通生态参与者 (无完整工作台)
 *   - Member: 长期经营个人商业价值的有效会员
 *   - Enterprise: 商业经营主体
 *   - Organization: 基金会/NGO/学校
 *
 * 主体上下文切换 → sidebar 同步刷新 (PRD IAM-003)
 * ============================================ */

window.SIDEBAR_CONFIG = {
  /* ============================================
   * 1. User (普通参与者) - 最简化, 仅基础资料 + 切换主体
   * ============================================ */
  user: {
    label: '基础资料',
    avatar: '陈',
    sections: [
      {
        title: '基础',
        items: [
          { id: 'workbench-user', label: '我的资料', href: 'workbench-user.html', icon: 'profile' },
          { id: 'my-orders', label: '我的服务', href: 'my-orders.html', icon: 'orders' },
          { id: 'my-events', label: '受邀活动', href: 'my-events.html', icon: 'event' },
        ]
      },
      {
        title: '授权与隐私',
        items: [
          { id: 'data-consent', label: '数据授权', href: 'data-consent.html', icon: 'shield' },
          { id: 'export-data', label: '导出我的数据', href: 'export-data.html', icon: 'download' },
        ]
      },
      {
        title: '主体',
        items: [
          { id: 'subject-switch', label: '切换主体上下文', href: 'workbench-switch.html', icon: 'switch', badge: '升级为会员' },
        ]
      }
    ]
  },

  /* ============================================
   * 2. Member (个人会员) - 当前 workbench-recommender 视角
   * ============================================ */
  member: {
    label: '个人会员',
    avatar: '陈',
    sections: [
      {
        title: '客户与会员',
        items: [
          { id: 'crm-list', label: '会员与客户', href: 'crm-list.html', icon: 'people', badge: '86' },
          { id: 'dual-fork-network', label: '双叉网络', href: 'dual-fork-network.html', icon: 'fork' },
          { id: 'recommendations', label: '推荐关系', href: 'recommendations.html', icon: 'recommend' },
        ]
      },
      {
        title: '商业画像',
        items: [
          { id: 'business-profile-people', label: '个人画像', href: 'business-profile-people.html', icon: 'profile' },
          { id: 'business-profile-enterprise', label: '我的企业', href: 'business-profile-enterprise.html', icon: 'enterprise' },
          { id: 'business-profile-organization', label: '组织画像', href: 'business-profile-organization.html', icon: 'org' },
        ]
      },
      {
        title: '商业网络',
        items: [
          { id: 'business-network-contacts', label: '商业联系人', href: 'business-network-contacts.html', icon: 'contacts' },
          { id: 'business-network-resources', label: '资源目录', href: 'business-network-resources.html', icon: 'resource' },
        ]
      },
      {
        title: '商业实践',
        items: [
          { id: 'business-activities-list', label: '活动总览', href: 'business-activities-list.html', icon: 'activities' },
          { id: 'my-courses', label: '我的课程', href: 'my-courses.html', icon: 'learning' },
          { id: 'business-activities-events', label: '活动与聚会', href: 'business-activities-events.html', icon: 'event' },
          { id: 'business-activities-projects', label: '项目中心', href: 'business-activities-projects.html', icon: 'project' },
          { id: 'service-window', label: '服务订单', href: 'service-window.html', icon: 'order' },
          { id: 'business-activities-products', label: '产品购买', href: 'business-activities-products.html', icon: 'cart' },
          { id: 'business-activities-charity', label: '公益行动', href: 'business-activities-charity.html', icon: 'charity' },
        ]
      },
      {
        title: '专业协作',
        items: [
          { id: 'pro-support-apply', label: '申请专业支持', href: 'pro-support-apply.html', icon: 'support', badge: '3' },
          { id: 'service-authorization', label: '服务授权', href: 'service-authorization.html', icon: 'auth' },
          { id: 'service-window', label: '30 天服务窗口', href: 'service-window.html', icon: 'window' },
          { id: 'mentors', label: '导师与专家', href: 'mentors.html', icon: 'mentor' },
        ]
      },
      {
        title: '信誉护照',
        items: [
          { id: 'trust-passport', label: 'Trust Passport', href: 'trust-passport.html', icon: 'passport' },
        ]
      },
      {
        title: '个人与传承',
        items: [
          { id: 'personal-data', label: '个人资料', href: 'personal-data.html', icon: 'profile' },
          { id: 'beneficiary', label: '受益人', href: 'beneficiary.html', icon: 'beneficiary' },
          { id: 'insurance-policies', label: '保险保单', href: 'insurance-policies.html', icon: 'shield' },
        ]
      },
      {
        title: '主体',
        items: [
          { id: 'subject-switch', label: '切换主体上下文', href: 'workbench-switch.html', icon: 'switch' },
        ]
      }
    ]
  },

  /* ============================================
   * 3. Enterprise (企业) - 企业经营视角
   * PRD L262: 企业画像/需求与资源/项目合作/采购/渠道/成员管理
   * ============================================ */
  enterprise: {
    label: '企业经营',
    avatar: '陈',
    sections: [
      {
        title: '业务伙伴',
        items: [
          { id: 'crm-list', label: '业务伙伴', href: 'crm-list.html', icon: 'people', badge: '32' },
          { id: 'dual-fork-network', label: '双叉网络', href: 'dual-fork-network.html', icon: 'fork' },
        ]
      },
      {
        title: '商业画像',
        items: [
          { id: 'business-profile-enterprise', label: '我的企业', href: 'business-profile-enterprise.html', icon: 'enterprise' },
          { id: 'business-profile-product', label: '产品矩阵', href: 'business-profile-product.html', icon: 'product' },
          { id: 'business-profile-project', label: '项目档案', href: 'business-profile-project.html', icon: 'project' },
        ]
      },
      {
        title: '商业网络',
        items: [
          { id: 'business-network-contacts', label: '联系人', href: 'business-network-contacts.html', icon: 'contacts' },
          { id: 'business-network-resources', label: '资源', href: 'business-network-resources.html', icon: 'resource' },
        ]
      },
      {
        title: '业务运营',
        items: [
          { id: 'business-activities-projects', label: '项目合作', href: 'business-activities-projects.html', icon: 'project' },
          { id: 'service-window', label: '采购订单', href: 'service-window.html', icon: 'cart' },
          { id: 'business-activities-products', label: '可售服务', href: 'business-activities-products.html', icon: 'store' },
          { id: 'business-activities-events', label: '行业活动', href: 'business-activities-events.html', icon: 'event' },
        ]
      },
      {
        title: '成员管理',
        items: [
          { id: 'team-members', label: '团队成员', href: '#', icon: 'team' },
          { id: 'team-roles', label: '权限分配', href: '#', icon: 'key' },
        ]
      },
      {
        title: '专业协作',
        items: [
          { id: 'pro-support-apply', label: '申请专业支持', href: 'pro-support-apply.html', icon: 'support', badge: '3' },
          { id: 'service-authorization', label: '服务授权', href: 'service-authorization.html', icon: 'auth' },
          { id: 'service-window', label: '30 天服务窗口', href: 'service-window.html', icon: 'window' },
          { id: 'mentors', label: '导师与专家', href: 'mentors.html', icon: 'mentor' },
        ]
      },
      {
        title: '企业信誉',
        items: [
          { id: 'trust-passport', label: '企业信誉', href: 'trust-passport.html', icon: 'passport' },
        ]
      },
      {
        title: '主体',
        items: [
          { id: 'subject-switch', label: '切换主体上下文', href: 'workbench-switch.html', icon: 'switch' },
        ]
      }
    ]
  },

  /* ============================================
   * 4. Organization (组织) - 公益/NGO/学校视角
   * PRD L263: 组织画像/成员与资源/公益/行业活动/影响力与贡献
   * ============================================ */
  organization: {
    label: '组织运营',
    avatar: '陈',
    sections: [
      {
        title: '成员与活动',
        items: [
          { id: 'org-members', label: '组织成员', href: '#', icon: 'team' },
          { id: 'org-events', label: '公益活动', href: 'business-activities-charity.html', icon: 'charity' },
        ]
      },
      {
        title: '组织画像',
        items: [
          { id: 'business-profile-organization', label: '我的组织', href: 'business-profile-organization.html', icon: 'org' },
          { id: 'business-profile-project', label: '项目档案', href: 'business-profile-project.html', icon: 'project' },
        ]
      },
      {
        title: '资源与影响力',
        items: [
          { id: 'business-network-contacts', label: '联系人', href: 'business-network-contacts.html', icon: 'contacts' },
          { id: 'business-network-resources', label: '资源目录', href: 'business-network-resources.html', icon: 'resource' },
          { id: 'org-impact', label: '影响力与贡献', href: 'trust-passport.html', icon: 'impact' },
        ]
      },
      {
        title: '公益与行业',
        items: [
          { id: 'business-activities-charity', label: '公益行动', href: 'business-activities-charity.html', icon: 'charity' },
          { id: 'business-activities-events', label: '行业活动', href: 'business-activities-events.html', icon: 'event' },
          { id: 'business-activities-projects', label: '项目合作', href: 'business-activities-projects.html', icon: 'project' },
        ]
      },
      {
        title: '专业协作',
        items: [
          { id: 'pro-support-apply', label: '申请专业支持', href: 'pro-support-apply.html', icon: 'support', badge: '3' },
          { id: 'service-authorization', label: '服务授权', href: 'service-authorization.html', icon: 'auth' },
          { id: 'service-window', label: '30 天服务窗口', href: 'service-window.html', icon: 'window' },
          { id: 'mentors', label: '导师与专家', href: 'mentors.html', icon: 'mentor' },
        ]
      },
      {
        title: '公信力',
        items: [
          { id: 'trust-passport', label: '组织公信力', href: 'trust-passport.html', icon: 'passport' },
        ]
      },
      {
        title: '主体',
        items: [
          { id: 'subject-switch', label: '切换主体上下文', href: 'workbench-switch.html', icon: 'switch' },
        ]
      }
    ]
  }
};

/* SVG icon library (匹配现有 sidebar 视觉) */
window.SIDEBAR_ICONS = {
  profile: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M3 15.5a6 6 0 0112 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  enterprise: '<svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M6 7h6M6 10h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  org: '<svg viewBox="0 0 18 18" fill="none"><path d="M9 2l6 3v5c0 4-2.5 7-6 8-3.5-1-6-4-6-8V5l6-3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  product: '<svg viewBox="0 0 18 18" fill="none"><path d="M3 7l6-4 6 4-6 4-6-4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 7v4l6 4 6-4V7" stroke="currentColor" stroke-width="1.4"/></svg>',
  project: '<svg viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h12M8 3v12" stroke="currentColor" stroke-width="1.4"/></svg>',
  people: '<svg viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4"/><circle cx="13" cy="9" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 14a3.5 3.5 0 017 0M9 14a3 3 0 016 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  fork: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="4" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="4" cy="14" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="14" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M9 6v3M9 9L5 12M9 9l4 3" stroke="currentColor" stroke-width="1.4"/></svg>',
  recommend: '<svg viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3v12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  contacts: '<svg viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4"/><circle cx="13" cy="9" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 14a3.5 3.5 0 017 0M9 14a3 3 0 016 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  resource: '<svg viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M3 7h12" stroke="currentColor" stroke-width="1.4"/></svg>',
  activities: '<svg viewBox="0 0 18 18" fill="none"><path d="M3 14l5-5 3 3 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="5" r="1.5" stroke="currentColor" stroke-width="1.4"/></svg>',
  learning: '<svg viewBox="0 0 18 18" fill="none"><path d="M2 5l7-3 7 3-7 3-7-3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M5 7v4c0 1.5 2 3 4 3s4-1.5 4-3V7" stroke="currentColor" stroke-width="1.4"/></svg>',
  event: '<svg viewBox="0 0 18 18" fill="none"><rect x="3" y="4" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h12M6 2v3M12 2v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  order: '<svg viewBox="0 0 18 18" fill="none"><path d="M4 4h10l-1 10H5L4 4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 7h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  cart: '<svg viewBox="0 0 18 18" fill="none"><path d="M2 3h2l2 9h9l2-7H5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="15" r="1" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="15" r="1" stroke="currentColor" stroke-width="1.4"/></svg>',
  charity: '<svg viewBox="0 0 18 18" fill="none"><path d="M9 16s-6-3.5-6-8a3 3 0 015-2 3 3 0 011 0 3 3 0 015 2c0 4.5-6 8-6 8h1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  support: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M9 6v3l2 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  auth: '<svg viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M3 7h12" stroke="currentColor" stroke-width="1.4"/></svg>',
  window: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M3 9h12" stroke="currentColor" stroke-width="1.4"/></svg>',
  mentor: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M3 15.5a6 6 0 0112 0M9 6l-2 3M9 6l2 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  passport: '<svg viewBox="0 0 18 18" fill="none"><path d="M9 2l5 2v5c0 3.5-2.2 6.4-5 7.5-2.8-1.1-5-4-5-7.5V4l5-2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.5 9.5l2 2 3.5-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  beneficiary: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M9 6v3l2 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  shield: '<svg viewBox="0 0 18 18" fill="none"><path d="M9 2l6 2v5c0 4-2.5 7-6 7s-6-3-6-7V4l6-2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  download: '<svg viewBox="0 0 18 18" fill="none"><path d="M9 3v10M5 9l4 4 4-4M3 16h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  switch: '<svg viewBox="0 0 18 18" fill="none"><path d="M4 6h10l-3-3M14 12H4l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  team: '<svg viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="6" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M2 14a4 4 0 018 0M8 14a4 4 0 018 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  key: '<svg viewBox="0 0 18 18" fill="none"><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M8 11l7-7M12 7l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  store: '<svg viewBox="0 0 18 18" fill="none"><path d="M3 6h12l-1 9H4L3 6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 6L4 3h10l1 3" stroke="currentColor" stroke-width="1.4"/></svg>',
  impact: '<svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 2"/></svg>',
  orders: '<svg viewBox="0 0 18 18" fill="none"><path d="M3 4h12v10H3z" stroke="currentColor" stroke-width="1.4"/><path d="M6 7h6M6 10h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
};
