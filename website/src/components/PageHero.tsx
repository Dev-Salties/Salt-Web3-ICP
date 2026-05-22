import type { ReactNode } from 'react'

type PageHeroProps = {
  kicker?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  bgImage?: string
  className?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export default function PageHero({
  title,
  subtitle,
  bgImage,
  className,
  align = 'center',
  tone = 'dark',
}: PageHeroProps) {
  const isLight = tone === 'light'
  const isLeft = align === 'left'

  return (
    <section
      className={[
        'relative overflow-hidden py-20 md:py-28',
        className ?? '',
      ].join(' ')}
    >
      {bgImage ? (
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          {isLight ? (
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
          ) : null}
        </div>
      ) : null}

      <div
        className={[
          'relative mx-auto max-w-6xl px-4',
          isLeft ? 'text-left' : 'text-center',
        ].join(' ')}
      >
        <h1
          className={[
            'text-3xl font-extrabold uppercase md:text-4xl',
            isLight
              ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]'
              : 'text-[#0F172A]',
          ].join(' ')}
        >
          {title}
        </h1>
        {subtitle ? (
          <div
            className={[
              'mt-3 text-sm md:text-base',
              isLight
                ? 'max-w-2xl text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.55)]'
                : 'text-[#64748B]',
              isLeft ? '' : 'mx-auto',
            ].join(' ')}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </section>
  )
}

