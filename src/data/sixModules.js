// 六大模块课表共享数据（2026-11 改版；与 /workshop/ 目录页同源，live=已上线）
// 首页「课程体系 · 全景课表」与 /workshops 页「全景课表」同源渲染，改这里两页同步。
// tag: '第一期'/'第二期' = 实际期数身份（1.1 即首期工作坊、2.1 即第二期工作坊）。
export const sixModules = [
  {
    no: '模块一', k: 'AI 创作', live: 3,
    sub: '自动化内容流水线：从素材到发布，从阅读数据再流回选题——让内容自己转圈。',
    lects: [
      { no: '1.1', t: '微信公众号内容流水线', href: 'classic/first/', live: true, tag: '第一期' },
      { no: '1.2', t: '运营数据回流', href: 'm1-2/', live: false },
      { no: '1.3', t: '让AI系统比你更懂你', href: 'software/obsidian/', live: true },
      { no: '1.4', t: '短视频自动创作与发布', href: 'm1-4/', live: true },
    ],
  },
  {
    no: '模块二', k: 'AI 建站', live: 2,
    sub: '数字资产自动运营：给自己的名字和作品安个家，再让家自己会接客。',
    lects: [
      { no: '2.1', t: '给自己的数字资产安个家', href: 'm2-1/', live: true, tag: '第二期' },
      { no: '2.2', t: 'AI 驱动的活动运营', href: '03/', live: true },
      { no: '2.3', t: '腾讯云配置与域名上线', href: 'm2-3/', live: false },
    ],
  },
  {
    no: '模块三', k: 'AI 装备', live: 0,
    sub: '云服务器，7×24 数字员工军火库：让自动化不依赖你开不开机。',
    lects: [
      { no: '3.1', t: '云服务器构建数字助理', href: 'm3-1/', live: false },
      { no: '3.2', t: '7×24 值守自动化', href: 'm3-2/', live: false },
    ],
  },
  {
    no: '模块四', k: 'AI 手机', live: 1,
    sub: '掌握你的数字员工：AI 工作台 APP，把产线装进口袋。',
    lects: [
      { no: '4.1', t: '让 AI 帮我打电话', href: 'm4-1/', live: false },
      { no: '4.2', t: '用手机做新媒体获客', href: 'm4-2/', live: false },
      { no: '4.3', t: '用手机做 AI 搜索 SEO', href: 'm4-3/', live: false },
      { no: '4.4', t: '定制自己的技能工作流', href: 'm4-4/', live: false },
      { no: '4.5', t: '定制我的 AI 工作台与手机', href: 'm4-5/', live: true },
    ],
  },
  {
    no: '模块五', k: 'AI 编程', live: 1,
    sub: '创造自己的 AI 世界：玄龙 Loong 体系，从用工具到造工具。',
    lects: [
      { no: '5.1', t: '构建高效 AI 编程系统', href: 'm5-1/', live: true },
      { no: '5.2', t: '自进化的 AI 编程体系', href: 'm5-2/', live: false },
      { no: '5.3', t: '上矩阵：多智能体协作', href: 'm5-3/', live: false },
    ],
  },
  {
    no: '模块六', k: 'AI 投资', live: 3,
    sub: '建立个人投资系统：盯盘、投研、量化、复盘，四讲各管一段。',
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
