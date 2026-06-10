// views.js — 一体式原型的所有视图（手机内）
// 每个 view 返回 HTML 字符串，spa.js 注入到 .phone-content

const WORKFLOW_ITEMS = [
  {
    id: 'wf-reply-xiari',
    icon: '💬',
    title: '夏日提问：产品怎么卖？',
    time: '14:32',
    meta: 'Agent 自动匹配 Q&A #3',
    status: '已回复',
    type: '自动回复',
    customer: '夏日',
    intent: '咨询 VIC 月卡适合人群与购买方式',
    trigger: '命中关键词「怎么卖 / 月卡 / 适合我吗」',
    action: '发送 VIC 月卡说明，并追问使用频率',
    reply: 'VIC 月卡是 ¥199/月，适合高频私聊和群沟通用户。如果你主要是一个人使用，先用月卡试 30 天更稳。',
    next: '若客户追问价格，对比月卡 / 年卡权益',
    confidence: '92%',
    steps: ['识别销售咨询', '检索知识库 Q&A #3', '匹配 VIC 月卡', '发送回复', '等待客户下一句']
  },
  {
    id: 'wf-product-wang',
    icon: '🛒',
    title: '王总询问 VIC 套餐价格',
    time: '14:18',
    meta: '自动发送商品卡片',
    status: '跟进中',
    type: '商品推荐',
    customer: '王总',
    intent: '对比 VIC 年卡和企业版 10 席',
    trigger: '连续 2 次询价 + 查看商品卡 4 次',
    action: '发送企业版商品卡，标记高意向客户',
    reply: '如果团队超过 6 人，企业版 10 席更划算，含团队管理、数据看板和专属客服，年费 ¥3999。',
    next: '15 分钟内人工跟进，可追加限时优惠',
    confidence: '88%',
    steps: ['识别高意向', '读取商品库价格', '应用推荐策略 #2', '发送商品卡', '更新客户标签']
  },
  {
    id: 'wf-pay-linv',
    icon: '🏦',
    title: '李女士要求对公账户',
    time: '13:55',
    meta: '命中付款方式话术',
    status: '已回复',
    type: '付款说明',
    customer: '李女士',
    intent: '索取企业版对公转账信息',
    trigger: '命中「对公 / 开票 / 账户」付款类关键词',
    action: '发送转账信息，并提醒备注订单号',
    reply: '可以对公转账。我先发你账户信息，转账备注请写公司名 + 手机号，到账后财务会在 1 个工作日内确认。',
    next: '客户回传付款截图后转人工确认',
    confidence: '95%',
    steps: ['识别付款咨询', '检索付款题库', '检查禁用承诺', '发送对公说明', '等待付款截图']
  },
  {
    id: 'wf-human-refund',
    icon: '🙋',
    title: '退款争议转人工',
    time: '12:42',
    meta: '超出售后边界',
    status: '已转人工',
    type: '转人工',
    customer: '赵先生',
    intent: '要求立即退款并质疑服务有效期',
    trigger: '包含「投诉 / 立即退款 / 不满意」高风险词',
    action: '停止自动承诺，生成工单交给人工客服',
    reply: '这个问题涉及订单核验和售后判定，我已帮你转人工客服处理，会优先查看订单情况。',
    next: '人工客服确认订单号和退款规则',
    confidence: '97%',
    steps: ['识别售后争议', '触发边界规则', '停止销售话术', '生成工单', '转人工']
  },
  {
    id: 'wf-tag-chen',
    icon: '🏷',
    title: '陈先生升级为复购机会',
    time: '11:10',
    meta: '客户标签自动更新',
    status: '已打标',
    type: '标签更新',
    customer: '陈先生',
    intent: '历史成交客户再次询问年卡优惠',
    trigger: '已成交 + 30 天内再次咨询 + 点击年卡商品卡',
    action: '从普通客户升级为复购机会',
    reply: '系统已记录为复购机会，后续 AI 会优先推荐年卡续费权益和老客户优惠。',
    next: '下一轮咨询优先发送年卡优惠对比',
    confidence: '84%',
    steps: ['读取成交历史', '识别复购信号', '更新客户标签', '调整推荐优先级', '写入日志']
  }
];

