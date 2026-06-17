/* 慈商联营 · 企业公开主页数据 + 渲染
 * 路径：company/company-public.html
 * 数据源：localStorage（profile.html 编辑保存）→ 缺则回退到 mock
 * 7 家 mock 企业：meixin / yili / anli / mengniu / wahaha / haier / midea
 */
(function () {
  'use strict';

  /* ===== 1. 7 家企业 mock 数据 ===== */
  const MOCK = {
    meixin: {
      slug: 'meixin', name: '美心食品集团', short: '美心', initial: '美',
      logo: '🍞',
      industry: '食品饮料 · 烘焙连锁',
      joined: '2024-04', joinedText: '入驻 2 年',
      hq: '重庆 · 江北区', employees: '12,800 人', coverage: '全国 28 省',
      level: '⭐⭐⭐⭐⭐ 五星企业',
      color: ['#E85D04', '#C4842A'], colorSoft: '#FFE4D2',
      slogan: '用食品传递温暖 · 让每一份美味都不被浪费',
      tags: [
        { ic: '🏆', t: '年度标杆企业' },
        { ic: '★', t: '五星企业' },
        { ic: '✓', t: '资质已认证' },
        { ic: '⏰', t: '入驻 2 年' },
        { ic: '🍞', t: '食品类目龙头' },
      ],
      stats: [
        { v: '1,860', l: '万 元', sub: '累计捐赠额' },
        { v: '52', l: '次', sub: '累计捐赠次数' },
        { v: '128,500', l: '人', sub: '受惠人次' },
        { v: '26', l: '个', sub: '参与项目' },
        { v: '99.2', l: '%', sub: '物资使用率' },
      ],
      desc: '美心食品集团是中国西南最大的烘焙连锁企业之一，旗下 1,800+ 门店覆盖全国 28 省、220 个城市。2024 年 4 月入驻慈商联营平台，承诺每售出 1 份公益产品提取 0.5 元注入联营池。截至 2026 年 6 月，集团已连续 24 个月参与平台月度联营捐赠，5 次响应重大自然灾害（云南鲁甸地震、甘肃积石山地震、贵州山火等）应急救援，捐赠面包、蛋糕、牛奶等短保质期物资超 1,200 吨。集团 CSR 战略将"食品零浪费"列为三大目标之一，承诺到 2028 年将临期食品 100% 转化为公益捐赠。',
      timeline: [
        { t: '2026-06', d: '联合中国社会工作联合会发布《临期食品公益捐赠行业标准 1.0》' },
        { t: '2026-04', d: '贵州山火救援：48 小时紧急调拨 80 吨面包 + 牛奶，价值 320 万元' },
        { t: '2026-01', d: '启动"暖心早餐"长线项目，向 12 省 230 所偏远学校持续供应早餐包' },
        { t: '2025-12', d: '获评"年度标杆企业 · 五星企业"（榜单 NO.1）' },
        { t: '2025-09', d: '甘肃积石山地震救援：72 小时内完成 200 万元物资采购 + 物流对接' },
        { t: '2025-04', d: '集团内部成立 CSR 部门，定向对接慈商联营平台' },
        { t: '2024-04', d: '正式入驻慈商联营平台，首笔捐赠 50 万元食品物资' },
      ],
      catData: [
        { name: '食品饮料', pct: 62, val: '1,153 万' },
        { name: '儿童营养', pct: 18, val: '335 万' },
        { name: '应急物资', pct: 12, val: '223 万' },
        { name: '其他', pct: 8, val: '149 万' },
      ],
      regions: [
        { name: '四川', meta: '12 次 / 380 万' },
        { name: '云南', meta: '10 次 / 320 万' },
        { name: '贵州', meta: '8 次 / 280 万' },
        { name: '甘肃', meta: '6 次 / 200 万' },
        { name: '重庆', meta: '5 次 / 180 万' },
        { name: '湖南', meta: '4 次 / 150 万' },
        { name: '广西', meta: '3 次 / 120 万' },
        { name: '其他省', meta: '4 次 / 230 万' },
      ],
      projects: [
        { date: '2026-06', name: '临期食品公益捐赠行业标准制定', tag: '行业', meta: '联合发起 · 12 家企业', amount: '120 万' },
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '物资 + 物流', amount: '320 万' },
        { date: '2026-01', name: '暖心早餐 · 长线项目', tag: '长线', meta: '230 所学校', amount: '180 万/年' },
        { date: '2025-12', name: '云南鲁甸 6.2 级地震救援', tag: '应急', meta: '响应 24h', amount: '280 万' },
        { date: '2025-09', name: '甘肃积石山 6.2 级地震', tag: '应急', meta: '响应 72h', amount: '200 万' },
        { date: '2025-06', name: '儿童节校园营养包', tag: '儿童', meta: '6 省 · 80 校', amount: '90 万' },
        { date: '2025-03', name: '学雷锋月志愿者联动', tag: '志愿', meta: '联合 4 城', amount: '30 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '王', name: '王主任', meta: '云南鲁甸县民政局', body: '美心食品的响应速度让我们非常感动。地震后 24 小时内送达的 80 吨面包和牛奶，让 32 个安置点 1.2 万人吃上了热乎饭。物资质量、包装都符合灾区需求的专业标准。', priv: '已通过平台脱敏审核' },
        { type: 'handwritten', avatar: '李', name: '李校长', meta: '甘肃积石山 · 大河家镇中心小学', body: '感谢美心连续两年给我们学校捐赠的早餐包。孩子们冬天能喝上热牛奶、吃上新鲜面包，这在他们之前的童年里是想象不到的事。希望这份温暖一直延续下去。', priv: '已获家属/本人授权' },
        { type: 'voice', avatar: '陈', name: '陈社工', meta: '贵州 · 益童乐园社工', body: '美心不仅捐物资，还会派 CSR 经理进山做志愿者，连续 3 年的"暖心厨房"项目让 1,800 多个孩子学会了做蛋糕，这种长期陪伴的力量比一次性捐赠更打动人心。', priv: '已通过平台脱敏审核' },
        { type: 'video', avatar: '张', name: '张奶奶', meta: '湖南 · 留守儿童奶奶', body: '孙子上学路上能领到一块蛋糕、一盒牛奶，每天回来都特别开心。', priv: '视频已脱敏处理' },
      ],
      medals: [
        { ic: '🥇', t: '年度标杆企业', d: '2025' },
        { ic: '⭐', t: '五星企业', d: '连续 8 季度' },
        { ic: '🚨', t: '应急先锋', d: '5 次响应' },
        { ic: '♻️', t: '零浪费奖', d: '2025' },
      ],
      honors: [
        { ic: '🏆', n: '中国食品工业协会 · 公益贡献奖' },
        { ic: '🌍', n: '联合国 SDG 合作伙伴' },
        { ic: '📜', n: '国家乡村振兴局 · 消费帮扶优秀案例' },
        { ic: '🤝', n: '中国社会工作联合会 · 理事单位' },
        { ic: '⭐', n: '中国 CSR 卓越奖' },
        { ic: '🌱', n: '中国食品 ESG 评级 AAA' },
      ],
    },

    yili: {
      slug: 'yili', name: '伊利集团', short: '伊利', initial: '伊',
      logo: '🥛',
      industry: '乳制品 · 食品工业',
      joined: '2024-07', joinedText: '入驻 2 年',
      hq: '内蒙古 · 呼和浩特', employees: '60,000+ 人', coverage: '全国 31 省',
      level: '⭐⭐⭐⭐⭐ 五星企业',
      color: ['#0277BD', '#00ACC1'], colorSoft: '#E0F4FB',
      slogan: '滋养生命活力 · 让每一滴牛奶都传递健康',
      tags: [
        { ic: '🏆', t: '行业龙头' },
        { ic: '★', t: '五星企业' },
        { ic: '🥛', t: '营养助学' },
        { ic: '⏰', t: '入驻 2 年' },
        { ic: '🌍', t: '联合国 SDG 伙伴' },
      ],
      stats: [
        { v: '1,420', l: '万 元', sub: '累计捐赠额' },
        { v: '38', l: '次', sub: '累计捐赠次数' },
        { v: '98,200', l: '人', sub: '受惠人次' },
        { v: '22', l: '个', sub: '参与项目' },
        { v: '98.5', l: '%', sub: '物资使用率' },
      ],
      desc: '伊利集团是中国乳制品行业龙头，连续多年位列全球乳业五强。集团将"健康中国"与"乡村振兴"列为双核心战略，2024 年 7 月入驻慈商联营后，主导发起了"伊利营养 2030"长线项目，承诺 10 年内向偏远地区儿童捐赠价值 5 亿元的学生奶。截至 2026 年 6 月，已累计向 22 个省、480 所学校、98,200 名学生持续提供学生奶 + 营养早餐包，覆盖新疆、西藏、青海、甘肃等高海拔地区。',
      timeline: [
        { t: '2026-05', d: '"伊利营养 2030"项目覆盖学校突破 500 所' },
        { t: '2026-01', d: '联合中国奶业协会发布《学生奶公益捐赠白皮书》' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.2）' },
        { t: '2025-10', d: '西藏日喀则地震救援：紧急调拨 30 万盒学生奶' },
        { t: '2025-06', d: '"儿童节"全国联动：50 万盒牛奶送达 6 省 80 县' },
        { t: '2024-07', d: '入驻慈商联营平台，启动"伊利营养 2030"项目' },
      ],
      catData: [
        { name: '儿童营养', pct: 58, val: '823 万' },
        { name: '应急物资', pct: 20, val: '284 万' },
        { name: '母婴健康', pct: 12, val: '170 万' },
        { name: '其他', pct: 10, val: '142 万' },
      ],
      regions: [
        { name: '西藏', meta: '8 次 / 320 万' },
        { name: '新疆', meta: '6 次 / 240 万' },
        { name: '青海', meta: '5 次 / 200 万' },
        { name: '甘肃', meta: '4 次 / 160 万' },
        { name: '云南', meta: '4 次 / 150 万' },
        { name: '四川', meta: '3 次 / 120 万' },
        { name: '贵州', meta: '3 次 / 110 万' },
        { name: '其他省', meta: '5 次 / 120 万' },
      ],
      projects: [
        { date: '2026-05', name: '伊利营养 2030 · 500 校里程碑', tag: '长线', meta: '学生奶 + 营养包', amount: '180 万' },
        { date: '2026-01', name: '《学生奶公益捐赠白皮书》', tag: '行业', meta: '联合发布', amount: '50 万' },
        { date: '2025-10', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '响应 36h', amount: '180 万' },
        { date: '2025-06', name: '儿童节全国联动', tag: '儿童', meta: '6 省 · 80 县', amount: '120 万' },
        { date: '2025-03', name: '两癌筛查 · 母亲健康', tag: '健康', meta: '云南 4 县', amount: '90 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '扎', name: '扎西校长', meta: '西藏 · 那曲县中心小学', body: '我们学校海拔 4,500 米，孩子们每天早上能喝到一盒伊利学生奶，是 5 年前想都不敢想的事。伊利的物流团队能送到这么偏的地方，真的了不起。', priv: '已通过平台脱敏审核' },
        { type: 'video', avatar: '古', name: '古丽妈妈', meta: '新疆 · 喀什', body: '女儿现在每天早上去学校都特别积极，就因为能领到一盒牛奶。', priv: '视频已脱敏处理' },
        { type: 'handwritten', avatar: '杨', name: '杨老师', meta: '青海 · 玉树州孤儿学校', body: '我们学校 230 个孩子都喝到了伊利的学生奶，包装上的小恐龙让孩子们爱不释手。', priv: '已获学校授权' },
      ],
      medals: [
        { ic: '🥈', t: '年度标杆企业', d: '2025 NO.2' },
        { ic: '⭐', t: '五星企业', d: '连续 6 季度' },
        { ic: '🥛', t: '营养助学', d: '22 省覆盖' },
        { ic: '🌍', t: '联合国伙伴', d: 'SDG 2' },
      ],
      honors: [
        { ic: '🏆', n: '中国乳制品工业协会 · 公益贡献奖' },
        { ic: '🌍', n: '联合国 SDG 2 零饥饿合作伙伴' },
        { ic: '📜', n: '国务院乡村振兴 · 优秀案例' },
        { ic: '🤝', n: '中国儿童少年基金会 · 战略合作' },
        { ic: '⭐', n: '中国 CSR 卓越奖' },
        { ic: '🌱', n: '中国食品 ESG 评级 AAA' },
      ],
    },

    anli: {
      slug: 'anli', name: '安利（中国）', short: '安利', initial: '安',
      logo: '🌿',
      industry: '日化营养 · 直销',
      joined: '2024-09', joinedText: '入驻 2 年',
      hq: '广东 · 广州', employees: '8,500 人', coverage: '全国 26 省',
      level: '⭐⭐⭐⭐⭐ 五星企业',
      color: ['#2E7D32', '#66BB6A'], colorSoft: '#E8F5E9',
      slogan: '健康生活 · 营养助学 · 让每个孩子都有未来',
      tags: [
        { ic: '🌿', t: '健康营养' },
        { ic: '★', t: '五星企业' },
        { ic: '📚', t: '营养助学' },
        { ic: '⏰', t: '入驻 2 年' },
      ],
      stats: [
        { v: '980', l: '万 元', sub: '累计捐赠额' },
        { v: '32', l: '次', sub: '累计捐赠次数' },
        { v: '76,500', l: '人', sub: '受惠人次' },
        { v: '18', l: '个', sub: '参与项目' },
        { v: '97.8', l: '%', sub: '物资使用率' },
      ],
      desc: '安利（中国）日用品有限公司是全球最大的直销企业安利集团在华子公司，主营营养品、家居清洁、个人护理三大品类。2024 年 9 月入驻慈商联营，主打"营养助学"细分赛道，与中国青少年发展基金会合作推出"春苗营养计划"，向偏远地区学校持续供应儿童营养品 + 学习用品。截至 2026 年 6 月，已累计为 18 个省、420 所学校提供支持。',
      timeline: [
        { t: '2026-05', d: '春苗营养计划 4.0 启动，新增 80 所合作学校' },
        { t: '2026-03', d: '云南青海地震救援：营养包 + 清洁用品' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.3）' },
        { t: '2025-09', d: '甘肃积石山地震：1,000 万元物资紧急调拨' },
        { t: '2025-04', d: '春苗营养计划 3.0 覆盖 200 校' },
        { t: '2024-09', d: '入驻慈商联营，启动春苗营养计划' },
      ],
      catData: [
        { name: '营养品', pct: 55, val: '539 万' },
        { name: '清洁用品', pct: 22, val: '216 万' },
        { name: '学习用品', pct: 15, val: '147 万' },
        { name: '其他', pct: 8, val: '78 万' },
      ],
      regions: [
        { name: '云南', meta: '5 次 / 180 万' },
        { name: '贵州', meta: '4 次 / 150 万' },
        { name: '四川', meta: '4 次 / 140 万' },
        { name: '甘肃', meta: '3 次 / 120 万' },
        { name: '广西', meta: '3 次 / 100 万' },
        { name: '湖南', meta: '2 次 / 80 万' },
        { name: '江西', meta: '2 次 / 70 万' },
        { name: '其他省', meta: '9 次 / 140 万' },
      ],
      projects: [
        { date: '2026-05', name: '春苗营养计划 4.0', tag: '长线', meta: '80 校新增', amount: '150 万' },
        { date: '2026-03', name: '云南青海地震救援', tag: '应急', meta: '营养包', amount: '120 万' },
        { date: '2025-09', name: '甘肃积石山地震', tag: '应急', meta: '响应 48h', amount: '180 万' },
        { date: '2025-06', name: '儿童节 · 安利清洁包', tag: '儿童', meta: '6 省 · 200 校', amount: '90 万' },
        { date: '2025-04', name: '春苗营养计划 3.0', tag: '长线', meta: '200 校', amount: '100 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '罗', name: '罗校长', meta: '贵州 · 黔东南', body: '安利春苗计划给孩子们带来的不只是营养品，更是"有人记得我们"的感觉。孩子们每学期最期待的就是春苗计划发营养包的那一天。', priv: '已通过平台脱敏审核' },
        { type: 'handwritten', avatar: '吴', name: '吴老师', meta: '云南 · 怒江', body: '感谢安利给怒江的孩子送来营养品和学习用品，山里的孩子第一次看到"全光谱营养包"上面的卡通图案，开心得不得了。', priv: '已获学校授权' },
      ],
      medals: [
        { ic: '🥉', t: '年度标杆企业', d: '2025 NO.3' },
        { ic: '⭐', t: '五星企业', d: '连续 5 季度' },
        { ic: '📚', t: '营养助学', d: '18 省' },
        { ic: '🌿', t: '健康营养', d: '细分龙头' },
      ],
      honors: [
        { ic: '🏆', n: '中国青少年发展基金会 · 杰出贡献' },
        { ic: '🌍', n: '联合国 SDG 3 合作伙伴' },
        { ic: '📜', n: '中华全国工商联 · 公益创新奖' },
        { ic: '🤝', n: '中国营养学会 · 战略合作' },
        { ic: '⭐', n: '中国直销行业 CSR 第一' },
        { ic: '🌱', n: '中国 ESG 评级 AA' },
      ],
    },

    mengniu: {
      slug: 'mengniu', name: '蒙牛乳业', short: '蒙牛', initial: '蒙',
      logo: '🥛',
      industry: '乳制品 · 食品工业',
      joined: '2025-01', joinedText: '入驻 1.5 年',
      hq: '内蒙古 · 呼和浩特', employees: '45,000+ 人', coverage: '全国 30 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#1565C0', '#42A5F5'], colorSoft: '#E3F2FD',
      slogan: '点滴营养 · 绽放每个生命',
      tags: [
        { ic: '🥛', t: '儿童营养' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1.5 年' },
      ],
      stats: [
        { v: '860', l: '万 元', sub: '累计捐赠额' },
        { v: '28', l: '次', sub: '累计捐赠次数' },
        { v: '68,200', l: '人', sub: '受惠人次' },
        { v: '15', l: '个', sub: '参与项目' },
        { v: '97.2', l: '%', sub: '物资使用率' },
      ],
      desc: '蒙牛乳业（集团）股份有限公司是中国乳业双巨头之一。2025 年 1 月入驻慈商联营后，与中国奶业协会联合发起"蒙牛营养普惠计划"，聚焦 3-12 岁儿童营养改善。截至 2026 年 6 月，已累计向 30 省、380 所学校、68,200 名学生提供学生奶 + 酸奶 + 营养包。',
      timeline: [
        { t: '2026-05', d: '蒙牛营养普惠计划覆盖突破 400 校' },
        { t: '2026-02', d: '贵州山火救援：紧急调拨牛奶 50 万盒' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.4）' },
        { t: '2025-08', d: '西藏日喀则地震救援' },
        { t: '2025-04', d: '蒙牛营养普惠计划 2.0' },
        { t: '2025-01', d: '入驻慈商联营平台' },
      ],
      catData: [
        { name: '儿童营养', pct: 65, val: '559 万' },
        { name: '应急物资', pct: 18, val: '155 万' },
        { name: '母婴健康', pct: 10, val: '86 万' },
        { name: '其他', pct: 7, val: '60 万' },
      ],
      regions: [
        { name: '内蒙古', meta: '5 次 / 180 万' },
        { name: '新疆', meta: '4 次 / 140 万' },
        { name: '西藏', meta: '3 次 / 120 万' },
        { name: '青海', meta: '3 次 / 100 万' },
        { name: '云南', meta: '3 次 / 100 万' },
        { name: '贵州', meta: '2 次 / 80 万' },
        { name: '其他省', meta: '8 次 / 140 万' },
      ],
      projects: [
        { date: '2026-05', name: '蒙牛营养普惠计划 3.0', tag: '长线', meta: '400 校', amount: '150 万' },
        { date: '2026-02', name: '贵州山火救援', tag: '应急', meta: '牛奶 50 万盒', amount: '90 万' },
        { date: '2025-12', name: '儿童节联动', tag: '儿童', meta: '8 省 · 100 校', amount: '120 万' },
        { date: '2025-08', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '响应 36h', amount: '100 万' },
        { date: '2025-04', name: '营养普惠计划 2.0', tag: '长线', meta: '200 校', amount: '80 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '巴', name: '巴特尔校长', meta: '内蒙古 · 锡林郭勒', body: '蒙牛的学生奶让草原上的孩子们在冬天也能喝上温暖的牛奶。学校的孩子大部分是牧民子弟，这份关爱让他们感受到了"被看见"。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🥛', t: '儿童营养', d: '细分赛道' },
        { ic: '🚨', t: '应急先锋', d: '3 次响应' },
        { ic: '🌍', t: '全国覆盖', d: '30 省' },
      ],
      honors: [
        { ic: '🏆', n: '中国奶业协会 · 优秀会员' },
        { ic: '📜', n: '中国学生饮用奶推广先进' },
        { ic: '🤝', n: '中国少年儿童基金会 · 合作' },
        { ic: '⭐', n: '中国乳业 CSR 创新奖' },
      ],
    },

    wahaha: {
      slug: 'wahaha', name: '娃哈哈集团', short: '娃哈哈', initial: '娃',
      logo: '🧃',
      industry: '饮料 · 食品工业',
      joined: '2025-01', joinedText: '入驻 1.5 年',
      hq: '浙江 · 杭州', employees: '30,000+ 人', coverage: '全国 29 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#D81B60', '#F06292'], colorSoft: '#FCE4EC',
      slogan: '健康你我他 · 欢乐千万家',
      tags: [
        { ic: '🧃', t: '灾区供水' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1.5 年' },
      ],
      stats: [
        { v: '720', l: '万 元', sub: '累计捐赠额' },
        { v: '24', l: '次', sub: '累计捐赠次数' },
        { v: '56,800', l: '人', sub: '受惠人次' },
        { v: '14', l: '个', sub: '参与项目' },
        { v: '96.8', l: '%', sub: '物资使用率' },
      ],
      desc: '娃哈哈集团是中国最大、全球领先的饮料生产企业之一。2025 年 1 月入驻慈商联营后，聚焦灾区应急供水、儿童饮水健康两大方向。截至 2026 年 6 月，已累计向 14 个受灾区域、56,800 人提供瓶装水、果汁、营养快线等应急物资。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：30 万瓶矿泉水紧急送达' },
        { t: '2026-01', d: '山区学校直饮水设备项目启动' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.5）' },
        { t: '2025-10', d: '西藏地震救援' },
        { t: '2025-06', d: '儿童节联动：150 万瓶饮料' },
        { t: '2025-01', d: '入驻慈商联营' },
      ],
      catData: [
        { name: '应急供水', pct: 52, val: '374 万' },
        { name: '儿童营养', pct: 28, val: '202 万' },
        { name: '校园直饮水', pct: 12, val: '86 万' },
        { name: '其他', pct: 8, val: '58 万' },
      ],
      regions: [
        { name: '贵州', meta: '4 次 / 120 万' },
        { name: '云南', meta: '3 次 / 100 万' },
        { name: '甘肃', meta: '3 次 / 90 万' },
        { name: '西藏', meta: '2 次 / 80 万' },
        { name: '四川', meta: '2 次 / 70 万' },
        { name: '其他省', meta: '10 次 / 260 万' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '30 万瓶矿泉水', amount: '90 万' },
        { date: '2026-01', name: '山区直饮水项目', tag: '长线', meta: '30 校', amount: '120 万/年' },
        { date: '2025-12', name: '冬日温暖包', tag: '暖冬', meta: '6 省', amount: '80 万' },
        { date: '2025-10', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '响应 48h', amount: '90 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '杨', name: '杨主任', meta: '云南 · 普洱市应急办', body: '地震后山区断水断电，娃哈哈 30 万瓶矿泉水 36 小时内送达 5 个安置点，覆盖 8,000 多人。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🚨', t: '应急先锋', d: '3 次响应' },
        { ic: '💧', t: '灾区供水', d: '细分龙头' },
        { ic: '🌍', t: '全国覆盖', d: '29 省' },
      ],
      honors: [
        { ic: '🏆', n: '中国饮料工业协会 · 公益贡献' },
        { ic: '📜', n: '中华慈善奖 · 提名' },
        { ic: '🤝', n: '中国红十字会 · 战略合作' },
        { ic: '⭐', n: '浙江 CSR 卓越企业' },
      ],
    },

    haier: {
      slug: 'haier', name: '海尔集团', short: '海尔', initial: '海',
      logo: '🔌',
      industry: '家电 · 智能制造',
      joined: '2025-07', joinedText: '入驻 1 年',
      hq: '山东 · 青岛', employees: '100,000+ 人', coverage: '全国 25 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#00838F', '#26C6DA'], colorSoft: '#E0F7FA',
      slogan: '以真诚到永远 · 让家电温暖每一个家',
      tags: [
        { ic: '🔌', t: '家电捐赠' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1 年' },
      ],
      stats: [
        { v: '580', l: '万 元', sub: '累计捐赠额' },
        { v: '18', l: '次', sub: '累计捐赠次数' },
        { v: '42,600', l: '人', sub: '受惠人次' },
        { v: '11', l: '个', sub: '参与项目' },
        { v: '95.5', l: '%', sub: '物资使用率' },
      ],
      desc: '海尔集团是全球大型家电第一品牌，连续 14 年蝉联全球白电销量第一。2025 年 7 月入驻慈商联营后，聚焦灾区家电援助、贫困学校电教设备援助、乡村电采暖改造三大方向。截至 2026 年 6 月，已累计向 11 个项目捐赠冰箱、洗衣机、空调、电视等家电 4,800+ 台。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：1,500 台家电紧急送达' },
        { t: '2026-02', d: '甘肃地震受灾家庭电采暖改造' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.6）' },
        { t: '2025-10', d: '西藏日喀则地震救援' },
        { t: '2025-07', d: '入驻慈商联营' },
      ],
      catData: [
        { name: '家电', pct: 60, val: '348 万' },
        { name: '电教设备', pct: 22, val: '128 万' },
        { name: '电采暖', pct: 12, val: '70 万' },
        { name: '其他', pct: 6, val: '34 万' },
      ],
      regions: [
        { name: '贵州', meta: '3 次 / 110 万' },
        { name: '甘肃', meta: '2 次 / 80 万' },
        { name: '西藏', meta: '2 次 / 70 万' },
        { name: '云南', meta: '2 次 / 70 万' },
        { name: '其他省', meta: '9 次 / 250 万' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '1,500 台家电', amount: '150 万' },
        { date: '2026-02', name: '甘肃电采暖改造', tag: '民生', meta: '200 户', amount: '120 万' },
        { date: '2025-12', name: '乡村学校电教室', tag: '教育', meta: '15 校', amount: '80 万' },
        { date: '2025-10', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '响应 72h', amount: '90 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '刘', name: '刘村长', meta: '甘肃 · 积石山', body: '海尔给我们村 200 户受灾家庭免费装了电采暖，孩子们冬天在家里写作业手不抖了。这种"用得上的捐赠"比什么都强。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🔌', t: '家电援助', d: '细分龙头' },
        { ic: '🚨', t: '应急先锋', d: '3 次响应' },
        { ic: '♻️', t: 'ESG 创新', d: '电采暖' },
      ],
      honors: [
        { ic: '🏆', n: '中国家电协会 · 公益贡献奖' },
        { ic: '📜', n: '联合国 SDG 7 合作伙伴' },
        { ic: '🤝', n: '中国残疾人联合会 · 合作' },
        { ic: '⭐', n: '山东 CSR 卓越企业' },
      ],
    },

    midea: {
      slug: 'midea', name: '美的集团', short: '美的', initial: '美',
      logo: '🌬️',
      industry: '家电 · 智能制造',
      joined: '2025-07', joinedText: '入驻 1 年',
      hq: '广东 · 佛山', employees: '150,000+ 人', coverage: '全国 26 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#5E35B1', '#9575CD'], colorSoft: '#EDE7F6',
      slogan: '科技尽善 · 生活尽美',
      tags: [
        { ic: '🌬️', t: '家电捐赠' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1 年' },
      ],
      stats: [
        { v: '480', l: '万 元', sub: '累计捐赠额' },
        { v: '15', l: '次', sub: '累计捐赠次数' },
        { v: '35,800', l: '人', sub: '受惠人次' },
        { v: '9', l: '个', sub: '参与项目' },
        { v: '94.8', l: '%', sub: '物资使用率' },
      ],
      desc: '美的集团是全球领先的消费电器、暖通空调、机器人与自动化系统、智能供应链（物流）的科技集团。2025 年 7 月入驻慈商联营后，聚焦灾区家电援助、校园空调改造、乡村清洁能源三大方向。截至 2026 年 6 月，已累计捐赠空调、冰箱、热水器等家电 3,800+ 台。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：1,200 台空调送达' },
        { t: '2026-01', d: '南疆学校空调改造 200 校' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.7）' },
        { t: '2025-09', d: '甘肃积石山地震救援' },
        { t: '2025-07', d: '入驻慈商联营' },
      ],
      catData: [
        { name: '空调', pct: 55, val: '264 万' },
        { name: '冰箱', pct: 22, val: '106 万' },
        { name: '热水器', pct: 15, val: '72 万' },
        { name: '其他', pct: 8, val: '38 万' },
      ],
      regions: [
        { name: '新疆', meta: '3 次 / 100 万' },
        { name: '贵州', meta: '2 次 / 80 万' },
        { name: '甘肃', meta: '2 次 / 70 万' },
        { name: '云南', meta: '2 次 / 70 万' },
        { name: '其他省', meta: '6 次 / 160 万' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '1,200 台空调', amount: '120 万' },
        { date: '2026-01', name: '南疆学校空调改造', tag: '教育', meta: '200 校', amount: '100 万/年' },
        { date: '2025-12', name: '儿童家电包', tag: '儿童', meta: '8 省', amount: '60 万' },
        { date: '2025-09', name: '甘肃积石山 6.2 级地震', tag: '应急', meta: '响应 72h', amount: '80 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '艾', name: '艾力校长', meta: '新疆 · 喀什', body: '美的给南疆 200 所学校装上了空调，孩子们夏天能专心上课了。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🌬️', t: '空调援助', d: '细分龙头' },
        { ic: '🚨', t: '应急先锋', d: '2 次响应' },
        { ic: '⚡', t: '清洁能源', d: '校园空调' },
      ],
      honors: [
        { ic: '🏆', n: '中国家电协会 · 创新 CSR' },
        { ic: '📜', n: '广东制造业 CSR 第一' },
        { ic: '🤝', n: '中国教育发展基金会 · 合作' },
        { ic: '⭐', n: '联合国 SDG 7 提名' },
      ],
    },

    byd: {
      slug: 'byd', name: '比亚迪', short: '比亚迪', initial: '比',
      logo: '🚗',
      industry: '新能源汽车 · 制造业',
      joined: '2025-08', joinedText: '入驻 1 年',
      hq: '广东 · 深圳', employees: '90,000+ 人', coverage: '全国 25 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#D32F2F', '#F44336'], colorSoft: '#FFEBEE',
      slogan: '用电动化点亮绿色公益',
      tags: [
        { ic: '🌱', t: '绿色公益' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1 年' },
      ],
      stats: [
        { v: '480', l: '万 元', sub: '累计捐赠额' },
        { v: '14', l: '次', sub: '累计捐赠次数' },
        { v: '32,800', l: '人', sub: '受惠人次' },
        { v: '8', l: '个', sub: '参与项目' },
        { v: '96.5', l: '%', sub: '物资使用率' },
      ],
      desc: '比亚迪股份有限公司是全球领先的新能源汽车和动力电池制造商。2025 年 8 月入驻慈商联营后，聚焦"绿色公益"——以新能源车 + 充电桩 + 光伏发电为载体，赋能乡村教育与应急救援。截至 2026 年 6 月，已向 8 个项目捐赠新能源通勤车、应急电源车、光伏储能设备等。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：捐赠 30 台应急电源车' },
        { t: '2026-02', d: '云南山区学校光伏发电项目启动' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.8）' },
        { t: '2025-10', d: '西藏日喀则地震救援：应急电源设备' },
        { t: '2025-08', d: '入驻慈商联营，启动"绿色公益"战略' },
      ],
      catData: [
        { name: '新能源车', pct: 50, val: '240 万' },
        { name: '应急电源', pct: 25, val: '120 万' },
        { name: '光伏设备', pct: 15, val: '72 万' },
        { name: '其他', pct: 10, val: '48 万' },
      ],
      regions: [
        { name: '贵州', meta: '3 次 / 110 万' },
        { name: '云南', meta: '2 次 / 90 万' },
        { name: '西藏', meta: '2 次 / 80 万' },
        { name: '甘肃', meta: '2 次 / 70 万' },
        { name: '其他省', meta: '5 次 / 130 万' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '30 台电源车', amount: '150 万' },
        { date: '2026-02', name: '云南山区光伏项目', tag: '绿色', meta: '20 校', amount: '120 万' },
        { date: '2025-12', name: '儿童节 · 新能源科普', tag: '教育', meta: '6 省', amount: '40 万' },
        { date: '2025-10', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '电源设备', amount: '90 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '杨', name: '杨老师', meta: '云南 · 怒江山村小学', body: '比亚迪给我们学校装了光伏发电 + 储能设备，冬天孩子们能在有电的教室里做功课、吃热饭了。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🌱', t: '绿色公益', d: '细分龙头' },
        { ic: '🚨', t: '应急先锋', d: '2 次响应' },
        { ic: '⚡', t: '能源创新', d: '电源车' },
      ],
      honors: [
        { ic: '🏆', n: '中国汽车工业协会 · 绿色创新' },
        { ic: '🌍', n: '联合国 SDG 7 + 13 伙伴' },
        { ic: '📜', n: '深圳制造业 CSR 标杆' },
        { ic: '⭐', n: '中国 ESG 评级 AAA' },
      ],
    },

    shunfeng: {
      slug: 'shunfeng', name: '顺丰公益物流', short: '顺丰', initial: '顺',
      logo: '🚚',
      industry: '物流 · 供应链',
      joined: '2024-04', joinedText: '入驻 2 年',
      hq: '广东 · 深圳', employees: '180,000+ 人', coverage: '全国 31 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#212121', '#616161'], colorSoft: '#EEEEEE',
      slogan: '让每一份爱心都准时抵达',
      tags: [
        { ic: '🚚', t: '公益物流' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 2 年' },
      ],
      stats: [
        { v: '420', l: '万 元', sub: '累计物资承运额' },
        { v: '186', l: '次', sub: '应急运输任务' },
        { v: '28,600', l: '人', sub: '受惠人次' },
        { v: '32', l: '个', sub: '参与项目' },
        { v: '99.8', l: '%', sub: '准时送达率' },
      ],
      desc: '顺丰控股是亚洲最大、全球第四大综合物流服务商。2024 年 4 月入驻慈商联营后，独家承运"应急物资 24 小时通道"——为所有平台的应急救援物资提供免费物流支持。截至 2026 年 6 月，已为 32 个公益项目、186 次应急运输任务提供承运服务，覆盖全国 31 个省、400+ 城市，准时送达率 99.8%。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：186 吨物资 18 小时送达' },
        { t: '2026-02', d: '"顺丰公益班列"西藏线路开通' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.9）' },
        { t: '2025-10', d: '西藏日喀则 6.8 级地震：72 小时紧急承运' },
        { t: '2024-09', d: '甘肃积石山地震：免费承运 80 万元物资' },
        { t: '2024-04', d: '入驻慈商联营，启动"应急物资 24 小时通道"' },
      ],
      catData: [
        { name: '应急承运', pct: 60, val: '252 万' },
        { name: '公益仓储', pct: 18, val: '76 万' },
        { name: '冷链物流', pct: 12, val: '50 万' },
        { name: '其他', pct: 10, val: '42 万' },
      ],
      regions: [
        { name: '全国', meta: '186 次 / 400+ 城' },
        { name: '西藏', meta: '12 次 / 高原通道' },
        { name: '新疆', meta: '8 次 / 边疆通道' },
        { name: '云南', meta: '10 次 / 山区通道' },
        { name: '其他省', meta: '156 次 / 干线' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援承运', tag: '应急', meta: '186 吨 / 18h', amount: '120 万' },
        { date: '2026-02', name: '顺丰公益班列 · 西藏', tag: '长线', meta: '每周 1 班', amount: '80 万/年' },
        { date: '2025-12', name: '儿童温暖包承运', tag: '暖冬', meta: '8 省 / 12 万包', amount: '50 万' },
        { date: '2025-10', name: '西藏日喀则 6.8 级地震', tag: '应急', meta: '72h 通道', amount: '90 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '丁', name: '丁社长', meta: '西藏 · 公益合作社', body: '顺丰把我们的物资从成都直接送到那曲，3 天变成 18 小时，山里的孩子当周就收到了新校服。', priv: '已通过平台脱敏审核' },
        { type: 'video', avatar: '阿', name: '阿妈', meta: '云南 · 怒江山村', body: '志愿者送的奶粉 24 小时就到我家门口了。', priv: '视频已脱敏处理' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🚚', t: '公益物流', d: '细分龙头' },
        { ic: '🚨', t: '应急先锋', d: '186 次响应' },
        { ic: '⏰', t: '准时送达', d: '99.8%' },
      ],
      honors: [
        { ic: '🏆', n: '中国物流与采购联合会 · 公益贡献' },
        { ic: '🌍', n: '联合国 SDG 9 基础设施' },
        { ic: '📜', n: '国家邮政局 · 应急物流示范' },
        { ic: '🤝', n: '中国红十字会 · 战略合作' },
        { ic: '⭐', n: '中国物流业 CSR 第一' },
        { ic: '🌱', n: '中国 ESG 评级 AA' },
      ],
    },

    libai: {
      slug: 'libai', name: '立白集团', short: '立白', initial: '立',
      logo: '🧴',
      industry: '日化 · 洗涤用品',
      joined: '2025-08', joinedText: '入驻 1 年',
      hq: '广东 · 广州', employees: '12,000+ 人', coverage: '全国 24 省',
      level: '⭐⭐⭐⭐ 四星企业',
      color: ['#43A047', '#66BB6A'], colorSoft: '#E8F5E9',
      slogan: '洁净生活 · 守护健康',
      tags: [
        { ic: '🧴', t: '卫生防护' },
        { ic: '⭐', t: '四星企业' },
        { ic: '⏰', t: '入驻 1 年' },
      ],
      stats: [
        { v: '360', l: '万 元', sub: '累计捐赠额' },
        { v: '12', l: '次', sub: '累计捐赠次数' },
        { v: '24,200', l: '人', sub: '受惠人次' },
        { v: '6', l: '个', sub: '参与项目' },
        { v: '95.5', l: '%', sub: '物资使用率' },
      ],
      desc: '立白集团是中国日化行业领军企业，旗下立白、超威、贝贝健、好爸爸等品牌覆盖洗涤、消毒、个护三大品类。2025 年 8 月入驻慈商联营后，聚焦"卫生防护"——以洗涤用品、消毒液、个人清洁用品为核心，主打灾区卫生保障与校园卫生健康两大方向。截至 2026 年 6 月，已累计为 24 省、240 所学校、6 个灾区提供卫生防护包。',
      timeline: [
        { t: '2026-04', d: '贵州山火救援：5,000 套卫生防护包紧急送达' },
        { t: '2026-03', d: '"校园洗手计划"启动：240 所学校' },
        { t: '2025-12', d: '获评"标杆企业"（榜单 NO.10）' },
        { t: '2025-09', d: '甘肃积石山地震救援' },
        { t: '2025-08', d: '入驻慈商联营' },
      ],
      catData: [
        { name: '消毒液', pct: 38, val: '137 万' },
        { name: '洗涤用品', pct: 32, val: '115 万' },
        { name: '个人清洁', pct: 18, val: '65 万' },
        { name: '其他', pct: 12, val: '43 万' },
      ],
      regions: [
        { name: '贵州', meta: '2 次 / 80 万' },
        { name: '云南', meta: '2 次 / 70 万' },
        { name: '甘肃', meta: '2 次 / 60 万' },
        { name: '湖南', meta: '1 次 / 50 万' },
        { name: '其他省', meta: '5 次 / 100 万' },
      ],
      projects: [
        { date: '2026-04', name: '贵州山火救援', tag: '应急', meta: '5,000 套防护包', amount: '100 万' },
        { date: '2026-03', name: '校园洗手计划', tag: '健康', meta: '240 校', amount: '80 万/年' },
        { date: '2025-12', name: '冬季卫生包', tag: '暖冬', meta: '6 省', amount: '60 万' },
        { date: '2025-09', name: '甘肃积石山 6.2 级地震', tag: '应急', meta: '响应 48h', amount: '70 万' },
      ],
      thanks: [
        { type: 'voice', avatar: '赵', name: '赵校长', meta: '湖南 · 怀化山区小学', body: '立白给学校装了洗手池、捐赠了洗手液，孩子们养成了饭前洗手的习惯，肠胃病减少了 60%。', priv: '已通过平台脱敏审核' },
      ],
      medals: [
        { ic: '⭐', t: '四星企业', d: '连续 4 季度' },
        { ic: '🧴', t: '卫生防护', d: '细分龙头' },
        { ic: '🚨', t: '应急先锋', d: '2 次响应' },
        { ic: '🏫', t: '校园卫生', d: '240 校' },
      ],
      honors: [
        { ic: '🏆', n: '中国洗涤用品工业协会 · 公益贡献' },
        { ic: '🌍', n: '联合国 SDG 6 清洁水伙伴' },
        { ic: '📜', n: '中华全国工商联 · 抗疫先进' },
        { ic: '⭐', n: '广东日化 CSR 标杆' },
      ],
    },
  };

  /* ===== 2. 工具函数 ===== */
  function $(id) { return document.getElementById(id); }
  function param(name) {
    const m = location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setText(id, t) { const el = $(id); if (el) el.textContent = t; }
  function setStyle(id, prop, val) { const el = $(id); if (el) el.style.setProperty(prop, val); }

  /* ===== 3. 渲染 hero ===== */
  function renderHero(d) {
    document.title = `${d.name} · 慈商联营`;
    setText('cpLogo', d.initial);
    setText('cpName', d.name);
    setText('cpSlogan', d.slogan);
    setText('crumb-name', d.name);
    setText('cpAboutName', d.name);
    setText('cpContactName', d.name);
    setText('cpCertName', d.short);

    // 颜色变量
    const root = document.documentElement;
    root.style.setProperty('--c1', d.color[0]);
    root.style.setProperty('--c2', d.color[1]);
    root.style.setProperty('--c1-soft', d.colorSoft);

    // tags
    const tags = $('cpTags');
    if (tags) {
      tags.innerHTML = d.tags.map(t => `
        <span class="pill">${t.ic} ${t.t}</span>
      `).join('');
    }

    // 5 项统计
    const stats = $('cpStats');
    if (stats) {
      stats.innerHTML = d.stats.map(s => `
        <div class="stat-mini">
          <div class="v">${s.v}</div>
          <div class="l">${s.sub}</div>
        </div>
      `).join('');
    }
  }

  /* ===== 4. 渲染 about ===== */
  function renderAbout(d) {
    setText('cpDesc', d.desc);
    setText('cpIndustry', d.industry);
    setText('cpJoined', d.joinedText);
    setText('cpHQ', d.hq);
    setText('cpEmployees', d.employees);
    setText('cpCoverage', d.coverage);
    setText('cpLevel', d.level);
  }

  /* ===== 5. 渲染公益历程 ===== */
  function renderTimeline(d) {
    const years = d.timeline.length > 0
      ? d.timeline[d.timeline.length - 1].t.substring(0, 4) + ' - ' + d.timeline[0].t.substring(0, 4) + ' · 共 ' + d.timeline.length + ' 个里程碑'
      : '—';
    setText('cpTimelineYears', years);
    const tl = $('cpTimeline');
    if (tl) {
      tl.innerHTML = d.timeline.map(ev => `
        <div class="ev">
          <div class="t">${ev.t}</div>
          <div class="d">${ev.d}</div>
        </div>
      `).join('');
    }
  }

  /* ===== 6. 渲染捐赠数据 ===== */
  function renderDonateData(d) {
    const bar = $('cpCatBar');
    if (bar) {
      bar.innerHTML = d.catData.map(c => `
        <div class="cat-col">
          <div class="val">${c.val}</div>
          <div class="bar" style="height:${c.pct * 1.5}px;"></div>
          <div class="lbl">${c.name}</div>
        </div>
      `).join('');
    }
    const regions = $('cpRegion');
    if (regions) {
      regions.innerHTML = d.regions.map(r => `
        <div class="region-item">
          <div class="name">${r.name}</div>
          <div class="meta">${r.meta}</div>
        </div>
      `).join('');
    }
  }

  /* ===== 7. 渲染参与项目 ===== */
  function renderProjects(d) {
    setText('cpProjectCount', `共 ${d.projects.length} 个`);
    const list = $('cpProjects');
    if (list) {
      list.innerHTML = d.projects.map(p => `
        <a class="project-row" href="javascript:void(0)">
          <div class="date">${p.date}</div>
          <div class="name">${p.name}<span class="badge">${p.tag}</span></div>
          <div class="meta">${p.meta}</div>
          <div class="amount">${p.amount}</div>
        </a>
      `).join('');
    }
  }

  /* ===== 8. 渲染感谢信 ===== */
  function renderThanks(d) {
    setText('cpThanksCount', `精选 ${d.thanks.length} 条`);
    const tg = $('cpThanks');
    if (tg) {
      tg.innerHTML = d.thanks.map(t => {
        const typeClass = t.type === 'handwritten' ? 'handwritten' : 'voice';
        const bodyClass = t.type === 'handwritten' ? 'body handwriting' : 'body';
        return `
          <div class="thanks-card ${typeClass}">
            <div class="author">
              <div class="avatar">${t.avatar}</div>
              <div>
                <div class="name">${t.name}</div>
                <div class="meta">${t.meta}</div>
              </div>
            </div>
            <div class="${bodyClass}">${t.body}</div>
            <div class="privacy">🛡️ ${t.priv}</div>
          </div>
        `;
      }).join('');
    }
  }

  /* ===== 9. 渲染荣誉 ===== */
  function renderHonor(d) {
    const medals = $('cpMedals');
    if (medals) {
      medals.innerHTML = d.medals.map(m => `
        <div class="medal-card" style="background: linear-gradient(135deg, ${d.color[0]} 0%, ${d.color[1]} 100%);">
          <div class="ic">${m.ic}</div>
          <div class="t">${m.t}</div>
          <div class="d">${m.d}</div>
        </div>
      `).join('');
    }
    const honors = $('cpHonors');
    if (honors) {
      honors.innerHTML = d.honors.map(h => `
        <div class="honor-item">
          <div class="ic">${h.ic}</div>
          <div class="name">${h.n}</div>
        </div>
      `).join('');
    }
  }

  /* ===== 10. 加载：localStorage → mock 兜底 ===== */
  function load(slug) {
    let data = MOCK[slug] || MOCK.meixin;  // fallback to meixin
    try {
      const stored = localStorage.getItem('company_profile_' + slug);
      if (stored) {
        const parsed = JSON.parse(stored);
        // 只覆盖 profile 字段（不覆盖捐赠数据 mock）
        data = Object.assign({}, data, parsed);
      }
    } catch (e) { /* localStorage 不可用时静默 */ }
    return data;
  }

  /* ===== 11. 平滑滚动 + 标签 active ===== */
  function bindTabs() {
    const tabs = document.querySelectorAll('.cp-tabs a');
    const sections = Array.from(tabs).map(a => document.querySelector(a.getAttribute('href')));
    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(tab.getAttribute('href'));
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
    // 滚动联动
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY + 200;
          let active = 0;
          sections.forEach((s, i) => {
            if (s && s.offsetTop <= y) active = i;
          });
          tabs.forEach((t, i) => t.classList.toggle('active', i === active));
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ===== 12. 主入口 ===== */
  function init() {
    const slug = param('slug') || 'meixin';
    const data = load(slug);

    // 未知 slug 时提示
    if (!MOCK[slug]) {
      console.warn('未找到企业 slug: ' + slug + '，回退到 meixin');
    }

    renderHero(data);
    renderAbout(data);
    renderTimeline(data);
    renderDonateData(data);
    renderProjects(data);
    renderThanks(data);
    renderHonor(data);
    bindTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
