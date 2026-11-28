import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'
import fetchJSON from '../lib/hotData'
import { TF_LEVELS, tfMeta } from '../lib/tfGrade'

const PAGE_SIZE = 60
const M_PAGE_SIZE = 50

function tokenize(q) {
  return q.trim().toLowerCase().split(/\s+/).filter(Boolean)
}

export default function HotBooks() {
  const [index, setIndex] = useState(null)
  const [stats, setStats] = useState(null)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  // 搜书 / 搜拆页 双模式
  const [mode, setMode] = useState('books')
  const [mQuery, setMQuery] = useState('')
  const [mLevel, setMLevel] = useState('')
  const [mVisible, setMVisible] = useState(M_PAGE_SIZE)
  const [mIndex, setMIndex] = useState(null)
  const [mError, setMError] = useState(false)

  useEffect(() => {
    fetchJSON('/hot/index.json.gz').then(setIndex).catch(() => fetchJSON('/hot/index.json').then(setIndex).catch(() => setIndex([])))
    fetchJSON('/hot/stats.json').then(setStats).catch(() => {})
  }, [])

  // 懒加载拆页搜索索引：首次切到搜拆页模式才 fetch（一次性 ref 防重入）
  const mFired = useRef(false)
  useEffect(() => {
    if (mode !== 'memoir' || mFired.current || mIndex || mError) return
    mFired.current = true
    let dead = false
    fetchJSON('/hot/memoir-search.json.gz')
      .catch(() => fetchJSON('/hot/memoir-search.json'))
      .then(data => { if (!dead) setMIndex(data) })
      .catch(() => { if (!dead) setMError(true) })
    return () => { dead = true }
  }, [mode, mIndex, mError])

  const mLoading = mode === 'memoir' && !mIndex && !mError

  const tags = useMemo(() => {
    if (!index) return []
    const count = {}
    for (const b of index) {
      for (const t of (b.tags || '').split(',')) {
        const k = t.trim()
        if (k) count[k] = (count[k] || 0) + 1
      }
    }
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 16).map(([t]) => t)
  }, [index])

  const filtered = useMemo(() => {
    if (!index) return []
    const q = query.trim().toLowerCase()
    let list = index
    if (tag) list = list.filter(b => (b.tags || '').includes(tag))
    if (q) list = list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.author || '').toLowerCase().includes(q) ||
      (b.translator || '').toLowerCase().includes(q) ||
      (b.tags || '').toLowerCase().includes(q)
    )
    return list
  }, [index, query, tag])

  // 拆页搜索：书 id → {title, tags}
  const bookMap = useMemo(() => {
    if (!mIndex?.books) return null
    const map = new Map()
    for (const b of mIndex.books) map.set(b.id, b)
    return map
  }, [mIndex])

  const mTokens = useMemo(() => tokenize(mQuery), [mQuery])

  const mFiltered = useMemo(() => {
    if (!mIndex?.memoirs || !bookMap) return []
    let list = mIndex.memoirs
    if (mLevel) list = list.filter(m => m.g === mLevel)
    if (mTokens.length) {
      list = list.filter(m => {
        const bk = bookMap.get(m.b) || {}
        const hay = `${m.t || ''}\n${m.r || ''}\n${bk.title || ''}\n${bk.tags || ''}`.toLowerCase()
        return mTokens.every(tk => hay.includes(tk))
      })
      // 优先级：话题命中 > 仅备注/书命中；Array#sort 稳定 → 保持预排的 c 倒序
      const tier = m => mTokens.some(tk => (m.t || '').toLowerCase().includes(tk)) ? 0 : 1
      list = [...list].sort((a, b) => tier(a) - tier(b))
    }
    return list
  }, [mIndex, bookMap, mTokens, mLevel])

  const shown = filtered.slice(0, visible)
  const mShown = mFiltered.slice(0, mVisible)
  const sentinel = useRef(null)
  const mSentinel = useRef(null)

  useEffect(() => {
    if (mode !== 'books') return
    const el = sentinel.current
    if (!el) return
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(v => Math.min(v + PAGE_SIZE, filtered.length))
    }, { rootMargin: '600px' })
    ob.observe(el)
    return () => ob.disconnect()
  }, [mode, filtered.length])

  useEffect(() => {
    if (mode !== 'memoir') return
    const el = mSentinel.current
    if (!el) return
    const ob = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setMVisible(v => Math.min(v + M_PAGE_SIZE, mFiltered.length))
    }, { rootMargin: '600px' })
    ob.observe(el)
    return () => ob.disconnect()
  }, [mode, mFiltered.length])

  // 顶部精选（兼容切片 Top30）
  const featured = hotBooks.filter(b => b.memoirs?.length > 0).slice(0, 6)

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-10">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#0071e3] text-sm">
            数据源：拆书帮 chaishubang.com 公开拆页 · 非官方学习整理
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1d1d1f] mb-3">拆经典</h1>
          <p className="text-[#6e6e73] max-w-2xl mx-auto">
            拆书帮全平台热门书籍拆解库，每本都经过拆书家的深度拆解，呈现 RIA 完整框架
          </p>
          <div className="mt-4 text-sm text-[#86868b]">
            {stats
              ? <>共 {stats.totalBooks} 本书 · {stats.booksWithMemoirs} 本已有拆页 · {stats.totalMemoirs} 个拆页</>
              : <>加载中…</>}
          </div>
        </div>
      </section>

      {/* 精选带全文拆解 */}
      {featured.length > 0 && !query && !tag && (
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">
            精选 · 已生成教练技能 <span className="text-xs text-[#86868b] font-normal">以下书籍拆页已进入仓颉管线</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(book => (
              <Link
                key={book.id}
                to={`/hot/book/${book.id}`}
                className="glass rounded-xl p-4 group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex gap-4">
                  <BookCover book={book} size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-tight mb-1">
                      《{book.title}》
                    </h3>
                    <p className="text-xs text-[#6e6e73] truncate mb-1">{book.author}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">
                      {book.memoirs.length} 拆页全文
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 搜索与筛选（搜书 | 搜拆页 双模式） */}
      <div className="max-w-6xl mx-auto px-4 mb-6 sticky top-14 z-20">
        <div className="glass rounded-xl p-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-1 p-1 rounded-lg bg-dark-card-hover border border-dark-border self-start shrink-0">
              <button
                onClick={() => setMode('books')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'books' ? 'bg-cyan-500/15 text-[#0071e3]' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
              >
                搜书
              </button>
              <button
                onClick={() => setMode('memoir')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'memoir' ? 'bg-cyan-500/15 text-[#0071e3]' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
              >
                搜拆页
              </button>
            </div>
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={mode === 'books' ? query : mQuery}
                onChange={e => {
                  if (mode === 'books') { setQuery(e.target.value); setVisible(PAGE_SIZE) }
                  else { setMQuery(e.target.value); setMVisible(M_PAGE_SIZE) }
                }}
                placeholder={mode === 'books' ? '搜索书名 / 作者 / 标签…' : '关键词搜拆页：话题 / 备注 / 书名 / 标签，空格分词…'}
                className="w-full bg-dark-card-hover border border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            {mode === 'books' && (
              <select
                value={tag}
                onChange={e => { setTag(e.target.value); setVisible(PAGE_SIZE) }}
                className="bg-dark-card-hover border border-dark-border rounded-lg px-3 py-2 text-sm text-[#1d1d1f] focus:outline-none focus:border-cyan-500/50"
              >
                <option value="">全部标签</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </div>

          {mode === 'memoir' && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button
                onClick={() => { setMLevel(''); setMVisible(M_PAGE_SIZE) }}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all ${mLevel === '' ? 'bg-cyan-500/10 text-[#0071e3] border-cyan-500/30' : 'bg-dark-card-hover text-[#86868b] border-dark-border hover:text-[#1d1d1f]'}`}
              >
                全部
              </button>
              {TF_LEVELS.map(lv => {
                const meta = tfMeta(lv)
                const on = mLevel === lv
                return (
                  <button
                    key={lv}
                    onClick={() => { setMLevel(on ? '' : lv); setMVisible(M_PAGE_SIZE) }}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all ${on ? meta.tone : 'bg-dark-card-hover text-[#86868b] border-dark-border hover:text-[#1d1d1f]'}`}
                    title={meta.desc}
                  >
                    {lv} {meta.short}
                  </button>
                )
              })}
              <span className="text-[10px] text-[#86868b] self-center ml-1">智能推断 · 非官方</span>
            </div>
          )}

          <div className="mt-2 text-xs text-[#86868b]">
            {mode === 'books'
              ? (index ? `匹配 ${filtered.length} 本` : '加载索引中…')
              : mLoading
                ? '加载拆页索引中…'
                : mError
                  ? '拆页索引加载失败'
                  : mIndex
                    ? (mFiltered.length > 0 || mTokens.length || mLevel)
                      ? `匹配 ${mFiltered.length} 个拆页 · 智能推断分级 · 非官方`
                      : `共 ${mIndex.memoirs.length} 个拆页 · 智能推断分级 · 非官方`
                    : '—'}
          </div>
        </div>
      </div>

      {mode === 'books' && (
        <>
          {/* 书目网格（懒加载无限滚动） */}
          <div className="max-w-6xl mx-auto px-4">
            {!index && <div className="text-center text-[#86868b] py-20">正在加载全量书目…</div>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shown.map(book => (
                <Link
                  key={book.id}
                  to={`/hot/book/${book.id}`}
                  className="block glass rounded-xl p-4 h-full group hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex gap-4">
                    <BookCover book={book} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-tight mb-1">
                        《{book.title}》
                      </h3>
                      <p className="text-xs text-[#6e6e73] truncate mb-1">{book.author}</p>
                      <div className="flex items-center gap-2 text-xs">
                        {book.memCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-[#0071e3]">
                            {book.memCount} 拆页
                          </span>
                        )}
                      </div>
                      {book.tags && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {book.tags.split(',').slice(0, 2).map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-dark-card-hover text-[#86868b]">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {index && filtered.length === 0 && (
              <div className="text-center text-[#86868b] py-20">没有匹配「{query}」的书</div>
            )}
            <div ref={sentinel} className="h-10" />
            {shown.length < filtered.length && (
              <div className="text-center pb-8">
                <button
                  onClick={() => setVisible(v => v + PAGE_SIZE)}
                  className="px-6 py-2 rounded-full glass text-sm text-[#0071e3] hover:border-cyan-500/40 transition-all"
                >
                  显示更多（{shown.length}/{filtered.length}）
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {mode === 'memoir' && (
        <div className="max-w-6xl mx-auto px-4">
          {mLoading && <div className="text-center text-[#86868b] py-20">正在加载拆页搜索索引…</div>}
          {mError && (
            <div className="text-center py-20">
              <p className="text-[#86868b] mb-4">拆页索引加载失败，请重试</p>
              <button
                onClick={() => setMError(false)}
                className="px-6 py-2 rounded-full glass text-sm text-[#0071e3] hover:border-cyan-500/40 transition-all"
              >
                重新加载
              </button>
            </div>
          )}
          {!mLoading && !mError && mIndex && (
            <>
              <div className="flex flex-col gap-3">
                {mShown.map(m => {
                  const bk = (bookMap && bookMap.get(m.b)) || {}
                  const meta = tfMeta(m.g)
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="glass rounded-xl p-4 group hover:border-cyan-500/30 transition-all">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`px-1.5 py-px rounded-full text-[10px] font-bold border ${meta.tone}`} title={`${m.g} · ${meta.desc} · 智能推断 · 非官方`}>
                            {m.g} · {meta.short}
                          </span>
                          {m.d > 0 && (
                            <span className="text-[10px] px-1.5 py-px rounded-full bg-dark-card-hover text-[#86868b] border border-dark-border">
                              {m.d} min
                            </span>
                          )}
                          {m.c > 0 && (
                            <span className="text-[10px] text-[#86868b]">
                              {new Date(m.c).toLocaleDateString('zh-CN')}
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/hot/memoir/${m.id}`}
                          className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-snug"
                        >
                          {m.t || '（无话题）'}
                        </Link>
                        {m.r && (
                          <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed line-clamp-2">
                            <Highlight text={m.r} tokens={mTokens} />
                          </p>
                        )}
                        <div className="mt-2 text-xs">
                          <Link
                            to={`/hot/book/${m.b}`}
                            className="text-[#86868b] hover:text-[#0071e3] transition-colors"
                          >
                            《{bk.title || '未知书目'}》
                          </Link>
                          {bk.tags && (
                            <span className="ml-2 text-[#86868b]">{bk.tags.split(',').slice(0, 3).map(s => s.trim()).filter(Boolean).join(' / ')}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              {mFiltered.length === 0 && (
                <div className="text-center text-[#86868b] py-20">
                  没有匹配{mTokens.length ? `「${mQuery.trim()}」` : ''}的拆页{mLevel ? `（${mLevel}）` : ''}
                </div>
              )}
              <div ref={mSentinel} className="h-10" />
              {mShown.length < mFiltered.length && (
                <div className="text-center pb-8">
                  <button
                    onClick={() => setMVisible(v => v + M_PAGE_SIZE)}
                    className="px-6 py-2 rounded-full glass text-sm text-[#0071e3] hover:border-cyan-500/40 transition-all"
                  >
                    显示更多（{mShown.length}/{mFiltered.length}）
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Highlight({ text, tokens }) {
  if (!tokens.length) return text
  const esc = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${esc.join('|')})`, 'gi')
  const lower = new Set(tokens)
  const parts = text.split(re)
  return parts.map((p, i) =>
    lower.has(p.toLowerCase())
      ? <mark key={i} className="bg-cyan-500/20 text-[#0071e3] rounded px-0.5">{p}</mark>
      : <span key={i}>{p}</span>
  )
}

function BookCover({ book, size = 'md' }) {
  const cls = size === 'lg' ? 'w-20 h-28' : 'w-16 h-22'
  return (
    <div className={`${cls} shrink-0 rounded-lg overflow-hidden bg-dark-card-hover`}>
      {book.image ? (
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={e => {
            const img = e.target
            if (book.imageFallback && !img.dataset.fb) {
              img.dataset.fb = '1'
              img.src = book.imageFallback
            } else {
              img.onerror = null
              img.src = `https://placehold.co/64x88/1e1e4a/06b6d4?text=${encodeURIComponent(book.title.slice(0, 2))}`
            }
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#0071e3] font-bold text-sm">
          {book.title.slice(0, 2)}
        </div>
      )}
    </div>
  )
}
