import { motion } from 'framer-motion'
import PageHero from '../../components/PageHero'
import AboutFlow, { AboutFlowFooter } from '../../components/AboutFlow'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const awards = [
  { src: '/Awards/Fortinet.png',  alt: 'Fortinet Partner Award' },
  { src: '/Awards/PMR1.png',      alt: 'PMR Africa Diamond Arrow Award' },
  { src: '/Awards/PMR2.png',      alt: 'PMR Africa Award' },
  { src: '/Awards/Award2.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award5.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award6.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award7.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award8.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award9.jpg',    alt: 'Salt Award' },
  { src: '/Awards/Award10.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award11.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award12.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award13.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award14.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award15.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award16.jpg',   alt: 'Salt Award' },
  { src: '/Awards/Award17.jpg',   alt: 'Salt Award' },
]

export default function AboutAwards() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Awards &amp; Recognition | Salt Essential IT</title>
        <meta name="description" content="Salt Essential IT's awards and recognition — a track record of excellence across technology, partnership, and customer service." />
      </Helmet>

      <PageHero
        title="Awards & Recognition"
        bgImage="/Sections/Milestone-Banner.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <AboutFlow />

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {awards.map((award) => (
              <div
                key={award.src}
                className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm"
              >
                <img
                  src={award.src}
                  alt={award.alt}
                  className="aspect-square w-full object-contain p-3"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <AboutFlowFooter />
        </div>
      </section>
    </motion.div>
  )
}
