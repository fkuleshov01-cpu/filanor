// Barre de statut iOS façon iPhone : heure 9:41 à gauche, signal/wifi/batterie à droite
// Cachée sur mobile via CSS (.justine-status-bar définie dans globals.css)

export default function StatusBar() {
  return (
    <div className="justine-status-bar">
      <div className="font-semibold text-[15px] tracking-tight tabular-nums">9:41</div>

      <div className="flex items-center gap-[6px]">
        {/* Signal — 4 barres montantes */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="10" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect x="15" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
        </svg>

        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <path
            d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
            fill="currentColor"
          />
          <path
            d="M3.6 7.4a6 6 0 018.8 0l-1.4 1.4a4 4 0 00-6 0L3.6 7.4z"
            fill="currentColor"
          />
          <path
            d="M0.6 4.4a10.5 10.5 0 0114.8 0l-1.4 1.4a8.5 8.5 0 00-12 0L0.6 4.4z"
            fill="currentColor"
          />
        </svg>

        {/* Batterie 100% */}
        <div className="flex items-center gap-[2px]">
          <div
            className="relative rounded-[3px] border"
            style={{
              width: 24,
              height: 11,
              borderColor: "rgba(26,26,26,0.55)",
            }}
          >
            <div
              className="absolute inset-[1.5px] rounded-[1.5px]"
              style={{ background: "#1A1A1A" }}
            />
          </div>
          <div
            className="rounded-r-[1px]"
            style={{ width: 1.5, height: 4, background: "rgba(26,26,26,0.5)" }}
          />
        </div>
      </div>
    </div>
  );
}
