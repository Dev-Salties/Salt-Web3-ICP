import { motion } from 'framer-motion'
import { Briefcase, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const perks = [
  'Work with Microsoft cloud technology every day',
  'Continuous learning and certification support',
  'Flexible and hybrid work environment',
]

export default function Vacancies() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Careers at Salt | Salt Essential IT</title>
        <meta name="description" content="Explore career opportunities at Salt Essential IT — a multi-award-winning Namibian IT company where people genuinely matter." />
      </Helmet>
      <PageHero
        title="Join the Salt Team"
        bgImage="/Sections/Molecules_Banner.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">

          {/* Current openings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionStagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-[#0064A8]" />
              <h2 className="text-2xl font-extrabold uppercase text-[#0F172A]">
                Current Opportunities
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 rounded-2xl border border-dashed border-[#BFDBFE] bg-[#EFF6FF] px-8 py-12 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <Briefcase className="h-6 w-6 text-[#0064A8]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">
                No open positions right now
              </h3>
              <p className="mt-2 text-sm text-[#64748B]">
                We don't have any advertised roles at the moment.
              </p>
            </motion.div>
          </motion.div>

          {/* Why work at Salt */}
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionStagger}
          >
            <motion.div
              variants={sectionStagger}
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {perks.map((perk) => (
                <motion.div
                  key={perk}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0064A8]">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  <p className="text-sm text-[#374151]">{perk}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>
    </motion.div>
  )
}
