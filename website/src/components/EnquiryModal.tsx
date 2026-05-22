import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  firstName: string
  lastName: string
  company?: string
  email: string
  phone: string
  quantity: number
  message?: string
}

interface Props {
  product: { title: string; price: string } | null
  onClose: () => void
}

export default function EnquiryModal({ product, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    defaultValues: { quantity: 1 },
  })

  const quantity = useWatch({ control, name: 'quantity' })

  const VAT_RATE = 0.1305

  const unitPrice = product
    ? parseFloat(product.price.replace(/[^0-9.]/g, '').replace(/,/g, ''))
    : 0
  const qty = Number(quantity) || 1
  const subtotal = unitPrice * qty
  const vatAmount = subtotal * VAT_RATE
  const totalWithVat = subtotal + vatAmount

  const fmt = (n: number) => n.toLocaleString('en-NA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const total = fmt(subtotal)

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Focus first field on open
  useEffect(() => {
    firstFieldRef.current?.focus()
  }, [])

  // Close on Escape + focus trap
  useEffect(() => {
    const FOCUSABLE = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const panel = overlayRef.current
      if (!panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const onSubmit = async (data: FormData) => {
    if (!product) return
    setStatus('loading')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          product_name: product.title,
          product_price: product.price,
          quantity: data.quantity,
          total: `N$${fmt(totalWithVat)} (incl. VAT)`,
          from_name: `${data.firstName} ${data.lastName}`,
          from_company: data.company || 'N/A',
          from_email: data.email,
          from_phone: data.phone,
          message: data.message || 'No additional notes.',
          reply_to: data.email,
          sent_date: new Date().toLocaleDateString('en-NA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {product && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            {/* Header */}
            <div className="bg-[#0064A8] px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="modal-title" className="text-base font-semibold text-white leading-snug">
                  {product.title}
                </h2>
                <span className="mt-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white">
                  {product.price} / month
                </span>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Success state */}
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <div>
                  <p className="text-lg font-semibold text-[#0F172A]">Enquiry sent!</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    Our sales team will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-lg bg-[#0064A8] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0075C4] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or email{' '}
                    <a href="mailto:sales@salt.na" className="font-semibold underline">sales@salt.na</a>.
                  </div>
                )}

                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      ref={(el) => {
                        register('firstName').ref(el)
                        ;(firstFieldRef as React.MutableRefObject<HTMLInputElement | null>).current = el
                      }}
                      type="text"
                      autoComplete="given-name"
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      autoComplete="family-name"
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1">
                    Company name <span className="text-[#94A3B8]">(optional)</span>
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    autoComplete="organization"
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
                      type="email"
                      autoComplete="email"
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      autoComplete="tel"
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Quantity + Total */}
                <div className="flex items-end gap-4">
                  <div className="w-32">
                    <label className="block text-xs font-medium text-[#374151] mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('quantity', { required: true, min: 1, valueAsNumber: true })}
                      type="number"
                      min={1}
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div className="flex-1 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] px-4 py-2 text-xs space-y-0.5">
                    <div className="flex justify-between text-[#64748B]">
                      <span>Subtotal (excl. VAT)</span>
                      <span>N${total}</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>VAT (13.05%)</span>
                      <span>N${fmt(vatAmount)}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#BFDBFE] pt-1 font-semibold text-[#0064A8]">
                      <span>Total (incl. VAT)</span>
                      <span>N${fmt(totalWithVat)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1">
                    Additional notes <span className="text-[#94A3B8]">(optional)</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Any special requirements or questions…"
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#0075C4] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE] resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-1 pb-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0064A8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 hover:bg-[#0075C4] transition disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075C4] focus-visible:ring-offset-2"
                  >
                    {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                    {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </div>

              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
