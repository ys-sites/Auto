export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      inventory: "Inventory",
      how: "How It Works",
      sell: "Sell Your Car",
      contact: "Contact",
      reserve: "Book a Visit"
    },
    hero: {
      tag: "Montreal's Used-Car Flipper",
      title_part1: "Flipped Right.",
      title_extraordinary: "Priced Right.",
      description: "Hand-picked, fully inspected and reconditioned used cars — priced fairly and sold fast. No dealership games, just good cars.",
      cta_showroom: "BROWSE CARS",
      cta_learn: "HOW IT WORKS",
      cta_call: "CALL NOW",
      chip_inspected: "Fully inspected",
      chip_title: "Clean title",
      chip_price: "Fair price"
    },
    notfound: {
      title: "This car drove off.",
      text: "The page you're looking for isn't here — but great cars are. Let's get you back on the road.",
      browse: "BROWSE CARS"
    },
    leadModal: {
      call: {
        title: "Call AK Flips",
        subtitle: "Drop your name and number first — then your call goes straight through.",
        submit: "CALL NOW",
        sending: "SENDING..."
      },
      instagram: {
        title: "Chat on Instagram",
        subtitle: "Leave your name and number — then we open the chat with a message ready to send.",
        submit: "OPEN CHAT",
        sending: "SENDING...",
        readyTitle: "Your message is ready",
        readyDesc: "Send it straight to our Instagram chat — the message is pre-filled for you.",
        openChat: "SEND INSTAGRAM MESSAGE",
        openDirect: "or open the chat directly"
      },
      email: {
        title: "Email AK Flips",
        subtitle: "Leave your name and number first — then your email app opens.",
        submit: "OPEN EMAIL",
        sending: "SENDING..."
      }
    },
    instagram: {
      dmOpener: "Hey there! I saw your website and I'm interested in one of your cars. Can you contact me?",
      dmToast: "Opening chat — message copied, just paste it 📋"
    },
    filters: {
      all: "All Cars",
      search_placeholder: "Search make or model...",
      filter_btn: "Filters",
      highlights: "Fresh Flips"
    },
    car_card: {
      view_details: "View Car",
      inquire: "Inquire",
      full_collection: "VIEW ALL CARS"
    },
    process: {
      tag: "How It Works",
      title: "From Our Hands",
      title_accent: "To Your Driveway",
      description: "Every AK Flips car goes through the same three steps before it ever gets listed.",
      steps: [
        { title: "We Hunt", desc: "We scour the market for the best used cars in Montreal — low mileage, clean history, solid bones." },
        { title: "We Recondition", desc: "Full inspection, brakes, tires, fluids and a deep detail. Everything fixed before the car is listed." },
        { title: "You Drive", desc: "Fair price, clean title, Carfax available. Come see it, drive it, take it home the same day." }
      ],
      cta: "SEE THE FULL PROCESS"
    },
    trust: {
      tag: "Buy With Confidence",
      items: [
        { title: "Fully Inspected", desc: "Every car passes a complete mechanical inspection before listing." },
        { title: "Clean Title", desc: "No accidents hidden, no surprises. History you can verify." },
        { title: "Carfax Available", desc: "Vehicle history report available on every car we sell." },
        { title: "Fair Pricing", desc: "Priced against the market — no inflated dealership markups." }
      ]
    },
    contact: {
      tag: "Get In Touch",
      title: "Find Your",
      title_next: "Next Car",
      description: "Questions about a car, want to book a viewing, or selling yours? Send a message — AK replies fast.",
      form: {
        name: "Full Name",
        email: "Email",
        phone: "Phone Number",
        interests: "I'm interested in",
        message: "Message",
        submit: "SEND MESSAGE",
        sending: "SENDING...",
        success_title: "MESSAGE SENT",
        success_desc: "Thanks! Your message is on its way — AK will get back to you shortly.",
        new_inquiry: "Send Another",
        options: {
          buy: "Buying a car",
          sell: "Selling my car",
          question: "General question"
        }
      },
      info: {
        location: "Location",
        hours: "Hours",
        mon_fri: "Mon - Fri",
        sat: "Sat",
        sun: "Sun",
        by_appointment: "By Appointment"
      }
    },
    footer: {
      tagline: "Montreal's home for hand-picked, reconditioned used cars. Flipped right, priced right.",
      legal: "© 2026 AK FLIPS. ALL RIGHTS RESERVED.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    detail: {
      specs: "Specifications",
      features: "Key Features",
      back: "Back to Inventory",
      just_flipped: "Just Flipped",
      cta_call: "CALL NOW",
      cta_dm: "MESSAGE ON INSTAGRAM",
      cta_reserve: "RESERVE THIS CAR",
      cta_cluster_title: "Like this car? Act fast — good flips don't wait.",
      what_fixed_tag: "The flip story",
      what_fixed_title: "WHAT WE FIXED",
      what_fixed_desc: "Every AK Flips car gets reconditioned before it's listed. Here's exactly what we did to this one.",
      estimator_tag: "Payment estimator",
      estimator_title: "WHAT WOULD IT COST MONTHLY?",
      estimator_price: "Vehicle price",
      estimator_down: "Down payment",
      estimator_rate: "Annual interest rate",
      estimator_term: "Term",
      estimator_months: "months",
      estimator_result: "Estimated monthly payment",
      estimator_disclaimer: "Estimate only — not an offer of credit. AK Flips doesn't offer financing; check with your bank or lender for actual terms.",
      sticky_call: "Call",
      sticky_dm: "DM",
      sticky_reserve: "Reserve",
      sold: "SOLD",
      sold_desc: "This one found a new home — but we flip cars like this every week.",
      sold_cta: "FIND ME A SIMILAR ONE"
    },
    home: {
      sold_tag: "Recently sold",
      sold_title: "GONE IN DAYS",
      sold_desc: "Real flips, real buyers. Good cars move fast here — average 9 days listed.",
      faq_tag: "Questions",
      faq_title: "BEFORE YOU ASK",
      faq_items: [
        { q: "Do you offer financing?", a: "No — we're flippers, not a lender. Most buyers pay cash or arrange their own loan with their bank. Use our payment estimator on any car page to see what the monthly would look like." },
        { q: "Can I see the Carfax?", a: "Absolutely. Every car comes with its history report — ask us anytime and we'll send it before you even visit." },
        { q: "Where do I view the car?", a: "We're based in Montreal. Message or call us to book a viewing — evenings and weekends work too." },
        { q: "Is there a warranty?", a: "Each car is fully inspected and reconditioned before sale, and remaining factory warranty transfers where applicable. We'll be upfront about everything we know." },
        { q: "Can I trade in my car?", a: "Yes — tell us about your car and we'll factor it into the deal. Check its market value with Canadian Black Book first so we start fair." }
      ],
      ig_tag: "Follow the flips",
      ig_title: "WATCH CARS GET FLIPPED",
      ig_desc: "New arrivals, before/afters and sold celebrations — it all happens on Instagram first.",
      ig_cta: "FOLLOW @AK.FLIPS._"
    },
    alerts: {
      tag: "Never miss a flip",
      title: "GET NOTIFIED",
      desc: "Tell us your budget — we'll email you the minute a car under your price hits the lot.",
      name: "Your name",
      email: "Email",
      phone: "Phone (optional)",
      max_price: "Max budget ($)",
      submit: "NOTIFY ME",
      sending: "SENDING...",
      success_title: "YOU'RE ON THE LIST",
      success_desc: "We'll reach out as soon as a matching car arrives."
    },
    tradein: {
      tag: "Have a car to sell?",
      title: "TRADE IT IN",
      desc: "Already selling? Check your car's market value on Canadian Black Book, then bring us the number — we'll make you a straight offer.",
      cta: "CHECK MY CAR'S VALUE",
      note: "Free estimate • Takes 2 minutes"
    }
  },
  fr: {
    nav: {
      inventory: "Inventaire",
      how: "Comment ça marche",
      sell: "Vendez votre auto",
      contact: "Contact",
      reserve: "Réserver une visite"
    },
    hero: {
      tag: "Le spécialiste d'autos d'occasion à Montréal",
      title_part1: "Remise à neuf.",
      title_extraordinary: "Au juste prix.",
      description: "Des voitures d'occasion triées sur le volet, entièrement inspectées et remises à neuf — à prix juste, vendues rapidement. Sans jeux de concessionnaire.",
      cta_showroom: "VOIR LES AUTOS",
      cta_learn: "COMMENT ÇA MARCHE",
      cta_call: "APPELEZ-NOUS",
      chip_inspected: "Entièrement inspectées",
      chip_title: "Historique vérifié",
      chip_price: "Prix juste"
    },
    notfound: {
      title: "Cette auto s'est envolée.",
      text: "La page que vous cherchez n'est pas ici — mais de belles autos, oui. Remettons-vous sur la route.",
      browse: "VOIR LES AUTOS"
    },
    leadModal: {
      call: {
        title: "Appelez AK Flips",
        subtitle: "Laissez votre nom et numéro — ensuite votre appel passe directement.",
        submit: "APPELER",
        sending: "ENVOI..."
      },
      instagram: {
        title: "Discutez sur Instagram",
        subtitle: "Laissez votre nom et numéro — on ouvre ensuite la discussion avec un message prêt à envoyer.",
        submit: "OUVRIR LE CHAT",
        sending: "ENVOI...",
        readyTitle: "Votre message est prêt",
        readyDesc: "Envoyez-le directement sur notre Instagram — le message est pré-rempli pour vous.",
        openChat: "ENVOYER LE MESSAGE INSTAGRAM",
        openDirect: "ou ouvrir la discussion directement"
      },
      email: {
        title: "Écrivez à AK Flips",
        subtitle: "Laissez votre nom et numéro — ensuite votre application courriel s'ouvre.",
        submit: "OUVRIR COURRIEL",
        sending: "ENVOI..."
      }
    },
    instagram: {
      dmOpener: "Salut ! J'ai vu votre site web et je suis intéressé par une de vos autos. Pouvez-vous me contacter ?",
      dmToast: "Ouverture du chat — message copié, collez-le 📋"
    },
    filters: {
      all: "Toutes les autos",
      search_placeholder: "Rechercher marque ou modèle...",
      filter_btn: "Filtres",
      highlights: "Nouveautés"
    },
    car_card: {
      view_details: "Voir l'auto",
      inquire: "Demander",
      full_collection: "VOIR TOUTES LES AUTOS"
    },
    process: {
      tag: "Comment ça marche",
      title: "De nos mains",
      title_accent: "À votre entrée",
      description: "Chaque auto AK Flips passe par les mêmes trois étapes avant d'être affichée.",
      steps: [
        { title: "On déniche", desc: "On parcourt le marché pour trouver les meilleures autos d'occasion à Montréal — bas kilométrage, historique propre." },
        { title: "On remet à neuf", desc: "Inspection complète, freins, pneus, fluides et nettoyage en profondeur. Tout est réglé avant l'affichage." },
        { title: "Vous conduisez", desc: "Prix juste, titre propre, Carfax disponible. Venez la voir, l'essayer et repartez avec le jour même." }
      ],
      cta: "VOIR LE PROCESSUS COMPLET"
    },
    trust: {
      tag: "Achetez en confiance",
      items: [
        { title: "Entièrement inspectée", desc: "Chaque auto passe une inspection mécanique complète avant d'être affichée." },
        { title: "Titre propre", desc: "Aucun accident caché, aucune surprise. Un historique vérifiable." },
        { title: "Carfax disponible", desc: "Rapport d'historique disponible pour chaque auto vendue." },
        { title: "Prix justes", desc: "Prix établis selon le marché — sans marges gonflées de concessionnaire." }
      ]
    },
    contact: {
      tag: "Contactez-nous",
      title: "Trouvez votre",
      title_next: "Prochaine auto",
      description: "Une question sur une auto, réserver une visite ou vendre la vôtre? Écrivez-nous — AK répond vite.",
      form: {
        name: "Nom complet",
        email: "Courriel",
        phone: "Numéro de téléphone",
        interests: "Je suis intéressé par",
        message: "Message",
        submit: "ENVOYER",
        sending: "ENVOI...",
        success_title: "MESSAGE ENVOYÉ",
        success_desc: "Merci! Votre message est en route — AK vous répondra sous peu.",
        new_inquiry: "Envoyer un autre",
        options: {
          buy: "Acheter une auto",
          sell: "Vendre mon auto",
          question: "Question générale"
        }
      },
      info: {
        location: "Emplacement",
        hours: "Heures",
        mon_fri: "Lun - Ven",
        sat: "Sam",
        sun: "Dim",
        by_appointment: "Sur rendez-vous"
      }
    },
    footer: {
      tagline: "La référence à Montréal pour les autos d'occasion triées sur le volet et remises à neuf. Au juste prix.",
      legal: "© 2026 AK FLIPS. TOUS DROITS RÉSERVÉS.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation"
    },
    detail: {
      specs: "Spécifications",
      features: "Caractéristiques clés",
      back: "Retour à l'inventaire",
      just_flipped: "Fraîchement arrivée",
      cta_call: "APPELEZ-NOUS",
      cta_dm: "MESSAGE INSTAGRAM",
      cta_reserve: "RÉSERVER CETTE AUTO",
      cta_cluster_title: "Elle vous plaît? Faites vite — les bonnes affaires ne durent pas.",
      what_fixed_tag: "L'histoire de la remise à neuf",
      what_fixed_title: "CE QU'ON A RÉPARÉ",
      what_fixed_desc: "Chaque auto AK Flips est remise à neuf avant d'être affichée. Voici exactement ce qu'on a fait sur celle-ci.",
      estimator_tag: "Estimateur de paiement",
      estimator_title: "COMBIEN PAR MOIS?",
      estimator_price: "Prix du véhicule",
      estimator_down: "Acompte",
      estimator_rate: "Taux d'intérêt annuel",
      estimator_term: "Durée",
      estimator_months: "mois",
      estimator_result: "Paiement mensuel estimé",
      estimator_disclaimer: "Estimation seulement — pas une offre de crédit. AK Flips n'offre pas de financement; vérifiez avec votre banque pour les conditions réelles.",
      sticky_call: "Appeler",
      sticky_dm: "DM",
      sticky_reserve: "Réserver",
      sold: "VENDUE",
      sold_desc: "Celle-ci a trouvé un nouveau foyer — mais on revend des autos comme celle-ci chaque semaine.",
      sold_cta: "TROUVEZ-M'EN UNE SEMBLABLE"
    },
    home: {
      sold_tag: "Récemment vendues",
      sold_title: "PARTIES EN QUELQUES JOURS",
      sold_desc: "De vraies ventes, de vrais acheteurs. Les bonnes autos partent vite ici — 9 jours en vente en moyenne.",
      faq_tag: "Questions",
      faq_title: "AVANT DE DEMANDER",
      faq_items: [
        { q: "Offrez-vous du financement?", a: "Non — on revend des autos, on n'est pas un prêteur. La plupart des acheteurs paient comptant ou arrangent leur propre prêt avec leur banque. Utilisez notre estimateur sur chaque page d'auto pour voir le mensuel." },
        { q: "Puis-je voir le Carfax?", a: "Absolument. Chaque auto vient avec son rapport d'historique — demandez-le nous et on vous l'envoie avant même votre visite." },
        { q: "Où puis-je voir l'auto?", a: "On est basés à Montréal. Écrivez-nous ou appelez-nous pour réserver une visite — soirs et fins de semaine aussi." },
        { q: "Y a-t-il une garantie?", a: "Chaque auto est entièrement inspectée et remise à neuf avant la vente, et la garantie d'usine restante est transférable le cas échéant. On est francs sur tout ce qu'on sait." },
        { q: "Puis-je donner mon auto en échange?", a: "Oui — parlez-nous de votre auto et on l'intègre dans l'entente. Vérifiez sa valeur marchande sur Canadian Black Book d'abord pour partir sur une base juste." }
      ],
      ig_tag: "Suivez les flips",
      ig_title: "VOYEZ LES AUTOS REVENDUES",
      ig_desc: "Nouveaux arrivages, avant/après et célébrations de ventes — tout se passe d'abord sur Instagram.",
      ig_cta: "SUIVRE @AK.FLIPS._"
    },
    alerts: {
      tag: "Ne manquez aucun flip",
      title: "SOYEZ AVERTI",
      desc: "Dites-nous votre budget — on vous écrit dès qu'une auto sous votre prix arrive.",
      name: "Votre nom",
      email: "Courriel",
      phone: "Téléphone (optionnel)",
      max_price: "Budget max ($)",
      submit: "AVERTISSEZ-MOI",
      sending: "ENVOI...",
      success_title: "VOUS ÊTES SUR LA LISTE",
      success_desc: "On vous contactera dès qu'une auto correspondante arrive."
    },
    tradein: {
      tag: "Une auto à vendre?",
      title: "DONNEZ-LA EN ÉCHANGE",
      desc: "Vous vendez déjà? Vérifiez la valeur marchande de votre auto sur Canadian Black Book, puis apportez-nous le chiffre — on vous fera une offre franche.",
      cta: "VÉRIFIER LA VALEUR DE MON AUTO",
      note: "Estimation gratuite • 2 minutes"
    }
  }
};
