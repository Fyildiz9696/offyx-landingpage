import type { ThemePreset } from "./themes";

export interface SiteData {
  company: string;
  logo?: string;
  tagline: string;
  url: string;
  lang: string;
  theme: string;
  themeOverrides?: Partial<ThemePreset>;
  contact: {
    email: string;
    phone: string;
    address: { street: string; zip: string; city: string };
  };
  openingHours: Array<{ days: string; hours: string }>;
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    xing?: string;
    github?: string;
  };
  nav: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  hero: { headline: string; subline: string; backgroundImage?: string };
  trustItems: Array<{ icon: string; label: string }>;
  services: Array<{ icon: string; title: string; description: string }>;
  about: { heading: string; text: string; image?: string; imageAlt?: string };
  process: Array<{ icon: string; title: string; description: string }>;
  testimonials: Array<{ quote: string; author: string; role?: string; rating?: number }>;
  faq: Array<{ question: string; answer: string }>;
  verification?: { google?: string; bing?: string };
  sectionHeadings: {
    services: string; servicesIntro?: string;
    about: string;
    process: string; processIntro?: string;
    testimonials: string; testimonialsIntro?: string;
    faq: string; faqIntro?: string;
    contact: string; contactIntro?: string;
  };
}

const site: SiteData = {
  company: "offyx",
  // Logo wird inline im Header/Footer gerendert (Playfair Display via CSS)
  // logo: "/images/logo.svg",
  tagline: "Geschäftsadresse & Coworking in Berlin — ladungsfähig, professionell, flexibel.",
  url: "https://www.offyx.de",
  lang: "de",

  theme: "paper-ink",

  contact: {
    email: "hallo@offyx.de",
    phone: "+49 30 123456789",
    address: {
      street: "Laubacher Straße 44",
      zip: "14197",
      city: "Berlin",
    },
  },

  openingHours: [
    { days: "Mo–Fr", hours: "08:00–20:00 Uhr" },
  ],

  social: {
    instagram: "https://instagram.com/offyx.berlin",
    linkedin: "https://linkedin.com/company/offyx",
  },

  nav: [
    { label: "Angebot", href: "#services" },
    { label: "Über uns", href: "#about" },
    { label: "Ablauf", href: "#process" },
    { label: "Berater", href: "#advisor" },
    { label: "Kontakt", href: "#contact" },
  ],

  cta: { label: "Welches Angebot passt?", href: "#advisor" },
  ctaSecondary: { label: "Mehr erfahren", href: "#about" },

  hero: {
    headline: "Deine ladungsfähige Geschäftsadresse in Berlin.",
    subline:
      "Du brauchst eine offizielle Adresse für deine GmbH, UG oder Gewerbeanmeldung? offyx bietet dir eine ladungsfähige Geschäftsadresse in der Laubacher Straße 44 — inklusive Briefkastenservice, Post-Scan und Schließfach-Option. Coworking-Plätze kannst du jederzeit dazubuchen.",
    backgroundImage: "/images/hero-image.jpg",
  },

  trustItems: [
    { icon: "shield-check", label: "Ladungsfähige Adresse" },
    { icon: "mail", label: "Briefkastenservice" },
    { icon: "scan", label: "Post-Scan & Weiterleitung" },
    { icon: "map-pin", label: "Laubacher Str. 44, Berlin" },
    { icon: "archive", label: "Schließfächer mietbar" },
    { icon: "wifi", label: "Coworking ab 24€/Slot" },
  ],

  services: [
    {
      icon: "building",
      title: "Virtual Office Basic",
      description:
        "Ladungsfähige Geschäftsadresse in Berlin inkl. Briefkastenservice. Deine Post wird entgegengenommen, gescannt und digital weitergeleitet. Ab 79€/Monat — perfekt für Gründer und Freelancer.",
    },
    {
      icon: "building-2",
      title: "Virtual Office Plus",
      description:
        "Erweiterter Adressservice mit Post-Scan, Weiterleitung und regelmäßiger Nutzung des Coworking-Space. Ab 99€/Monat für alle, die mehr brauchen als nur eine Adresse.",
    },
    {
      icon: "archive",
      title: "Schließfach",
      description:
        "Sicheres Schließfach für Laptop, Unterlagen & Co. — separat mietbar für 19€/Monat. Ideal, wenn du regelmäßig in Berlin bist und dein Material sicher verwahren willst.",
    },
    {
      icon: "user",
      title: "Coworking Mitgliedschaften",
      description:
        "Basic (169€/Mo), Flex (249€/Mo) oder Pro (349€/Mo, empfohlen). Täglicher Zugang, freie Tischwahl in ruhiger Atmosphäre. Kein Großraum-Chaos, nur 8 Plätze — bewusst.",
    },
    {
      icon: "zap",
      title: "Coworking Einzelbuchung",
      description:
        "Flexibel ohne Mitgliedschaft: 24€ pro Slot (4h), 39€ Tagespass. Oder als 5er- (110€), 10er- (210€) oder 20er-Paket (380€). Ideal für unregelmäßige Besuche.",
    },
    {
      icon: "coffee",
      title: "Kaffeeflatrate",
      description:
        "19€/Monat — faire Kaffee-Flatrate für alle Mitglieder und Adresskunden. Wasser & Tee natürlich inklusive.",
    },
  ],

  about: {
    heading: "Mehr als eine Adresse — dein Berliner Geschäftssitz",
    text: "Du gründest eine GmbH oder UG und brauchst eine ladungsfähige Geschäftsadresse in Berlin? offyx in der Laubacher Straße 44 ist dein professioneller Geschäftssitz. Kein privates Wohnzimmer als Firmenadresse, kein undurchsichtiger Briefkastenservice — eine echte Adresse in einem echten Coworking Space, mit Postannahme, Scan-Service und Weiterleitung. Und wenn du mal einen ruhigen Arbeitsplatz in Berlin brauchst: Unser Coworking Space ist direkt dabei. 8 bewusst limitierte Plätze, 500 Mbit/s WLAN, Drucker, Küche und Schließfächer.",
  },

  process: [
    {
      icon: "search",
      title: "Adresse finden",
      description:
        "Unser Produktberater hilft dir in 3 Fragen zu finden, ob du eine Geschäftsadresse, ein Schließfach oder einen Coworking-Platz brauchst.",
    },
    {
      icon: "file-text",
      title: "Anmelden & loslegen",
      description:
        "Du erhältst deine ladungsfähige Adresse, den Briefkastenservice und dein persönliches Schließfach. Deine Post wird gescannt und digital bereitgestellt.",
    },
    {
      icon: "calendar",
      title: "Optional: Coworking buchen",
      description:
        "Wenn du vor Ort arbeiten möchtest, buchst du einfach einen Slot dazu. Freie Tischwahl, 500 Mbit/s, ruhige Atmosphäre, Küche & Kaffeeflatrate.",
    },
    {
      icon: "trending-up",
      title: "Wachsen & skalieren",
      description:
        "Vom Adressservice zur Coworking-Mitgliedschaft — offyx wächst mit dir mit. Faire Preise, transparente Konditionen, keine versteckten Kosten.",
    },
  ],

  testimonials: [
    {
      quote:
        "Endlich eine seriöse Geschäftsadresse in Berlin, die nicht nach Briefkasten-Firma aussieht. Die Coworking-Plätze sind das i-Tüpfelchen.",
      author: "— Anwärter aus der Voreröffnungsphase",
      role: "Gründer einer UG",
    },
  ],

  faq: [
    {
      question: "Ist die Laubacher Straße 44 eine ladungsfähige Geschäftsadresse?",
      answer:
        "Ja. Die Adresse ist ladungsfähig und geeignet zur Anmeldung von GmbH, UG, Einzelunternehmen, GbR und anderen Rechtsformen. Sie kann als offizieller Geschäftssitz beim Gewerbeamt und Handelsregister eingetragen werden.",
    },
    {
      question: "Was kostet die Geschäftsadresse?",
      answer:
        "Als Add-on zu einer Coworking-Mitgliedschaft ab 59€/Monat. Als eigenständiges Virtual Office Basic ab 79€/Monat oder Virtual Office Plus ab 99€/Monat mit Post-Scan und erweiterten Leistungen.",
    },
    {
      question: "Wie läuft der Briefkastenservice ab?",
      answer:
        "Deine Post wird an der Laubacher Straße 44 entgegengenommen, gescannt und dir digital bereitgestellt. Auf Wunsch leiten wir physische Post an dich weiter.",
    },
    {
      question: "Kann ich Schließfächer mieten?",
      answer:
        "Ja, Schließfächer sind separat für 19€/Monat mietbar. Perfekt, um Laptop, Unterlagen oder persönliche Dinge sicher in Berlin zu deponieren — auch ohne Coworking-Mitgliedschaft.",
    },
    {
      question: "Kann ich die Adresse auch ohne Coworking nutzen?",
      answer:
        "Ja, unsere Virtual-Office-Pakete (Basic und Plus) sind eigenständige Produkte. Du bekommst die volle Adressnutzung auch ohne einen einzigen Coworking-Besuch. Coworking-Plätze kannst du jederzeit dazubuchen.",
    },
    {
      question: "Was ist ein Coworking-Slot?",
      answer:
        "Ein Slot ist ein 4-Stunden-Zeitfenster (08–12, 12–16 oder 16–20 Uhr). Du buchst deinen Slot und hast freie Tischwahl. Einzelslot: 24€, Tagespass: 39€. Auch als 5er-, 10er- oder 20er-Paket.",
    },
    {
      question: "Gibt es Rabatte für Gründer?",
      answer:
        "Ja, aktuell 10% Eröffnungsrabatt auf die ersten 3 Monate für alle Mitgliedschaften. Ideal zum Start.",
    },
    {
      question: "Wann öffnet offyx?",
      answer:
        "Wir sind ab Juni 2026 online. Registriere dich jetzt – du bekommst Bescheid, sobald Adressservice und Buchungen starten.",
    },
  ],

  sectionHeadings: {
    services: "Geschäftsadresse, Schließfach & Coworking",
    servicesIntro: "Egal ob ladungsfähige Adresse, sicheres Schließfach oder flexibler Arbeitsplatz – bei offyx bekommst du, was dein Business braucht.",
    about: "Über offyx",
    process: "In 4 Schritten zu deiner Geschäftsadresse",
    processIntro: "Vom ersten Kontakt bis zur fertigen Anmeldung — schnell, unkompliziert, professionell.",
    testimonials: "Was andere sagen",
    testimonialsIntro: "Erste Stimmen aus unserer Voreröffnungsphase.",
    faq: "Häufige Fragen",
    faqIntro: "Alles, was du über offyx wissen musst.",
    contact: "Kontakt",
    contactIntro: "Schreib uns oder komm vorbei – wir freuen uns auf dich.",
  },
};

export default site;
