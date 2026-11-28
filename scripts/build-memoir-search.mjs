// 构建拆页搜索索引 public/hot/memoir-search.json.gz
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { TF_LEVELS, gradeMemoir } from '../src/lib/tfGrade.js'

const BOOKS_DIR = '/tmp/loong/hot-data/books'
const IDX_GZ = '/tmp/loong/idx.gz'
const OUT = 'public/hot/memoir-search.json.gz'

const idx = JSON.parse(zlib.gunzipSync(fs.readFileSync(IDX_GZ)).toString())
const idxMap = new Map(idx.map(b => [b.id, b]))

const books = []
const memoirs = []
const dist = {}

for (const f of fs.readdirSync(BOOKS_DIR)) {
  if (!f.endsWith('.json')) continue
  let d
  try { d = JSON.parse(fs.readFileSync(path.join(BOOKS_DIR, f), 'utf8')) }
  catch { continue }
  const bookId = d.book?.id ?? Number(f.replace('.json', ''))
  if (bookId == null) continue
  const meta = idxMap.get(bookId) || {}
  books.push({ id: bookId, title: d.book?.title || meta.title || '', tags: d.book?.tags || meta.tags || '' })
  const list = Array.isArray(d.memoirs) ? d.memoirs : []
  let has = false
  for (const m of list) {
    const g = gradeMemoir(m)
    dist[g.level] = (dist[g.level] || 0) + 1
    let r = String(m.remark || '').replace(/\s+/g, ' ').trim()
    if (r.length > 120) r = r.slice(0, 120) + '…'
    memoirs.push({
      id: m.id, b: bookId, t: m.topic || '',
      r, d: Number(m.duration) || 0,
      c: Number(m.createdAt) || 0, g: g.level,
      x: Number(m.textsCount) || 0,
    })
    has = true
  }
  if (!has && books[books.length - 1] && !list.length) {} // books with no memoirs still listed if idx has memCount>0? keep only memoir-bearing
}

// books 只含有拆页的书：过滤掉无拆页的
const bookIdsWith = new Set(memoirs.map(x => x.b))
const filteredBooks = books.filter(b => bookIdsWith.has(b.id))

memoirs.sort((a, b) => b.c - a.c)
const payload = { generatedAt: new Date().toISOString(), total: memoirs.length, books: filteredBooks, memoirs }
const gz = zlib.gzipSync(JSON.stringify(payload), { level: 9 })
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, gz)

console.log('拆页总数:', memoirs.length)
console.log('书数:', filteredBooks.length)
console.log('九级分布:')
for (const l of TF_LEVELS) {
  const n = dist[l] || 0
  console.log(`  ${l}: ${n} (${(n / memoirs.length * 100).toFixed(1)}%)`)
}
console.log('gz 体积:', (gz.length / 1024 / 1024).toFixed(2), 'MB')
