import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DOMPurify from 'dompurify'
import emailjs from '@emailjs/browser'
import { Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const fadeLeft = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.932-1.956 1.888v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.8 7.77L23.2 22h-6.7l-4.17-5.3L7.5 22H4.4l7.37-8.42L2 2h6.8l3.76 4.79L18.9 2Zm-1.2 18h1.72L6.07 3.92H4.25L17.7 20Z" />
    </svg>
  )
}

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Sales',
  'Technical Support',
  'Other',
] as const

type EnquiryType = (typeof ENQUIRY_TYPES)[number] | ''

interface ContactFormValues {
  fullName: string
  email: string
  phone: string
  enquiryType: EnquiryType
  message: string
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      enquiryType: '',
      message: '',
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitStatus('loading')
    const sanitized = {
      fullName: DOMPurify.sanitize(values.fullName).trim(),
      email: DOMPurify.sanitize(values.email).trim(),
      phone: DOMPurify.sanitize(values.phone).trim(),
      enquiryType: DOMPurify.sanitize(values.enquiryType).trim(),
      message: DOMPurify.sanitize(values.message).trim(),
    }
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: sanitized.fullName,
          from_email: sanitized.email,
          from_phone: sanitized.phone || 'N/A',
          enquiry_type: sanitized.enquiryType || 'General Enquiry',
          message: sanitized.message,
          reply_to: sanitized.email,
          sent_date: new Date().toLocaleDateString('en-NA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSubmitStatus('success')
      reset({ fullName: '', email: '', phone: '', enquiryType: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setSubmitStatus('error')
    }
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
        <title>Contact Us | Salt Essential IT</title>
        <meta name="description" content="Get in touch with the Salt Essential IT team in Windhoek. Call +264 61 433 9900 or email contact@salt.na." />
      </Helmet>
      <PageHero
        title="Get In Touch"
        subtitle="Talk to us. We will work out how we can help."
        bgImage="/Sections/Salt-Pop-Red.jpg"
        className="bg-white"
        align="left"
        tone="light"
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">

          {/* Form */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold uppercase text-[#0F172A]">Send Us a Message</h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Fields marked <span className="text-red-500">*</span> are required.
            </p>

            {submitStatus === 'success' ? (
              <div className="mt-6 flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-base font-semibold text-[#0F172A]">Message sent!</p>
                <p className="text-sm text-[#64748B]">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-2 rounded-lg border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitStatus === 'error' && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                >
                  Something went wrong. Please try again or email{' '}
                  <a href="mailto:contact@salt.na" className="font-semibold underline">contact@salt.na</a>.
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-[#0F172A]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  {...register('fullName', { required: 'Please enter your full name.' })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#0F172A]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Please enter your email address.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address.',
                    },
                  })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-[#0F172A]">
                  Phone Number{' '}
                  <span className="text-[#94A3B8] font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+264 61 000 0000"
                  {...register('phone', {
                    pattern: {
                      value: /^[+\d\s\-().]{7,20}$/,
                      message: 'Please enter a valid phone number.',
                    },
                  })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Enquiry Type */}
              <div>
                <label htmlFor="enquiryType" className="block text-xs font-medium text-[#0F172A]">
                  Enquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="enquiryType"
                  {...register('enquiryType', { required: 'Please select an enquiry type.' })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                >
                  <option value="">Select a type…</option>
                  {ENQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.enquiryType && (
                  <p className="mt-1 text-xs text-red-600">{errors.enquiryType.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#0F172A]">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  {...register('message', {
                    required: 'Please enter a message.',
                    minLength: { value: 10, message: 'Message must be at least 10 characters.' },
                  })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0064A8] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:bg-[#0075C4] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
              >
                {submitStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitStatus === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase text-[#0F172A]">Contact Details</h2>
              <ul className="mt-4 space-y-3 text-xs">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                  <div>
                    <span className="block font-medium text-[#64748B]">Phone</span>
                    <a
                      href="tel:+264614339900"
                      className="font-semibold text-[#0F172A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-1"
                    >
                      +264 61 433 9900
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                  <div>
                    <span className="block font-medium text-[#64748B]">General</span>
                    <a
                      href="mailto:contact@salt.na"
                      className="font-semibold text-[#0F172A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-1"
                    >
                      contact@salt.na
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                  <div>
                    <span className="block font-medium text-[#64748B]">Sales</span>
                    <a
                      href="mailto:sales@salt.na"
                      className="font-semibold text-[#0F172A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-1"
                    >
                      sales@salt.na
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0064A8]" />
                  <div>
                    <span className="block font-medium text-[#64748B]">Address</span>
                    <span className="text-[#0F172A]">
                      8 Ballot Street
                      <br />
                      Windhoek, Namibia
                    </span>
                    <span className="mt-1 block text-[#64748B]">PO Box 22772, Windhoek</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative h-80 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
            >
              <iframe
                title="Salt Essential IT Location"
                src="https://www.google.com/maps?q=-22.5789907,17.0920381&z=15&output=embed"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl border-0"
              />
            </motion.div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#64748B]">Connect with us:</span>
              <a
                href="https://www.instagram.com/saltessentialit/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                aria-label="Salt on Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/saltessentialit"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                aria-label="Salt on Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/salt-essential-it-pty-ltd-/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                aria-label="Salt on LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCwh4TX_q4W05h0yOpz1D_hw"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                aria-label="Salt on YouTube"
              >
                <YouTubeIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/saltessentialit"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] transition hover:border-[#CBD5E1] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                aria-label="Salt on X"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
