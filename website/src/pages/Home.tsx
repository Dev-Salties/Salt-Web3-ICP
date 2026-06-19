import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  History,
  Mail,
  MapPin,
  Phone,
  Trophy,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const partners = [
  { name: 'Microsoft', logo: '/Partners/Microsoft.png' },
  { name: 'Dell Technologies', logo: '/Partners/Dell.png' },
  { name: 'Fortinet', logo: '/Partners/Fortinet.png' },
  { name: 'Veeam', logo: '/Partners/Veeam.png' },
  { name: 'MailStore', logo: '/Partners/Mailstore.png' },
  { name: 'Acronis', logo: '/Partners/acronis.png' },
  { name: 'VMware', logo: '/Partners/VMware.png' },
  { name: 'Ubiquiti Networks', logo: '/Partners/Ubiquiti.png' },
  { name: 'Cisco', logo: '/Partners/Cisco.png' },
  { name: 'Hp', logo: '/Partners/Hp.png' },
  { name: 'Azure', logo: '/Partners/Azure.png' },
  { name: 'Ruckus Wireless', logo: '/Partners/Ruckus.jpg' },
  { name: '3CX', logo: '/Partners/3CX.png' },
  { name: 'Arista', logo: '/Partners/Arista.png' },
]

const homeHeroBackgroundImage = '/Sections/OFFICE.jpg'

const hoverLift = {
  y: -5,
  transition: { type: 'spring' as const, stiffness: 320, damping: 24 },
}

const hoverPress = {
  scale: 0.99,
}

const pageFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

const sectionStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38 } },
}

const services = [
  {
    title: 'Cloud Services',
    desc: 'Microsoft Azure, cloud migration, hosted infrastructure.',
    image: '/LOGOS/cloud.jpg',
    accentBorderClass: 'border-t-[#0064A8]',
  },
  {
    title: 'Digital Security',
    desc: 'Cybersecurity, data protection, POPIA/NDPA compliance.',
    image: '/LOGOS/security.jpg',
    accentBorderClass: 'border-t-[#0075C4]',
  },
  {
    title: 'Support Services',
    desc: '24/7/365 IT helpdesk, network to cloud support.',
    image: '/LOGOS/support.jpg',
    accentBorderClass: 'border-t-[#3B82F6]',
  },
  {
    title: 'Business Consulting',
    desc: 'IT strategy, infrastructure planning, project management.',
    image: '/LOGOS/business.webp',
    accentBorderClass: 'border-t-[#0064A8]',
  },
  {
    title: 'Collaboration',
    desc: 'Microsoft Teams, Tendfor contact centre, hybrid work.',
    image: '/LOGOS/collaboration.jpg',
    accentBorderClass: 'border-t-[#0075C4]',
  },
  {
    title: 'Hardware & Devices',
    desc: 'Supply and lifecycle management of IT hardware.',
    image: '/LOGOS/hardware.jpg',
    accentBorderClass: 'border-t-[#3B82F6]',
  },
]

const whySalt = [
  {
    icon: Trophy,
    heading: "Awards & Recognition",
    body: 'Multiple PMR.africa Diamond Arrow Award wins and Microsoft Partner of the Year recognition.',
  },
  {
    icon: Headphones,
    heading: '24/7/365 local Namibian support',
    body: 'Local support that knows your business and picks up when you call. No overseas call centres.',
  },
  {
    icon: History,
    heading: '25 years in Namibian IT',
    body: 'We have been doing this since 1998. That kind of experience does not come from reading manuals.',
  },
  {
    icon: Boxes,
    heading: 'End-to-end, from Azure to physical hardware',
    body: 'From cloud architecture to physical hardware, we handle the full stack. One partner, one number to call.',
  },
]


