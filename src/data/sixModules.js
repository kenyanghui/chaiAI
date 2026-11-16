// 六大模块课表共享数据（2026-11 数字员工系列改版；与 /workshop/ 目录页同源，live=已上线）
// 首页「课程体系 · 全景课表」与 /workshops 页「全景课表」同源渲染，改这里两页同步。
// tag: '第一期'/'第二期' = 实际期数身份（1.1 即首期工作坊、2.1 即第二期工作坊）。
export const sixModules = [
  {
    no: '模块一', k: '自动化流水线', live: 2,
    sub: '重复的活交给流水线：素材进去、成品出来、数据回流——让它自己转圈。',
    lects: [
      { no: '1.1', t: '微信公众号内容流水线', href: 'classic/first/', live: true, tag: '第一期' },
      { no: '1.2', t: '短视频自动创作与发布', href: 'm1-4/', live: true },
      { no: '1.3', t: '运营数据回流', href: 'm1-2/', live: false },
    ],
  },
  {
    no: '模块二', k: '数字资产运营', live: 4,
    sub: '给资产安家、挂门牌、请管家：你的名字和作品，自己会接客。',
    lects: [
      { no: '2.1', t: '给自己的数字资产安个家', href: 'm2-1/', live: true, tag: '第二期' },
      { no: '2.2', t: '让AI系统比你更懂你', href: 'software/obsidian/', live: true },
      { no: '2.3', t: '让活动自己办起来', href: '03/', live: true },
      { no: '2.4', t: '给自己的资产挂上门牌', href: 'm2-3/', live: true },
      { no: '2.5', t: '把办公电脑搬进云里', href: 'm2-4/', live: false, nw: '全新' },
    ],
  },
  {
    no: '模块三', k: '数字员工公司', live: 1,
    sub: '像开公司一样用 AI：员工住进云里，活编成流程，引擎装上身——最后开一家全 AI 的公司。',
    lects: [
      { no: '3.1', t: '雇一个不下班的云上员工', href: 'm3-1/', live: true },
      { no: '3.2', t: '睡着了他还在干活', href: 'm3-2/', live: false },
      { no: '3.3', t: '把你的活编成工作流', href: 'm3-3/', live: false, nw: '全新' },
      { no: '3.4', t: '给数字员工装上发动机', href: 'm3-4/', live: false, nw: '全新' },
      { no: '3.5', t: '开一家全是 AI 的公司', href: 'm3-5/', live: false, nw: '全新' },
    ],
  },
  {
    no: '模块四', k: '掌握数字世界', live: 1,
    sub: '把产线装进口袋：定制在你自己的 AI 手机上，走到哪、指挥到哪。',
    lects: [
      { no: '4.1', t: '让 AI 帮我打电话', href: 'm4-1/', live: false },
      { no: '4.2', t: '口袋里的获客团队', href: 'm4-2/', live: false },
      { no: '4.3', t: '让 AI 搜索找到你', href: 'm4-3/', live: false },
      { no: '4.4', t: '一句话唤起一套动作', href: 'm4-4/', live: false },
      { no: '4.5', t: '定制我的 AI 工作台与手机', href: 'm4-5/', live: true },
    ],
  },
  {
    no: '模块五', k: '无所不能创造', live: 1,
    sub: '从用工具到造工具：玄龙底座上，软件和硬件都由你造。',
    lects: [
      { no: '5.1', t: '给自己配一个 AI 程序员', href: 'm5-1/', live: true },
      { no: '5.2', t: '让系统自己长本事', href: 'm5-2/', live: false },
      { no: '5.3', t: '一个人指挥一支军团', href: 'm5-3/', live: false },
      { no: '5.4', t: '让每场谈话自动成稿', href: 'm5-4/', live: false, nw: '新硬件' },
      { no: '5.5', t: '眼前所见，开口即答', href: 'm5-5/', live: false, nw: '新硬件' },
      { no: '5.6', t: '把 AI 戴在手上', href: 'm5-6/', live: false, nw: '新硬件' },
    ],
  },
  {
    no: '模块六', k: '自动投资系统', live: 3,
    sub: '让系统替你盯盘、做投研、跑策略、写复盘——四讲各管一段。',
    fine: '本模块全部课程：AI 输出仅供学习研究，不构成投资建议；实操演示只使用模拟盘与历史数据。',
    lects: [
      { no: '6.1', t: 'AI 盯盘', href: 'm6-1/', live: true },
      { no: '6.2', t: 'AI 投研', href: 'm6-2/', live: true },
      { no: '6.3', t: 'AI 量化', href: 'm6-3/', live: true },
      { no: '6.4', t: 'AI 复盘', href: 'm6-4/', live: false },
    ],
  },
]

export const totalLects = sixModules.reduce((n, m) => n + m.lects.length, 0)
export const liveLects = sixModules.reduce((n, m) => n + m.lects.filter(l => l.live).length, 0)
