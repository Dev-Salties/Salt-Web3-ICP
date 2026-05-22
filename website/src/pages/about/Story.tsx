import { motion } from 'framer-motion'
import PageHero from '../../components/PageHero'
import AboutFlow, { AboutFlowFooter } from '../../components/AboutFlow'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Story() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      <Helmet>
        <title>What We Do | Salt Essential IT</title>
        <meta name="description" content="What Salt Essential IT does and how we do it. Cloud, security, support, consulting and more for Namibian businesses since 1998." />
      </Helmet>

      <PageHero
        title="What We Do"
        bgImage="/Sections/Salt-header-cap.jpg"
        align="left"
        tone="light"
      />

      <AboutFlow />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-10 text-[#374151]">

          <section id="who-we-are">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Who We Are
            </h2>
            <p className="text-sm leading-relaxed">
              Just like the chemical element and meal condiment we share our brand name with, we are the essential ingredient that preserves, flavours and heals. Salt provides the collaboration, connectivity and support services that keep your business running at its best.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Although our list of products and services is extensive, we are in the business of deploying technology to match and streamline business processes with business strategies. We are fully focused on the humans inside the businesses who will ultimately be using these technologies. The latest, smartest technology is pretty pointless when it does not add measurable business value or is not used optimally. We only do things that make your business better.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              A business partnership with us is worth more than its weight in salt. Let our people enable your people.
            </p>
          </section>

          <section id="cloud">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Cloud &amp; Microsoft
            </h2>
            <p className="text-sm leading-relaxed">
              Salt has always been about cloud, even before the term was coined. Over the past two-plus decades we have become a multiple award winner, providing technology to our customers that opens a whole new world of possibilities for the business and its employees: to work better, faster and more productively from anywhere.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              We have moved from single to multiple Data Centres, from dedicated servers to virtualisation, from simple back-up through disaster recovery to full business continuity. Through all of it, Microsoft has been the one constant. Now Microsoft is 365 and Salt is embracing it fully: Exchange Online, Teams, SharePoint and the entire modern workplace stack.
            </p>
          </section>

          <section id="empowerment">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Collaboration &amp; Empowerment
            </h2>
            <p className="text-sm leading-relaxed">
              Working remotely has never been easier. Choosing the right platform to do it on has never been harder. Most people are juggling five or more apps on their devices for communication and collaboration alone. Each one of those platforms is a potential door for your data to walk out of.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              We advise on the best possible way for your people to work productively and securely from anywhere, at any time, on any device. No more juggling platforms or worrying about who has access to what.
            </p>
            <img
              src="/Internal/Empowerment.jpg"
              alt="Collaboration and Empowerment"
              className="mt-6 w-full rounded-xl object-cover"
              loading="lazy"
            />
          </section>

          <section id="security">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Digital Security
            </h2>
            <p className="text-sm leading-relaxed">
              Between the Nigerian princes, Russian mobsters, angry ex-employees and the clever teenage hacker down the street. Your online presence puts you at risk, all the time. A computer is attacked in one way or another every 21 seconds. The more connected we become, the more attractive a target we are.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              There is no defence better than properly trained and vigilant employees. We help you create simulated phishing campaigns to test your users, build cyber awareness of the latest scams, and protect your assets with the best security technology available. Your last line of defence is your people. We make sure they are ready.
            </p>
            <img
              src="/Internal/Digital-Security.jpg"
              alt="Digital Security"
              className="mt-6 w-full rounded-xl object-cover"
              loading="lazy"
            />
          </section>

          <section id="automation">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Automation
            </h2>
            <p className="text-sm leading-relaxed">
              It is possible to transform all your traditional business processes into digital ones. It reduces your carbon footprint and saves you a fortune by allowing machines to do the costly, manual heavy lifting. From leave processes to online purchasing, automated provisioning of services to AI-powered assistance replacing repetitive admin tasks.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              We help you understand how machine learning and artificial intelligence can work in your business to increase profitability by reducing costs, deepening customer engagement and increasing sales efforts. This frees your people to focus on the things that actually need a human.
            </p>
            <img
              src="/Internal/Automation.jpg"
              alt="Automation"
              className="mt-6 w-full rounded-xl object-cover"
              loading="lazy"
            />
          </section>

          <section id="continuity">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Business Continuity
            </h2>
            <p className="text-sm leading-relaxed">
              Technology has transformed how businesses run. Until it stops working, of course. Salt offers a broad value chain of on-premises and cloud services that ensures you can continue without missing a beat when things go wrong.
            </p>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: 'Data',
                  items: [
                    'Data Centre Hosting on Virtual Servers, Physical Servers and Network Equipment',
                    'Data Storage, Backup and Recovery Solutions',
                    'Cloud Email Archiving',
                  ],
                },
                {
                  title: 'Security',
                  items: [
                    'Intrusion Prevention with virtual and physical firewall options',
                    'Hosted Security Reporting',
                    'Sendmarc: Domain-based Message Authentication, Reporting and Conformance',
                  ],
                },
                {
                  title: 'Monitoring',
                  items: [
                    'Hardware, software and systems monitoring with proactive alerts',
                    'Ransomware Protection Services',
                    'Fully Managed Secure SD-WAN Solutions',
                  ],
                },
              ].map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-[#0F172A] mb-2">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#3B82F6]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <img
              src="/Internal/Businness-Continuity.jpg"
              alt="Business Continuity"
              className="mt-6 w-full rounded-xl object-cover"
              loading="lazy"
            />
          </section>

          <section id="support">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Support Services
            </h2>
            <p className="text-sm leading-relaxed">
              The ICT field is vast and becoming ever more complex. If technology is unavailable, your business can lose money or, more importantly, its customers.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Salt has been providing support services to the Namibian business community for almost three decades. From the Network Point to Access Control, from the Desktop to the Server, from the Switch to the Firewall, from the Internet to the Cloud. We have seen and done it all. Our services are available 24/7/365, which means our customers reach our team even after hours and on public holidays.
            </p>
          </section>

          <section id="consulting">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Business Consulting
            </h2>
            <p className="text-sm leading-relaxed">
              Salt's consulting arm provides services related to enterprise platform planning, migrations, advanced technology, distributed network architecture and customised client solutions. At every stage of the IT life cycle, customers can count on Salt consultants to turn their vision into a real, working and profitable outcome.
            </p>
            <ul className="mt-4 space-y-1.5">
              {[
                'IT Strategy Consulting',
                'IT Organisation Consulting',
                'IT Infrastructure Planning, Architecture and Design',
                'Implementation and Project Management Services',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#3B82F6]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="customer-success">
            <h2 className="text-lg font-bold uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-2 mb-4">
              Customer Success
            </h2>
            <p className="text-sm leading-relaxed">
              Salt actively pursues Customer Success Management as an essential part of every Service Level Agreement. This function is dedicated to monitoring quality of service and customer experience. Responses to customer requests are recorded and inspected for quality daily by staff dedicated to quality assurance.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Regular meetings are held with each client on a Service Level Agreement. The objective is for Salt to step back and evaluate things from the client's perspective. Existing customers have expressed nothing but appreciation for this. It contributes to proactive problem-solving, enables a true partnership and strengthens communication between the customer and ourselves.
            </p>
          </section>

        </div>

        <AboutFlowFooter />
      </div>
    </motion.div>
  )
}
