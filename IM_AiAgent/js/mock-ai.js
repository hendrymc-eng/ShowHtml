// mock-ai.js — 3 Agent 假回复逻辑
// v4 范围：不接真 AI API，全部用关键词匹配 + 模板轮换

// ============== 客服 Agent ==============
const customerKeywords = {
  '退款|退钱|退货|不要了': [
    '好的，关于您的退款申请，我已记录。\n\n请问您的订单号是多少？',
    '退款一般 3-5 个工作日到账，请提供订单号，我帮您加急处理。',
    '已为您查询，订单 #VIC2026060xxxx 状态正常。\n\n是否需要我现在就为您发起退款？'
  ],
  '物流|快递|发货|到哪了|多久到': [
    '您的订单已发货，单号：SF1234567890。\n\n预计明天 18:00 前送达。',
    '物流详情：已到达【广州天河分拣中心】，距离您 12 公里。',
    '加急配送请回复「加急」，1 小时内会有骑手联系您。'
  ],
  '发票|收据|报销': [
    '电子发票将在订单完成后 24 小时内开具，发送至您预留的邮箱。',
    '如需专票，请提供：1）公司抬头 2）税号 3）邮箱。'
  ],
  '价格|多少钱|贵|便宜|优惠': [
    '当前 VIC 专业套餐 8 折优惠，¥4980 即可拿下。\n\n我帮您申请了一张 ¥500 内部券，要看看吗？',
    '新人首单立减 ¥200，可以叠加 8 折优惠。'
  ],
  '投诉|不满|差评|差': [
    '非常抱歉给您带来不愉快体验！\n\n我已为您升级为 VIP 优先通道，专人 5 分钟内回电处理。',
    '我们已记录您的反馈，经理会主动联系您。'
  ],
  '你好|您好|hi|hello': [
    '您好！我是智能客服小客 👋\n\n我可以帮您处理：订单查询 / 退款申请 / 物流跟踪 / 发票开具 / 投诉建议。\n\n请直接描述您的问题。',
    '在的，请问您遇到什么问题？'
  ]
};

const customerDefault = [
  '已为您记录，请稍候，转接专员为您处理。',
  '请补充更多信息：订单号 / 联系方式 / 问题截图，以便我们快速定位。',
  '如需人工服务，请点击右下角「转人工」。'
];

