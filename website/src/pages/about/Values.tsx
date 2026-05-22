import { motion } from 'framer-motion'
import PageHero from '../../components/PageHero'
import AboutFlow, { AboutFlowFooter } from '../../components/AboutFlow'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const values = [
  {
    title: 'We Make a Positive Impact',
    desc: 'We are really good at what we do. We strive to make a positive impact on each other and our customers in all we say and do. But don’t just take our word for it — we gladly let our partners and customers speak for us.',
    image: '/Values/Value-1.png',
  },
  {
    title: 'We Empower and Enable',
    desc: 'We are reliable, dependable and experienced. We continually enable our people, our customers, and our economy.',
    image: '/Values/Value-2.png',
  },
  {
    title: 'We Live for a Challenge',
    desc: 'We listen, we understand. We continually strive to do our work in new and better ways, bringing new and better technology to our customers.',
    image: '/Values/Value-3.png',
  },
]

export default function AboutValues() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Our Values | Salt Essential IT</title>
        <meta name="description" content="The values that drive Salt Essential IT: making a positive impact, empowering people, and living for a challenge." />
      </Helmet>
      <PageHero
        title="Our Values"
        bgImage="/Sections/Salt-Header-Grey.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <AboutFlow />

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E2E8F0]"
              >
                <div className="h-56 w-full overflow-hidden sm:h-64">
                  <img
                    src={value.image}
                    alt={value.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-5 pb-6 pt-4">
                  <h2 className="text-sm font-semibold uppercase text-[#0F172A]">
                    {value.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#64748B]">{value.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <AboutFlowFooter />
        </div>
      </section>
    </motion.div>
  )
}

