import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Filanor Tech — Vidéo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 py-8">
      {/* Logo Filanor */}
      <div className="mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Filanor Tech"
        >
          <circle cx="50" cy="50" r="48" stroke="#0D9488" strokeWidth="4" />
          <circle cx="50" cy="50" r="8" fill="#0D9488" />
          <path d="M50 10 L50 42" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 58 L50 90" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 50 L42 50" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 50 L90 50" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Vidéo */}
      <div className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-teal-900/20 border border-white/5">
        <video
          src="/v/video_pub.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto"
          style={{ aspectRatio: '1080/1224' }}
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <a
          href="https://filanor.ch"
          className="text-sm font-medium text-[#0D9488] hover:text-[#14B8A6] transition-colors"
        >
          filanor.ch
        </a>
        <p className="text-xs text-white/30">
          Filanor Tech SNC — Lausanne
        </p>
      </div>
    </main>
  )
}