function getCustomerReply(userInput) {
  const input = userInput.toLowerCase();
  for (const pattern in customerKeywords) {
    const regex = new RegExp(pattern);
    if (regex.test(input)) {
      const replies = customerKeywords[pattern];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  const defaults = customerDefault;
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ============== 销冠 Agent ==============
const salesStages = [
  // 开场（已 welcome）
  {
    keywords: ['你好|您好|hi|hello|在吗'],
    replies: [
      '在的！很高兴为您服务 😊\n\n请问您是第一次了解 VIC 套餐，还是已经在对比其他品牌？',
      '您好！👋 我看您最近浏览了 VIC 专业套餐，是想了解哪个方面？价格 / 功能 / 案例？'
    ]
  },
  // 挖需
  {
    keywords: ['多少钱|价格|贵|便宜|价位'],
    replies: [
      '好的，先说价格：\n\n• 入门 ¥1980（限 100 次 AI 咨询）\n• 专业 ¥4980 ⭐ 最多人选\n• 旗舰 ¥9980（无限 + 专属顾问）\n\n您是个人用还是团队用？我帮您挑最合适的。',
      '价格从 99 元体验装到 9980 旗舰都有。您主要是想解决什么问题？我给您精准推荐。'
    ]
  },
  {
    keywords: ['功能|能做什么|有什么用|区别'],
    replies: [
      '简单说 3 个核心：\n\n1️⃣ AI 智能问答（7×24 秒回）\n2️⃣ 专家 1v1 咨询（持证顾问）\n3️⃣ 知识库（行业报告+案例）\n\n最大客户用 VIC 套餐 1 年省了 60% 咨询费。要看具体案例吗？'
    ]
  },
  {
    keywords: ['案例|客户|谁在用|效果'],
    replies: [
      '举 3 个真实案例：\n\n• 某 MCN 机构：AI 替代 70% 客服，月省 ¥3.2 万\n• 某教育公司：销冠 Agent 提升转化率 18%\n• 某律所：会议纪要从 2 小时缩到 5 分钟\n\n您行业是？我给您发对口案例。'
    ]
  },
  {
    keywords: ['试用|体验|试试|免费'],
    replies: [
      '可以！新人首单 ¥99 体验装（3 天），不满意全额退，没有任何风险。\n\n我现在帮您下单？',
      '体验装我帮您开一个，到期自动提醒升级，不需要现在做决定。\n\n留个手机号，我 1 分钟开通。'
    ]
  },
  {
    keywords: ['好|可以|行|下单|买'],
    replies: [
      '好嘞！我帮您整理了订单：\n\n【VIC 专业套餐】¥4980\n内部券 -¥500\n新人券 -¥200\n────────────────\n实付 ¥4280\n\n🎁 额外赠送 1 次专家 1v1\n\n我帮您锁定优惠？',
      '已为您生成订单 🎉\n\n支付链接：[点击立即支付]\n\n付款后立即生效，AI Agent 同步开通。\n\n如有疑问随时找我！'
    ]
  },
  {
    keywords: ['不|不要|再看看|考虑|再想想'],
    replies: [
      '完全理解，做决定不容易 👍\n\n我留一份「VIC 套餐对比表」给您，明天再聊不迟。\n\n留个微信，我把资料发您？',
      '好的，不急。\n\n我加您微信吧，3 天内有效优惠 + 内部资料我发您。\n\n或者您有问题随时找我。'
    ]
  }
];

const salesDefault = [
  '明白，您接着说 👀',
  '好的，我记下了。',
  '理解，方便说更具体一点吗？'
];

function getSalesReply(userInput, chatHistory) {
  const input = userInput.toLowerCase();
  // 智能推荐：检测到价格/案例等关键问题
  for (const stage of salesStages) {
    const regex = new RegExp(stage.keywords);
    if (regex.test(input)) {
      return stage.replies[Math.floor(Math.random() * stage.replies.length)];
    }
  }
  return salesDefault[Math.floor(Math.random() * salesDefault.length)];
}

// ============== 会议 Agent ==============
const meetingKeywords = {
  '开始|录制|录音': '已开启会议录制 🎙️\n\nAI 正在实时转写 + 提取行动项。\n\n[████████░░] 00:15 / 60:00',
  '结束|停止|完成': '会议结束 ✓\n\nAI 已生成：\n• 3 个关键讨论点\n• 2 项决议\n• 3 个待办（含负责人 & 截止日期）\n\n[查看完整纪要]',
  '文档|上传|文件': '请拖入 PDF / Word / PPT，AI 自动生成摘要。\n\n或点击 [选择文件] 上传。',
  '总结|摘要|要点': '正在生成摘要（基于本次会议 60 分钟录音 + 5 份上传文档）...\n\n预计 30 秒。'
};

function getMeetingReply(userInput) {
  const input = userInput.toLowerCase();
  for (const pattern in meetingKeywords) {
    const regex = new RegExp(pattern);
    if (regex.test(input)) {
      return meetingKeywords[pattern];
    }
  }
  return '请说「开始录制」「结束」「上传文档」等指令。';
}

// ============== 主路由（spa.js 调用入口）==============
function mockAIReply(agentId, userInput) {
  // agentId 映射 → agentType
  const map = {
    'agent-customer': 'customer',
    'agent-sales':    'sales',
    'agent-meeting':  'meeting'
  };
  const agentType = map[agentId];
  if (!agentType) return { text: '未知 Agent' };

  // 直接调各自 reply 函数
  let text;
  if (agentType === 'customer') text = getCustomerReply(userInput);
  else if (agentType === 'sales') text = getSalesReply(userInput);
  else if (agentType === 'meeting') text = getMeetingReply(userInput);
  else text = '未知 Agent';

  // 销冠：触发产品卡片
  let product = null;
  if (agentType === 'sales') {
    if (/价格|多少钱|套餐|推荐|买|下单/.test(userInput)) {
      product = PRODUCTS[1]; // VIC 专业套餐
    } else if (/试用|体验|试试|免费/.test(userInput)) {
      product = PRODUCTS[3]; // 体验装
    } else if (/旗舰|高端|不限|无限/.test(userInput)) {
      product = PRODUCTS[2]; // 旗舰
    } else if (/便宜|入门|低价|基础/.test(userInput)) {
      product = PRODUCTS[0]; // 入门
    }
  }

  return { text, product };
}

// ============== 工具函数 ==============
function getContact(id) {
  return CONTACTS.find(c => c.id === id);
}

function getChatsByContact(contactId) {
  return CHATS.filter(c => c.contactId === contactId);
}

function getTimeNow() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' +
         d.getMinutes().toString().padStart(2, '0');
}
