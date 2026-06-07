import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'
import { X, PlayCircle } from 'lucide-react'
import { fetchCatsLinks } from '../lib/cats'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

type Session = {
  year: string
  week: string
  title: string
  topic: string
  date: string
  image: string
  youtube: string
  order?: number
}

const sessions2025: Session[] = [
  { year: '2025', week: 'Week 1', title: 'Know Your Enemy',         topic: 'Threats and Vulnerabilities on the Internet',         date: '21 Feb 2025', image: '/CATs/week1-knowyourenemy-salt-blog.jpg', youtube: 'https://youtu.be/jZNp_P5OZUo?si=f9iy0K_cIPLHWlEG' },
  { year: '2025', week: 'Week 2', title: "Don't be the Victim",     topic: 'Prevention & Resilience to Cybersecurity Threats',    date: '28 Feb 2025', image: '/CATs/Week-2.jpg',                        youtube: 'https://youtu.be/r5n2X3T9sSI?si=TKStc2sZTK8HfTZ2' },
  { year: '2025', week: 'Week 3', title: 'In Case of Emergency',    topic: 'Managing Cybersecurity Attacks and Incidences',       date: '07 Mar 2025', image: '/CATs/Week-3.jpg',                        youtube: 'https://youtu.be/rure62_mCjo' },
  { year: '2025', week: 'Week 4', title: 'Human Firewall',          topic: 'Building Resistance and Immunity to Cyber Threats',   date: '14 Mar 2025', image: '/CATs/Week-4.jpg',                        youtube: 'https://youtu.be/LOYSpR6pDaA' },
  { year: '2025', week: 'Week 5', title: 'Hook, Line and Sinker',   topic: 'Introduction to Forms and Types of Phishing Attacks', date: '28 Mar 2025', image: '/CATs/Week-5.jpg',                        youtube: 'https://youtu.be/-QVilDwNEis?si=Z-HNTHB9UbTRpjmw' },
  { year: '2025', week: 'Week 6', title: 'Keep Your Goggles Clean', topic: 'Prevention and Resilience to Phishing Attacks',       date: '11 Apr 2025', image: '/CATs/Week-6.jpg',                        youtube: 'https://youtu.be/9icUp_0y9Sk?si=NOnYMsZMgSFe1yRd' },
  { year: '2025', week: 'Week 7', title: 'Stay Calm',               topic: 'Managing Phishing Attacks & Incidences',              date: '25 Apr 2025', image: '/CATs/Week-7.jpg',                        youtube: 'https://youtu.be/klPqRQii92w?si=JuveM0ChRYiLjFuX' },
  { year: '2025', week: 'Week 8', title: 'Human Fire Wall',         topic: 'Prevention and Resilience to Phishing Attacks',       date: '09 May 2025', image: '/CATs/Week-8.jpg',                        youtube: 'https://youtu.be/U89BLS1B0O0?si=WANa51MRP5CGqSmJ' },
]

const sessions2023: Session[] = [
  { year: '2023', week: 'Week 1', title: 'Know Your Enemy',         topic: 'Threats and Vulnerabilities on the Internet',         date: '06 Oct 2023', image: '/CATs/week1-knowyourenemy-salt-blog.jpg',    youtube: 'https://youtu.be/T2w7uIeEwP8?si=vSVqsNmqZ-thtneO' },
  { year: '2023', week: 'Week 2', title: "Don't be the Victim",     topic: 'Prevention & Resilience to Cybersecurity Threats',    date: '13 Oct 2023', image: '/CATs/week2-dontbethevictim-salt-blog.jpg',  youtube: 'https://youtu.be/l3YzvYECsEE?si=eBbNV4E_CxOT9QLV' },
  { year: '2023', week: 'Week 3', title: 'In Case of Emergency',    topic: 'Managing Cybersecurity Attacks and Incidences',       date: '20 Oct 2023', image: '/CATs/week3-incaseofemergency-salt-blog.jpg', youtube: 'https://youtu.be/GkxR_knv4Pk?si=v1FssPrMUp-NP3e9' },
  { year: '2023', week: 'Week 4', title: 'Human Firewall',          topic: 'Building Resistance and Immunity to Cyber Threats',   date: '27 Oct 2023', image: '/CATs/week4-humanfirewall-salt-blog.jpg',    youtube: 'https://youtu.be/WyMS-198Mt4' },
  { year: '2023', week: 'Week 5', title: 'Hook, Line and Sinker',   topic: 'Introduction to Forms and Types of Phishing Attacks', date: '03 Nov 2023', image: '/CATs/week5-hookline-salt-blog.jpg',         youtube: 'https://youtu.be/hMdECKVFnBU?si=2h6RxC_36681-yVf' },
  { year: '2023', week: 'Week 6', title: 'Keep Your Goggles Clean', topic: 'Prevention and Resilience to Phishing Attacks',       date: '10 Nov 2023', image: '/CATs/week6-goggles-salt-blog.jpg',          youtube: 'https://youtu.be/Jo0WjNsSECc?si=G96dkjG_5bsBZ2Dw' },
  { year: '2023', week: 'Week 7', title: 'Stay Calm',               topic: 'Managing Phishing Attacks & Incidences',              date: '17 Nov 2023', image: '/CATs/week7-staycalm-salt-1080.jpg',         youtube: 'https://youtu.be/KJCGReJWRSE?si=XZYyjrsUUSePLLzF' },
  { year: '2023', week: 'Week 8', title: 'Last Line of Defence',    topic: 'Building Resistance & Immunity to Phishing Threats',  date: '24 Nov 2023', image: '/CATs/week8-lastline-salt-blog.jpg',         youtube: '' },
]

const staticSessions: Session[] = [...sessions2025, ...sessions2023]

function getEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : ''
}

function mergeSessions(dynamicSessions: Session[], fallbackSessions: Session[]) {
  const byKey = new Map<string, Session>()
  for (const session of dynamicSessions) {
    const key = `${session.year}|${session.week.trim().toLowerCase()}`
    byKey.set(key, session)
  }
  for (const session of fallbackSessions) {
    const key = `${session.year}|${session.week.trim().toLowerCase()}`
    if (!byKey.has(key)) byKey.set(key, session)
  }
  return Array.from(byKey.values()).sort((a, b) => {
    if (a.year !== b.year) return Number(b.year) - Number(a.year)
    const ao = a.order ?? 999
    const bo = b.order ?? 999
    return ao - bo
  })
}

function groupByYear(sessions: Session[]) {
  const grouped = new Map<string, Session[]>()
  for (const session of sessions) {
    const existing = grouped.get(session.year) ?? []
    existing.push(session)
    grouped.set(session.year, existing)
  }
  return Array.from(grouped.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, sessions]) => ({ year, sessions }))
}

export default function CATs() {
  const [selected, setSelected] = useState<{ session: Session; year: string } | null>(null)
  const [dynamicSessions, setDynamicSessions] = useState<Session[]>([])

  useEffect(() => {
    let cancelled = false
    async function loadSessions() {
      try {
        const backendSessions = await fetchCatsLinks()
        const mapped: Session[] = backendSessions.map((s) => ({
          year: s.year,
          week: s.weekLabel,
          title: s.title,
          topic: s.topic,
          date: s.date,
          image: s.imageUrl,
          youtube: s.youtubeUrl,
          order: s.order,
        }))
        if (!cancelled) setDynamicSessions(mapped)
      } catch (err) {
        console.warn('[CATs] Failed to load backend CATS sessions. Using static fallback only.', err)
        if (!cancelled) setDynamicSessions([])
      }
    }
    void loadSessions()
    return () => { cancelled = true }
  }, [])

  const sessionsByYear = useMemo(() => {
    const merged = mergeSessions(dynamicSessions, staticSessions)
    return groupByYear(merged)
  }, [dynamicSessions])

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>CATS — Cybersecurity Awareness Training | Salt Essential IT</title>
        <meta
          name="description"
          content="Free public Cybersecurity Awareness Training Sessions (CATS) by Salt Essential IT in partnership with the Ministry of Information, Communication and Technology."
        />
      </Helmet>

      <PageHero
        title="Cybersecurity Awareness Training Session"
        bgImage="/Sections/CTA-Header.jpg"
        align="left"
        tone="light"
        className="bg-[#0F172A]"
      />

      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            In partnership with
          </span>
          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#0064A8]">
            Ministry of Information, Communication & Technology
          </span>
          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#0064A8]">
            Salt Essential IT
          </span>
        </div>
      </div>

      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold uppercase text-[#0F172A] md:text-3xl">
            What are CATS?
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#374151]">
            Cybersecurity Awareness Training Sessions are free, publicly accessible virtual training sessions hosted by Salt Essential IT in partnership with the Ministry of Information, Communication and Technology of Namibia. Designed for everyone from students to executives, each session delivers practical, actionable cybersecurity knowledge in plain language. No technical background required. Just show up and learn how to protect yourself and your organisation online.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-white py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064A8] transition hover:text-[#0075C4]"
                >
                  <X className="h-4 w-4" />
                  Back to Sessions
                </button>

                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0064A8]">
                  {selected.year} · {selected.session.week}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold uppercase text-[#0F172A]">
                  {selected.session.title}
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">{selected.session.topic}</p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  {selected.session.date} · 10:00–11:00
                </p>

                <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-[#0F172A]">
                  {selected.session.youtube ? (
                    <iframe
                      src={getEmbedUrl(selected.session.youtube)}
                      title={selected.session.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      <PlayCircle className="h-14 w-14 text-white/20" />
                      <p className="text-sm font-semibold text-white/40">
                        Recording coming soon
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-extrabold uppercase text-[#0F172A] md:text-3xl">
                  Watch the Recordings
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-[#64748B]">
                  Missed a session? Select any card to watch the recording.
                </p>

                {sessionsByYear.map(({ year, sessions }) => (
                  <div key={year} className="mt-10">
                    <h3 className="mb-6 text-lg font-extrabold text-[#0F172A]">
                      {year}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {sessions.map((r) => (
                        <button
                          key={`${year}-${r.week}`}
                          type="button"
                          onClick={() => setSelected({ session: r, year })}
                          className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-left shadow-sm transition hover:border-[#BFDBFE] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD]"
                        >
                          <div className="w-full overflow-hidden bg-white">
                            {r.image ? (
                              <img
                                src={r.image}
                                alt={r.title}
                                loading="lazy"
                                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                onError={(e) => {
                                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            ) : (
                              <div className="flex h-44 w-full items-center justify-center bg-[#F1F5F9]">
                                <PlayCircle className="h-10 w-10 text-[#CBD5E1]" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0064A8]">
                              {r.week}
                            </p>
                            <p className="mt-1 text-sm font-bold leading-snug text-[#0F172A]">
                              {r.title}
                            </p>
                            <p className="mt-1 flex-1 text-[11px] leading-snug text-[#64748B]">
                              {r.topic}
                            </p>
                            <p className="mt-2 text-[10px] font-medium text-[#94A3B8]">
                              {r.date}
                            </p>
                            <span
                              className={[
                                'mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold',
                                r.youtube ? 'bg-[#0064A8] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]',
                              ].join(' ')}
                            >
                              <PlayCircle className="h-3.5 w-3.5" />
                              {r.youtube ? 'Watch Recording' : 'Coming Soon'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  )
}