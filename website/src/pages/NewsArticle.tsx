import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { newsArticles as staticNewsArticles } from '../data/news'
import { articleContent } from '../data/articleContent'
import { Helmet } from 'react-helmet-async'
import { fetchArticleBySlug, fetchPublishedArticles, type WebsiteArticle } from '../lib/articles'

type StaticArticle = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  date: string
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

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [dynamicArticle, setDynamicArticle] = useState<WebsiteArticle | null>(null)
  const [dynamicRelated, setDynamicRelated] = useState<WebsiteArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!slug) return

      try {
        const [article, published] = await Promise.all([
          fetchArticleBySlug(slug),
          fetchPublishedArticles(),
        ])

        if (!cancelled) {
          setDynamicArticle(article)
          setDynamicRelated(
            published
              .filter((a) => a.slug !== slug)
              .slice(0, 10) as WebsiteArticle[],
          )
        }
      } catch (err) {
        console.warn('[NewsArticle] Failed to fetch backend article, using fallback.', err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [slug])

  const staticArticle = useMemo(
    () => staticNewsArticles.find((a) => a.slug === slug),
    [slug],
  )

  const article = dynamicArticle
    ? {
        slug: dynamicArticle.slug,
        title: dynamicArticle.title,
        description: dynamicArticle.description,
        image: dynamicArticle.image,
        tags: dynamicArticle.tags,
        date: dynamicArticle.date,
      }
    : staticArticle

  const content =
    dynamicArticle?.body && dynamicArticle.body.trim().length > 0
      ? dynamicArticle.body
      : slug
        ? articleContent[slug]
        : undefined

  useEffect(() => {
    if (!loading && !article) {
      navigate('/news', { replace: true })
    }
  }, [loading, article, navigate])

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 text-center text-sm text-[#64748B]">
        Loading article...
      </div>
    )
  }

  if (!article) return null

  const relatedPool: StaticArticle[] = dynamicArticle
    ? dynamicRelated.map((a) => ({
        slug: a.slug,
        title: a.title,
        description: a.description,
        image: a.image,
        tags: a.tags,
        date: a.date,
      }))
    : staticNewsArticles

  const related = relatedPool
    .filter(
      (a) =>
        a.slug !== slug &&
        a.tags.some((t) => article.tags.includes(t)),
    )
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>{article.title} | Salt Essential IT</title>
        <meta
          name="description"
          content={dynamicArticle?.metaDesc || article.description}
        />
      </Helmet>

      {/* Hero image */}
      <div className="relative h-[300px] w-full overflow-hidden bg-[#0F172A] sm:h-[380px] md:h-[440px]">
        <img
          src={dynamicArticle?.ogImage || article.image}
          alt={article.title}
          className="h-full w-full object-cover opacity-60"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src =
              '/Sections/Salt-blue-header-services.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent" />

        {/* Back button overlay */}
        <div className="absolute left-0 right-0 top-0 mx-auto max-w-4xl px-4 pt-5">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to News
          </Link>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-4xl px-4 pb-8">
          <h1 className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.date)}
            </span>

            {article.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                {article.tags.slice(0, 3).join(' · ')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-sm md:px-10 md:py-12">
          {content ? (
            <div
              className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-[#0F172A] prose-h2:text-xl prose-h3:text-lg prose-p:text-[#374151] prose-p:leading-relaxed prose-a:text-[#0064A8] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0F172A] prose-li:text-[#374151] prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-[#E2E8F0]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-[#64748B]">Article content not available.</p>
          )}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/news?tag=${encodeURIComponent(tag)}`}
                className="flex items-center gap-1 rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-medium text-[#0064A8] transition hover:bg-[#DBEAFE]"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 text-lg font-extrabold text-[#0F172A]">Related Articles</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/news/${rel.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  <div className="h-36 overflow-hidden bg-[#EFF6FF]">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          '/Sections/Salt-blue-header-services.jpg'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-[10px] text-[#94A3B8]">{formatDate(rel.date)}</p>
                    <p className="text-xs font-bold leading-snug text-[#0F172A] group-hover:text-[#0064A8] transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#374151] shadow-sm transition hover:border-[#0064A8] hover:text-[#0064A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>
        </div>
      </div>
    </motion.div>
  )
}