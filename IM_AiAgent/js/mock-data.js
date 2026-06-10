// mock-data.js — 写死数据（联系人 / 会话 / 产品 / 会议）
// v4 范围：不接真后端，所有数据写死
// 内部统一用 getContact(cid) 拿联系人

// === 联系人 ===
const CONTACTS = [
  { id: 'u01', name: '夏目', avatar: '夏', type: '私聊', dept: '客户部', unread: 2,
    lastMsg: '那个 VIC 套餐帮我看看？', time: '14:23', isVip: true },
  { id: 'u02', name: '产品经理-张', avatar: '张', type: '私聊', dept: '产品部',
    lastMsg: 'PRD 已发你邮箱', time: '昨天' },
  { id: 'u03', name: '王会计', avatar: '王', type: '私聊', dept: '财务部',
    lastMsg: '报表我下午发你', time: '昨天' },
  { id: 'u04', name: 'VIC 服务群', avatar: 'V', type: '群聊', dept: '7 人',
    lastMsg: '[通知] 6 月活动方案 v2 已更新', time: '昨天', isGroup: true },
  { id: 'u05', name: '技术部-小李', avatar: '李', type: '私聊', dept: '技术部',
    lastMsg: '已修复，请重试', time: '周一' },
  { id: 'u06', name: '运营-阿明', avatar: '阿', type: '私聊', dept: '运营部',
    lastMsg: '活动数据已出', time: '6/5' },
  { id: 'agent-customer', name: '智能客服', avatar: '客', type: 'Agent',
    tag: '客服', tagColor: 'blue', isAgent: true,
    desc: '7×24 在线，秒回您的咨询', welcome: '您好，我是智能客服小客。请问您要咨询什么？我可以帮您处理订单、退款、物流等问题。' },
  { id: 'agent-sales', name: 'AI 销冠·小销', avatar: '销', type: 'Agent',
    tag: '销冠', tagColor: 'orange', isAgent: true,
    desc: '专业销售顾问，主动引导成交', welcome: '您好！我是您的专属销售顾问小销。👋\n看到您对 VIC 套餐感兴趣，我整理了最适合您的方案，5 分钟给您讲明白～' },
  { id: 'agent-meeting', name: '会议助手', avatar: '议', type: 'Agent',
    tag: '会议', tagColor: 'green', isAgent: true,
    desc: '自动出纪要、总结文档', welcome: '我可以帮您做会议纪要、文档总结、行动项跟踪。' }
];

// === helper：按 id 查联系人 ===
function getContact(id) {
  return CONTACTS.find(c => c.id === id);
}

// === 会话列表 ===
const CHATS = [
  { id: 'c01', contactId: 'u01', lastMsg: '那个 VIC 套餐帮我看看？', time: '14:23', unread: 2, pinned: true },
  { id: 'c02', contactId: 'u04', lastMsg: '[通知] 6 月活动方案 v2 已更新', time: '昨天', unread: 5, pinned: true },
  { id: 'c03', contactId: 'u02', lastMsg: 'PRD 已发你邮箱', time: '昨天' },
  { id: 'c04', contactId: 'u03', lastMsg: '报表我下午发你', time: '昨天' },
  { id: 'c05', contactId: 'u06', lastMsg: '活动数据已出', time: '6/5' },
  { id: 'c06', contactId: 'u05', lastMsg: '已修复，请重试', time: '周一' }
];

// === 通讯录分类 ===
const CONTACT_CATEGORIES = [
  { id: 'new', name: '新朋友', count: 3, icon: '新' },
  { id: 'private', name: '私聊', count: 12, icon: '私' },
  { id: 'group', name: '群聊', count: 5, icon: '群' },
  { id: 'blacklist', name: '黑名单', count: 0, icon: '黑' }
];

// === 消息模板（夏目单聊） ===
const CHAT_WITH_NATSUME = [
  { from: 'them', time: '14:20', text: '在吗？想了解一下 VIC 套餐' },
  { from: 'them', time: '14:21', text: '客服说最近有活动，给我推个最划算的' },
  { from: 'me',   time: '14:23', text: '稍等，我帮你看看' },
  { from: 'me',   time: '14:23', text: '那个 VIC 套餐帮我看看？' }
];

// === 产品库（销冠 Agent 用）===
const PRODUCTS = [
  { id: 'p01', name: 'VIC 入门套餐', price: 1980, original: 2980, tag: '热销',
    desc: '含 100 次 AI 咨询 + 5 次专家 1v1', icon: '🌱' },
  { id: 'p02', name: 'VIC 专业套餐', price: 4980, original: 6980, tag: '推荐',
    desc: '含 500 次 AI 咨询 + 20 次专家 1v1', icon: '⭐' },
  { id: 'p03', name: 'VIC 旗舰套餐', price: 9980, original: 12980, tag: '限时',
    desc: '无限 AI 咨询 + 50 次专家 + 专属顾问', icon: '👑' },
  { id: 'p04', name: 'VIC 体验装', price: 99, original: 199, tag: '新人',
    desc: '3 天体验，不满意全额退', icon: '🎁' }
];