export default function Home() {
  const reduceMotion = useReducedMotion()
  const awardsScrollRef = useRef<HTMLDivElement>(null)
  const awardsPausedRef = useRef(false)

  useEffect(() => {
    const el = awardsScrollRef.current
    if (!el || reduceMotion) return
    const interval = setInterval(() => {
      if (awardsPausedRef.current) return
      el.scrollLeft += 1
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
    }, 16)
    return () => clearInterval(interval)
  }, [reduceMotion])

  function handleAwardsScroll(dir: 'prev' | 'next') {
    awardsPausedRef.current = true
    awardsScrollRef.current?.scrollBy({
      left: dir === 'next' ? 280 : -280,
      behavior: 'smooth',
    })
    setTimeout(() => {
      awardsPausedRef.current = false
    }, 800)
  }

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Salt Essential IT | Essential IT Since 1998</title>
        <meta name="description" content="Namibia's leading managed IT services provider. Cloud, cybersecurity, support, and business consulting — enabling businesses across Africa since 1998." />
      </Helmet>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] flex-col overflow-hidden bg-[#0C1525]">
        {/* Background image — full opacity, fades to dark on the left where text lives */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center md:bg-[position:center_right]"
          style={{ backgroundImage: `url('${homeHeroBackgroundImage}')` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0C1525]/80 to-[#0C1525]/50 md:bg-gradient-to-r md:from-[#0C1525] md:via-[#0C1525]/80 md:to-[#0C1525]/25" />

        {/* Main content */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-24 md:py-32">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1fr)_auto]">

            {/* Left — copy */}
            <div className="max-w-2xl">

              {/* Kicker */}
              <motion.div
                className="flex items-center gap-3"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <span aria-hidden="true" className="h-px w-8 bg-[#3B82F6]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">
                  Salt Essential IT
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.12 }}
              >
                The Technology Partner{' '}
                <span className="text-[#60A5FA]">Namibian Businesses</span>{' '}
                Trust.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.18 }}
              >
                28 years of keeping Namibian businesses running. One partner for everything from your network to your Azure cloud.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-8 flex flex-row flex-wrap items-center gap-3"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.24 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-md bg-[#0064A8] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(29,78,216,0.5)] transition hover:bg-[#0075C4] hover:shadow-[0_4px_28px_rgba(37,99,235,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1525]"
                >
                  Explore Our Services
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1525]"
                >
                  Talk to Us
                </Link>
              </motion.div>

              {/* Meta line — replaces pill badges */}
              <motion.p
                className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={reduceMotion ? undefined : { opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.32 }}
              >
                Microsoft Direct CSP · Windhoek, Namibia · Africa-Wide
              </motion.p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="relative flex justify-center pb-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown aria-hidden="true" className="h-5 w-5 text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar (marquee) */}
      <motion.section
        className="relative bg-white py-12 lg:py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"
            />

            <motion.div
              className="animate-marquee flex w-max items-center gap-10 px-3"
              style={{ animationDuration: '72s' }}
              variants={fadeUp}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group flex aspect-[3/2] w-36 items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white/70 p-3 shadow-sm transition-all hover:border-[#0075C4]/35"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain grayscale opacity-100 transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Snapshot */}
      <motion.section
        className="bg-[#FFFFFF] py-12 md:py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-display font-extrabold uppercase text-[#0F172A] md:text-4xl">
              We Are Salt Essential IT
            </h2>
            <p className="mt-4 text-sm text-[#374151] md:text-base">
              Salt is all about IT and cloud services, yes. But much more than
              that, we are about businesses and PEOPLE. Digital Transformation
              and the 4th Industrial Revolution are meaningless buzzwords if
              their application to your business doesn&apos;t add measurable
              value. Our business is about enabling yours.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0064A8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
            >
              Learn More About Us
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE] p-6 shadow-lg"
          >
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={sectionStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {[
                { num: '25+', label: 'Years in Namibian IT' },
                { num: '270K+', label: 'Cloud Users Served' },
                { num: '20', label: 'Diamond Arrow Awards' },
                { num: '14', label: 'Technology Partners' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex flex-col items-center rounded-2xl border border-[#BFDBFE] bg-white/80 p-4 text-center shadow-sm"
                >
                  <span className="font-display text-3xl font-extrabold tracking-tight text-[#0064A8]">
                    {stat.num}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="relative overflow-hidden bg-[#F8FAFC] py-12 md:py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${homeHeroBackgroundImage}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.06,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(248, 250, 252, 0.78)' }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-display font-extrabold uppercase text-[#0F172A] md:text-4xl"
          >
            Our Services
          </motion.h2>

          <motion.div
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={sectionStagger}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={hoverLift}
                whileTap={hoverPress}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white/95 shadow-md transition-shadow hover:shadow-xl hover:border-[#0064A8] border-t-4 ${service.accentBorderClass} focus-within:ring-2 focus-within:ring-[#0075C4]/30`}
              >
                {/* Service image placeholder (swap image per card in the `services` array). */}
                <div aria-hidden="true" className="relative aspect-[16/10] w-full">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url('${service.image}')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      opacity: 0.99,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-semibold uppercase text-[#0F172A]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[#64748B]">
                    {service.desc}
                  </p>
                  <Link
                    to="/services"
                    className="mt-3 inline-flex w-fit text-sm font-semibold text-[#0075C4] transition group-hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Salt — New Section */}
      <motion.section
        className="bg-[#0F172A] py-12 md:py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            className="font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl"
            variants={fadeUp}
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2"
            variants={sectionStagger}
          >
            {whySalt.map((point) => (
              <motion.div
                key={point.heading}
                variants={fadeUp}
                whileHover={hoverLift}
                whileTap={hoverPress}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-colors hover:bg-white/10"
              >
                <div className="text-[#60A5FA]">
                  <point.icon className="h-12 w-12" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold uppercase text-white">
                  {point.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {point.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      {/* Awards Marquee */}
      <motion.section className="bg-[#F1F5F9] py-12 md:py-14">
        <motion.div
          className="mx-auto max-w-6xl px-4"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2
            className="text-3xl font-display font-extrabold uppercase leading-tight text-[#0F172A] md:text-4xl"
            variants={fadeUp}
          >
            Awards &amp; Recognition
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl text-sm text-[#4B5563] md:text-base"
            variants={fadeUp}
          >
            A look at some of what we have earned over 25 years.
          </motion.p>

          <motion.div className="relative mt-8" variants={fadeUp}>
            {/* Prev button */}
            <button
              onClick={() => handleAwardsScroll('prev')}
              aria-label="Previous awards"
              className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#E5E7EB] transition hover:bg-[#0064A8] hover:text-white hover:ring-[#0064A8] md:-left-5"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Scrollable awards strip */}
            <div
              ref={awardsScrollRef}
              className="no-scrollbar flex gap-4 overflow-x-scroll px-1 py-2"
              onMouseEnter={() => { awardsPausedRef.current = true }}
              onMouseLeave={() => { awardsPausedRef.current = false }}
              onTouchStart={() => { awardsPausedRef.current = true }}
              onTouchEnd={() => { awardsPausedRef.current = false }}
            >
              {[
                { alt: 'Fortinet Partner Award', src: '/Awards/Fortinet.png' },
                { alt: 'Salt Award', src: '/Awards/Award2.jpg' },
                { alt: 'PMR Africa Diamond Arrow Award', src: '/Awards/PMR1.png' },
                { alt: 'PMR Africa Award', src: '/Awards/PMR2.png' },
                { alt: 'Salt Award', src: '/Awards/Award5.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award6.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award7.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award8.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award9.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award10.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award11.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award12.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award13.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award14.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award15.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award16.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award17.jpg' },
                { alt: 'Fortinet Partner Award', src: '/Awards/Fortinet.png' },
                { alt: 'Salt Award', src: '/Awards/Award2.jpg' },
                { alt: 'PMR Africa Diamond Arrow Award', src: '/Awards/PMR1.png' },
                { alt: 'PMR Africa Award', src: '/Awards/PMR2.png' },
                { alt: 'Salt Award', src: '/Awards/Award5.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award6.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award7.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award8.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award9.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award10.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award11.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award12.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award13.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award14.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award15.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award16.jpg' },
                { alt: 'Salt Award', src: '/Awards/Award17.jpg' },
              ].map((award, index) => (
                <div
                  key={`${award.alt}-${index}`}
                  className="group/award relative flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E5E7EB] transition-all duration-200 hover:z-10 hover:-translate-y-[5px] hover:scale-[1.05] hover:shadow-xl hover:ring-[#0075C4] sm:h-56 sm:w-56 lg:h-64 lg:w-64"
                >
                  <img
                    src={award.src}
                    alt={award.alt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-95 transition-opacity duration-200 group-hover/award:opacity-100"
                  />
                </div>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => handleAwardsScroll('next')}
              aria-label="Next awards"
              className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#E5E7EB] transition hover:bg-[#0064A8] hover:text-white hover:ring-[#0064A8] md:-right-5"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Contact Strip */}
      <motion.section
        className="bg-[#F8FAFC] py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <motion.div
          className="mx-auto grid grid-cols-3 gap-3 px-4 md:gap-6"
          variants={sectionStagger}
        >
          {[
            {
              icon: Phone,
              label: 'Phone',
              value: '+264 61 433 9900',
            },
            {
              icon: Mail,
              label: 'Email',
              value: 'contact@salt.na',
            },
            {
              icon: MapPin,
              label: 'Address',
              value: '8 Ballot Street, Windhoek, Namibia',
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={hoverLift}
              whileTap={hoverPress}
              className="flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-lg md:p-6"
            >
              <div className="text-[#0064A8]">
                <item.icon className="h-6 w-6 md:h-10 md:w-10" />
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0075C4] md:mt-4 md:text-xs md:tracking-[0.22em]">
                {item.label}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-[#0F172A] md:mt-2 md:text-sm">
                {item.label === 'Phone' ? (
                  <a
                    href="tel:+264614339900"
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                  >
                    {item.value}
                  </a>
                ) : item.label === 'Email' ? (
                  <a
                    href="mailto:contact@salt.na"
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

