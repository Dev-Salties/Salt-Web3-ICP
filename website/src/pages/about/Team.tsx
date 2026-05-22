import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import PageHero from '../../components/PageHero'
import AboutFlow, { AboutFlowFooter } from '../../components/AboutFlow'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

type TeamMember = {
  name: string
  role: string
  image: string
  motto?: string
  whyLove?: string
  bestPart?: string
}

const team: TeamMember[] = [
  {
    name: 'Adelheid Shikulo',
    role: 'Front Desk and Office Administrator',
    image: '/Salties/Heidi-1.jpg',
    motto: 'The only way to do great work is to love what you do.',
    whyLove: 'Allows me to manage work-life balance. This helps me to fulfill my personal and professional responsibilities better.',
    bestPart: 'I enjoy meeting new people daily from all walks of life and ensuring I build good relationships with clients.',
  },
  {
    name: 'Anja Farmer',
    role: 'Commercial Expansion Executive: SaaS & Services',
    image: '/Salties/Anja-1.jpg',
    motto: 'We may encounter many defeats but we must not be defeated.',
    whyLove: 'From the very first moment, Salt offered me the chance to learn something new every day, to strengthen skills I already had, and to find peace of mind in a consistent workflow.',
    bestPart: "I love that I'm encouraged to try new things out and be innovative.",
  },
  {
    name: 'Anri Minnie',
    role: 'Project Manager',
    image: '/Salties/Anri-2.jpg',
    motto: 'If you do what you love, you will not work a day in your life.',
    whyLove: 'Salt Essential IT embodies growth, empowerment and making an impact on the technology world.',
    bestPart: 'Facing challenges (and overcoming them), meeting new people every day, and being able to share my knowledge and expertise.',
  },
  {
    name: 'Arno Delport',
    role: 'Operations Manager',
    image: '/Salties/Arno.jpg',
    whyLove: 'The exposure.',
    bestPart: 'The industry is very dynamic and changes every day, therefore many opportunities are created.',
  },
  {
    name: 'Beaulah Isaacks',
    role: 'Commercial Expansion Supervisor',
    image: '/Salties/Beaulah.jpg',
    whyLove: 'We work hard and play hard.',
    bestPart: "Interaction, commitment and a Yes-we-can-do-it attitude. I enjoy transforming people's lives.",
  },
  {
    name: 'Benice Uaaka',
    role: 'Wealth & Talent Manager',
    image: '/Salties/Benice.jpg',
    motto: "Throw me to the wolves, and I'll return leading the pack.",
    whyLove: 'Company culture, goal-orientated leadership, room to grow.',
    bestPart: 'I can use my skills and knowledge as well as push myself in areas that I am unsure of myself.',
  },
  {
    name: 'Cathleen Kachilulwa',
    role: 'Customer Success Specialist',
    image: '/Salties/Cathleen.jpg',
    motto: 'A life spent helping others is a life filled with purpose.',
    whyLove: 'We live for a challenge and make a positive impact.',
    bestPart: "I am the gateway of the company. Every time an opportunity arises to bring a little sunshine into someone's day, I grab it with both hands and make it happen.",
  },
  {
    name: 'Christopher Swart',
    role: 'Commercial Expansion Manager',
    image: '/Salties/Chris.jpg',
    motto: 'Live life on the F.E.A.R. (Face Everything And Rise) philosophy.',
    whyLove: "We truly make a positive impact in the IT sphere and in each other's lives, and we NEVER back down from a challenge.",
    bestPart: 'I am not micromanaged in doing my job. My entire team is open to sharing their knowledge, equipping me to flourish.',
  },
  {
    name: 'Elario Muller',
    role: 'Commercial Expansion Development Executive: TKS & Services',
    image: '/Salties/Elario.jpg',
    motto: 'Do or do not, there is no try — a daily reminder to commit fully, show up with intention, and own the outcome.',
    whyLove: 'Perception shapes reality here, and that empowers authenticity, creativity, and bold thinking.',
    bestPart: 'Every day brings a new challenge and great growth opportunities.',
  },
  {
    name: 'Erastus Haihambo',
    role: 'Software Developer',
    image: '/Salties/Erastus.jpg',
    motto: 'Always leave the place better than you found it — solve with passion.',
    whyLove: "I love how people at Salt genuinely collaborate to solve problems. There's a strong sense of teamwork toward a shared purpose.",
    bestPart: 'What excites me most is working alongside talented, collaborative colleagues toward solutions that help others improve their daily lives or businesses.',
  },
  {
    name: 'Erkki Shaduka',
    role: 'Graphic Designer & Corporate Identity Officer',
    image: '/Salties/Erkki.jpg',
    motto: 'Embrace the journey, conquer the challenges.',
    whyLove: 'The collaborative atmosphere sparks endless inspiration. The supportive team fosters growth, making each project a fulfilling journey. Salt feels like home for unleashing my artistic passion.',
    bestPart: 'I love my graphic design job because it allows me to unleash creativity daily.',
  },
  {
    name: 'Ernst Khachab',
    role: 'Junior Empowerment Specialist',
    image: '/Salties/Ernest.jpg',
    motto: "The purpose is greater than me — and I'm ready to meet it.",
    whyLove: 'I love SALT because the culture is unmatched — teamwork, good vibes, and people who actually show up for each other.',
    bestPart: 'I get to empower people and support their growth, which makes the work feel meaningful and rewarding.',
  },
  {
    name: 'Frans Herle',
    role: 'Senior Network Specialist Infrastructure Services',
    image: '/Salties/Frans.jpg',
    motto: 'The mind is never exhausted by learning.',
    whyLove: 'Growth.',
    bestPart: 'I love that I get to plan, design, implement and structure network infrastructure for the business, dealing with complex support issues as part of a driven, multi-skilled team.',
  },
  {
    name: 'Grace Katjivena',
    role: 'Marketing and Communication Specialist',
    image: '/Salties/Grace.jpg',
    motto: 'Work for a cause, not for applause.',
    whyLove: 'Salt is a place of work that values and actively solicits your suggestions and opinions.',
    bestPart: 'Shaping meaningful narratives that highlight the value of the ICT industry and driving transformational change through strategic communication.',
  },
  {
    name: 'Hendrina Kayuhwa',
    role: 'Administrator: Talent Management',
    image: '/Salties/Hendrina.jpg',
    motto: 'Lead with purpose, grow with passion.',
    whyLove: 'The culture here is built on trust, empowerment, and a shared vision of growth — both for the company and for every individual.',
    bestPart: "Talent Management is more than just processes — it's about fostering a culture where individuals feel valued, supported, and empowered to grow.",
  },
  {
    name: 'Ivan Musuuo',
    role: 'Field Support Engineer',
    image: '/Salties/Ivan.jpg',
    motto: 'A Pinch of SALT can make Technology Explode!',
    whyLove: 'The knowledge transfer and teamwork that motivates me to do more.',
    bestPart: 'The opportunity to tackle difficult problems and discover new solutions.',
  },
  {
    name: 'James Sitali Chaka',
    role: 'Accountant: Accounts Receivables and Asset Management',
    image: '/Salties/James.jpg',
    motto: 'Precision and integrity build trust.',
    whyLove: 'Salt provides an environment where teamwork and growth are encouraged, and every contribution truly matters.',
    bestPart: "Ensuring accuracy in accounts receivable and building strong financial relationships that support the company's success.",
  },
  {
    name: 'Johan Meyer',
    role: 'Cloud Systems Administrator',
    image: '/Salties/Johan-Meyer.jpg',
    motto: 'Genius is one percent inspiration, ninety-nine percent perspiration — Thomas Edison.',
    whyLove: "I'm excited about what I can learn from the exposure I get by being here.",
    bestPart: 'Every day brings new challenges and opportunities, allowing one to constantly grow and aspire to new heights.',
  },
  {
    name: 'Johann van Rooyen',
    role: 'Technology Security Specialist',
    image: '/Salties/Johan-Van.jpg',
    motto: "If the plan doesn't work, change the plan, not the goal.",
    whyLove: 'Welcoming and fun.',
    bestPart: 'The dynamic nature of my role, the opportunity to make a meaningful impact on security posture, and the continuous learning and collaboration within the cybersecurity field.',
  },
  {
    name: 'Lindsay Rickerts',
    role: 'Accountant: Accounts Payables and General Administration',
    image: '/Salties/Lindsey.jpg',
    motto: 'Be kind whenever possible — no act of kindness, no matter how small, is ever wasted.',
    whyLove: "It's a place where innovation and collaboration thrive.",
    bestPart: 'My days are consistently fascinating and full of unpredictability.',
  },
  {
    name: 'Maggi DeWaal',
    role: 'Customer Success Manager',
    image: '/Salties/Maggy-3.jpg',
    motto: 'Strive to be of value.',
    whyLove: 'Work-life balance.',
    bestPart: "When our customers are happy, we're happy too. Our success is intricately tied to the satisfaction and success of those we serve.",
  },
  {
    name: 'Maria Matheus',
    role: 'Our Office Manager',
    image: '/Salties/Meme-Maria.jpg',
    motto: 'Helping the Salties not to sweat the small stuff.',
    whyLove: 'The genuine respect and recognition extended to every role within the organization.',
    bestPart: "Nothing is more rewarding than seeing all your hard work and witnessing the joy on the Salties' faces as they enter their clean, well-kept environment.",
  },
  {
    name: 'Michaela Filipovic',
    role: 'Billing Administrator',
    image: '/Salties/Michaela-1.jpg',
    motto: 'Change is the only constant.',
    whyLove: 'I love the corporate culture here. There is so much unity and diversity.',
    bestPart: 'The constant opportunity for personal and professional growth. Each day presents a chance to learn something new, keeping my role dynamic and engaging.',
  },
  {
    name: 'Peter- George Mannel',
    role: 'Cloud Systems Administrator (Currently on a Sabbatical)',
    image: '/Salties/PG.jpg',
    motto: 'Be a better person than yesterday and treat others as you would like to be treated.',
    whyLove: 'Salt is forward-thinking and takes pride in the service it renders, making us different from any other provider.',
    bestPart: 'Regularly given the chance to digitally transform businesses — helping them work smarter, better and from anywhere, particularly in Microsoft Cloud.',
  },
  {
    name: 'Precious Naris',
    role: 'Commercial Expansion Support Officer',
    image: '/Salties/Precious.jpg',
    motto: 'Be kind, for everyone you meet is fighting a hard battle. Be the reason they smile.',
    whyLove: 'It is very dynamic and unique. You get to interact and work with all departments. Growth is assured.',
    bestPart: 'Feels like home! So much warmth, awesome individuals and game changers. Technology can change overnight, but the Salties remain the same. Never a dull moment.',
  },
  {
    name: 'Presley van Neel',
    role: 'Technology Center Manager',
    image: '/Salties/Presley.jpg',
    motto: 'Hardwork always trumps talent when talent does not work hard.',
    whyLove: 'The culture cannot be matched anywhere I have been before — it is inclusive, welcoming, and feels like family.',
    bestPart: 'I get to make a real difference in the lives of our customers and help shape the customer experience.',
  },
  {
    name: 'Rakkel Iithete',
    role: 'Commercial Expansion Development Executive: Licensing & Solutions',
    image: '/Salties/Rakkel.jpeg',
    motto: 'Be You! You are enough.',
    whyLove: 'I felt at home from day one — work-life balance, amazing company culture, brilliant team of leaders.',
    bestPart: "Listening to our customers' needs and playing a pivotal role in enabling and empowering them. It's about revolutionizing their experiences for the better.",
  },
  {
    name: 'Sonja Coetzer',
    role: 'Managing Director',
    image: '/Salties/Sonja.jpg',
    motto: 'Live life truly.',
    whyLove: 'There is no place like Salt where brilliance is an everyday occurrence.',
    bestPart: "Witnessing the diverse talents and perspectives coming together to tackle challenges and drive the company's vision forward is truly fulfilling.",
  },
  {
    name: 'Uanjandisa Rukoro',
    role: 'Junior Technical Engineer',
    image: '/Salties/Rukoro-2.jpg',
    motto: 'The more I learn, the less I know.',
    whyLove: 'Salt Essential IT fosters a culture of innovation, collaboration, and growth.',
    bestPart: 'I enjoy the dynamic nature of my role, which constantly pushes me to adapt, think critically, and solve complex problems.',
  },
  {
    name: 'Vanessa Maresch',
    role: 'Empowerment Specialist',
    image: '/Salties/Vanessa.jpg',
    motto: 'Inspire and Empower.',
    whyLove: "Salt's values mirror my own — freedom allowing for more innovation.",
    bestPart: 'Making an impact, changing the way people work for the better. I love digitally transforming teams and individuals in Namibia and beyond.',
  },
  {
    name: 'Ronnel Mwiya',
    role: 'Developer Trainee',
    image: '/Salties/Ronnel.jpg',
  },
  {
    name: 'Walter Ihms',
    role: 'Commercial Expansion Executive: Infrastructure & Services',
    image: '/Salties/Walter.jpg',
    motto: "You are different. And that's your power.",
    whyLove: "Every day, I'm inspired by the passion and expertise of my colleagues and the meaningful impact we create together.",
    bestPart: "It's not just a job — it's a journey of growth, impact, and fulfillment that keeps me excited and motivated.",
  },
]