const VIEWS = {
  /* ============ 消息列表 ============ */
  'chat-list': () => {
    const pinned = CHATS.filter(c => c.pinned);
    const all = CHATS.filter(c => !c.pinned);
    return `
      <div class="phone-view active" data-view="chat-list">
        <div class="top-search">
          <input class="search-input" placeholder="🔍  搜索">
          <div class="add-btn">+</div>
        </div>
        <div class="im-today-strip" data-action="open" data-target="ai-inbox">
          <span>今日</span>
          <strong>8 条新消息</strong>
          <em>AI 已处理 ›</em>
        </div>
        <div class="pinned-section">📌 置顶</div>
        ${pinned.map(c => renderChatItem(c)).join('')}
        <div class="pinned-section" style="background:#fff;margin-top:4px;">全部消息</div>
        ${all.map(c => renderChatItem(c)).join('')}
      </div>
    `;
  },


  /* ============ AI 已处理消息 ============ */
  'ai-inbox': () => {
    const items = [
      ['销冠', '高意向客户：王总追问 VIC 套餐价格', '已生成报价话术 · 建议 10 分钟内跟进', 'HOT', 'agent-sales'],
      ['客服', '3 条退款咨询集中出现', '已归并为售后工单 · 等待订单号', '售后', 'agent-customer'],
      ['会议', '产品周会录音已完成转写', '纪要草稿 86% · 3 个待确认行动项', '纪要', 'agent-meeting'],
      ['销冠', '李女士查看企业版 4 次', 'AI 判断为复购机会 · 推荐优惠券', '机会', 'agent-sales'],
      ['客服', '会员权益问题重复提问', '已匹配 FAQ · 自动回复草稿可发送', 'FAQ', 'agent-customer'],
      ['销冠', '群聊里有人询问付款方式', '建议发送分期/对公转账说明', '成交', 'agent-sales'],
      ['会议', '客户需求评审有新 @我', '已摘出 2 条风险点 · 建议确认排期', '风险', 'agent-meeting'],
      ['客服', '黑名单用户重复私信', '已降低优先级 · 不触发提醒', '低优先', 'agent-customer']
    ];
    return `
      <div class="phone-view" data-view="ai-inbox">
        <div class="ai-inbox-head">
          <span>TODAY</span>
          <strong>8 条 AI 已处理消息</strong>
          <em>按意图、风险、成交机会自动归类</em>
        </div>
        <div class="ai-inbox-list">
          ${items.map((it, i) => `
            <div class="ai-inbox-item ${it[4]}" data-action="open-agent" data-agent="${it[4]}">
              <div class="ai-inbox-rank">${String(i + 1).padStart(2, '0')}</div>
              <div class="ai-inbox-body">
                <div class="ai-inbox-title"><span>${it[0]}</span>${it[1]}</div>
                <div class="ai-inbox-desc">${it[2]}</div>
              </div>
              <div class="ai-inbox-tag">${it[3]}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /* ============ 通讯录 ============ */
  'contact': () => {
    const users = CONTACTS.filter(c => !c.isAgent);
    return `
      <div class="phone-view" data-view="contact">
        <div class="contact-hero">
          <div>
            <span>CONTACTS</span>
            <strong>通讯录</strong>
          </div>
          <button class="contact-add">＋</button>
        </div>
        <div class="top-search contact-search">
          <input class="search-input" placeholder="🔍  搜索联系人 / 群聊 / AI Agent">
        </div>
        <div class="contact-section-title">
          <span>AI AGENTS</span>
          <em>3 个在线</em>
        </div>
        <div class="agent-stack">
        <a class="agent-card-list cust" data-action="open-agent" data-agent="agent-customer">
          <div class="ac-avatar">客</div>
          <div class="ac-body">
            <div class="ac-name">智能客服 <span class="kicker-tag blue" style="font-size:9px;padding:1px 5px;">客服</span></div>
            <div class="ac-desc">7×24 在线 · 秒回咨询</div>
          </div>
          <div class="ac-arrow">›</div>
        </a>
        <a class="agent-card-list sales" data-action="open-agent" data-agent="agent-sales">
          <div class="ac-avatar">销</div>
          <div class="ac-body">
            <div class="ac-name">AI 销冠·小销 <span class="kicker-tag orange" style="font-size:9px;padding:1px 5px;">销冠</span></div>
            <div class="ac-desc">主动引导成交 · 5 阶段流水线</div>
          </div>
          <div class="ac-arrow">›</div>
        </a>
        <a class="agent-card-list meet" data-action="open-agent" data-agent="agent-meeting">
          <div class="ac-avatar">议</div>
          <div class="ac-body">
            <div class="ac-name">会议助手 <span class="kicker-tag green" style="font-size:9px;padding:1px 5px;">会议</span></div>
            <div class="ac-desc">会议纪要 · 文档总结</div>
          </div>
          <div class="ac-arrow">›</div>
        </a>
        </div>
        <div class="contact-section-title compact">
          <span>GROUPS</span>
          <em>联系人分类</em>
        </div>
        <div class="cat-bar">
          <div class="cat-btn"><div class="cat-icon">新</div><span class="cat-name">新朋友</span><span class="cat-count">3</span></div>
          <div class="cat-btn"><div class="cat-icon" style="background:var(--umakex-purple);">私</div><span class="cat-name">私聊</span><span class="cat-count">12</span></div>
          <div class="cat-btn"><div class="cat-icon" style="background:var(--umakex-green);">群</div><span class="cat-name">群聊</span><span class="cat-count">5</span></div>
          <div class="cat-btn"><div class="cat-icon" style="background:#6b7280;">黑</div><span class="cat-name">黑名单</span><span class="cat-count">0</span></div>
        </div>
        <div class="contact-section-title compact people-title">
          <span>PEOPLE</span>
          <em>${users.length} 位联系人</em>
        </div>
        ${users.map(c => renderContactItem(c)).join('')}
      </div>
    `;
  },

  /* ============ 会议列表 ============ */
  'meeting-list': () => {
    return `
      <div class="phone-view" data-view="meeting-list">
        <div class="meeting-action-panel">
          <div class="meeting-primary-action">
            <span>＋</span>
            <div><strong>预定会议</strong><em>创建会议 · 邀请成员 · 自动提醒</em></div>
          </div>
          <div class="meeting-join-action">
            <span>#</span>
            <div><strong>加入会议</strong><em>输入会议号 / 链接</em></div>
          </div>
        </div>
        <div class="meeting-ai-strip">
          <span>AI MEETING</span>
          <strong>会议助手已开启</strong>
          <em>录音转写 · 自动纪要 · 行动项追踪</em>
        </div>
        ${MEETINGS.map(m => {
          const statusTag = m.status === 'soon'
            ? '<span class="meeting-tag soon">即将开始</span>'
            : m.status === 'ended'
              ? '<span class="meeting-tag ended">已结束</span>'
              : '<span class="meeting-tag scheduled">待开始</span>';
          const summaryTag = m.hasSummary
            ? '<span class="meeting-tag summary">纪要已生成</span>'
            : '';
          return `
            <a class="meeting-card ${m.status}" data-action="open-meeting" data-mid="${m.id}">
              <div class="meeting-title">${m.title} ${statusTag} ${summaryTag}</div>
              <div class="meeting-time">${m.startTime} → ${m.endTime}</div>
              <div class="meeting-meta">
                <span>👥 ${m.attendees} 人</span>
                <span>·</span>
                <span>${m.organizer}</span>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ============ 会议详情 ============ */
  'meeting-detail': (mid) => {
    const m = MEETINGS.find(x => x.id === mid) || MEETINGS[0];
    return `
      <div class="phone-view" data-view="meeting-detail">
        <div class="meeting-detail-banner">
          <h1>${m.title}</h1>
          <div class="meta">${m.startTime} → ${m.endTime} · ${m.duration} 分钟</div>
        </div>
        <div class="detail-section">
          <h3>会议信息</h3>
          <div style="font-size:13px;line-height:1.8;color:var(--ink);">
            <div>📅 日期：${m.startTime.split(' ')[0]}</div>
            <div>⏰ 时间：${m.startTime.split(' ')[1]} - ${m.endTime.split(' ')[1]}</div>
            <div>📍 地点：腾讯会议（线上）</div>
            <div>🆔 会议号：725-388-2941</div>
            <div>📌 主办：${m.organizer}</div>
          </div>
        </div>
        <div class="detail-section">
          <h3>参与人员 · ${m.attendees}</h3>
          <div class="attendee-list">
            ${m.attendeeList.map(a => `<span class="attendee-chip">${a}</span>`).join('')}
          </div>
        </div>
        <div class="detail-section">
          <h3>会议议程</h3>
          <ul class="agenda-list">
            ${m.agenda.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-section">
          <h3>会议纪要</h3>
          <div style="text-align:center;padding:24px 0;color:var(--ink-2);font-size:13px;">
            <div style="font-size:32px;margin-bottom:8px;">🤖</div>
            <div>会议结束后，AI 会议助手将自动生成纪要</div>
            <div style="margin-top:4px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.05em;">AUTO-SUMMARY · ${m.endTime}</div>
          </div>
        </div>
        <div class="meeting-detail-action">
          ${m.status === 'soon' ? `<div class="btn btn-record">🔴 开始录制</div><div class="btn btn-join">进入会议</div>` :
            m.status === 'scheduled' ? `<div class="btn btn-disabled">未到时间</div><div class="btn btn-join">进入会议</div>` :
            `<div class="btn btn-disabled">会议已结束</div><div class="btn btn-join" data-action="open-meeting-summary" data-mid="${m.id}">查看纪要</div>`}
        </div>
        <div style="height: 80px;"></div>
      </div>
    `;
  },

  /* ============ 我的 ============ */
  'profile': () => {
    const d = PROFILE_DATA;
    return `
      <div class="phone-view" data-view="profile">
        <div class="profile-header">
          <div class="profile-avatar">${d.avatar}</div>
          <div class="profile-info">
            <div class="profile-name">${d.name}</div>
            <div class="profile-account">${d.account} · ${d.dept}</div>
            <div class="profile-meta">
              <span class="profile-tag">${d.memberLevel}</span>
              <span class="profile-points">${d.points.toLocaleString()} 积分</span>
            </div>
          </div>
        </div>
        <div class="profile-actions">
          <div class="action-btn">📱 二维码名片</div>
          <div class="action-btn">✏️ 编辑资料</div>
        </div>
        <div class="profile-section">
          <div class="profile-section-title">基础服务</div>
          <div class="menu-grid">
            <div class="menu-item"><div class="menu-icon">📦</div><div class="menu-name">订单</div><div class="menu-count">3</div></div>
            <div class="menu-item"><div class="menu-icon">🎫</div><div class="menu-name">卡券</div><div class="menu-count">5</div></div>
            <div class="menu-item"><div class="menu-icon">📁</div><div class="menu-name">收藏</div></div>
            <div class="menu-item"><div class="menu-icon">📜</div><div class="menu-name">历史</div></div>
          </div>
        </div>
        <div class="profile-section">
          <div class="profile-section-title">应用中心</div>
          <div class="app-grid">
            <div class="app-item" data-action="open-agent-center"><div class="app-icon red">🤖</div><div class="app-name">AI Agent 中心</div><div class="app-new">NEW</div></div>
            <div class="app-item"><div class="app-icon purple">🏢</div><div class="app-name">我的企业</div></div>
            <div class="app-item"><div class="app-icon amber">👑</div><div class="app-name">会员中心</div></div>
            <div class="app-item"><div class="app-icon green">📊</div><div class="app-name">数据中心</div></div>
            <div class="app-item"><div class="app-icon">🎨</div><div class="app-name">模板</div></div>
            <div class="app-item"><div class="app-icon gray">⚙️</div><div class="app-name">设置</div></div>
          </div>
        </div>
        <div style="height: 60px;"></div>
      </div>
    `;
  },


  /* ============ AI Agent 中心：销冠配置 ============ */
  'agent-center': () => {
    const configs = [
      ['📚', '知识库', '12 个问答', 'Q&A / 话术 / 售后规则', 'agent-kb'],
      ['🛒', '商品库', '6 件商品', '价格 / 卖点 / 库存说明', 'agent-products'],
      ['👤', '人设风格', '专业型', '语气 / 边界 / 禁用词', 'agent-persona'],
      ['📊', '数据看板', '实时统计', '对话 / 订单 / 转化率', 'agent-analytics'],
      ['📋', '工作日志', '每日 Agent 摘要', '自动回复记录', 'agent-logs'],
      ['🏷', '客户标签', '好友分组', '高意向 / 售后 / 黑名单', 'agent-tags']
    ];
    const logs = WORKFLOW_ITEMS.slice(0, 3);
    return `
      <div class="phone-view" data-view="agent-center">
        <div class="agent-center-hero">
          <div class="agent-run-row"><span></span><em>运行中 · 已开启自动回复</em></div>
          <h2>Michael 的 AI销冠</h2>
          <p>正在为 8 位好友的私聊提供自动回复服务</p>
          <div class="agent-center-metrics">
            <div><strong>128</strong><span>今日对话</span></div>
            <div><strong>6</strong><span>今日订单</span></div>
            <div><strong>18%</strong><span>转化率</span></div>
          </div>
        </div>
        <div class="agent-center-section">
          <div class="agent-center-title"><span>配置中心</span><em>CONFIG</em></div>
          <div class="agent-config-grid">
            ${configs.map(c => `
              <div class="agent-config-card" data-action="open" data-target="${c[4]}">
                <div class="agent-config-icon">${c[0]}</div>
                <strong>${c[1]}</strong>
                <span>${c[2]}</span>
                <em>${c[3]}</em>
                <b>进入配置 ›</b>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="agent-center-section">
          <div class="agent-center-title workflow-title" data-action="open" data-target="agent-workflows"><span>实时工作流</span><em>查看全部 ›</em></div>
          <div class="agent-workflow-list">
            ${logs.map(x => `
              <div class="agent-workflow-item" data-action="open" data-target="agent-workflow-detail:${x.id}">
                <div class="agent-workflow-avatar">${x.icon}</div>
                <div><strong>${x.title}</strong><span>${x.time} · ${x.meta}</span></div>
                <em>${x.status}</em>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="agent-master-switch">
          <div><strong>Agent 总开关</strong><span>关闭后所有私聊不再自动回复</span></div>
          <button class="switch-on"><i></i></button>
        </div>
      </div>
    `;
  },

  /* ============ AI Agent 中心：实时工作流二级页 ============ */
  'agent-workflows': () => {
    const stats = [
      ['23', '今日动作'],
      ['1.8s', '平均响应'],
      ['97%', '规则命中']
    ];
    return `
      <div class="phone-view agent-subpage workflow-page" data-view="agent-workflows">
        <div class="workflow-hero">
          <span>LIVE WORKFLOW</span>
          <strong>实时工作流</strong>
          <em>AI 销冠每一次判断、回复、推荐、转人工都可追踪</em>
        </div>
        <div class="workflow-stat-strip">
          ${stats.map(s => `<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}
        </div>
        <div class="workflow-filter"><button class="active">全部</button><button>自动回复</button><button>推荐</button><button>转人工</button></div>
        <div class="sub-section-title"><span>正在运行</span><em>${WORKFLOW_ITEMS.length} 条记录</em></div>
        <div class="workflow-full-list">
          ${WORKFLOW_ITEMS.map(x => `
            <div class="workflow-full-row" data-action="open" data-target="agent-workflow-detail:${x.id}">
              <div class="workflow-row-head">
                <b>${x.icon}</b>
                <div><strong>${x.title}</strong><span>${x.time} · ${x.type} · ${x.customer}</span></div>
                <em>${x.status}</em>
              </div>
              <p>${x.action}</p>
              <i>查看详情 ›</i>
            </div>
          `).join('')}
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ AI Agent 中心：实时工作流详情子页 ============ */
  'agent-workflow-detail': (workflowId) => {
    const item = WORKFLOW_ITEMS.find(x => x.id === workflowId) || WORKFLOW_ITEMS[0];
    return `
      <div class="phone-view agent-subpage workflow-detail-page" data-view="agent-workflow-detail">
        <div class="workflow-detail-hero">
          <div class="workflow-detail-icon">${item.icon}</div>
          <div><span>${item.time} · ${item.type}</span><strong>${item.title}</strong><em>${item.status} · 置信度 ${item.confidence}</em></div>
        </div>
        <div class="workflow-detail-grid">
          <div><span>客户</span><strong>${item.customer}</strong></div>
          <div><span>下一步</span><strong>${item.next}</strong></div>
        </div>
        <div class="workflow-card">
          <div class="workflow-card-title"><span>触发原因</span><em>TRIGGER</em></div>
          <p>${item.trigger}</p>
        </div>
        <div class="workflow-card">
          <div class="workflow-card-title"><span>AI 判断</span><em>INTENT</em></div>
          <p>${item.intent}</p>
        </div>
        <div class="workflow-card action-card">
          <div class="workflow-card-title"><span>执行动作</span><em>ACTION</em></div>
          <p>${item.action}</p>
        </div>
        <div class="workflow-reply-box">
          <span>AI 已发送话术</span>
          <p>${item.reply}</p>
        </div>
        <div class="sub-section-title"><span>执行链路</span><em>5 步</em></div>
        <div class="workflow-stepper">
          ${item.steps.map((s, i) => `<div><b>${i + 1}</b><span>${s}</span></div>`).join('')}
        </div>
        <div class="workflow-detail-actions">
          <button data-action="open" data-target="agent-logs">看日志</button>
          <button data-action="open" data-target="agent-analytics">看数据</button>
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },


  /* ============ 配置子页：知识库 ============ */
  'agent-kb': () => {
    const qa = [
      ['VIC 套餐怎么卖？', '按月 / 年费两档报价，优先引导客户确认使用人数和预算。', '已启用'],
      ['怎么退款？', '先索取订单号，判断支付渠道，再告知 3-5 个工作日到账。', '已启用'],
      ['对公转账信息', '发送公司账户、开户行、备注规则，并提示财务确认时间。', '已启用'],
      ['会员权益差异', '对比普通 / VIC / 企业版权益，推荐高频用户升级。', '待优化']
    ];
    return `
      <div class="phone-view agent-subpage" data-view="agent-kb">
        <div class="sub-hero kb">
          <span>KNOWLEDGE BASE</span>
          <strong>AI 销冠知识库</strong>
          <em>12 个问答 · 4 条销售话术 · 3 条售后规则</em>
        </div>
        <div class="sub-toolbar">
          <button>＋ 添加问答</button><button>导入文档</button><button>训练一次</button>
        </div>
        <div class="add-panel kb-add-panel">
          <div class="add-panel-head"><strong>添加题库</strong><span>新增后立即进入本页题库列表</span></div>
          <input id="kbQuestion" placeholder="问题：客户会怎么问？例如：企业版多少钱">
          <textarea id="kbAnswer" placeholder="标准回答：AI 销冠应该怎么回复"></textarea>
          <input id="kbGroup" placeholder="分类：销售题库 / 售后题库 / 付款题库">
          <button data-action="add-kb-item">保存到题库</button>
        </div>
        <div class="sub-section-title"><span>高频问答</span><em>命中率 86%</em></div>
        <div class="kb-list">
          ${qa.map((x, i) => `
            <div class="kb-row" data-kb-row>
              <div class="kb-no">Q${i + 1}</div>
              <div class="kb-main"><strong>${x[0]}</strong><p>${x[1]}</p></div>
              <div class="kb-side">
                <i>${x[2]}</i>
                <div class="kb-actions">
                  <button data-action="edit-kb-item">编辑</button>
                  <button class="danger" data-action="delete-kb-item">删除</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="sub-section-title"><span>话术边界</span><em>不可越权承诺</em></div>
        <div class="rule-sheet">
          <div><strong>禁止承诺</strong><span>不得承诺 100% 成交 / 立即到账 / 保本收益</span></div>
          <div><strong>转人工条件</strong><span>投诉、退款争议、合同条款、价格特批</span></div>
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 配置子页：商品库 ============ */
  'agent-products': () => {
    const products = [
      ['VIC 月卡', '¥199/月', '适合单人高频沟通', '热卖'],
      ['VIC 年卡', '¥1688/年', '比月卡节省 29%，适合长期客户', '推荐'],
      ['企业版 10 席', '¥3999/年', '团队管理、数据看板、专属客服', '高客单'],
      ['销售自动化包', '¥699/月', 'AI 销冠 + 商品卡 + 线索标签', '加购']
    ];
    return `
      <div class="phone-view agent-subpage" data-view="agent-products">
        <div class="sub-hero product">
          <span>PRODUCT LIBRARY</span>
          <strong>商品库</strong>
          <em>6 件商品 · 价格 / 卖点 / 库存说明同步给 AI</em>
        </div>
        <div class="sub-toolbar"><button>＋ 新增商品</button><button>批量调价</button><button>同步库存</button></div>
        <div class="add-panel product-add-panel">
          <div class="add-panel-head"><strong>新增出售商品</strong><span>商品卡会进入 AI 销冠推荐范围</span></div>
          <input id="productName" placeholder="商品名：例如 企业版 20 席">
          <div class="form-two"><input id="productPrice" placeholder="价格：¥5999/年"><input id="productTag" placeholder="标签：推荐"></div>
          <textarea id="productDesc" placeholder="卖点：适合什么客户、解决什么问题"></textarea>
          <button data-action="add-product-item">保存商品</button>
        </div>
        <div class="sub-section-title strategy-title"><span>AI 推荐策略</span><em>按客户意向自动排序</em></div>
        <div class="add-panel strategy-add-panel compact-add">
          <div class="add-panel-head"><strong>添加 AI 策略</strong><span>定义触发条件和推荐动作</span></div>
          <input id="strategyName" placeholder="策略名：例如 复购客户优先推年卡">
          <textarea id="strategyCondition" placeholder="触发条件：客户已成交过 / 30 天内再次询价 / 点击商品卡"></textarea>
          <button data-action="add-strategy-item">保存策略</button>
        </div>
        <div class="strategy-ladder">
          <div data-strategy-row><b>1</b><strong>问预算</strong><span>未明确需求先确认人数 / 使用频率</span><button class="mini-delete" data-action="delete-strategy-item">删除</button></div>
          <div data-strategy-row><b>2</b><strong>推套餐</strong><span>高频用户优先推荐年卡或企业版</span><button class="mini-delete" data-action="delete-strategy-item">删除</button></div>
          <div data-strategy-row><b>3</b><strong>给优惠</strong><span>犹豫客户发送限时券和对比表</span><button class="mini-delete" data-action="delete-strategy-item">删除</button></div>
        </div>
        <div class="sub-section-title product-list-title"><span>商品卡片</span><em>6 件商品同步给 AI</em></div>
        <div class="product-config-list">
          ${products.map(x => `
            <div class="product-config-card" data-product-row>
              <div><strong>${x[0]}</strong><span>${x[2]}</span></div>
              <em>${x[1]}</em>
              <i>${x[3]}</i>
              <button class="mini-delete" data-action="delete-product-item">删除</button>
            </div>
          `).join('')}
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 配置子页：人设风格 ============ */
  'agent-persona': () => {
    const tones = [['专业型', 'active'], ['亲和型', ''], ['强转化', ''], ['谨慎合规', '']];
    return `
      <div class="phone-view agent-subpage" data-view="agent-persona">
        <div class="sub-hero persona">
          <span>PERSONA</span>
          <strong>人设风格</strong>
          <em>配置 AI 销冠说话方式、销售边界和禁用词</em>
        </div>
        <div class="persona-card">
          <div class="persona-avatar">销</div>
          <div><strong>小销 · 专业顾问型</strong><span>短句、明确、先问需求再推荐商品</span></div>
        </div>
        <div class="sub-section-title"><span>语气模板</span><em>当前：专业型</em></div>
        <div class="tone-grid">
          ${tones.map(t => `<button class="${t[1]}">${t[0]}</button>`).join('')}
        </div>
        <div class="sub-section-title"><span>回复规则</span><em>6 条启用</em></div>
        <div class="persona-rules">
          <label><span>先确认客户需求，再推荐套餐</span><input type="checkbox" checked></label>
          <label><span>价格问题必须给清晰金额</span><input type="checkbox" checked></label>
          <label><span>售后争议自动转人工</span><input type="checkbox" checked></label>
          <label><span>避免夸张承诺和虚假稀缺</span><input type="checkbox" checked></label>
        </div>
        <div class="forbidden-words"><strong>禁用词</strong><span>稳赚 · 绝对 · 马上到账 · 官方保证 · 内部价</span></div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 配置子页：数据看板 ============ */
  'agent-analytics': () => {
    const pillars = [['对话', 128, 112, '+18%'], ['留资', 34, 76, '+9%'], ['报价', 18, 54, '+6%'], ['订单', 6, 32, '+2%']];
    const hot = [
      ['王总', '高意向', '已查看企业版 4 次', '建议 15 分钟内跟进'],
      ['李女士', '复购机会', '询问对公转账', '建议发送年卡优惠'],
      ['夏日', '售后咨询', '退款问题未确认订单号', '建议转人工']
    ];
    return `
      <div class="phone-view agent-subpage analytics-page" data-view="agent-analytics">
        <div class="analytics-hero-v2">
          <div><span>DASHBOARD</span><strong>AI 销冠数据看板</strong><em>今日实时统计 · 自动回复效果追踪</em></div>
          <b>18%</b>
        </div>
        <div class="analytics-summary-card">
          <div><span>今日成交预估</span><strong>¥9,842</strong><em>来自 6 笔订单 / 18 次报价</em></div>
          <div class="summary-orbit"><i></i><i></i><i></i></div>
        </div>
        <div class="analytics-kpis upgraded">
          <div><strong>128</strong><span>今日对话</span><em>+24</em></div>
          <div><strong>1.8s</strong><span>平均回复</span><em>稳定</em></div>
          <div><strong>31%</strong><span>商品卡点击</span><em>+7%</em></div>
        </div>
        <div class="sub-section-title"><span>销售漏斗</span><em>竖立柱 · 非水平条</em></div>
        <div class="pillar-chart upgraded">
          ${pillars.map((x, i) => `<div class="pillar-${i}"><i style="height:${x[2]}px"></i><strong>${x[1]}</strong><span>${x[0]}</span><em>${x[3]}</em></div>`).join('')}
        </div>
        <div class="sub-section-title"><span>关键客户动态</span><em>AI 建议动作</em></div>
        <div class="hot-customer-list">
          ${hot.map(x => `
            <div class="hot-customer-row">
              <div><strong>${x[0]}</strong><span>${x[2]}</span></div>
              <em>${x[1]}</em>
              <p>${x[3]}</p>
            </div>
          `).join('')}
        </div>
        <div class="sub-section-title"><span>AI 表现</span><em>过去 24 小时</em></div>
        <div class="insight-list upgraded">
          <div><b>↗</b><strong>商品卡点击率提升</strong><span>VIC 年卡点击率 31%，建议继续置顶</span></div>
          <div><b>!</b><strong>退款咨询增加</strong><span>售后类问题 3 条，建议更新退款 FAQ</span></div>
          <div><b>✓</b><strong>回复速度稳定</strong><span>平均 1.8 秒完成草稿和回复</span></div>
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 配置子页：工作日志 ============ */
  'agent-logs': () => {
    const logs = [
      ['14:32', '自动回复', '夏日提问产品怎么卖，命中 Q&A #3，已发送 VIC 月卡说明'],
      ['14:18', '商品推荐', '王总询问价格，AI 发送企业版商品卡并标记高意向'],
      ['13:55', '付款说明', '李女士要求对公账户，已发送转账信息并提醒备注订单号'],
      ['12:42', '转人工', '退款争议超出规则，已转交人工客服处理'],
      ['11:10', '标签更新', '将陈先生从普通客户升级为复购机会']
    ];
    return `
      <div class="phone-view agent-subpage" data-view="agent-logs">
        <div class="sub-hero logs">
          <span>WORK LOG</span>
          <strong>工作日志</strong>
          <em>记录 AI 销冠每一次自动回复、推荐和转人工</em>
        </div>
        <div class="log-filter"><button class="active">全部</button><button>自动回复</button><button>转人工</button><button>成交</button></div>
        <div class="timeline-list">
          ${logs.map(x => `
            <div class="timeline-row">
              <time>${x[0]}</time>
              <div><strong>${x[1]}</strong><span>${x[2]}</span></div>
            </div>
          `).join('')}
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 配置子页：客户标签 ============ */
  'agent-tags': () => {
    const tags = [
      ['高意向', '8 人', 'orange', ['王总', '李女士', '陈先生']],
      ['售后咨询', '3 人', 'blue', ['夏日', 'Mia', '赵先生']],
      ['复购机会', '5 人', 'green', ['张经理', '林总', 'Ada']],
      ['黑名单', '0 人', 'gray', []]
    ];
    return `
      <div class="phone-view agent-subpage" data-view="agent-tags">
        <div class="sub-hero tags">
          <span>CUSTOMER TAGS</span>
          <strong>客户标签</strong>
          <em>AI 自动给好友分层，决定后续话术和跟进优先级</em>
        </div>
        <div class="sub-toolbar"><button>＋ 新建标签</button><button>批量分组</button><button>自动规则</button></div>
        <div class="add-panel tag-add-panel">
          <div class="add-panel-head"><strong>添加客户标签</strong><span>用于 AI 判断跟进优先级和回复策略</span></div>
          <input id="tagName" placeholder="标签名：例如 高净值客户 / 渠道代理">
          <textarea id="tagRule" placeholder="自动打标规则：例如 询问企业版价格 + 点击商品卡 2 次"></textarea>
          <button data-action="add-tag-item">保存标签规则</button>
        </div>
        <div class="tag-board">
          ${tags.map(t => `
            <div class="tag-card ${t[2]}">
              <div><strong>${t[0]}</strong><em>${t[1]}</em></div>
              <p>${t[3].length ? t[3].map(n => `<span>${n}</span>`).join('') : '<span>暂无客户</span>'}</p>
            </div>
          `).join('')}
        </div>
        <div class="sub-section-title"><span>自动打标规则</span><em>3 条运行中</em></div>
        <div class="rule-sheet">
          <div><strong>高意向</strong><span>连续 2 次询价 / 点击商品卡 / 主动问付款方式</span></div>
          <div><strong>售后咨询</strong><span>包含退款、到账、订单号、投诉等关键词</span></div>
          <div><strong>复购机会</strong><span>历史成交客户 30 天内再次咨询产品</span></div>
        </div>
        <div class="sub-safe-space"></div>
      </div>
    `;
  },

  /* ============ 真人单聊 ============ */
  'chat-single': (cid) => {
    const c = getContact(cid) || CONTACTS[0];
    return `
      <div class="phone-view" data-view="chat-single" data-cid="${c.id}">
        <div class="chat-page-body" id="chatBody-${c.id}" style="flex:1;overflow-y:auto;padding:16px;background:#ededed;display:flex;flex-direction:column;gap:12px;">
          ${CHAT_WITH_NATSUME.map((m, i) => `
            ${i === 1 ? '<div class="bubble-time">14:20</div>' : ''}
            <div class="msg-row ${m.from === 'them' ? 'them' : 'me'}">
              ${m.from === 'them' ? `<div class="msg-avatar">${c.avatar}</div>` : ''}
              <div class="bubble ${m.from === 'them' ? 'them' : 'me'}">${m.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input-bar" style="position:relative;bottom:0;">
          <div class="icon-btn">🎤</div>
          <input type="text" class="msg-input" id="msgInput-${c.id}" placeholder="输入消息..." data-cid="${c.id}">
          <div class="icon-btn">😊</div>
          <div class="icon-btn">+</div>
          <div class="send-btn" data-action="send-chat" data-cid="${c.id}">发送</div>
        </div>
      </div>
    `;
  },

  /* ============ Agent 对话（通用） ============ */
  'agent-chat': (agentId) => {
    const agent = getContact(agentId);
    if (!agent) return VIEWS['contact']();
    return `
      <div class="phone-view" data-view="agent-chat" data-agent="${agent.id}">
        <div class="agent-banner" style="background:${getAgentColor(agent.id)};color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;">
          <div class="ac-avatar" style="background:rgba(255,255,255,0.2);width:40px;height:40px;">${agent.avatar}</div>
          <div style="flex:1;">
            <div style="font-size:15px;font-weight:700;">${agent.name}</div>
            <div style="font-size:11px;opacity:0.9;font-family:var(--font-mono);">AI Agent · ${agent.desc}</div>
          </div>
          <span class="phase-pill" style="background:rgba(255,255,255,0.25);color:#fff;">
            <span class="dot" style="background:#fff;"></span> 在线
          </span>
        </div>
        <div class="chat-page-body" id="agentChatBody-${agent.id}" style="flex:1;overflow-y:auto;padding:16px;background:#f5f8fc;display:flex;flex-direction:column;gap:10px;">
          <div class="bubble-time">AI Agent 已接入当前会话</div>
          <div class="msg-row them agent-msg-row">
            <div class="msg-avatar agent">${agent.avatar}</div>
            <div class="bubble them">${(agent.welcome || '您好！').replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        ${agent.id === 'agent-sales' ? '' : `
        <div style="padding:6px 12px;background:#fff;border-top:1px solid #f0f2f5;display:flex;gap:6px;overflow-x:auto;">
          ${getQuickPrompts(agent.id).map(p => `<div class="quick-prompt" data-action="quick-prompt" data-text="${p}" style="padding:4px 10px;background:#f5f8fc;border-radius:12px;font-size:11px;color:var(--ink);white-space:nowrap;cursor:pointer;">${p}</div>`).join('')}
        </div>
        `}
        <div class="chat-input-bar" style="position:relative;bottom:0;">
          <div class="icon-btn">🎤</div>
          <input type="text" class="msg-input" id="agentInput-${agent.id}" placeholder="和${agent.name}聊聊..." data-agent="${agent.id}">
          <div class="icon-btn">😊</div>
          <div class="icon-btn">+</div>
          <div class="send-btn" data-action="send-agent" data-agent="${agent.id}">发送</div>
        </div>
      </div>
    `;
  },

  /* ============ 会议纪要 AI 输出 ============ */
  'agent-meeting': (mid) => {
    const s = MEETING_SUMMARY[mid] || MEETING_SUMMARY.m03;
    return `
      <div class="phone-view" data-view="agent-meeting" data-mid="${mid}">
        <div class="summary-banner">
          <div class="ai-tag">🤖 AI 生成</div>
          <h1>${s.title}</h1>
          <div class="meta">${s.meta}</div>
        </div>
        <div class="summary-toolbar">
          <div class="tb-btn">📋 复制</div>
          <div class="tb-btn">📤 分享</div>
          <div class="tb-btn">📥 导出</div>
          <div class="tb-btn">🔁 重新生成</div>
        </div>
        <div class="summary-section">
          <h3>📋 会议概要</h3>
          <div style="font-size:13px;line-height:1.7;color:var(--ink);">${s.overview}</div>
        </div>
        <div class="summary-section">
          <h3>💬 关键讨论点</h3>
          <ul>${s.keyPoints.map(k => `<li>${k}</li>`).join('')}</ul>
        </div>
        <div class="summary-section">
          <h3>✅ 决策事项</h3>
          <ul>${s.decisions.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
        <div class="summary-section">
          <h3>📌 行动项</h3>
          ${s.actions.map(a => `
            <div class="action-item">
              <div class="ai-task">${a.task}</div>
              <div class="ai-meta">
                <span class="ai-owner">@${a.owner}</span>
                <span>·</span>
                <span>截止 ${a.deadline}</span>
                <span>·</span>
                <span style="color:var(--accent-red);font-weight:700;">${a.priority}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="height: 80px;"></div>
      </div>
    `;
  }
};

/* === 视图辅助函数 === */
function renderChatItem(chat) {
  const c = getContact(chat.contactId);
  if (!c) return '';
  const isAgent = c.isAgent;
  const isGroup = c.isGroup;
  const tagHtml = isAgent
    ? `<span class="tag ${c.tagColor}">${c.tag}</span>`
    : isGroup
      ? `<span class="tag purple">群聊</span>`
      : '';
  const target = isAgent
    ? `agent-chat:${c.id}`
    : `chat-single:${c.id}`;
  return `
    <a class="list-item" data-action="open" data-target="${target}">
      <div class="avatar ${c.isVip ? 'vip' : ''}">${c.avatar}</div>
      <div class="item-body">
        <div class="item-top">
          <div class="item-name">${c.name} ${tagHtml}</div>
          <div class="item-time">${chat.time}</div>
        </div>
        <div class="item-msg">${chat.lastMsg}</div>
      </div>
      ${chat.unread ? `<div class="unread">${chat.unread}</div>` : ''}
    </a>
  `;
}

function renderContactItem(c) {
  return `
    <a class="list-item" data-action="open" data-target="chat-single:${c.id}">
      <div class="avatar ${c.isVip ? 'vip' : ''}">${c.avatar}</div>
      <div class="item-body">
        <div class="item-top">
          <div class="item-name">${c.name}</div>
        </div>
        <div class="item-msg">${c.dept || ''}</div>
      </div>
      ${c.type === '群聊' ? '' : '<div class="private-btn">私聊</div>'}
    </a>
  `;
}

function getAgentColor(id) {
  if (id === 'agent-customer') return 'linear-gradient(135deg, #4a90e2, #6ba8e8)';
  if (id === 'agent-sales')    return 'linear-gradient(135deg, #ff6b35, #ff8c42)';
  if (id === 'agent-meeting')  return 'linear-gradient(135deg, #10b981, #34d399)';
  return 'linear-gradient(135deg, #4a90e2, #6ba8e8)';
}

function getQuickPrompts(agentId) {
  if (agentId === 'agent-customer') return ['我要退款', '查物流', '开发票', '投诉', '价格咨询'];
  if (agentId === 'agent-sales')    return ['了解 VIC 套餐', '推荐一款', '价格多少', '有优惠吗'];
  return [];
}
