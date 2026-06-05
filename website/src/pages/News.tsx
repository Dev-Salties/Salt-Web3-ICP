import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Tag, Calendar } from 'lucide-react'
import PageHero from '../components/PageHero'
import { newsArticles as staticNewsArticles } from '../data/news'
import { fetchPublishedArticles, type WebsiteArticleIndex } from '../lib/articles'
import { Helmet } from 'react-helmet-async'

type UiArticle = WebsiteArticleIndex

function safeText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function safeTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((t): t is string => typeof t === 'string')
    : []
}

function formatDate(iso: string) {
  if (!iso || !iso.includes('-')) return 'Unknown date'

  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, (m || 1) - 1, d || 1)

  if (Number.isNaN(dt.getTime())) return 'Unknown date'

  return dt.toLocaleDateString('en-NA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function normalizeStaticArticle(a: any): UiArticle | null {
  const slug = safeText(a?.slug)
  const title = safeText(a?.title)

  if (!slug || !title) return null

  return {
    slug,
    title,
    description: safeText(a?.description),
    image: safeText(a?.image, '/Sections/Salt-blue-header-services.jpg'),
    tags: safeTags(a?.tags),
    date: safeText(a?.date),
  }
}

function mergeArticles(dynamicArticles: UiArticle[], fallbackArticles: UiArticle[]) {
  const bySlug = new Map<string, UiArticle>()

  for (const article of dynamicArticles) {
    if (article.slug) bySlug.set(article.slug, article)
  }

  for (const article of fallbackArticles) {
    if (article.slug && !bySlug.has(article.slug)) {
      bySlug.set(article.slug, article)
    }
  }

  return Array.from(bySlug.values()).sort((a, b) =>
    safeText(b.date).localeCompare(safeText(a.date)),
  )
}

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(() => searchParams.get('tag'))
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [showAllTags, setShowAllTags] = useState(false)

  const normalizedStatic = useMemo(
    () => staticNewsArticles.map(normalizeStaticArticle).filter(Boolean) as UiArticle[],
    [],
  )

  const [articles, setArticles] = useState<UiArticle[]>(normalizedStatic)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (searchParams.get('tag')) {
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    let cancelled = false

    async function loadArticles() {
      setLoading(true)

      try {
        const published = await fetchPublishedArticles()
        const merged = mergeArticles(published, normalizedStatic)

        if (!cancelled) {
          setArticles(merged)
        }
      } catch (err) {
        console.warn('[News] Failed to load backend articles. Using static fallback only.', err)
        if (!cancelled) {
          setArticles(normalizedStatic)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadArticles()

    return () => {
      cancelled = true
    }
  }, [normalizedStatic])

  const allTags = useMemo(() => {
    return Array.from(new Set(articles.flatMap((a) => safeTags(a.tags)))).sort()
  }, [articles])

  const allYears = useMemo(() => {
    return Array.from(
      new Set(
        articles
          .map((a) => (typeof a.date === "string" ? a.date : String(a.date ?? "")))
          .filter((d) => d.length >= 4)
          .map((d) => d.slice(0, 4)),
      ),
    ).sort((a, b) => Number(b) - Number(a));
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = query.toLowerCase()
      const title = safeText(a.title).toLowerCase()
      const description = safeText(a.description).toLowerCase()
      const tags = safeTags(a.tags)

      const matchesQuery =
        !q ||
        title.includes(q) ||
        description.includes(q) ||
        tags.some((t) => t.toLowerCase().includes(q))

      const matchesTag = !activeTag || tags.includes(activeTag)
      const matchesYear = !activeYear || safeText(a.date).startsWith(activeYear)

      return matchesQuery && matchesTag && matchesYear
    })
  }, [articles, query, activeTag, activeYear])

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 12)

  function clearFilters() {
    setQuery('')
    setActiveTag(null)
    setActiveYear(null)
  }

  const hasFilters = Boolean(query || activeTag || activeYear)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Insights &amp; News | Salt Essential IT</title>
        <meta
          name="description"
          content="Technology insights, cybersecurity advice, and IT news from the Salt Essential IT team."
        />
      </Helmet>

      <PageHero
        title="Insights &amp; News"
        bgImage="/Sections/Ai-Banner.jpg"
        align="left"
        tone="light"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-sm outline-none transition focus:border-[#0075C4] focus:ring-2 focus:ring-[#0075C4]/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allYears.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(activeYear === y ? null : y)}
                className={[
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  activeYear === y
                    ? 'border-[#0064A8] bg-[#0064A8] text-white'
                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0064A8] hover:text-[#0064A8]',
                ].join(' ')}
              >
                <Calendar className="h-3 w-3" />
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={[
                  'flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition',
                  activeTag === tag
                    ? 'border-[#0064A8] bg-[#EFF6FF] text-[#0064A8]'
                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#93C5FD] hover:text-[#0064A8]',
                ].join(' ')}
              >
                <Tag className="h-3 w-3" />
                {tag}
              </button>
            ))}

            {allTags.length > 12 && (
              <button
                onClick={() => setShowAllTags((v) => !v)}
                className="rounded-full border border-dashed border-[#CBD5E1] px-3 py-1 text-xs text-[#94A3B8] transition hover:border-[#0064A8] hover:text-[#0064A8]"
              >
                {showAllTags ? 'Show less' : `+${allTags.length - 12} more`}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#64748B]">
            {loading
              ? 'Loading articles...'
              : filtered.length === articles.length
                ? `${articles.length} articles`
                : `${filtered.length} of ${articles.length} articles`}
          </p>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-[#0064A8] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {!loading && filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-semibold text-[#0F172A]">No articles found</p>
            <p className="mt-1 text-sm text-[#64748B]">Try adjusting your search or filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-full bg-[#0064A8] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0075C4]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: Math.min(i % 6, 5) * 0.05 }}
              >
                <Link
                  to={`/news/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  <div className="relative h-48 overflow-hidden bg-[#EFF6FF]">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          '/Sections/Salt-blue-header-services.jpg'
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs text-[#94A3B8]">{formatDate(article.date)}</p>
                    <h3 className="flex-1 text-sm font-bold leading-snug text-[#0F172A] group-hover:text-[#0064A8] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748B] line-clamp-3">
                      {article.description}
                    </p>

                    {article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-medium text-[#0064A8]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}