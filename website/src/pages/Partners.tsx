import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BadgeCheck, ArrowRight } from 'lucide-react'
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
  visible: { transition: { staggerChildren: 0.07 } },
}

const partners = [
  {
    name: 'Microsoft',
    logo: '/Partners/Microsoft.png',
    highlight: true,
    description:
      'Salt is a Microsoft Direct CSP and one of very few in Africa. We deliver Azure, Microsoft 365, Teams, Viva, and the full Modern Workplace stack with direct support.',
  },
  {
    name: 'Dell Technologies',
    logo: '/Partners/Dell.png',
    highlight: false,
    description:
      'Authorised reseller and solution provider for Dell servers, workstations, networking, and enterprise storage across Namibia.',
  },
  {
    name: 'Fortinet',
    logo: '/Partners/Fortinet.png',
    highlight: false,
    description:
      'Fortinet network security solutions including firewalls, SD-WAN, endpoint protection, and threat intelligence — deployed and managed by our certified engineers.',
  },
  {
    name: 'Veeam',
    logo: '/Partners/Veeam.png',
    highlight: false,
    description:
      'Veeam backup and replication solutions for cloud, virtual, and physical environments ensuring business continuity and rapid disaster recovery.',
  },
  {
    name: 'Acronis',
    logo: '/Partners/acronis.png',
    highlight: false,
    description:
      'Acronis cyber protection covering backup, disaster recovery, and endpoint security — available as a managed service through Salt.',
  },
  {
    name: 'VMware',
    logo: '/Partners/VMware.png',
    highlight: false,
    description:
      'VMware virtualisation and cloud infrastructure solutions, from vSphere to multi-cloud management, delivered by Salt-certified engineers.',
  },
  {
    name: 'Cisco',
    logo: '/Partners/Cisco.png',
    highlight: false,
    description:
      'Cisco networking, switching, routing, and collaboration solutions deployed across enterprise and SME environments in Namibia.',
  },
  {
    name: 'HP',
    logo: '/Partners/Hp.png',
    highlight: false,
    description:
      'HP hardware procurement — laptops, desktops, printers, and enterprise devices — with full lifecycle management from Salt.',
  },
  {
    name: 'Ubiquiti Networks',
    logo: '/Partners/Ubiquiti.png',
    highlight: false,
    description:
      'Ubiquiti wireless networking and UniFi solutions for reliable, scalable enterprise and campus connectivity.',
  },
  {
    name: 'Ruckus Wireless',
    logo: '/Partners/Ruckus.jpg',
    highlight: false,
    description:
      'Ruckus enterprise Wi-Fi and wired networking — high-density wireless deployments for offices, campuses, and large venues.',
  },
  {
    name: 'Arista',
    logo: '/Partners/Arista.png',
    highlight: false,
    description:
      'Arista cloud networking for high-performance data centre and campus environments.',
  },
  {
    name: '3CX',
    logo: '/Partners/3CX.png',
    tier: 'Authorised Partner',
    highlight: false,
    description:
      '3CX cloud PBX and unified communications for voice, video, and messaging for modern hybrid workplaces.',
  },
  {
    name: 'MailStore',
    logo: '/Partners/Mailstore.png',
    highlight: false,
    description:
      'MailStore email archiving solutions for compliance, discovery, and storage management across on-premise and cloud mail systems.',
  },
  {
    name: 'Microsoft Azure',
    logo: '/Partners/Azure.png',
    highlight: false,
    description:
      'Deep Azure expertise across IaaS, PaaS, and SaaS — from cloud migration and architecture to ongoing managed Azure services.',
  },
]

export default function Partners() {
  const featured = partners.filter((p) => p.highlight)
  const rest = partners.filter((p) => !p.highlight)

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Technology Partners | Salt Essential IT</title>
        <meta name="description" content="Salt Essential IT partners with Microsoft, Dell, Fortinet, Veeam, and more — bringing world-class technology to Namibia and Africa." />
      </Helmet>
      <PageHero
        title="Our Partners"


        bgImage="/Sections/Salt-Partners.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">

          {/* Microsoft — featured */}
          {featured.map((partner) => (
            <motion.div
              key={partner.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="mb-12 grid gap-8 overflow-hidden rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE] p-8 shadow-md md:grid-cols-[auto_1fr] md:items-center"
            >
              <div className="flex h-28 w-48 items-center justify-center rounded-2xl border border-[#DBEAFE] bg-white p-4 shadow-sm">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-extrabold uppercase text-[#0F172A]">
                    {partner.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0064A8] px-3 py-0.5 text-xs font-semibold text-white">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {partner.tier}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#374151] md:text-base">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* All other partners */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionStagger}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((partner) => (
              <motion.div
                key={partner.name}
                variants={fadeUp}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-32 items-center justify-center border-b border-[#F1F5F9] bg-[#F8FAFC] p-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-bold uppercase text-[#0F172A]">{partner.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#0064A8] ring-1 ring-[#BFDBFE]">
                      <BadgeCheck className="h-3 w-3" />
                      {partner.tier}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B]">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-lg font-bold uppercase text-[#0F172A]">
                Want to know which technology is right for your business?
              </h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Our team will help you pick the right technology for what you actually need.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0064A8] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </section>
    </motion.div>
  )
}
