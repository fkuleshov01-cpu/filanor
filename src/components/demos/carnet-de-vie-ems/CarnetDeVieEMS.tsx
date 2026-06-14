"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import "./carnet-demo.css";

/* ──────────────────────────────────────────────
   Données statiques
   ────────────────────────────────────────────── */

const ALBUM_PAGES = [
  {
    date: "Jeudi 11 juin",
    title: "Atelier peinture ce matin",
    text: "Madelaine a participé à l’atelier peinture avec beaucoup d’attention. Elle a choisi des couleurs douces et semblait fière de montrer son dessin.",
    photoClass: "photo-peinture",
    icon: "🎨",
    label: "Photo de l’atelier peinture",
  },
  {
    date: "Samedi 6 juin",
    title: "Petite promenade au jardin",
    text: "Nous avons profité d’un moment calme dehors. Madelaine a apprécié le soleil et a échangé quelques mots avec deux autres résidentes.",
    photoClass: "photo-promenade",
    icon: "🌳",
    label: "Photo de la promenade",
  },
  {
    date: "Mardi 2 juin",
    title: "Goûter partagé",
    text: "Cet après-midi, Madelaine a pris le goûter avec le groupe. Elle a bien mangé et a souri pendant la discussion.",
    photoClass: "photo-gouter",
    icon: "🍰",
    label: "Photo du goûter",
  },
  {
    date: "Mercredi 27 mai",
    title: "Moment lecture",
    text: "Un moment plus tranquille aujourd’hui. Madelaine a feuilleté un livre illustré et semblait apaisée.",
    photoClass: "photo-lecture",
    icon: "📖",
    label: "Photo du moment lecture",
  },
  {
    date: "Vendredi 22 mai",
    title: "Activité musique",
    text: "Madelaine a écouté quelques chansons anciennes avec les autres résidents. Elle a reconnu plusieurs airs et a chantonné doucement.",
    photoClass: "photo-musique",
    icon: "🎵",
    label: "Photo de l’activité musique",
  },
] as const;

const CHIP_OPTIONS = ["Atelier", "Promenade", "Repas", "Visite", "Moment calme"] as const;

const RESIDENTS = [
  { name: "Madelaine Fernandez", meta: "Dernière nouvelle : aujourd’hui", ref: "Soignant référent : Léa", status: "green" as const, badge: "À jour" },
  { name: "Robert Mercier", meta: "Dernière nouvelle : il y a 1 jour", ref: "Soignant référent : Marc", status: "green" as const, badge: "À jour" },
  { name: "Suzanne Keller", meta: "Dernière nouvelle : il y a 3 jours", ref: "Soignant référent : Léa", status: "orange" as const, badge: "À suivre" },
  { name: "André Martin", meta: "Dernière nouvelle : il y a 6 jours", ref: "Soignant référent : Nadia", status: "red" as const, badge: "Rappel nécessaire" },
  { name: "Jeanne Favre", meta: "Dernière nouvelle : il y a 2 jours", ref: "Soignant référent : Marc", status: "orange" as const, badge: "À suivre" },
] as const;

type ViewName = "famille" | "soignant" | "direction";

/* ──────────────────────────────────────────────
   Composant principal
   ────────────────────────────────────────────── */