export default function AboutTeam() {
  const reduceMotion = useReducedMotion()
  const [activeCard, setActiveCard] = useState<string | null>(null)

  // True only on devices that support genuine hover (desktop/laptop)
  // Prevents mobile browsers firing mouseleave after a tap and instantly closing the card
  const supportsHover =
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  // Small debounce so moving between adjacent cards doesn't briefly flash null (backdrop flicker)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Dismiss when clicking outside any card
  useEffect(() => {
    function handleDocClick() {
      setActiveCard(null)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)', scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
    },
  }

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Meet the Team | Salt Essential IT</title>
        <meta name="description" content="Meet the Salties — the tight-knit team of IT professionals behind Salt Essential IT in Windhoek, Namibia." />
      </Helmet>
      <PageHero
        title="Meet the Salties"
        bgImage="/Sections/Salt-header-cap.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <AboutFlow />

      {/* Section is position:relative so the blur backdrop is scoped here */}
      <section className="relative py-14 md:py-16">

        {/* Blur backdrop — covers the section, sits below the active card */}
        <AnimatePresence>
          {activeCard !== null && (
            <motion.div
              className="absolute inset-0 z-20 cursor-pointer bg-black/40 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveCard(null)}
            />
          )}
        </AnimatePresence>

        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A] md:text-2xl">
                Our team
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => {
              const hasContent = Boolean(member.motto || member.whyLove || member.bestPart)
              const isActive = activeCard === member.name

              return (
                // Outer wrapper — pops forward above the blur backdrop when active
                <motion.div
                  key={`${member.name}-${member.role}`}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: isActive ? 1.08 : 1,
                          boxShadow: isActive
                            ? '0 28px 56px rgba(0,0,0,0.45)'
                            : '0 1px 3px rgba(0,0,0,0.08)',
                        }
                  }
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  style={{ zIndex: isActive ? 30 : 'auto', position: 'relative' }}
                >
                  {/* Inner article — overflow-hidden removed so overlay can grow beyond image height */}
                  <motion.article
                    variants={reduceMotion ? undefined : cardVariants}
                    initial={reduceMotion ? false : 'hidden'}
                    whileInView={reduceMotion ? undefined : 'visible'}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={reduceMotion ? undefined : { delay: (idx % 8) * 0.03 }}
                    className={[
                      'group relative rounded-2xl bg-[#E5E7EB]',
                      hasContent ? 'cursor-pointer' : '',
                    ].join(' ')}
                    onMouseEnter={() => {
                      if (!supportsHover || !hasContent) return
                      if (leaveTimer.current) clearTimeout(leaveTimer.current)
                      setActiveCard(member.name)
                    }}
                    onMouseLeave={() => {
                      if (!supportsHover) return
                      leaveTimer.current = setTimeout(() => setActiveCard(null), 80)
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!hasContent) return
                      setActiveCard(prev => prev === member.name ? null : member.name)
                    }}
                  >
                    {/* Image in its own clipping wrapper so corners stay rounded */}
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Photo gradient — scoped to image height only */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-64 rounded-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Name / role badge — fades out when overlay opens */}
                    <AnimatePresence>
                      {!isActive && (
                        <motion.div
                          key="badge"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.12 } }}
                          className="absolute inset-x-0 bottom-0 p-4"
                        >
                          <div className="w-full rounded-md bg-black/50 px-3 py-2 text-left text-xs text-white backdrop-blur">
                            <div className="break-words text-sm font-semibold leading-snug">
                              {member.name}
                            </div>
                            <div className="mt-0.5 break-words text-[11px] leading-snug text-[#E5E7EB]">
                              {member.role}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Focus overlay — sits on top of the photo and grows downward to fit all content */}
                    {hasContent && (
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="overlay"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            className="absolute inset-x-0 top-0 z-10 rounded-2xl bg-[#0C1525] shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Thin brand accent bar at top */}
                            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-[#1E3A8A] via-[#0064A8] to-[#0075C4]" />

                            <div className="p-4">
                              {/* Name + role */}
                              <div className="mb-3.5 border-b border-white/10 pb-3">
                                <p className="text-sm font-bold leading-snug text-white">
                                  {member.name}
                                </p>
                                <p className="mt-0.5 text-[10px] leading-snug text-[#60A5FA]">
                                  {member.role}
                                </p>
                              </div>

                              <div className="space-y-3.5">
                                {member.motto && (
                                  <div>
                                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                                      Personal motto
                                    </p>
                                    <p className="text-[11px] italic leading-relaxed text-white/75">
                                      "{member.motto}"
                                    </p>
                                  </div>
                                )}

                                {member.whyLove && (
                                  <div>
                                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                                      Why I love Salt
                                    </p>
                                    <p className="text-[11px] leading-relaxed text-white/75">
                                      {member.whyLove}
                                    </p>
                                  </div>
                                )}

                                {member.bestPart && (
                                  <div>
                                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                                      What I love best
                                    </p>
                                    <p className="text-[11px] leading-relaxed text-white/75">
                                      {member.bestPart}
                                    </p>
                                  </div>
                                )}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.article>
                </motion.div>
              )
            })}
          </div>
          <AboutFlowFooter />
        </div>
      </section>
    </motion.div>
  )
}
