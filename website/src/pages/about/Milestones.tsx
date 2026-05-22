import { motion } from 'framer-motion'
import PageHero from '../../components/PageHero'
import AboutFlow, { AboutFlowFooter } from '../../components/AboutFlow'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const milestones = [
  { year: '2025', label: 'Fortinet SADC', side: 'right' },
  { year: '2025', label: 'Dell Technology', side: 'left' },
  { year: '2024', label: 'Four Diamond Arrow Awards - PMR Africa', side: 'right' },
  { year: '2023', label: 'Three Diamond Arrow Awards - PMR Africa', side: 'left' },
  { year: '2022', label: 'Three Diamond Arrow Awards - PMR Africa', side: 'right' },
  { year: '2021', label: 'Three Diamond Arrow Awards - PMR Africa', side: 'left' },
  { year: '2020', label: 'Three Diamond Arrow Awards - PMR Africa', side: 'right' },
  { year: '2020', label: 'Microsoft® Partner of the Year - Namibia', side: 'left' },
  { year: '2019', label: 'Three Diamond Arrow Awards - PMR Africa', side: 'right' },
  { year: '2019', label: 'Microsoft® Partner of the Year - Namibia', side: 'left' },
  { year: '2018', label: 'Diamond Arrow Award - PMR Africa', side: 'right' },
  { year: '2018', label: 'Microsoft® Partner of the Year - Namibia', side: 'left' },
  { year: '2016', label: 'Salt becomes the first Microsoft® CSP Tier 1 Partner in Namibia', side: 'right' },
  { year: '2016', label: 'Salt becomes the first Simplivity Gold Partner in Africa', side: 'left' },
  { year: '2015', label: 'Salt deploys the first Microsoft® Exchange online', side: 'right' },
  { year: '2013', label: 'Salt introduces hyper-convergence (Simplivity) to Africa', side: 'left' },
  { year: '2012', label: 'Salt becomes the first VMWare service Provider in Namibia', side: 'right' },
  { year: '2012', label: 'Salt becomes a Cisco Premier Partner', side: 'left' },
  { year: '2011', label: 'Salt becomes a Microsoft® Enterprise Direct Advisor', side: 'right' },
  { year: '2008', label: 'Salt provides the first Kaspersky hosted solution in Africa', side: 'left' },
  { year: '2008', label: 'Salt becomes a Cisco Select Partner', side: 'right' },
  { year: '2006', label: 'Salt deploys the first hosted email platform in Africa for MTC', side: 'left' },
  { year: '2004', label: 'Salt Becomes a Microsoft® Gold Partner', side: 'right' },
  { year: '2002', label: "Birth of Salt's Cloud Services", side: 'left' },
  { year: '1998', label: 'A Collision of Minds (An Idea is born)', side: 'right' },
]

export default function AboutMilestones() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Our Milestones | Salt Essential IT</title>
        <meta name="description" content="From our founding in 1998 to today — explore the key milestones and awards that mark Salt Essential IT's journey." />
      </Helmet>
      <PageHero
        title="Milestones"
        bgImage="/Sections/Milestone-Banner.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <AboutFlow />

<section
  className="relative overflow-hidden"
  style={{
    backgroundImage: 'url(/Sections/)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>

        {/* DESKTOP road strip */}
        <div
          className="absolute top-0 bottom-0 hidden md:block"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: '56px',
            background: '#1e293b',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 0 24px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: '3px',
              backgroundImage:
                'repeating-linear-gradient(to bottom, #c8a84b 0px, #c8a84b 24px, transparent 24px, transparent 44px)',
              opacity: 0.8,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              borderLeft: '1.5px solid rgba(255,255,255,0.1)',
              borderRight: '1.5px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* MOBILE road strip */}
        <div
          className="absolute top-0 bottom-0 block md:hidden"
          style={{
            left: '24px',
            width: '40px',
            background: '#1e293b',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 0 24px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: '2px',
              backgroundImage:
                'repeating-linear-gradient(to bottom, #c8a84b 0px, #c8a84b 20px, transparent 20px, transparent 38px)',
              opacity: 0.8,
            }}
          />
        </div>

        {/* Milestones */}
        <div className="relative flex flex-col py-16">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.side === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative flex items-center"
              style={{ minHeight: '88px' }}
            >
              {/* MOBILE layout */}
              <div className="flex md:hidden items-center w-full pl-4 pr-4">
                <div
                  className="flex-shrink-0 flex flex-col items-center z-10"
                  style={{ width: '40px' }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50% 50% 50% 0',
                      transform: 'rotate(-45deg)',
                      background: '#0064A8',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 8px rgba(29,78,216,0.4)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '7px',
                        height: '7px',
                        background: 'white',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                      }}
                    />
                  </div>
                </div>
                <div
                  className="ml-3 flex-1"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.06)',
                    borderLeft: '3px solid #0064A8',
                  }}
                >
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#0064A8', lineHeight: 1.2 }}>
                    {m.year}
                  </p>
                  <p style={{ fontSize: '12px', color: '#475569', marginTop: '3px', lineHeight: 1.4 }}>
                    {m.label}
                  </p>
                </div>
              </div>

              {/* DESKTOP layout */}
              <div className="hidden md:block w-full">
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50% 50% 50% 0',
                      transform: 'rotate(-45deg)',
                      background: '#0064A8',
                      border: '2.5px solid #ffffff',
                      boxShadow: '0 2px 10px rgba(29,78,216,0.4)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '9px',
                        height: '9px',
                        background: 'white',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                      }}
                    />
                  </div>
                  <div style={{ width: '2px', height: '8px', background: 'rgba(29,78,216,0.3)' }} />
                </div>

                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    height: '1px',
                    background: 'rgba(29,78,216,0.2)',
                    ...(m.side === 'left'
                      ? { right: 'calc(50% + 22px)', left: 'calc(50% - 280px)' }
                      : { left: 'calc(50% + 22px)', right: 'calc(50% - 280px)' }),
                  }}
                />

                <div
                  className="absolute"
                  style={{
                    width: '240px',
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.06)',
                    borderLeft: '3px solid #0064A8',
                    ...(m.side === 'left'
                      ? { right: 'calc(50% + 50px)' }
                      : { left: 'calc(50% + 50px)' }),
                  }}
                >
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#0064A8', lineHeight: 1.2 }}>
                    {m.year}
                  </p>
                  <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px', lineHeight: 1.45 }}>
                    {m.label}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Road end dot — mobile */}
        <div className="relative flex md:hidden pb-16" style={{ paddingLeft: '32px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#0064A8',
              border: '3px solid #ffffff',
              boxShadow: '0 0 0 5px rgba(29,78,216,0.15)',
            }}
          />
        </div>

        {/* Road end dot — desktop */}
        <div className="relative hidden md:flex justify-center pb-16">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#0064A8',
              border: '3px solid #ffffff',
              boxShadow: '0 0 0 6px rgba(29,78,216,0.15)',
            }}
          />
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-10">
        <div className="mx-auto max-w-6xl px-4">
          <AboutFlowFooter />
        </div>
      </section>
    </motion.div>
  )
}