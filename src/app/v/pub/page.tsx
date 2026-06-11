import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Filanor — Carte de fidélité digitale pour restaurants',
  description: 'Mettez votre carte de fidélité dans le téléphone de vos clients. Apple Wallet & Google Wallet. 229.-/mois tout compris.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VideoLandingPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: '#FAFDF7' }}
    >
      <div className="max-w-[640px] mx-auto px-5 py-10">

        {/* ── Header ── */}
        <header className="text-center mb-10">
          <p
            className="text-lg font-bold tracking-tight mb-2"
            style={{ color: '#111827' }}
          >
            filanor.
          </p>
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full border"
            style={{
              color: '#0D9488',
              borderColor: '#0D9488',
            }}
          >
            Lausanne, Suisse
          </span>
        </header>

        {/* ── Hero texte ── */}
        <section className="text-center mb-8">
          <h1
            className="text-[28px] sm:text-[34px] font-extrabold leading-[1.15] tracking-tight mb-1"
            style={{ color: '#111827' }}
          >
            Vos clients ont toujours leur{' '}téléphone.
          </h1>
          <p
            className="text-[26px] sm:text-[32px] font-extrabold leading-[1.15] tracking-tight"
            style={{ color: '#0D9488' }}
          >
            Mettez-y votre carte de fidélité.
          </p>
          <p
            className="mt-4 text-[15px] leading-relaxed max-w-md mx-auto"
            style={{ color: '#6B7280' }}
          >
            Fini les cartes en carton qu&apos;on oublie à la maison.
            <br />
            Découvrez le système en 60 secondes.
          </p>
        </section>

        {/* ── Vidéo ── */}
        <section className="mb-10">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ backgroundColor: '#111827' }}
          >
            <video
              src="/v/video_pub_h264.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
              style={{ aspectRatio: '1080/1224' }}
            >
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="space-y-6 mb-10">
          {/* Feature 1 */}
          <div className="flex gap-4 items-start">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#F0F7F4' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: '#111827' }}>
                Apple Wallet &amp; Google Wallet
              </p>
              <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: '#6B7280' }}>
                Votre client scanne un QR code, la carte s&apos;ajoute en 5 secondes. Rien à télécharger.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4 items-start">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#FEF9E7' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: '#111827' }}>
                Notifications push
              </p>
              <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: '#6B7280' }}>
                Envoyez des offres directement sur l&apos;écran de vos clients. &quot;2× les points ce midi&quot;, &quot;offre anniversaire&quot;...
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4 items-start">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#FEE2E2' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: '#111827' }}>
                Pensez à McDonald&apos;s
              </p>
              <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: '#6B7280' }}>
                Ils envoient des offres en permanence, et ça marche — on y retourne. Le même principe, mais adapté à votre restaurant.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4 items-start">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ECFDF5' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: '#111827' }}>
                On s&apos;occupe de tout
              </p>
              <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: '#6B7280' }}>
                Pas d&apos;application à développer, pas de matériel à acheter. Vous nous dites oui, on installe.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="mb-8">
          <div
            className="rounded-2xl px-6 py-8 text-center"
            style={{ backgroundColor: '#111827' }}
          >
            <p
              className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#0D9488' }}
            >
              Tout compris
            </p>
            <p className="flex items-baseline justify-center gap-1">
              <span
                className="text-[56px] font-extrabold leading-none"
                style={{ color: '#FFFFFF' }}
              >
                229.—
              </span>
              <span
                className="text-[18px] font-medium"
                style={{ color: '#9CA3AF' }}
              >
                / mois
              </span>
            </p>
            <p
              className="text-[13px] mt-3"
              style={{ color: '#9CA3AF' }}
            >
              Apple Wallet + Google Wallet + notifications push + support continu
            </p>
          </div>
        </section>

        {/* ── CTAs ── */}
        <section className="space-y-3 mb-12">
          <a
            href="tel:+41215050058"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[15px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0D9488' }}
          >
            <span>📞</span>
            Appelez-nous — c&apos;est rapide
          </a>
          <a
            href="https://calendly.com/contact-filanor/appel-decouverte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-4 rounded-xl text-[15px] font-semibold border transition-colors hover:bg-gray-50"
            style={{
              color: '#111827',
              borderColor: '#D1D5DB',
              backgroundColor: 'transparent',
            }}
          >
            Réserver un appel de 15 min (gratuit)
          </a>
        </section>

        {/* ── Footer signature ── */}
        <footer className="text-center pb-6">
          <p
            className="text-[20px] italic mb-1"
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              color: '#111827',
            }}
          >
            Filip &amp; Daniel
          </p>
          <p className="text-[13px]" style={{ color: '#9CA3AF' }}>
            Filanor Tech · Lausanne
          </p>
          <p className="text-[13px] mt-0.5">
            <Link
              href="mailto:contact@filanor.ch"
              className="transition-colors hover:opacity-80"
              style={{ color: '#9CA3AF' }}
            >
              contact@filanor.ch
            </Link>
            <span style={{ color: '#D1D5DB' }}> · </span>
            <Link
              href="https://filanor.ch"
              className="transition-colors hover:opacity-80"
              style={{ color: '#9CA3AF' }}
            >
              filanor.ch
            </Link>
          </p>
        </footer>

      </div>
    </main>
  )
}
