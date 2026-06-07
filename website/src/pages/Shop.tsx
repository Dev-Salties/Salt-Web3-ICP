import { useState, useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import EnquiryModal from '../components/EnquiryModal'
import { Helmet } from 'react-helmet-async'
import { fetchProducts } from '../lib/products'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const hoverLift = {
  y: -6,
  transition: { type: 'spring' as const, stiffness: 320, damping: 24 },
}

const hoverPress = {
  scale: 0.98,
}

type StaticProduct = {
  title: string
  price: string
  desc: string
  image: string
}

const staticProducts: StaticProduct[] = [
  {
    title: 'Acronis BackUp of M365 per Seat',
    price: 'N$38.00',
    desc: 'Back up your Microsoft 365 data to the Acronis Cloud with unlimited storage.',
    image: '/Products/Acronis BackUp of M365 per Seat.jpg',
  },
  {
    title: 'Apprada Ratings Application',
    price: 'N$5.75',
    desc: 'Authentic appraisals and real-time ratings. Price is per user, per month. Once-off setup fee of N$10,000.',
    image: '/Products/Apprada.png',
  },
  {
    title: 'Checkpoint',
    price: 'N$26.72',
    desc: 'Advanced cybersecurity software protecting your business against threats across network, cloud, and endpoints.',
    image: '/Products/Checkpoint.jpg',
  },
  {
    title: 'Defender Plan 1',
    price: 'N$47.52',
    desc: 'Enterprise endpoint security platform designed to help businesses prevent, detect, investigate, and respond to advanced threats with industry-leading antimalware and antivirus.',
    image: '/Products/Defender 1.jpg',
  },
  {
    title: 'Defender Plan 2',
    price: 'N$83.16',
    desc: "Everything in Plan 1 plus endpoint behavioural sensors embedded in Windows 10, combined with Microsoft's robust cloud service for enhanced threat detection and response.",
    image: '/Products/Defender Plan 2.jpg',
  },
  {
    title: 'Domain Name Hosting',
    price: 'N$470.22',
    desc: "Your website's equivalent of a physical address. Helps users find your site easily without needing its IP address. Does not include email hosting.",
    image: '/Products/Domain Name Hosting.jpg',
  },
  {
    title: 'Harmony - Endpoint Management pre-defined system for 1000 endpoints',
    price: 'N$2,805.00',
    desc: 'For assistance from one of our engineers in setting up this service please contact sales@salt.na for a quotation.',
    image: '/Products/Harmony - Endpoint Management pre-defined system for 1000 endpoints.jpg',
  },
  {
    title: 'Microsoft 365 F1',
    price: 'N$110.40',
    desc: 'Microsoft 365 for frontline workers, including web and mobile Office apps, Microsoft Teams, and core security features.',
    image: '/Products/download.jpg',
  },
  {
    title: 'Quantum Security Gateway - 3600 Base Appliance with SandBlast subscription package for 1 year- Demo',
    price: 'N$2,580.00',
    desc: 'For assistance from one of our engineers in setting up this service please contact sales@salt.na for a quotation.',
    image: '/Products/Quantum Security Gateway - 3600 Base Appliance with SandBlast subscription package for 1 year- Demo.jpg',
  },
  {
    title: 'Virtual Server / Machine',
    price: 'N$1,265.12',
    desc: "Virtual server with 2x 2GHz Processors, 4GB RAM, and 100GB Disk Space. Hosted in Salt's Windhoek Data Centre.",
    image: '/Products/Virtual Server  Machine.jpg',
  },
  {
    title: 'Windows 10/11 Enterprise E3',
    price: 'N$126.00',
    desc: 'Windows 10/11 Enterprise E3 subscription licence with advanced device management and security features.',
    image: '/Products/Windows 1011 Enterprise E3.jpg',
  },
  {
    title: 'Windows 10/11 Enterprise E3 VDA',
    price: 'N$237.60',
    desc: 'Windows 10/11 Enterprise E3 with Virtual Desktop Access for users accessing Windows from non-Windows devices.',
    image: '/Products/Windows 1011 Enterprise E3 VDA.jpg',
  },
  {
    title: 'Windows 10/11 Enterprise E5',
    price: 'N$198.00',
    desc: 'Windows 10/11 Enterprise E5 with enhanced security, compliance, and analytics capabilities.',
    image: '/Products/Windows 1011 Enterprise E5.jpg',
  },
  {
    title: 'Add On CPU for Virtual Server',
    price: 'N$207.11',
    desc: 'Additional CPU Core @ 4 GHz for your Virtual Server. Handles processing tasks and delegates resource requests across RAM and storage.',
    image: '/Products/Add On CPU for Virtual Server.jpg',
  },
  {
    title: 'Microsoft 365 F3',
    price: 'N$82.80',
    desc: 'Microsoft 365 for frontline workers with full desktop Office apps, advanced security, and compliance tools.',
    image: '/Products/download1.png',
  },
  {
    title: 'Veeam BackUp Cloud Connect',
    price: 'N$38.00',
    desc: "Locally hosted backups of your data in Salt's Windhoek Data Centres, manageable and scalable with access to your own management portal.",
    image: '/Products/Veeam BackUp Cloud Connect.jpg',
  },
]

type UiProduct = {
  title: string
  price: string
  desc: string
  image: string
  enquiryUrl?: string
}

function mergeProducts(dynamicProducts: UiProduct[], fallbackProducts: UiProduct[]) {
  const byTitle = new Map<string, UiProduct>()

  for (const product of dynamicProducts) {
    if (product.title) {
      byTitle.set(product.title.trim().toLowerCase(), product)
    }
  }

  for (const product of fallbackProducts) {
    const key = product.title?.trim().toLowerCase()
    if (key && !byTitle.has(key)) {
      byTitle.set(key, product)
    }
  }

  return Array.from(byTitle.values())
}

export default function Shop() {
  const reduceMotion = useReducedMotion()
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: string } | null>(null)
  const [dynamicProducts, setDynamicProducts] = useState<UiProduct[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        const backendProducts = await fetchProducts()

        const mapped: UiProduct[] = backendProducts.map((p) => ({
          title: p.name,
          price: p.price,
          desc: p.description,
          image: p.imageUrl,
          enquiryUrl: p.enquiryUrl,
        }))

        if (!cancelled) {
          setDynamicProducts(mapped)
        }
      } catch (err) {
        console.warn('[Shop] Failed to load backend products. Using static fallback only.', err)
        if (!cancelled) {
          setDynamicProducts([])
        }
      }
    }

    void loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  const products = useMemo(
    () => mergeProducts(dynamicProducts, staticProducts),
    [dynamicProducts],
  )

  return (
    <>
      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <motion.div
        variants={pageFade}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
        className="bg-[#F8FAFC]"
      >
        <Helmet>
          <title>IT Products & Licensing | Salt Essential IT</title>
          <meta
            name="description"
            content="Browse Microsoft 365, Azure, security, and backup software solutions available from Salt Essential IT."
          />
        </Helmet>

        <PageHero
          title="Salt Shop"
          bgImage="/Sections/Salt-Pop-Red.jpg"
          className="bg-white"
          align="left"
          tone="light"
        />

        <section className="bg-[#F8FAFC] pb-16 pt-4">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex items-start gap-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs text-[#1E293B]">
              <Info className="mt-0.5 h-4 w-4 text-[#0064A8]" />
              <p>
                Browse and purchase directly. For enterprise pricing contact{' '}
                <a
                  href="mailto:sales@salt.na"
                  className="font-semibold text-[#0064A8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  sales@salt.na
                </a>
                .
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <motion.div
                  key={product.title}
                  whileHover={reduceMotion ? undefined : hoverLift}
                  whileTap={reduceMotion ? undefined : hoverPress}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow hover:border-[#0075C4]/15 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#93C5FD] focus-within:ring-offset-2"
                >
                  <div className="relative w-full bg-white overflow-hidden">
                    <div className="aspect-[16/10] w-full" />

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-snug text-[#0F172A]">
                        {product.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#0064A8] ring-1 ring-[#DBEAFE]">
                        {product.price}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-sm text-[#64748B]">
                      {product.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          setSelectedProduct({
                            title: product.title,
                            price: product.price,
                          })
                        }
                        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0064A8] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                      >
                        Buy Now
                      </button>

                      <Link
                        to={product.enquiryUrl || '/contact'}
                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}