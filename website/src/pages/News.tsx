import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Tag, Calendar } from 'lucide-react'
import PageHero from '../components/PageHero'
import { newsArticles } from '../data/news'
import { Helmet } from 'react-helmet-async'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-NA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Collect all unique tags for filter chips
const allTags = Array.from(
  new Set(newsArticles.flatMap((a) => a.tags)),
).sort()

// Year buckets
const allYears = Array.from(
  new Set(newsArticles.map((a) => a.date.slice(0, 4))),
).sort((a, b) => Number(b) - Number(a))

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(() => searchParams.get('tag'))
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [showAllTags, setShowAllTags] = useState(false)

  // Clean up ?tag= from URL after reading it on mount
  useEffect(() => {
    if (searchParams.get('tag')) {
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const filtered = useMemo(() => {
    return newsArticles.filter((a) => {
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      const matchesTag = !activeTag || a.tags.includes(activeTag)
      const matchesYear = !activeYear || a.date.startsWith(activeYear)
      return matchesQuery && matchesTag && matchesYear
    })
  }, [query, activeTag, activeYear])

  const visibleTags = showAllTags ? allTags : allTags.slice(0, 12)

  function clearFilters() {
    setQuery('')
    setActiveTag(null)
    setActiveYear(null)
  }

  const hasFilters = query || activeTag || activeYear

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Insights & News | Salt Essential IT</title>
        <meta name="description" content="Technology insights, cybersecurity advice, and IT news from the Salt Essential IT team." />
      </Helmet>
      <PageHero
        title="Insights & News"
        bgImage="/Sections/Ai-Banner.jpg"
        align="left"
        tone="light"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Search + year filter bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-sm outline-none transition focus:border-[#0075C4] focus:ring-2 focus:ring-[#0075C4]/20"
            />
          </div>

          {/* Year pills */}
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

        {/* Tag filter chips */}
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

        {/* Results summary + clear */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#64748B]">
            {filtered.length === newsArticles.length
              ? `${newsArticles.length} articles`
              : `${filtered.length} of ${newsArticles.length} articles`}
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

        {/* Article grid */}
        {filtered.length === 0 ? (
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
                  {/* Thumbnail */}
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

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs text-[#94A3B8]">{formatDate(article.date)}</p>
                    <h3 className="flex-1 text-sm font-bold leading-snug text-[#0F172A] group-hover:text-[#0064A8] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748B] line-clamp-3">
                      {article.description}
                    </p>

                    {/* Tags */}
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
