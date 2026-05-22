import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const sections = [
  {
    bg: '#FFFFFF',
    title: 'Cloud Services',
    id: 'cloud-services',
    summary: 'Azure solutions, migration, hosting, continuity, and recovery.',
    image: '/Services/cloud services.jpg',
    bullets: [
      'Microsoft Azure solutions',
      'Cloud migration',
      'Business Hosting as a Service',
      'Secure hosting',
      'Business continuity',
      'Disaster recovery',
      'Regular data backups',
    ],
  },
  {
    bg: '#F8FAFC',
    title: 'Digital Security',
    id: 'digital-security',
    summary:
      'Cybersecurity, resilience, and compliance support for modern businesses.',
    image: '/Services/digital sec.jpg',
    bullets: [
      'Cybersecurity solutions',
      'Data protection',
      'Namibia Data Protection Act compliance',
    ],
  },
  {
    bg: '#FFFFFF',
    title: 'Support Services',
    id: 'support-services',
    summary: 'Helpdesk, IT support, and practical operations support end-to-end.',
    image: '/Services/support services.jpg',
    bullets: ['24/7/365 helpdesk', 'Full IT support', 'Network to cloud'],
  },
  {
    bg: '#F8FAFC',
    title: 'Business Consulting',
    id: 'business-consulting',
    summary: 'Strategy, architecture, implementation, and process enablement.',
    image: '/Services/business consulting.jpg',
    bullets: [
      'IT Strategy Consulting',
      'IT Organisation Consulting',
      'Infrastructure Planning',
      'Architecture & Design',
      'Implementation',
      'Project Management',
    ],
  },
  {
    bg: '#FFFFFF',
    title: 'Collaboration & Communication',
    id: 'collaboration',
    summary: 'Teams, Viva, contact centre and hybrid work enablement.',
    image: '/Services/collaboration.webp',
    bullets: [
      'Microsoft Teams',
      'Microsoft VIVA',
      'Tendfor switchboard',
      'Tendfor contact centre',
      'Hybrid work solutions',
    ],
  },
  {
    bg: '#F8FAFC',
    title: 'Hardware & Devices',
    id: 'hardware-devices',
    summary: 'Supply, procurement and lifecycle management for modern devices.',
    image: '/Services/Hardware & Devices.jpg',
    bullets: [
      'Hardware supply',
      'Lifecycle management',
      'Device procurement',
    ],
  },
]

export default function Services() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      id="top"
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>IT Services | Salt Essential IT</title>
        <meta name="description" content="Cloud, cybersecurity, support, business consulting, collaboration, and hardware services tailored for Namibian and African businesses." />
      </Helmet>
      <PageHero
        title="What We Offer"
        bgImage="/Sections/Salt-blue-header-services.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      {/* Detail sections */}
      {sections.map((section, index) => {
        const reverseOnDesktop = index % 2 === 1
        return (
          <section
            key={section.title}
            id={section.id}
            className="scroll-mt-28 py-12 md:py-16"
            style={{ backgroundColor: section.bg }}
          >
            <div className="mx-auto max-w-6xl px-4">
              <div
                className={[
                  'grid items-start gap-8 lg:grid-cols-2 lg:items-center',
                  reverseOnDesktop ? 'lg:[&>*:first-child]:order-2' : '',
                ].join(' ')}
              >
                {/* Media */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm"
                >
                  <div className="relative h-[260px] w-full overflow-hidden bg-[#EFF6FF] sm:h-[300px] lg:h-[360px]">
                    <motion.img
                      src={section.image}
                      alt={section.title}
                      loading="lazy"
                      whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                      className="h-full w-full scale-[1.06] object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-extrabold uppercase text-[#0F172A] md:text-2xl">
                    {section.summary}
                  </h3>

                  <ul className="mt-5 grid gap-2 text-sm text-[#374151] sm:grid-cols-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0064A8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </motion.div>
  )
}