export default function CarnetDeVieEMS() {
  /* --- State --- */
  const [activeView, setActiveView] = useState<ViewName>("famille");
  const [carnetOpen, setCarnetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSent, setModalSent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedChip, setSelectedChip] = useState(0);
  const [publishLabel, setPublishLabel] = useState("Publier dans le carnet");
  const [publishDone, setPublishDone] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const publishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = ALBUM_PAGES.length;

  /* --- Navigation album --- */
  const goToPage = useCallback(
    (index: number) => {
      setCurrentPage(((index % total) + total) % total);
    },
    [total]
  );

  /* --- Ouverture modale --- */
  const openModal = useCallback(() => {
    setModalSent(false);
    setFirstName("");
    setMessageText("");
    setModalOpen(true);
    setTimeout(() => firstNameRef.current?.focus(), 80);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setFirstName("");
    setMessageText("");
  }, []);

  const sendMessage = useCallback(() => {
    setModalSent(true);
  }, []);

  /* --- Switch de vue --- */
  const switchView = useCallback((view: ViewName) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* --- Publier (soignant) --- */
  const handlePublish = useCallback(() => {
    if (publishDone) return;
    setPublishLabel("✓ Publié dans le carnet");
    setPublishDone(true);
    publishTimerRef.current = setTimeout(() => {
      setPublishLabel("Publier dans le carnet");
      setPublishDone(false);
    }, 2200);
  }, [publishDone]);

  /* --- Keyboard --- */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
        return;
      }
      if (activeView !== "famille" || !carnetOpen || modalOpen) return;
      if (e.key === "ArrowRight") goToPage(currentPage + 1);
      if (e.key === "ArrowLeft") goToPage(currentPage - 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeView, carnetOpen, modalOpen, currentPage, goToPage, closeModal]);

  /* --- Cleanup timer on unmount --- */
  useEffect(() => {
    return () => {
      if (publishTimerRef.current) clearTimeout(publishTimerRef.current);
    };
  }, []);

  /* ──────────────────────────────────────────
     Render
     ────────────────────────────────────────── */
  return (
    <div className="carnet-demo-root">
      {/* 1. Bandeau */}
      <div className="demo-banner">
        Démonstration — voici comment une famille reçoit des nouvelles simples,
        privées et rassurantes de son proche.
      </div>

      {/* 2. Header */}
      <header className="site-header">
        <div className="carnet-container">
          <div className="brand">Filanor</div>
          <h1 className="product-name">Carnet de vie numérique</h1>
          <p className="reassuring">
            Un lien simple pour garder le contact avec votre proche, même à
            distance.
          </p>
        </div>
      </header>

      {/* 3. Sélecteur de vues */}
      <nav className="view-switcher" aria-label="Choix de la vue">
        <div className="carnet-container switcher-inner">
          {(["famille", "soignant", "direction"] as const).map((v) => (
            <button
              key={v}
              className={`view-btn${activeView === v ? " is-active" : ""}`}
              onClick={() => switchView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <main className="carnet-container">
        {/* ═══════ VUE FAMILLE ═══════ */}
        {activeView === "famille" && (
          <section className="view is-active" key="famille">
            {!carnetOpen ? (
              <div className="carnet-access">
                <span className="access-icon">&#128274;</span>
                <h2 className="access-title">Accéder au carnet de vie</h2>
                <p className="access-text">
                  Dans la réalité, la famille reçoit un lien privé pour accéder
                  directement au carnet.
                </p>
                <div className="access-form">
                  <label className="access-label" htmlFor="accessCode">
                    Code d&apos;accès
                  </label>
                  <input
                    className="field-input access-input"
                    type="text"
                    id="accessCode"
                    defaultValue="MADELAINE-2026"
                    readOnly
                  />
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => setCarnetOpen(true)}
                  >
                    Ouvrir le carnet
                  </button>
                </div>
                <p className="access-hint">
                  Code de démonstration déjà rempli — cliquez simplement sur
                  «&nbsp;Ouvrir le carnet&nbsp;».
                </p>
              </div>
            ) : (
              <div className="carnet">
                {/* Couverture */}
                <div className="carnet-cover">
                  <span className="cover-eyebrow">Carnet de vie</span>
                  <h2 className="cover-title">
                    Le carnet de Madelaine Fernandez
                  </h2>
                  <p className="cover-intro">
                    Voici quelques nouvelles partagées avec la famille de
                    Madelaine, au fil des jours.
                  </p>
                </div>

                {/* Album */}
                <div className="album">
                  <button
                    className="album-arrow album-arrow--prev"
                    type="button"
                    aria-label="Page précédente"
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <span aria-hidden="true">&#8249;</span>
                  </button>

                  <div className="album-stage">
                    {ALBUM_PAGES.map((page, i) => (
                      <article
                        key={i}
                        className={`album-page post${i === currentPage ? " is-active" : ""}`}
                      >
                        <div className="post-photo-frame">
                          <div className={`photo-block ${page.photoClass}`}>
                            <span className="photo-icon">{page.icon}</span>
                            <span className="photo-label">{page.label}</span>
                          </div>
                        </div>
                        <div className="post-body">
                          <time className="post-date">{page.date}</time>
                          <h3 className="post-title">{page.title}</h3>
                          <p className="post-text">{page.text}</p>
                          <p className="post-author">
                            Partagé par l&apos;équipe de soins
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <button
                    className="album-arrow album-arrow--next"
                    type="button"
                    aria-label="Page suivante"
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    <span aria-hidden="true">&#8250;</span>
                  </button>
                </div>

                {/* Nav album */}
                <div className="album-nav">
                  <p className="album-counter">
                    Page {currentPage + 1} sur {total}
                  </p>
                  <div
                    className="album-dots"
                    role="tablist"
                    aria-label="Pages de l'album"
                  >
                    {ALBUM_PAGES.map((_, i) => (
                      <button
                        key={i}
                        className={`album-dot${i === currentPage ? " is-active" : ""}`}
                        type="button"
                        aria-label={`Page ${i + 1}`}
                        onClick={() => goToPage(i)}
                      />
                    ))}
                  </div>
                </div>

                <div className="carnet-footer-note">
                  <button
                    className="btn-primary btn-write"
                    type="button"
                    onClick={openModal}
                  >
                    Envoyer un petit mot à Madelaine
                  </button>
                </div>

                {/* Section directeur */}
                <section className="director-section">
                  <h2 className="director-title">
                    Ce que cela change pour votre EMS
                  </h2>
                  <div className="benefits">
                    <div className="benefit">
                      <span className="benefit-num">1</span>
                      <h3>Le lien familial sans le déplacement</h3>
                      <p>
                        Les familles suivent le quotidien de leur proche depuis
                        chez elles, où qu&apos;elles soient. Le lien reste
                        vivant, même à distance.
                      </p>
                    </div>
                    <div className="benefit">
                      <span className="benefit-num">2</span>
                      <h3>
                        Moins d&apos;appels, plus de temps auprès des résidents
                      </h3>
                      <p>
                        Les nouvelles sont partagées une fois pour toute la
                        famille. Les soignants sont moins sollicités au téléphone
                        et restent disponibles auprès des résidents.
                      </p>
                    </div>
                    <div className="benefit">
                      <span className="benefit-num">3</span>
                      <h3>Une communication organisée et traçable</h3>
                      <p>
                        Tous les moments partagés sont réunis au même endroit,
                        clairement. La direction garde une vue d&apos;ensemble
                        simple et sereine.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </section>
        )}

        {/* ═══════ VUE SOIGNANT ═══════ */}
        {activeView === "soignant" && (
          <section className="view is-active" key="soignant">
            <div className="view-head">
              <h2 className="view-title">Vue soignant</h2>
              <p className="view-sub">
                Publier une nouvelle en moins de 30 secondes.
              </p>
            </div>

            <div className="soignant-grid">
              {/* Formulaire */}
              <div className="care-card">
                <div className="care-field">
                  <span className="care-label">Résident</span>
                  <div className="care-static">Madelaine Fernandez</div>
                </div>

                <div className="care-field">
                  <span className="care-label">Type de moment</span>
                  <div className="chip-row">
                    {CHIP_OPTIONS.map((chip, i) => (
                      <span
                        key={chip}
                        className={`chip${i === selectedChip ? " is-selected" : ""}`}
                        onClick={() => setSelectedChip(i)}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="care-field">
                  <span className="care-label">Photo</span>
                  <button className="photo-add" type="button">
                    &#xFF0B; Ajouter une photo
                  </button>
                </div>

                <div className="care-field">
                  <span className="care-label">Message</span>
                  <textarea
                    className="field-input care-textarea"
                    rows={3}
                    defaultValue="Madelaine a participé à l'atelier peinture ce matin. Elle semblait contente de montrer son dessin."
                  />
                </div>

                <button
                  className={`btn-primary care-publish${publishDone ? " is-done" : ""}`}
                  type="button"
                  onClick={handlePublish}
                >
                  {publishLabel}
                </button>
              </div>

              {/* Aperçu famille */}
              <div className="family-preview">
                <span className="preview-tag">Aperçu famille</span>
                <article className="post post--mini">
                  <div className="photo-block photo-peinture">
                    <span className="photo-icon">&#127912;</span>
                    <span className="photo-label">
                      Photo de l&apos;atelier peinture
                    </span>
                  </div>
                  <div className="post-body">
                    <h3 className="post-title">Atelier peinture ce matin</h3>
                    <p className="post-text">
                      Madelaine a participé à l&apos;atelier peinture ce matin.
                      Elle semblait contente de montrer son dessin.
                    </p>
                    <p className="post-author">
                      Publié par l&apos;équipe de soins
                    </p>
                  </div>
                </article>
                <p className="preview-note">
                  Voilà exactement ce que la famille verra dans le carnet.
                </p>
              </div>
            </div>

            {/* Messages des familles */}
            <div className="messages-card">
              <h3 className="messages-title">Messages des familles</h3>
              <div className="message-bubble">
                <p className="message-from">Sophie, fille de Madelaine</p>
                <p className="message-body">
                  Bonjour, merci pour la photo. Est-ce que Madelaine a bien
                  mangé aujourd&apos;hui&nbsp;?
                </p>
              </div>
              <div className="message-bubble">
                <p className="message-from">Famille Fernandez</p>
                <p className="message-body">
                  Merci pour les nouvelles, cela nous rassure beaucoup.
                </p>
              </div>
              <p className="messages-note">
                Les messages ne sont pas un échange en direct. L&apos;équipe
                répond quand elle a un moment.
              </p>
            </div>
          </section>
        )}

        {/* ═══════ VUE DIRECTION ═══════ */}
        {activeView === "direction" && (
          <section className="view is-active" key="direction">
            <div className="view-head">
              <span className="view-eyebrow">Carnet de vie numérique</span>
              <h2 className="view-title">Vue direction</h2>
              <p className="view-sub">
                Une vue simple pour suivre les nouvelles partagées avec les
                familles, pour l&apos;ensemble des résidents.
              </p>
            </div>

            {/* Liste des résidents */}
            <div className="residents-card">
              <div className="residents-legend">
                <span className="legend-item">
                  <span className="dot dot-green" />
                  À jour
                </span>
                <span className="legend-item">
                  <span className="dot dot-orange" />
                  À suivre
                </span>
                <span className="legend-item">
                  <span className="dot dot-red" />
                  Rappel nécessaire
                </span>
              </div>

              <ul className="residents-list">
                {RESIDENTS.map((r) => (
                  <li key={r.name} className="resident-row">
                    <span className="resident-status">
                      <span className={`dot dot-${r.status}`} />
                    </span>
                    <span className="resident-name-cell">{r.name}</span>
                    <span className="resident-meta">{r.meta}</span>
                    <span className="resident-ref">{r.ref}</span>
                    <span className={`resident-badge badge-${r.status}`}>
                      {r.badge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Encarts */}
            <div className="info-cards">
              <div className="info-card">
                <span className="info-icon">&#128276;</span>
                <h3>Rappels automatiques</h3>
                <p>
                  Si aucun message n&apos;a été publié depuis plusieurs jours,
                  un rappel peut être envoyé au soignant référent.
                </p>
              </div>
              <div className="info-card">
                <span className="info-icon">&#128450;&#65039;</span>
                <h3>Communication traçable</h3>
                <p>
                  Chaque publication est datée. La direction garde une vue
                  claire des nouvelles transmises aux familles.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="carnet-container">
          <p className="footer-lead">
            Vous souhaitez voir comment ce carnet pourrait fonctionner dans
            votre EMS&nbsp;?
          </p>
          <div className="contact-list">
            <a href="tel:+41215050058">021 505 00 58</a>
            <a href="mailto:contact@filanor.ch">contact@filanor.ch</a>
            <a
              href="https://filanor.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              filanor.ch
            </a>
          </div>
          <p className="signature">Filip &amp; Daniel</p>
        </div>
      </footer>

      {/* Modale */}
      {modalOpen && (
        <div
          className="modal-overlay is-open"
          aria-hidden="false"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Fermer"
              onClick={closeModal}
            >
              &times;
            </button>

            {!modalSent ? (
              <div className="modal-content">
                <h2 className="modal-title" id="modalTitle">
                  Un mot pour Madelaine
                </h2>
                <p className="modal-text">
                  Votre message sera transmis à l&apos;équipe de soins. Une
                  réponse peut être donnée sous 24 à 48h.
                </p>

                <label className="field-label" htmlFor="carnetFirstName">
                  Votre prénom
                </label>
                <input
                  ref={firstNameRef}
                  className="field-input"
                  type="text"
                  id="carnetFirstName"
                  placeholder="Par exemple : Sophie"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="field-label" htmlFor="carnetMessageText">
                  Votre message
                </label>
                <textarea
                  className="field-input"
                  id="carnetMessageText"
                  rows={4}
                  placeholder="Écrivez quelques mots, elle les recevra avec plaisir…"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />

                <button
                  className="btn-primary btn-send"
                  type="button"
                  onClick={sendMessage}
                >
                  Envoyer le message
                </button>
              </div>
            ) : (
              <div className="modal-confirm">
                <span className="confirm-icon">&#128154;</span>
                <p className="confirm-text">
                  Merci, votre message a bien été transmis.
                </p>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={closeModal}
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
