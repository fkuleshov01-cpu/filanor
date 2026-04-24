// Données partagées des 9 posts du compte @latelier_de_justine
// Identiques pour /justine-light et /justine-full — seules les dates diffèrent
// (voir justine-{light,full}-dates.ts)

export type CarouselSlide = {
  src: string;
  alt: string;
};

export type QuoteStyle = {
  background: string;
  textColor: string;
  font: "playfair" | "inter";
  italic: boolean;
  fontSize: number; // px
  signature?: { text: string; color: string };
};

type BasePost = {
  id: number;
  caption: string;
  hashtags: string[];
  initialLikes: number;
  // Premier handle du compteur "Aimée par X et N autres personnes"
  firstLiker: string;
};

export type CarouselPost = BasePost & {
  type: "carousel";
  cover: string;
  slides: CarouselSlide[];
};

export type QuotePost = BasePost & {
  type: "quote";
  quote: {
    text: string;
    style: QuoteStyle;
  };
};

export type IconPost = BasePost & {
  type: "icon";
  icon: {
    background: string;
    caption: string;
    captionColor: string;
  };
};

export type Post = CarouselPost | QuotePost | IconPost;

export const justinePosts: Post[] = [
  {
    id: 1,
    type: "carousel",
    cover: "/justine/post1-cover.jpg",
    slides: [
      { src: "/justine/post1-slide1.jpg", alt: "Boucles cuivrées définies vue de face" },
      { src: "/justine/post1-slide2.jpg", alt: "Cheveux frisés indomptés vue arrière avant transformation" },
      { src: "/justine/post1-slide3.jpg", alt: "Volume des frisés vue plongée avant transformation" },
      { src: "/justine/post1-slide4.jpg", alt: "Boucles cuivrées vue trois-quarts profil" },
      { src: "/justine/post1-slide5.jpg", alt: "Boucles cuivrées vue de face alternative" },
    ],
    caption:
      "Quand on prend le temps de COMPRENDRE une boucle plutôt que de la combattre… ✨ Lavage, soin profond, coupe en dégradé, définition boucle par boucle, et un glossing cuivre pour finir 🔥 Vos boucles méritent qu'on les sublime, pas qu'on les défrise.",
    hashtags: [
      "cheveuxbouclés",
      "curlyhair",
      "boucleslausanne",
      "coiffeuselausanne",
      "latelierdejustine",
      "curlygirl",
      "balayagecuivre",
      "hairtransformation",
    ],
    initialLikes: 324,
    firstLiker: "camille_lausanne",
  },
  {
    id: 2,
    type: "quote",
    quote: {
      text: "Un cheveu soigné, c'est d'abord du temps.",
      style: {
        background: "#FAF7F2",
        textColor: "#8B7355",
        font: "playfair",
        italic: true,
        fontSize: 22,
        signature: { text: "— Justine", color: "#A8B5A0" },
      },
    },
    caption:
      "Un rendez-vous chez moi, c'est jamais bâclé. On prend le temps de comprendre votre cheveu, votre vie, votre routine ✨",
    hashtags: ["coiffeuselausanne", "latelierdejustine", "soinscheveux"],
    initialLikes: 89,
    firstLiker: "sophie.lausanne",
  },
  {
    id: 3,
    type: "carousel",
    cover: "/justine/post3-cover.jpg",
    slides: [
      { src: "/justine/post3-slide1.jpg", alt: "Brushing miroir blond cendré beige vue de face" },
      { src: "/justine/post3-slide2.jpg", alt: "Trois-quarts racines foncées avant transformation" },
      { src: "/justine/post3-slide3.jpg", alt: "Vue plongée nuances cendré" },
      { src: "/justine/post3-slide4.jpg", alt: "Vue trois-quarts dos brushing droit" },
    ],
    caption:
      "Transformation tout en douceur : du blond chaud fatigué vers un blond cendré beige miroir ✨ Décoloration douce, neutralisation des reflets chauds, fonte parfaite des racines, et un soin profond pour réveiller la matière 🤍\n\nLe cendré, c'est subtil — ça demande de la patience et une vraie connaissance des pigments.",
    hashtags: [
      "blondcendré",
      "balayagecendré",
      "blondbeige",
      "coiffeuselausanne",
      "latelierdejustine",
      "balayagelausanne",
      "cheveuxbrillants",
    ],
    initialLikes: 267,
    firstLiker: "marine_vd",
  },
  {
    id: 4,
    type: "carousel",
    cover: "/justine/post4-cover.jpg",
    slides: [
      { src: "/justine/post4-slide1.jpg", alt: "Carré blond rosé vue trois-quarts net" },
      { src: "/justine/post4-slide2.jpg", alt: "Selfie cheveux rose délavé avant transformation" },
      { src: "/justine/post4-slide3.jpg", alt: "Carré blond avec reflet rosé pastel" },
    ],
    caption:
      "Du rose délavé… vers un carré blond cendré nuancé d'un rose pastel discret 🤍 Décoloration en plusieurs étapes pour respecter la fibre, puis coupe nette pour finir 💇‍♀️\nJ'adore ce résultat, merci pour la confiance 🙏",
    hashtags: [
      "carrécourt",
      "blondcendré",
      "balayageblond",
      "coiffeuselausanne",
      "latelierdejustine",
      "hairtransformation",
    ],
    initialLikes: 198,
    firstLiker: "lea.coiffure",
  },
  {
    id: 5,
    type: "quote",
    quote: {
      text: "L'atelier où l'on prend le temps.",
      style: {
        background: "#A8B5A0",
        textColor: "#FFFCF8",
        font: "playfair",
        italic: true,
        fontSize: 22,
      },
    },
    caption:
      "Pas de chaîne. Pas de rush. Juste vous, votre cheveu, et le temps qu'il faut pour bien faire 🌿",
    hashtags: ["coiffeuselausanne", "latelierdejustine", "slowbeauty"],
    initialLikes: 112,
    firstLiker: "emma_lsne",
  },
  {
    id: 6,
    type: "carousel",
    cover: "/justine/post6-cover.jpg",
    slides: [
      { src: "/justine/post6-slide1.jpg", alt: "Brushing blond beige vue de dos" },
      { src: "/justine/post6-slide2.jpg", alt: "Cheveux brun cuivré racines foncées avant transformation" },
      { src: "/justine/post6-slide3.jpg", alt: "Vue dos alternative avec reflets blond beige" },
    ],
    caption:
      "Du cuivré qui a vécu… vers un balayage blond beige tout doux ✨ Travail en plusieurs étapes pour préserver la matière, et un brushing miroir pour finir 🤍 Merci pour ta confiance 🙏",
    hashtags: [
      "balayagelausanne",
      "blondbeige",
      "coiffeuselausanne",
      "latelierdejustine",
      "hairtransformation",
    ],
    initialLikes: 176,
    firstLiker: "clara_dumas",
  },
  {
    id: 7,
    type: "quote",
    quote: {
      text: "Vos cheveux racontent une histoire.\nÀ nous de la sublimer.",
      style: {
        background: "#F5EFE6",
        textColor: "#8B7355",
        font: "playfair",
        italic: true,
        fontSize: 20,
      },
    },
    caption:
      "Chaque cheveu est unique. Mon job, c'est de révéler ce que vous avez de plus beau, pas de vous mettre dans une case ✨",
    hashtags: ["coiffeuselausanne", "latelierdejustine", "beautésurmesure"],
    initialLikes: 78,
    firstLiker: "justineroch",
  },
  {
    id: 8,
    type: "icon",
    icon: {
      background: "#FAF7F2",
      caption: "Les outils du métier",
      captionColor: "#8B7355",
    },
    caption: "Mes ciseaux. Mon peigne. Et 10 ans d'expérience derrière ✂️",
    hashtags: ["coiffeuselausanne", "latelierdejustine", "savoirfaire"],
    initialLikes: 64,
    firstLiker: "nora.ch",
  },
  {
    id: 9,
    type: "quote",
    quote: {
      text: "Prenez soin de vos cheveux,\nils restent avec vous toute la vie.",
      style: {
        background: "#8B7355",
        textColor: "#FAF7F2",
        font: "playfair",
        italic: true,
        fontSize: 20,
      },
    },
    caption:
      "Un cheveu en bonne santé, c'est avant tout un soin régulier et adapté. Je vous accompagne sur le long terme 🌿",
    hashtags: ["soinscheveux", "coiffeuselausanne", "latelierdejustine"],
    initialLikes: 91,
    firstLiker: "maelle_v",
  },
];
