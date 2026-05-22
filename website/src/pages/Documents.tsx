import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const docImage = '/Documents/salt-document-open.png'

const procedures = [
  {
    title: 'Logging Procedure for Requests at the Service Desk',
    file: '/Documents/Salt-PROCEDURE-Logging.pdf',
  },
  {
    title: 'Standard Escalation Procedure for Assistance or Faults',
    file: '/Documents/Salt-PROCEDURE-Escalation.pdf',
  },
  {
    title: 'Complaints Procedure for Customers 2022',
    file: '/Documents/Salt-PROCEDURE-Complaints.pdf',
  },
]

const serviceDescriptions = [
  {
    title: 'Business Continuity Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-BusinessContinuity.pdf',
  },
  {
    title: 'DNS and Web Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-DNS-Web.pdf',
  },
  {
    title: 'Hosting / Co-Location Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-Hosting-Co-Location.pdf',
  },
  {
    title: 'Internet, Interconnect and S2SC Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-Internet-Interconnect.pdf',
  },
  {
    title: 'Server Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-Server.pdf',
  },
  {
    title: 'Support Services',
    file: '/Documents/Salt-SERVICE-DESCRIPTION-Support-Services.pdf',
  },
]

function DocCard({ title, file }: { title: string; file: string }) {
  return (
    <motion.a
      variants={fadeUp}
      href={file}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center shadow-sm transition hover:border-[#BFDBFE] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
    >
      <div className="h-24 w-24 overflow-hidden rounded-xl">
        <img
          src={docImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain transition group-hover:scale-105 duration-300"
          onError={(e) => {
            const el = e.target as HTMLImageElement
            el.style.display = 'none'
            el.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-[#EFF6FF]')
            const icon = document.createElement('span')
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#0064A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
            el.parentElement!.appendChild(icon)
          }}
        />
      </div>
      <p className="mt-4 text-xs font-semibold leading-snug text-[#0064A8] group-hover:underline">
        {title}
      </p>
      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-[#94A3B8]">
        <FileText className="h-3 w-3" />
        PDF
      </span>
    </motion.a>
  )
}

export default function Documents() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Documents | Salt Essential IT</title>
        <meta name="description" content="Download Salt Essential IT service descriptions, procedures and company documents." />
      </Helmet>

      <PageHero
        title="Documents"
        bgImage="/Sections/Salt-blue.jpg"
        align="left"
        tone="light"
      />

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 space-y-14">

          {/* Procedures */}
          <div>
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3 mb-8">
              Procedures
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionStagger}
            >
              {procedures.map((doc) => (
                <DocCard key={doc.file} {...doc} />
              ))}
            </motion.div>
          </div>

          {/* Service Descriptions */}
          <div>
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3 mb-8">
              Service Descriptions
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionStagger}
            >
              {serviceDescriptions.map((doc) => (
                <DocCard key={doc.file} {...doc} />
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </motion.div>
  )
}