// === 会议数据（会议 tab + 详情 + Agent 用） ===
const MEETINGS = [
  {
    id: 'm01',
    title: 'Q3 营销策略评审会',
    startTime: '2026-06-10 14:00',
    endTime:   '2026-06-10 15:30',
    duration: 90,
    status: 'soon',          // soon / scheduled / ended
    organizer: '陈志远',
    attendees: 8,
    attendeeList: ['陈志远 (主持)', '夏目', '李四', '王五', '赵六', '运营-阿明', '产品经理-张', '王会计'],
    agenda: [
      'Q2 整体数据复盘',
      'Q3 营销目标对齐',
      'VIC 套餐主推方案',
      '私域转化策略讨论',
      'AI Agent 落地节奏'
    ]
  },
  {
    id: 'm02',
    title: 'VIC 产品周会',
    startTime: '2026-06-09 17:30',
    endTime:   '2026-06-09 18:00',
    duration: 30,
    status: 'scheduled',
    organizer: '产品经理-张',
    attendees: 4,
    attendeeList: ['产品经理-张 (主持)', '夏目', '技术部-小李', '设计-小林'],
    agenda: ['本周迭代回顾', '下版本规划', 'Bug 优先级']
  },
  {
    id: 'm03',
    title: '6 月运营复盘',
    startTime: '2026-06-08 10:00',
    endTime:   '2026-06-08 11:30',
    duration: 90,
    status: 'ended',
    organizer: '运营-阿明',
    attendees: 6,
    attendeeList: ['运营-阿明 (主持)', '陈志远', '夏目', '李四', '王五', '赵六'],
    agenda: ['6 月关键指标', '活动效果分析', '下半年规划'],
    hasSummary: true
  }
];

// === 会议纪要样例（按 meetingId 索引） ===
const MEETING_SUMMARY = {
  m03: {
    title: '6 月运营复盘',
    meta: '2026-06-08 10:00-11:30 · 90 分钟 · 6 人',
    overview: '本次复盘会围绕 6 月运营关键指标、活动效果、下半年规划三个核心议题展开。会议最后形成 3 项关键决策与 4 项待办行动项。',
    keyPoints: [
      '6 月新增私域用户 1.2 万（环比 +18%），转化率 4.7%（环比 -0.3pp）',
      '"618 大促" 活动 ROI 1:3.2，超出预期 20%，其中 VIC 专业套餐贡献 47% GMV',
      '客服日均承接 240 单咨询，AI 接管后人工介入率降至 18%'
    ],
    decisions: [
      '7 月主推 "夏季焕新" 活动（7/15-7/30），目标 GMV 1200 万',
      '私域转化实验由销冠 Agent 全量接管，人工销冠转 VIP 客户深度服务',
      '客服 Agent 上线 30 天评估期：CSAT 目标 ≥4.5/5'
    ],
    actions: [
      { task: '夏季焕新活动方案 + 推广素材', owner: '夏目',   deadline: '2026-07-05', priority: 'P0' },
      { task: '销冠 Agent 知识库 V2 上线',    owner: '李四',   deadline: '2026-07-01', priority: 'P0' },
      { task: '客服 Agent 满意度周报机制',    owner: '王五',   deadline: '2026-06-20', priority: 'P1' },
      { task: '私域转化漏斗数据看板',        owner: '运营-阿明', deadline: '2026-06-25', priority: 'P1' }
    ]
  },
  m01: {
    title: 'Q3 营销策略评审会',
    meta: '2026-06-10 14:00-15:30 · 90 分钟 · 8 人',
    overview: '预安排会议，AI 助手将在会议结束后自动生成完整纪要。',
    keyPoints: ['[议程] Q2 整体数据复盘', '[议程] Q3 营销目标对齐', '[议程] AI Agent 落地节奏'],
    decisions: [],
    actions: []
  }
};

// === 我的 tab 数据 ===
const PROFILE_DATA = {
  name: '陈志远',
  account: '@zhiyuan',
  avatar: '陈',
  dept: '市场部',
  memberLevel: 'VIP',
  points: 2380,
  qrCode: 'QR',
  menus: [
    { icon: '📦', name: '订单', count: 3 },
    { icon: '🎫', name: '卡券', count: 5 },
    { icon: '📁', name: '收藏' },
    { icon: '📜', name: '历史' }
  ],
  apps: [
    { icon: '🤖', name: 'AI Agent 中心', isNew: true, color: 'red' },
    { icon: '🏢', name: '我的企业' },
    { icon: '👑', name: '会员中心' },
    { icon: '📊', name: '数据中心' },
    { icon: '🎨', name: '模板' },
    { icon: '⚙️', name: '设置' }
  ]
};
