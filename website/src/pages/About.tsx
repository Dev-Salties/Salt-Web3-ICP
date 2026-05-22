import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function About() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    switch (location.hash) {
      case '#about-values':
        navigate('/about/values', { replace: true })
        break
      case '#about-team':
        navigate('/about/team', { replace: true })
        break
      case '#about-story':
        navigate('/about', { replace: true })
        break
      default:
        break
    }
  }, [location.hash, navigate])

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>About Salt Essential IT | Our Story</title>
        <meta name="description" content="Learn the story of Salt Essential IT — a Namibian IT company serving businesses across Africa with cloud, security, and IT support since 1998." />
      </Helmet>
      <PageHero
        title="About Salt Essential IT"
        bgImage="/Sections/Purple-geometric-header.jpg"
        className="bg-[#EFF6FF] py-16 md:py-24"
        align="left"
        tone="light"
      />

      <section className="bg-[#F8FAFC] py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-start">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold uppercase text-[#0F172A]">Our story</h3>
            <p className="mt-3 text-sm text-[#374151] md:text-base">
              Founded in 1998 in Windhoek, Namibia, Salt Essential IT helps SME to
              enterprise customers modernise securely from network to cloud.
            </p>
            <p className="mt-3 text-sm text-[#64748B]">
              Technology changes constantly. Our job is making sure your business is never
              left behind by it.
            </p>
            <Link
              to="/about/story"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0064A8] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
            >
              Learn more about us
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-[#0F172A]">
                Proud Microsoft Direct Cloud Solution Provider
              </h3>
              <p className="mt-3 text-sm text-[#374151]">
                We deliver Azure, Microsoft 365, and modern workplace solutions with deep
                local expertise and global best practices.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm p-4 flex justify-center">
              <video
                src="/Microsoft-logo-animated-for-Salt-home.gif.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-1/2 h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
