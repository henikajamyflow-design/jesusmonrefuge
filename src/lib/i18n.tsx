import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

export const content = {
  fr: {
    org: "Orphelinat Jésus Mon Refuge",
    orgSub: "Madagascar",
    nav: {
      home: "Accueil",
      orphanage: "L'orphelinat",
      mission: "Notre mission",
      church: "Notre église",
      contact: "Contact",
    },
    cta: { sponsor: "Parrainer un enfant", give: "Faire un don", partner: "Devenir partenaire", learn: "En savoir plus" },
    hero: {
      kicker: "Antananarivo · Madagascar",
      title: "Prenons soin\ndes orphelins",
      verse:
        "« Apprenez à faire le bien, recherchez la justice, rendez justice à l'orphelin, défendez la cause de la veuve. » — Ésaïe 1:17",
      scroll: "Découvrir",
    },
    stats: [
      { value: "2022", label: "Année de fondation" },
      { value: "30M", label: "Habitants à Madagascar" },
      { value: "100%", label: "Des dons dédiés aux enfants" },
      { value: "365", label: "Jours d'accompagnement par an" },
    ],
    intro: {
      title: "Une famille avant tout",
      body: [
        "L'orphelinat Jésus Mon Refuge Madagascar est un orphelinat chrétien créé par le couple pastoral C-Maias et Amaya, situé à Antananarivo, la capitale de Madagascar.",
        "L'association a pour objet la solidarité et l'inclusion sociale des enfants, des veuves et des personnes vulnérables. Nos actions et nos attitudes reposent sur des fondements bibliques ancrés dans notre confession de foi.",
      ],
      verse: "« Père des orphelins, défenseur des veuves, tel est Dieu dans sa demeure sainte. » — Psaume 68:6",
    },
    pillarsTitle: "Ce que nous faisons chaque jour",
    pillars: [
      {
        title: "Éducation",
        body: "Scolarisation dans une école chrétienne, achat de fournitures et suivi individuel de chaque enfant.",
      },
      {
        title: "Santé & nutrition",
        body: "Repas quotidiens, soins médicaux et suivi sanitaire des mineurs accueillis dans nos structures agréées.",
      },
      {
        title: "Veuves & familles",
        body: "Accompagnement des femmes veuves par l'emploi salarié et des programmes générateurs de revenus.",
      },
      {
        title: "Foi & discipulat",
        body: "Les enfants fréquentent une église évangélique où ils découvrent et grandissent dans la foi chrétienne.",
      },
    ],
    storyTitle: "Notre histoire en images",
    stories: [
      {
        eyebrow: "Éducation",
        title: "Une place à l'école pour chaque enfant",
        body: "Participer aux orphelinats, c'est d'abord garantir la prise en charge éducative et sanitaire des mineurs, dans le respect des lois et règlements en vigueur à Madagascar.",
      },
      {
        eyebrow: "Solidarité",
        title: "Des repas, chaque jour, sans exception",
        body: "Madagascar connaît l'un des taux de pauvreté les plus élevés au monde. Notre association mène plusieurs actions éducatives, économiques et alimentaires pour aider les enfants.",
      },
      {
        eyebrow: "Église",
        title: "Une communauté qui relève",
        body: "Les enfants de l'orphelinat sont accueillis dans une église évangélique locale : un lieu de paix, de chants et d'espérance où chacun trouve sa place.",
      },
    ],
    sponsorTitle: "En parrainant un enfant, vous...",
    sponsorPoints: [
      "Aidez à sortir les orphelins de la rue et de ses dangers : faim, mendicité, prostitution.",
      "Permettez leur scolarisation dans une école chrétienne et financez le matériel qui améliore leur quotidien.",
      "Faites des disciples : les enfants découvrent et grandissent dans la foi chrétienne.",
    ],
    founders: {
      eyebrow: "Les fondateurs",
      title: "C-Maias & Amaya",
      role: "Couple pastoral · Fondateurs de l'association",
      body: [
        "Le couple pastoral C-Maias et Amaya sont les fondateurs de l'association Orphelinat Jésus Mon Refuge Madagascar.",
        "Engagés pleinement dans le ministère, ils ont eu la vision d'accomplir ce que les Saintes Écritures enseignent dans le livre de Jacques 1:27 :",
        "En effet, de la même manière que Dieu ne nous a pas laissés orphelins, les fondateurs ont notamment la préoccupation de répondre aux besoins des enfants délaissés.",
      ],
      verse:
        "\u00ab La religion pure et sans tâche, devant Dieu notre Père, consiste à secourir les orphelins et les veuves dans leurs affliction et à se préserver des souillures du monde. \u00bb — Jacques 1:27",
      photoAlt: "C-Maias et Amaya, couple pastoral fondateur de l'orphelinat",
    },
    donate: {
      title: "Donner, c'est offrir un avenir",
      body: "Chaque don, ponctuel ou régulier, se traduit en repas, en cahiers, en soins et en sourires.",
      paypal: "Donner via PayPal",
      transfer: "Faire un virement bancaire",
      transferNote:
        "Pour recevoir le RIB de l'association, écrivez-nous à contact@orphelinat-jesus-mon-refuge.com.",
      amounts: ["15 €", "30 €", "60 €", "Libre"],
      amountsNote: "Montants indicatifs — le parrainage mensuel garantit la continuité de la prise en charge.",
    },
    flow: {
      steps: ["Montant", "Message", "Confirmation"],
      frequency: "Fréquence du don",
      once: "Don unique",
      monthly: "Don mensuel",
      onceNote: "Un geste ponctuel, immédiatement utile.",
      monthlyNote: "Un parrainage régulier qui sécurise le quotidien d'un enfant.",
      chooseAmount: "Choisissez un montant",
      custom: "Montant libre",
      customPlaceholder: "Ex. 45",
      currency: "€",
      impact: {
        low: "Un mois de fournitures scolaires pour un enfant.",
        mid: "Des repas chauds pendant deux semaines.",
        high: "Une partie de la scolarité annuelle d'un enfant.",
        top: "Le parrainage complet d'un enfant, soins inclus.",
      },
      nameLabel: "Votre nom",
      namePlaceholder: "Prénom et nom",
      emailLabel: "Votre e-mail",
      emailPlaceholder: "vous@exemple.com",
      messageLabel: "Votre message personnalisé",
      messagePlaceholder: "Un mot d'encouragement pour les enfants et l'équipe…",
      messageNote: "Votre message sera lu aux enfants lors du culte du dimanche.",
      anonymous: "Faire ce don anonymement",
      back: "Retour",
      next: "Continuer",
      review: "Récapitulatif de votre don",
      amountLabel: "Montant",
      frequencyLabel: "Fréquence",
      fromLabel: "De la part de",
      anonymousName: "Un donateur anonyme",
      messageReview: "Message",
      noMessage: "Aucun message",
      confirm: "Finaliser sur PayPal",
      errors: {
        amount: "Merci d'indiquer un montant supérieur à 1 €.",
        name: "Merci d'indiquer votre nom (ou cochez « anonyme »).",
        email: "Merci d'indiquer une adresse e-mail valide.",
        message: "Le message ne doit pas dépasser 500 caractères.",
      },
    },
    thanks: {
      kicker: "Merci du fond du cœur",
      title: "Votre don change une vie",
      body: "Nous avons bien enregistré votre intention de don. Un e-mail de confirmation vous parviendra dès la validation du paiement.",
      summary: "Votre don",
      yourMessage: "Votre message",
      verse: "« Celui qui a pitié du pauvre prête à l'Éternel, qui lui rendra selon son œuvre. » — Proverbes 19:17",
      backHome: "Retour à l'accueil",
      newDonation: "Faire un autre don",
      noData: "Aucun don en cours. Vous pouvez en commencer un dès maintenant.",
    },
    contact: {
      title: "Contactez-nous",
      body: "Une question, un projet de partenariat, une envie d'aider ? Nous répondons à chaque message.",
      emailLabel: "E-mail",
      phoneLabel: "Téléphone",
      addressLabel: "Adresse postale",
      address: "17 Rue Henry Monnier, 75009 Paris, France",
      follow: "Nous suivre",
    },
    footerTagline: "Orphelinat chrétien à Antananarivo, Madagascar. Solidarité et inclusion sociale des enfants, des veuves et des personnes vulnérables.",
    legal: "Mentions légales",
    rights: "Tous droits réservés.",
  },
  en: {
    org: "Jesus My Refuge Orphanage",
    orgSub: "Madagascar",
    nav: {
      home: "Home",
      orphanage: "The orphanage",
      mission: "Our mission",
      church: "Our church",
      contact: "Contact",
    },
    cta: { sponsor: "Sponsor a child", give: "Give", partner: "Become a partner", learn: "Learn more" },
    hero: {
      kicker: "Antananarivo · Madagascar",
      title: "Let's take care\nof the orphans",
      verse:
        "\"Learn to do good, seek justice, correct oppression; bring justice to the fatherless, plead the widow's cause.\" — Isaiah 1:17",
      scroll: "Explore",
    },
    stats: [
      { value: "2022", label: "Founded" },
      { value: "30M", label: "People in Madagascar" },
      { value: "100%", label: "Of gifts go to the children" },
      { value: "365", label: "Days of care each year" },
    ],
    intro: {
      title: "A family, first of all",
      body: [
        "Jesus My Refuge Madagascar is a Christian orphanage founded by the pastoral couple C-Maias and Amaya, located in Antananarivo, the capital of Madagascar.",
        "The association exists for solidarity and the social inclusion of children, widows and vulnerable people. Our actions are grounded in biblical foundations rooted in our confession of faith.",
      ],
      verse: "\"A father to the fatherless and defender of widows is God in his holy dwelling.\" — Psalm 68:6",
    },
    pillarsTitle: "What we do every day",
    pillars: [
      { title: "Education", body: "Schooling in a Christian school, supplies, and individual follow-up for every child." },
      { title: "Health & food", body: "Daily meals, medical care and health monitoring for the minors in our authorized facilities." },
      { title: "Widows & families", body: "Support for widowed women through salaried employment and income-generating programmes." },
      { title: "Faith & discipleship", body: "Children attend an evangelical church where they discover and grow in the Christian faith." },
    ],
    storyTitle: "Our story in pictures",
    stories: [
      {
        eyebrow: "Education",
        title: "A seat at school for every child",
        body: "Running an orphanage means first guaranteeing education and healthcare for minors, within the laws and regulations in force in Madagascar.",
      },
      {
        eyebrow: "Solidarity",
        title: "Meals, every single day",
        body: "Madagascar has one of the highest poverty rates in the world. Our association leads educational, economic and food programmes to help children.",
      },
      {
        eyebrow: "Church",
        title: "A community that lifts people up",
        body: "The orphanage children are welcomed into a local evangelical church: a place of peace, singing and hope where everyone belongs.",
      },
    ],
    sponsorTitle: "By sponsoring a child, you...",
    sponsorPoints: [
      "Help get orphans off the streets and away from hunger, begging and exploitation.",
      "Enable their schooling in a Christian school and fund equipment that improves daily life.",
      "Make disciples: children discover and grow in the Christian faith.",
    ],
    founders: {
      eyebrow: "The founders",
      title: "C-Maias & Amaya",
      role: "Pastoral couple · Founders of the association",
      body: [
        "The pastoral couple C-Maias and Amaya are the founders of the association Orphelinat Jésus Mon Refuge Madagascar.",
        "Fully committed to ministry, they received the vision to fulfil what the Holy Scriptures teach in the book of James 1:27:",
        "Just as God did not leave us as orphans, the founders carry a deep concern to meet the needs of abandoned children.",
      ],
      verse:
        "\u201cReligion that is pure and undefiled before God the Father is this: to visit orphans and widows in their affliction, and to keep oneself unstained from the world.\u201d — James 1:27",
      photoAlt: "C-Maias and Amaya, the pastoral couple who founded the orphanage",
    },
    donate: {
      title: "Giving means offering a future",
      body: "Every gift, one-off or monthly, turns into meals, notebooks, care and smiles.",
      paypal: "Give with PayPal",
      transfer: "Make a bank transfer",
      transferNote: "To receive the association's bank details, write to contact@orphelinat-jesus-mon-refuge.com.",
      amounts: ["€15", "€30", "€60", "Free"],
      amountsNote: "Indicative amounts — monthly sponsorship guarantees continuity of care.",
    },
    flow: {
      steps: ["Amount", "Message", "Confirmation"],
      frequency: "Gift frequency",
      once: "One-time gift",
      monthly: "Monthly gift",
      onceNote: "A single gift, useful straight away.",
      monthlyNote: "Regular sponsorship that secures a child's daily life.",
      chooseAmount: "Choose an amount",
      custom: "Custom amount",
      customPlaceholder: "e.g. 45",
      currency: "€",
      impact: {
        low: "One month of school supplies for a child.",
        mid: "Hot meals for two weeks.",
        high: "Part of a child's yearly schooling.",
        top: "Full sponsorship of a child, care included.",
      },
      nameLabel: "Your name",
      namePlaceholder: "First and last name",
      emailLabel: "Your email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Your personal message",
      messagePlaceholder: "A word of encouragement for the children and the team…",
      messageNote: "Your message will be read to the children during Sunday service.",
      anonymous: "Give anonymously",
      back: "Back",
      next: "Continue",
      review: "Your gift summary",
      amountLabel: "Amount",
      frequencyLabel: "Frequency",
      fromLabel: "From",
      anonymousName: "An anonymous donor",
      messageReview: "Message",
      noMessage: "No message",
      confirm: "Complete on PayPal",
      errors: {
        amount: "Please enter an amount above €1.",
        name: "Please enter your name (or tick \"anonymous\").",
        email: "Please enter a valid email address.",
        message: "The message must be 500 characters or fewer.",
      },
    },
    thanks: {
      kicker: "Thank you from the heart",
      title: "Your gift changes a life",
      body: "We have recorded your gift. A confirmation email will reach you as soon as the payment is validated.",
      summary: "Your gift",
      yourMessage: "Your message",
      verse: "\"Whoever is generous to the poor lends to the Lord, and he will repay him for his deed.\" — Proverbs 19:17",
      backHome: "Back to home",
      newDonation: "Make another gift",
      noData: "No gift in progress. You can start one right now.",
    },
    contact: {
      title: "Contact us",
      body: "A question, a partnership idea, a desire to help? We answer every message.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Postal address",
      address: "17 Rue Henry Monnier, 75009 Paris, France",
      follow: "Follow us",
    },
    footerTagline: "Christian orphanage in Antananarivo, Madagascar. Solidarity and social inclusion for children, widows and vulnerable people.",
    legal: "Legal notice",
    rights: "All rights reserved.",
  },
} as const;

export const links = {
  paypal: "https://www.paypal.com/paypalme/OprhelinatJMR",
  instagram: "https://www.instagram.com/orphelinat.jesus.mon.refuge/",
  facebook: "https://www.facebook.com/orphelinat.jesus.mon.refuge/",
  email: "contact@orphelinat-jesus-mon-refuge.com",
  phone: "+33 7 45 04 10 98",
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof content)["fr"] };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("ojmr-lang");
    if (stored === "en" || stored === "fr") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("ojmr-lang", l);
    document.documentElement.lang = l;
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t: content[lang] as (typeof content)["fr"] }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}