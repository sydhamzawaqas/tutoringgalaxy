// Per-city SEO copy so meta titles/descriptions are unique per landing page
// instead of templated across every city. Falls back to templated copy when
// a city isn't listed here.

export type CityExtra = {
  /** Short trust hook used in <title> after the city name. */
  titleHook: string;
  /** Full unique meta description (155–160 chars ideal). */
  description: string;
  /** Local schools / boards / neighbourhoods sentence used in on-page copy. */
  localHook?: string;
};

export const CITY_EXTRAS: Record<string, CityExtra> = {
  islamabad: {
    titleHook: "Verified Home Tutors for O/A Level, Matric & MDCAT",
    description: "Vetted home tutors across DHA, F-sectors, E-11 and Bahria Town Islamabad. O/A Level, Matric, FSc and MDCAT — first 30-minute trial is free.",
    localHook: "Trusted by families across DHA, F-6/7/8, E-7/E-11 and Bahria Town.",
  },
  rawalpindi: {
    titleHook: "Home Tutors for Cantt, Bahria Town & Chaklala Families",
    description: "Home tutors visiting Rawalpindi Cantt, Saddar, Chaklala, Westridge and Bahria Town. O/A Level, Matric and FSc — trial class complimentary.",
    localHook: "Serving Rawalpindi Cantt, Chaklala Scheme, Bahria Town and Gulberg Residencia.",
  },
  lahore: {
    titleHook: "Top-Rated Tutors for O/A Level, IGCSE & Matric",
    description: "Lahore's most-requested tutors for O/A Level, IGCSE, Matric and FSc — DHA, Gulberg, Bahria and Model Town. Free trial, no card required.",
    localHook: "Covering DHA, Gulberg, Model Town, Cantt and Bahria Orchard.",
  },
  karachi: {
    titleHook: "Home & Online Tutors for O/A Level, Aga Khan & MDCAT",
    description: "Karachi tutors specialising in Aga Khan Board, O/A Level, IGCSE and MDCAT. DHA, Clifton, Bahria and Gulshan. First trial free.",
    localHook: "Serving DHA Phases 1–8, Clifton, Bahria Town and Gulshan-e-Iqbal.",
  },
  dubai: {
    titleHook: "IB, IGCSE & A Level Tutors Across Marina, JLT & Downtown",
    description: "Dubai's expert tutors for IB, IGCSE and A Level — Marina, JLT, Downtown, Palm Jumeirah and Arabian Ranches. GEMS, Taaleem & Nord Anglia specialists.",
    localHook: "Trusted across Marina, JLT, Palm Jumeirah, Arabian Ranches, Mirdif and Business Bay.",
  },
  "abu-dhabi": {
    titleHook: "IB & IGCSE Tutors for Al Reem, Saadiyat & Khalifa City",
    description: "Abu Dhabi tutors specialising in IB, IGCSE and A Level for Cranleigh, Aldar, Redwood and NYU families. First trial class free.",
    localHook: "Serving Al Reem Island, Saadiyat, Khalifa City, Al Raha and Yas Island.",
  },
  sharjah: {
    titleHook: "IGCSE, A Level & MoE Tutors Across Al Majaz & Muwaileh",
    description: "Sharjah home tutors for IGCSE, A Level and MoE curricula across Al Majaz, Al Qasba and Muwaileh. Same-day matching, first trial free.",
  },
  doha: {
    titleHook: "IB, IGCSE & SAT Tutors for West Bay, The Pearl & Lusail",
    description: "Doha's most-requested tutors for IB, IGCSE, A Level and SAT — West Bay, The Pearl, Al Sadd and Msheireb. Free trial, verified tutors only.",
    localHook: "Trusted across West Bay, The Pearl-Qatar, Al Sadd, Msheireb and Aspire Zone.",
  },
  riyadh: {
    titleHook: "IB, IGCSE & Saudi National Tutors for DQ & Al Olaya",
    description: "Riyadh tutors for IB, IGCSE, A Level, SAT and Saudi National curricula across the Diplomatic Quarter, Al Olaya, Al Nakheel and Hittin.",
    localHook: "Serving the Diplomatic Quarter, Al Olaya, Al Nakheel, Al Malqa and Hittin.",
  },
  jeddah: {
    titleHook: "IGCSE, A Level & Saudi National Tutors Across Al Hamra & Obhur",
    description: "Jeddah home tutors for IGCSE, A Level, IB and Saudi National curricula — Al Hamra, Al Shati, Obhur North and Obhur South. First trial free.",
  },
  muscat: {
    titleHook: "IB, IGCSE & SAT Tutors for Muscat International Schools",
    description: "Muscat tutors for IB, IGCSE, A Level and SAT across Al Mouj, Madinat Qaboos and Qurum. British, American and Indian curriculum specialists.",
  },
  manama: {
    titleHook: "IB, IGCSE & A Level Tutors for BSB, St Christopher's & More",
    description: "Manama tutors for IB, IGCSE, A Level and SAT — supporting British School of Bahrain, St Christopher's and Ibn Khuldoon families.",
  },
  "kuwait-city": {
    titleHook: "IB, IGCSE & A Level Tutors for AIS, BSK & Al Bayan",
    description: "Kuwait City tutors for IB, IGCSE and A Level — American International, British School Kuwait and Al Bayan Bilingual specialists.",
  },
  london: {
    titleHook: "GCSE, A Level & 11+ Tutors Across Kensington, Chelsea & Canary Wharf",
    description: "London's most-requested GCSE, A Level, IB and 11+ tutors — Kensington, Chelsea, Hampstead, Richmond and Canary Wharf. Free trial session.",
    localHook: "Trusted across Kensington, Chelsea, Hampstead, Richmond, Notting Hill and Greenwich.",
  },
  manchester: {
    titleHook: "GCSE & A Level Tutors for Didsbury, Altrincham & Wilmslow",
    description: "Manchester tutors specialising in GCSE, A Level and grammar-school 11+ prep — Didsbury, Altrincham, Wilmslow, Chorlton and Sale.",
    localHook: "Serving Didsbury, Altrincham, Wilmslow, Chorlton and Sale.",
  },
  birmingham: {
    titleHook: "GCSE, A Level & 11+ Tutors Across Edgbaston, Harborne & Solihull",
    description: "Birmingham tutors for KES, KEHS, Edgbaston High and Solihull families — GCSE, A Level, IB and 11+ prep. Free trial class.",
  },
  sydney: {
    titleHook: "HSC, IB & NAPLAN Tutors Across Sydney's North & East",
    description: "Sydney tutors for HSC, IB, Selective School prep and NAPLAN Year 3/5/7/9. North Shore, Eastern Suburbs and Inner West specialists.",
  },
  melbourne: {
    titleHook: "VCE, IB & NAPLAN Tutors for Melbourne Families",
    description: "Melbourne tutors specialising in VCE, IB and NAPLAN — supporting families in Camberwell, Toorak, Brighton and Hawthorn.",
  },
  "new-york": {
    titleHook: "SAT, AP, IB & Common Core Tutors Across Manhattan & Brooklyn",
    description: "NYC tutors for SAT, AP, IB and Common Core — Manhattan, Brooklyn Heights and Upper East Side families. First diagnostic session free.",
  },
};

export function cityTitleHook(slug: string, fallbackSubjects: string) {
  return CITY_EXTRAS[slug]?.titleHook ?? `Home & Online Tutors for ${fallbackSubjects}`;
}

export function cityDescription(slug: string, fallback: string) {
  return CITY_EXTRAS[slug]?.description ?? fallback;
}
