import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DOMPurify from 'dompurify'
import emailjs from '@emailjs/browser'
import { Loader2, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const YEARS_OF_STUDY = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Honours',
  'Masters',
  'PhD',
  'Graduate / Other',
] as const

const AREAS_OF_INTEREST = [
  'Cloud & Azure',
  'Cybersecurity',
  'IT Support',
  'Business Consulting',
  'Collaboration & Communication',
  'Not Sure Yet',
] as const

const AVAILABILITY_OPTIONS = [
  'Immediately',
  'Within 1 Month',
  'Within 3 Months',
  '6 Months+',
] as const

const REFERRAL_OPTIONS = [
  'University / Lecturer',
  'Social Media',
  'Friend or Colleague',
  'Salt Website',
  'Job Board',
  'Other',
] as const

type YearOfStudy = (typeof YEARS_OF_STUDY)[number] | ''
type AreaOfInterest = (typeof AREAS_OF_INTEREST)[number] | ''
type Availability = (typeof AVAILABILITY_OPTIONS)[number] | ''
type Referral = (typeof REFERRAL_OPTIONS)[number] | ''

interface SeedFormValues {
  fullName: string
  email: string
  phone: string
  university: string
  fieldOfStudy: string
  yearOfStudy: YearOfStudy
  areaOfInterest: AreaOfInterest
  availability: Availability
  linkedin: string
  referral: Referral
  message: string
}

