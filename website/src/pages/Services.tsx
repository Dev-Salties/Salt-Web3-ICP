import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
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
    overview: 'Salt delivers end-to-end cloud solutions built on Microsoft Azure, helping Namibian businesses migrate, modernise, and manage their IT infrastructure securely in the cloud. From initial strategy to ongoing management, we ensure your cloud environment is resilient, cost-effective, and aligned to your business goals.',
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
    summary: 'Cybersecurity, resilience, and compliance support for modern businesses.',
    overview: null,
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
    overview: null,
    image: '/Services/support services.jpg',
    bullets: ['24/7/365 helpdesk', 'Full IT support', 'Network to cloud'],
  },
  {
    bg: '#F8FAFC',
    title: 'Business Consulting',
    id: 'business-consulting',
    summary: 'Strategy, architecture, implementation, and process enablement.',
    overview: null,
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
    overview: null,
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
    overview: null,
    image: '/Services/Hardware & Devices.jpg',
    bullets: [
      'Hardware supply',
      'Lifecycle management',
      'Device procurement',
    ],
  },
  {
    bg: '#FFFFFF',
    title: 'Enterprise Innovation Hub (EIH)',
    id: 'enterprise-innovation-hub',
    summary: 'AI, automation, and digital transformation for forward-thinking enterprises.',
    overview: 'The Enterprise Innovation Hub (EIH) is a platform designed to accelerate innovation and digital transformation within enterprises. By leveraging AI, automation, and a modern tech stack, the EIH provides a robust environment for developing, testing, and deploying innovative solutions tailored to your business needs.',
    image: '/Services/cloud services.jpg',
    bullets: [
      'AI-powered analytics',
      'Robotic Process Automation (RPA)',
      'Intelligent chatbots',
      'Predictive maintenance',
      'Cloud-native architecture',
      'Microservices & APIs',
      'Innovation consulting',
      'Data science & analytics',
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
                  <h2 className="text-2xl font-extrabold uppercase text-[#0064A8] md:text-3xl">
                    {section.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-[#475569]">
                    {section.summary}
                  </p>

                  {section.overview && (
                    <p className="mt-4 text-sm leading-relaxed text-[#374151]">
                      {section.overview}
                    </p>
                  )}

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#0064A8]">
                      Capabilities
                    </p>
                    <ul className="mt-3 grid gap-2 text-sm text-[#374151] sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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