export default function Seed() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SeedFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      university: '',
      fieldOfStudy: '',
      yearOfStudy: '',
      areaOfInterest: '',
      availability: '',
      linkedin: '',
      referral: '',
      message: '',
    },
  })

  const onSubmit = async (values: SeedFormValues) => {
    setSubmitStatus('loading')
    const s = {
      fullName: DOMPurify.sanitize(values.fullName).trim(),
      email: DOMPurify.sanitize(values.email).trim(),
      phone: DOMPurify.sanitize(values.phone).trim(),
      university: DOMPurify.sanitize(values.university).trim(),
      fieldOfStudy: DOMPurify.sanitize(values.fieldOfStudy).trim(),
      yearOfStudy: DOMPurify.sanitize(values.yearOfStudy).trim(),
      areaOfInterest: DOMPurify.sanitize(values.areaOfInterest).trim(),
      availability: DOMPurify.sanitize(values.availability).trim(),
      linkedin: DOMPurify.sanitize(values.linkedin).trim(),
      referral: DOMPurify.sanitize(values.referral).trim(),
      message: DOMPurify.sanitize(values.message).trim(),
    }
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_SEED_TEMPLATE_ID,
        {
          from_name: s.fullName,
          from_email: s.email,
          from_phone: s.phone || 'N/A',
          enquiry_type: 'SEED Programme Application',
          message: [
            `University: ${s.university}`,
            `Field of Study: ${s.fieldOfStudy}`,
            `Year of Study: ${s.yearOfStudy || 'N/A'}`,
            `Area of Interest: ${s.areaOfInterest || 'N/A'}`,
            `Availability: ${s.availability || 'N/A'}`,
            `LinkedIn: ${s.linkedin || 'N/A'}`,
            `Heard About SEED: ${s.referral || 'N/A'}`,
            ``,
            `About the Applicant:`,
            s.message,
          ].join('\n'),
          reply_to: s.email,
          sent_date: new Date().toLocaleDateString('en-NA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSubmitStatus('success')
      reset()
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
        <title>SEED Programme | Salt Essential IT</title>
        <meta name="description" content="Salt's SEED Programme bridges the gap between academia and the IT industry for Namibian students and graduates." />
      </Helmet>
      {/* Hero */}
      <PageHero
        title="Salt SEED Programme"
        bgImage="/Sections/Section-purp.jpg"
        className="bg-[#EFF6FF]"
        align="left"
        tone="light"
      />
      {/* Benefits + Form */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] md:items-start">

          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[#0F172A] md:text-3xl">
              Why Join SEED?
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Real-World Experience',
                  desc: 'Work on live projects with Salt engineers and consultants.',
                },
                {
                  title: 'Microsoft Cloud Skills',
                  desc: 'Gain hands-on experience with Azure and Microsoft 365.',
                },
                {
                  title: 'Career Development',
                  desc: 'Build a real portfolio and get introduced to people in the industry.',
                },
                {
                  title: 'Industry Network',
                  desc: 'Meet people working in tech across Namibia.',
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-sm text-[#374151] shadow-sm"
                >
                  <h3 className="text-sm font-semibold uppercase text-[#0F172A]">{benefit.title}</h3>
                  <p className="mt-2 text-xs text-[#64748B]">{benefit.desc}</p>
                </div>
              ))}
            </div>
            <img
              src="/Internal/Seedling.jpg"
              alt="Growing together — Salt SEED Programme"
              className="mt-10 w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>

          {/* Application Form */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold uppercase text-[#0F172A]">
              Apply to the SEED Programme
            </h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Fields marked <span className="text-red-500">*</span> are required.
            </p>

            {submitStatus === 'success' ? (
              <div className="mt-6 flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-base font-semibold text-[#0F172A]">Application submitted!</p>
                <p className="text-sm text-[#64748B]">We'll be in touch with you shortly.</p>
              </div>
            ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitStatus === 'error' && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                  Something went wrong. Please try again or email{' '}
                  <a href="mailto:seed@salt.na" className="font-semibold underline">seed@salt.na</a>.
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
                  {...register('fullName', {
                    required: 'Please enter your full name.',
                    minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                  })}
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
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+264 81 000 0000"
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

              {/* University */}
              <div>
                <label htmlFor="university" className="block text-xs font-medium text-[#0F172A]">
                  University / Institution <span className="text-red-500">*</span>
                </label>
                <input
                  id="university"
                  type="text"
                  {...register('university', {
                    required: 'Please enter your university or institution.',
                    minLength: { value: 2, message: 'Please enter a valid institution name.' },
                  })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.university && (
                  <p className="mt-1 text-xs text-red-600">{errors.university.message}</p>
                )}
              </div>

              {/* Field of Study + Year of Study — side by side on wider screens */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fieldOfStudy" className="block text-xs font-medium text-[#0F172A]">
                    Field of Study <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fieldOfStudy"
                    type="text"
                    placeholder="e.g. Computer Science"
                    {...register('fieldOfStudy', {
                      required: 'Please enter your field of study.',
                      minLength: { value: 2, message: 'Please enter a valid field of study.' },
                    })}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                  />
                  {errors.fieldOfStudy && (
                    <p className="mt-1 text-xs text-red-600">{errors.fieldOfStudy.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="yearOfStudy" className="block text-xs font-medium text-[#0F172A]">
                    Year of Study <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    {...register('yearOfStudy', { required: 'Please select your year of study.' })}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                  >
                    <option value="">Select…</option>
                    {YEARS_OF_STUDY.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  {errors.yearOfStudy && (
                    <p className="mt-1 text-xs text-red-600">{errors.yearOfStudy.message}</p>
                  )}
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label htmlFor="areaOfInterest" className="block text-xs font-medium text-[#0F172A]">
                  Area of Interest <span className="text-red-500">*</span>
                </label>
                <select
                  id="areaOfInterest"
                  {...register('areaOfInterest', { required: 'Please select an area of interest.' })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                >
                  <option value="">Select…</option>
                  {AREAS_OF_INTEREST.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.areaOfInterest && (
                  <p className="mt-1 text-xs text-red-600">{errors.areaOfInterest.message}</p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-xs font-medium text-[#0F172A]">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  id="availability"
                  {...register('availability', { required: 'Please select your availability.' })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                >
                  <option value="">Select…</option>
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.availability && (
                  <p className="mt-1 text-xs text-red-600">{errors.availability.message}</p>
                )}
              </div>

              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className="block text-xs font-medium text-[#0F172A]">
                  LinkedIn Profile{' '}
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  {...register('linkedin', {
                    pattern: {
                      value: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
                      message: 'Please enter a valid LinkedIn URL.',
                    },
                  })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                />
                {errors.linkedin && (
                  <p className="mt-1 text-xs text-red-600">{errors.linkedin.message}</p>
                )}
              </div>

              {/* How did you hear about SEED */}
              <div>
                <label htmlFor="referral" className="block text-xs font-medium text-[#0F172A]">
                  How did you hear about SEED?{' '}
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <select
                  id="referral"
                  {...register('referral')}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#0064A8] focus:outline-none focus:ring-1 focus:ring-[#0064A8]"
                >
                  <option value="">Select…</option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* About yourself */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#0F172A]">
                  Tell us about yourself <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Share your background, goals, and why you want to join the SEED Programme…"
                  {...register('message', {
                    required: 'Please tell us a little about yourself.',
                    minLength: { value: 10, message: 'Please write at least 10 characters.' },
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
                {submitStatus === 'loading' ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
