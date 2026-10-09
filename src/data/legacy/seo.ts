// Single source of truth for nav, sitemap, and programmatic SEO pages.

export type Region = {
  slug: "pakistan" | "uae" | "uk" | "australia" | "usa" | "canada" | "saudi-arabia" | "qatar" | "oman" | "bahrain" | "kuwait";
  name: string;
  flag: string;
  cities: string[]; // slugs
  curricula: string[]; // slugs
};

export type City = {
  slug: string;
  name: string;
  region: Region["slug"];
  areas?: string[];
  curricula: string[];
  popularSubjects: string[];
};

export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
};

export type Curriculum = {
  slug: string;
  name: string;
  blurb: string;
  region: Region["slug"][];
};

export type Area = {
  slug: string;
  name: string;
  city: string; // city slug
  blurb: string;
};

export const SUBJECTS: Subject[] = [
  { slug: "mathematics", name: "Mathematics", emoji: "📐", blurb: "Algebra, calculus, geometry & beyond." },
  { slug: "physics", name: "Physics", emoji: "⚛️", blurb: "Mechanics, electricity, modern physics." },
  { slug: "chemistry", name: "Chemistry", emoji: "🧪", blurb: "Organic, inorganic and physical chemistry." },
  { slug: "biology", name: "Biology", emoji: "🧬", blurb: "Cells, genetics, ecology and human biology." },
  { slug: "english", name: "English", emoji: "📚", blurb: "Language, literature and academic writing." },
  { slug: "economics", name: "Economics", emoji: "📈", blurb: "Micro, macro and applied economics." },
  { slug: "accounting", name: "Accounting", emoji: "💼", blurb: "Financial and managerial accounting." },
  { slug: "computer-science", name: "Computer Science", emoji: "💻", blurb: "Programming, algorithms and theory." },
  { slug: "urdu", name: "Urdu", emoji: "✍️", blurb: "Grammar, literature and composition." },
  { slug: "business-studies", name: "Business Studies", emoji: "🏢", blurb: "Management, marketing, finance and enterprise." },
  { slug: "further-mathematics", name: "Further Mathematics", emoji: "➗", blurb: "Advanced pure & applied mathematics." },
  { slug: "statistics", name: "Statistics", emoji: "📊", blurb: "Probability, inference and data analysis." },
  { slug: "psychology", name: "Psychology", emoji: "🧠", blurb: "Cognition, behaviour and research methods." },
  { slug: "sociology", name: "Sociology", emoji: "👥", blurb: "Society, culture and social theory." },
  { slug: "history", name: "History", emoji: "🏛️", blurb: "World, modern and regional history." },
  { slug: "geography", name: "Geography", emoji: "🌍", blurb: "Human, physical and environmental geography." },
  { slug: "french", name: "French", emoji: "🇫🇷", blurb: "French language and literature." },
  { slug: "arabic", name: "Arabic", emoji: "🕌", blurb: "Arabic language, grammar and literature." },
  { slug: "spanish", name: "Spanish", emoji: "🇪🇸", blurb: "Spanish language and culture." },
  { slug: "ict", name: "ICT", emoji: "🖥️", blurb: "Information & communications technology." },
  { slug: "environmental-science", name: "Environmental Science", emoji: "🌱", blurb: "Ecosystems, climate and sustainability." },
];

export const CURRICULA: Curriculum[] = [
  { slug: "o-level", name: "O Level", blurb: "Cambridge O Level for grades 9–11.", region: ["pakistan", "uae"] },
  { slug: "a-level", name: "A Level", blurb: "Cambridge A Level for grades 11–13.", region: ["pakistan", "uae", "uk"] },
  { slug: "igcse", name: "IGCSE", blurb: "International General Certificate.", region: ["pakistan", "uae", "uk"] },
  { slug: "ib", name: "IB", blurb: "International Baccalaureate MYP & DP.", region: ["uae", "uk", "australia"] },
  { slug: "matric", name: "Matric", blurb: "Pakistani Matriculation board.", region: ["pakistan"] },
  { slug: "fsc", name: "FSc", blurb: "FSc Pre-Engineering & Pre-Medical.", region: ["pakistan"] },
  { slug: "gcse", name: "GCSE", blurb: "UK GCSE qualifications.", region: ["uk"] },
  { slug: "hsc", name: "HSC", blurb: "NSW Higher School Certificate.", region: ["australia"] },
  { slug: "vce", name: "VCE", blurb: "Victorian Certificate of Education.", region: ["australia"] },
  { slug: "ged", name: "GED", blurb: "General Educational Development.", region: ["pakistan", "uae"] },
  { slug: "mdcat", name: "MDCAT", blurb: "Medical & Dental College Admission Test.", region: ["pakistan"] },
  { slug: "ecat", name: "ECAT", blurb: "Engineering College Admission Test.", region: ["pakistan"] },
  { slug: "sat", name: "SAT", blurb: "US college admissions test.", region: ["usa", "uae", "saudi-arabia", "canada"] },
  { slug: "ap", name: "AP", blurb: "Advanced Placement courses & exams.", region: ["usa", "canada"] },
  { slug: "common-core", name: "Common Core", blurb: "US K-12 Common Core standards.", region: ["usa"] },
  { slug: "ontario", name: "Ontario Curriculum", blurb: "OSSD-aligned Ontario curriculum.", region: ["canada"] },
  { slug: "saudi-national", name: "Saudi National", blurb: "Saudi Ministry of Education curriculum.", region: ["saudi-arabia"] },
  { slug: "act", name: "ACT", blurb: "US college admissions ACT exam.", region: ["usa", "uae", "saudi-arabia", "canada"] },
  { slug: "edexcel", name: "Edexcel", blurb: "Pearson Edexcel IGCSE & A Level.", region: ["pakistan", "uae", "uk"] },
  { slug: "cambridge", name: "Cambridge", blurb: "Cambridge Assessment International Education.", region: ["pakistan", "uae", "uk"] },
];

export const REGIONS: Region[] = [
  {
    slug: "pakistan", name: "Pakistan", flag: "🇵🇰",
    cities: ["islamabad", "rawalpindi", "lahore", "karachi", "faisalabad", "multan", "peshawar", "quetta", "sialkot", "hyderabad"],
    curricula: ["matric", "fsc", "o-level", "a-level", "igcse", "ged", "mdcat", "ecat"],
  },
  {
    slug: "uae", name: "United Arab Emirates", flag: "🇦🇪",
    cities: ["dubai", "abu-dhabi", "sharjah", "ajman", "al-ain", "ras-al-khaimah"],
    curricula: ["igcse", "a-level", "ib"],
  },
  {
    slug: "uk", name: "United Kingdom", flag: "🇬🇧",
    cities: ["london", "manchester", "birmingham", "leeds", "liverpool", "glasgow", "edinburgh", "bristol", "cambridge", "oxford"],
    curricula: ["gcse", "a-level", "ib"],
  },
  {
    slug: "australia", name: "Australia", flag: "🇦🇺",
    cities: ["sydney", "melbourne", "brisbane", "perth", "adelaide", "canberra"],
    curricula: ["hsc", "vce", "ib"],
  },
  {
    slug: "usa", name: "United States", flag: "🇺🇸",
    cities: ["new-york", "los-angeles", "chicago", "houston", "san-francisco", "boston", "seattle", "miami", "atlanta", "dallas", "washington-dc"],
    curricula: ["sat", "ap", "ib", "common-core"],
  },
  {
    slug: "canada", name: "Canada", flag: "🇨🇦",
    cities: ["toronto", "vancouver", "montreal", "calgary", "ottawa", "edmonton"],
    curricula: ["ontario", "ap", "ib", "sat"],
  },
  {
    slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦",
    cities: ["riyadh", "jeddah", "dammam", "mecca", "medina", "khobar"],
    curricula: ["igcse", "a-level", "ib", "sat", "saudi-national"],
  },
  {
    slug: "qatar", name: "Qatar", flag: "🇶🇦",
    cities: ["doha", "lusail", "al-rayyan"],
    curricula: ["igcse", "a-level", "ib", "sat"],
  },
  {
    slug: "oman", name: "Oman", flag: "🇴🇲",
    cities: ["muscat", "salalah", "sohar"],
    curricula: ["igcse", "a-level", "ib", "sat"],
  },
  {
    slug: "bahrain", name: "Bahrain", flag: "🇧🇭",
    cities: ["manama", "riffa"],
    curricula: ["igcse", "a-level", "ib", "sat"],
  },
  {
    slug: "kuwait", name: "Kuwait", flag: "🇰🇼",
    cities: ["kuwait-city", "hawalli"],
    curricula: ["igcse", "a-level", "ib", "sat"],
  },
];

const QATAR_CITIES: City[] = [
  { slug: "doha", name: "Doha", region: "qatar",
    areas: ["west-bay", "the-pearl", "al-sadd", "msheireb", "aspire-zone"],
    curricula: ["igcse", "a-level", "ib", "sat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english", "economics"] },
  { slug: "lusail", name: "Lusail", region: "qatar",
    curricula: ["igcse", "a-level", "ib"],
    popularSubjects: ["mathematics", "english", "economics"] },
  { slug: "al-rayyan", name: "Al Rayyan", region: "qatar",
    curricula: ["igcse", "a-level", "ib"],
    popularSubjects: ["mathematics", "english"] },
];


export const CITIES: City[] = [
  ...QATAR_CITIES,
  { slug: "islamabad", name: "Islamabad", region: "pakistan",
    areas: ["dha", "bahria-town", "e-11", "f-11", "f-7", "f-8", "f-10", "e-7", "g-10", "g-11", "blue-area"],
    curricula: ["o-level", "a-level", "igcse", "matric", "fsc", "mdcat", "ecat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "biology", "english"] },
  { slug: "rawalpindi", name: "Rawalpindi", region: "pakistan",
    areas: ["bahria-town", "rawalpindi-cantt", "saddar", "chaklala", "westridge", "gulberg"],
    curricula: ["o-level", "a-level", "matric", "fsc", "mdcat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english"] },
  { slug: "lahore", name: "Lahore", region: "pakistan",
    curricula: ["o-level", "a-level", "igcse", "matric", "fsc", "mdcat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "biology", "english"] },
  { slug: "karachi", name: "Karachi", region: "pakistan",
    curricula: ["o-level", "a-level", "igcse", "matric", "fsc", "mdcat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "biology", "english"] },
  { slug: "dubai", name: "Dubai", region: "uae",
    areas: ["dubai-marina", "jlt", "downtown-dubai", "palm-jumeirah", "arabian-ranches", "mirdif", "jumeirah", "business-bay"],
    curricula: ["igcse", "a-level", "ib"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english", "economics"] },
  { slug: "abu-dhabi", name: "Abu Dhabi", region: "uae",
    areas: ["al-reem-island", "saadiyat-island", "khalifa-city", "al-raha", "yas-island"],
    curricula: ["igcse", "a-level", "ib"],
    popularSubjects: ["mathematics", "physics", "english", "economics"] },
  { slug: "london", name: "London", region: "uk",
    areas: ["kensington", "chelsea", "canary-wharf", "hampstead", "richmond", "notting-hill", "greenwich"],
    curricula: ["gcse", "a-level", "ib"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english", "economics"] },
  { slug: "manchester", name: "Manchester", region: "uk",
    areas: ["didsbury", "altrincham", "wilmslow", "chorlton", "sale"],
    curricula: ["gcse", "a-level"],
    popularSubjects: ["mathematics", "physics", "english"] },
  { slug: "sydney", name: "Sydney", region: "australia",
    curricula: ["hsc", "ib"],
    popularSubjects: ["mathematics", "physics", "english", "economics"] },
  { slug: "melbourne", name: "Melbourne", region: "australia",
    curricula: ["vce", "ib"],
    popularSubjects: ["mathematics", "chemistry", "english"] },
  { slug: "new-york", name: "New York", region: "usa",
    curricula: ["sat", "ap", "ib", "common-core"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english", "economics"] },
  { slug: "los-angeles", name: "Los Angeles", region: "usa",
    curricula: ["sat", "ap", "common-core"],
    popularSubjects: ["mathematics", "english", "computer-science"] },
  { slug: "chicago", name: "Chicago", region: "usa",
    curricula: ["sat", "ap", "common-core"],
    popularSubjects: ["mathematics", "physics", "english"] },
  { slug: "toronto", name: "Toronto", region: "canada",
    curricula: ["ontario", "ap", "ib", "sat"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english"] },
  { slug: "vancouver", name: "Vancouver", region: "canada",
    curricula: ["ontario", "ib", "sat"],
    popularSubjects: ["mathematics", "english", "computer-science"] },
  { slug: "riyadh", name: "Riyadh", region: "saudi-arabia",
    areas: ["diplomatic-quarter", "al-olaya", "al-nakheel", "al-malqa", "hittin"],
    curricula: ["igcse", "a-level", "ib", "sat", "saudi-national"],
    popularSubjects: ["mathematics", "physics", "chemistry", "english"] },
  { slug: "jeddah", name: "Jeddah", region: "saudi-arabia",
    areas: ["al-hamra-jeddah", "al-shati", "obhur"],
    curricula: ["igcse", "a-level", "ib", "saudi-national"],
    popularSubjects: ["mathematics", "english", "biology"] },
  // Pakistan
  { slug: "faisalabad", name: "Faisalabad", region: "pakistan", curricula: ["o-level", "a-level", "matric", "fsc"], popularSubjects: ["mathematics", "physics", "chemistry", "english"] },
  { slug: "multan", name: "Multan", region: "pakistan", curricula: ["o-level", "matric", "fsc"], popularSubjects: ["mathematics", "physics", "english"] },
  { slug: "peshawar", name: "Peshawar", region: "pakistan", curricula: ["o-level", "a-level", "matric", "fsc"], popularSubjects: ["mathematics", "physics", "chemistry", "english"] },
  { slug: "quetta", name: "Quetta", region: "pakistan", curricula: ["matric", "fsc", "o-level"], popularSubjects: ["mathematics", "english", "biology"] },
  { slug: "sialkot", name: "Sialkot", region: "pakistan", curricula: ["o-level", "matric", "fsc"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "hyderabad", name: "Hyderabad", region: "pakistan", curricula: ["matric", "fsc", "o-level"], popularSubjects: ["mathematics", "english", "biology"] },
  // UAE
  { slug: "sharjah", name: "Sharjah", region: "uae", areas: ["al-majaz", "al-qasba", "muwaileh"], curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "physics", "english"] },
  { slug: "ajman", name: "Ajman", region: "uae", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english", "economics"] },
  { slug: "al-ain", name: "Al Ain", region: "uae", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "ras-al-khaimah", name: "Ras Al Khaimah", region: "uae", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english", "biology"] },
  // UK
  { slug: "birmingham", name: "Birmingham", region: "uk", areas: ["edgbaston", "harborne", "solihull"], curricula: ["gcse", "a-level", "ib"], popularSubjects: ["mathematics", "physics", "english", "chemistry"] },
  { slug: "leeds", name: "Leeds", region: "uk", curricula: ["gcse", "a-level"], popularSubjects: ["mathematics", "english", "biology"] },
  { slug: "liverpool", name: "Liverpool", region: "uk", curricula: ["gcse", "a-level"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "glasgow", name: "Glasgow", region: "uk", curricula: ["gcse", "a-level", "ib"], popularSubjects: ["mathematics", "physics", "english"] },
  { slug: "edinburgh", name: "Edinburgh", region: "uk", curricula: ["gcse", "a-level", "ib"], popularSubjects: ["mathematics", "english", "economics"] },
  { slug: "bristol", name: "Bristol", region: "uk", curricula: ["gcse", "a-level"], popularSubjects: ["mathematics", "physics", "chemistry"] },
  { slug: "cambridge", name: "Cambridge", region: "uk", curricula: ["gcse", "a-level", "ib"], popularSubjects: ["mathematics", "physics", "computer-science"] },
  { slug: "oxford", name: "Oxford", region: "uk", curricula: ["gcse", "a-level", "ib"], popularSubjects: ["mathematics", "physics", "english"] },
  // Australia
  { slug: "brisbane", name: "Brisbane", region: "australia", curricula: ["hsc", "ib"], popularSubjects: ["mathematics", "english", "biology"] },
  { slug: "perth", name: "Perth", region: "australia", curricula: ["hsc", "ib"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "adelaide", name: "Adelaide", region: "australia", curricula: ["hsc", "ib"], popularSubjects: ["mathematics", "english", "chemistry"] },
  { slug: "canberra", name: "Canberra", region: "australia", curricula: ["hsc", "ib"], popularSubjects: ["mathematics", "english", "economics"] },
  // USA
  { slug: "houston", name: "Houston", region: "usa", curricula: ["sat", "ap", "common-core"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "san-francisco", name: "San Francisco", region: "usa", curricula: ["sat", "ap", "ib"], popularSubjects: ["mathematics", "computer-science", "english"] },
  { slug: "boston", name: "Boston", region: "usa", curricula: ["sat", "ap", "ib"], popularSubjects: ["mathematics", "english", "biology"] },
  { slug: "seattle", name: "Seattle", region: "usa", curricula: ["sat", "ap", "ib"], popularSubjects: ["mathematics", "computer-science", "english"] },
  { slug: "miami", name: "Miami", region: "usa", curricula: ["sat", "ap", "common-core"], popularSubjects: ["mathematics", "english", "spanish"] },
  { slug: "atlanta", name: "Atlanta", region: "usa", curricula: ["sat", "ap", "common-core"], popularSubjects: ["mathematics", "english", "biology"] },
  { slug: "dallas", name: "Dallas", region: "usa", curricula: ["sat", "ap", "common-core"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "washington-dc", name: "Washington DC", region: "usa", curricula: ["sat", "ap", "ib"], popularSubjects: ["mathematics", "english", "history"] },
  // Canada
  { slug: "montreal", name: "Montreal", region: "canada", curricula: ["ontario", "ib", "sat"], popularSubjects: ["mathematics", "french", "english"] },
  { slug: "calgary", name: "Calgary", region: "canada", curricula: ["ontario", "ap", "ib"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "ottawa", name: "Ottawa", region: "canada", curricula: ["ontario", "ib", "ap"], popularSubjects: ["mathematics", "english", "french"] },
  { slug: "edmonton", name: "Edmonton", region: "canada", curricula: ["ontario", "ap"], popularSubjects: ["mathematics", "english", "chemistry"] },
  // Saudi Arabia
  { slug: "dammam", name: "Dammam", region: "saudi-arabia", curricula: ["igcse", "a-level", "ib", "saudi-national"], popularSubjects: ["mathematics", "english", "physics"] },
  { slug: "mecca", name: "Mecca", region: "saudi-arabia", curricula: ["saudi-national", "igcse"], popularSubjects: ["mathematics", "english", "arabic"] },
  { slug: "medina", name: "Medina", region: "saudi-arabia", curricula: ["saudi-national", "igcse"], popularSubjects: ["mathematics", "english", "arabic"] },
  { slug: "khobar", name: "Khobar", region: "saudi-arabia", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english", "physics"] },
  // Oman / Bahrain / Kuwait
  { slug: "muscat", name: "Muscat", region: "oman", curricula: ["igcse", "a-level", "ib", "sat"], popularSubjects: ["mathematics", "physics", "english", "economics"] },
  { slug: "salalah", name: "Salalah", region: "oman", curricula: ["igcse", "a-level"], popularSubjects: ["mathematics", "english"] },
  { slug: "sohar", name: "Sohar", region: "oman", curricula: ["igcse", "a-level"], popularSubjects: ["mathematics", "english"] },
  { slug: "manama", name: "Manama", region: "bahrain", curricula: ["igcse", "a-level", "ib", "sat"], popularSubjects: ["mathematics", "physics", "english", "economics"] },
  { slug: "riffa", name: "Riffa", region: "bahrain", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english"] },
  { slug: "kuwait-city", name: "Kuwait City", region: "kuwait", curricula: ["igcse", "a-level", "ib", "sat"], popularSubjects: ["mathematics", "physics", "english", "economics"] },
  { slug: "hawalli", name: "Hawalli", region: "kuwait", curricula: ["igcse", "a-level", "ib"], popularSubjects: ["mathematics", "english"] },
];

// Aliases mapping short URL slugs to canonical curriculum slugs.
export const CURRICULUM_SLUG_ALIASES: Record<string, string> = {
  "gcse": "gcse", "igcse": "igcse",
  "o-level": "o-level", "olevel": "o-level", "o-levels": "o-level",
  "a-level": "a-level", "alevel": "a-level", "a-levels": "a-level",
  "ib": "ib", "sat": "sat", "act": "act", "ap": "ap",
  "ged": "ged", "cambridge": "cambridge", "edexcel": "edexcel",
  "matric": "matric", "fsc": "fsc", "hsc": "hsc", "vce": "vce",
  "mdcat": "mdcat", "ecat": "ecat", "ontario": "ontario",
  "common-core": "common-core", "saudi-national": "saudi-national",
};

export const AREAS: Area[] = [
  { slug: "dha", name: "DHA Phase 1–6", city: "islamabad", blurb: "Premium home tutors across DHA Islamabad." },
  { slug: "bahria-town", name: "Bahria Town", city: "islamabad", blurb: "Trusted tutors throughout Bahria Town." },
  { slug: "e-11", name: "E-11", city: "islamabad", blurb: "Home tutors covering E-11 sectors." },
  { slug: "f-11", name: "F-11", city: "islamabad", blurb: "Top-rated tutors visiting F-11." },
  { slug: "f-7", name: "F-7", city: "islamabad", blurb: "F-7 home tutors for all curricula." },
  { slug: "f-8", name: "F-8", city: "islamabad", blurb: "Expert tutors serving F-8 families." },
  { slug: "f-10", name: "F-10", city: "islamabad", blurb: "F-10 tutors for O/A Level and Matric." },
  { slug: "e-7", name: "E-7", city: "islamabad", blurb: "E-7 home tutors across subjects." },
  { slug: "g-10", name: "G-10", city: "islamabad", blurb: "Reliable tutors in G-10 sectors." },
  { slug: "g-11", name: "G-11", city: "islamabad", blurb: "G-11 home tutors, same-day matching." },
  { slug: "blue-area", name: "Blue Area", city: "islamabad", blurb: "Tutors for professionals' children in Blue Area." },
  // Islamabad flagship sector landing pages (long-form)
  { slug: "dha-islamabad", name: "DHA Islamabad", city: "islamabad", blurb: "Home tutors serving DHA Phase 1–5, Islamabad." },
  { slug: "f-7-islamabad", name: "F-7 Islamabad", city: "islamabad", blurb: "Home tutors across F-7 Islamabad, same-day matching." },
  { slug: "e-11-islamabad", name: "E-11 Islamabad", city: "islamabad", blurb: "Home tutors across E-11 and Multi Gardens, Islamabad." },
  { slug: "bahria-town-islamabad", name: "Bahria Town Islamabad", city: "islamabad", blurb: "Home tutors visiting Bahria Town Phase 1–8, Islamabad." },
  { slug: "f-10-islamabad", name: "F-10 Islamabad", city: "islamabad", blurb: "Home tutors serving F-10 and F-11 border, Islamabad." },
  { slug: "rawalpindi-cantt", name: "Rawalpindi Cantt", city: "rawalpindi", blurb: "Home tutors across Rawalpindi Cantonment." },
  { slug: "saddar", name: "Saddar", city: "rawalpindi", blurb: "Saddar Rawalpindi home tutors." },
  { slug: "chaklala", name: "Chaklala", city: "rawalpindi", blurb: "Tutors for Chaklala Scheme families." },
  { slug: "westridge", name: "Westridge", city: "rawalpindi", blurb: "Westridge home tutoring services." },
  { slug: "gulberg", name: "Gulberg", city: "rawalpindi", blurb: "Gulberg Greens & Residencia home tutors." },
  // Dubai
  { slug: "dubai-marina", name: "Dubai Marina", city: "dubai", blurb: "Premium IGCSE, A Level and IB tutors serving Marina towers and JBR." },
  { slug: "jlt", name: "Jumeirah Lake Towers", city: "dubai", blurb: "JLT home tutors covering GEMS, Taaleem and Nord Anglia curricula." },
  { slug: "downtown-dubai", name: "Downtown Dubai", city: "dubai", blurb: "Downtown & Business Bay home tutors — same-day matching." },
  { slug: "palm-jumeirah", name: "Palm Jumeirah", city: "dubai", blurb: "Palm Jumeirah private tutors for IB, IGCSE and A Level families." },
  { slug: "arabian-ranches", name: "Arabian Ranches", city: "dubai", blurb: "Arabian Ranches home tutors visiting villa communities." },
  { slug: "mirdif", name: "Mirdif", city: "dubai", blurb: "Mirdif tutors for MoE and international curriculum students." },
  { slug: "jumeirah", name: "Jumeirah", city: "dubai", blurb: "Jumeirah 1–3 tutors for JESS, Horizon and JPS families." },
  { slug: "business-bay", name: "Business Bay", city: "dubai", blurb: "Business Bay home & online tutors for expat families." },
  // Abu Dhabi
  { slug: "al-reem-island", name: "Al Reem Island", city: "abu-dhabi", blurb: "Al Reem Island home tutors for Aldar and Cranleigh students." },
  { slug: "saadiyat-island", name: "Saadiyat Island", city: "abu-dhabi", blurb: "Saadiyat tutors serving Cranleigh, Redwood and NYU families." },
  { slug: "khalifa-city", name: "Khalifa City", city: "abu-dhabi", blurb: "Khalifa City A & B tutors across IGCSE, A Level and IB." },
  { slug: "al-raha", name: "Al Raha", city: "abu-dhabi", blurb: "Al Raha Beach & Gardens home tutoring." },
  { slug: "yas-island", name: "Yas Island", city: "abu-dhabi", blurb: "Yas Island tutors for West Yas Academy and Sabis families." },
  // Doha
  { slug: "west-bay", name: "West Bay", city: "doha", blurb: "West Bay Doha tutors for diplomatic and expat families." },
  { slug: "the-pearl", name: "The Pearl-Qatar", city: "doha", blurb: "The Pearl home tutors for IGCSE, A Level and IB." },
  { slug: "al-sadd", name: "Al Sadd", city: "doha", blurb: "Al Sadd tutors visiting Qatari and expat households." },
  { slug: "msheireb", name: "Msheireb", city: "doha", blurb: "Msheireb Downtown home tutors — same-day matching." },
  { slug: "aspire-zone", name: "Aspire Zone", city: "doha", blurb: "Aspire Zone tutors for Aspire Academy student-athletes." },
  // Riyadh
  { slug: "diplomatic-quarter", name: "Diplomatic Quarter", city: "riyadh", blurb: "DQ Riyadh tutors for BSR, MCS and diplomatic families." },
  { slug: "al-olaya", name: "Al Olaya", city: "riyadh", blurb: "Al Olaya home tutors across international curricula." },
  { slug: "al-nakheel", name: "Al Nakheel", city: "riyadh", blurb: "Al Nakheel tutors for IGCSE, A Level and Saudi National." },
  { slug: "al-malqa", name: "Al Malqa", city: "riyadh", blurb: "Al Malqa home tutors serving north Riyadh compounds." },
  { slug: "hittin", name: "Hittin", city: "riyadh", blurb: "Hittin district tutors for IB and A Level families." },
  // Jeddah
  { slug: "al-hamra-jeddah", name: "Al Hamra", city: "jeddah", blurb: "Al Hamra tutors for BISJ and Al-Rowad International families." },
  { slug: "al-shati", name: "Al Shati", city: "jeddah", blurb: "Al Shati beachfront tutors across international curricula." },
  { slug: "obhur", name: "Obhur", city: "jeddah", blurb: "North & South Obhur home tutors for compound families." },
  // Sharjah
  { slug: "al-majaz", name: "Al Majaz", city: "sharjah", blurb: "Al Majaz home tutors for IGCSE and MoE students." },
  { slug: "al-qasba", name: "Al Qasba", city: "sharjah", blurb: "Al Qasba tutors across Sharjah international schools." },
  { slug: "muwaileh", name: "Muwaileh", city: "sharjah", blurb: "Muwaileh home tutors serving University City families." },
  // London
  { slug: "kensington", name: "Kensington", city: "london", blurb: "Kensington & South Ken tutors for GCSE, A Level and IB." },
  { slug: "chelsea", name: "Chelsea", city: "london", blurb: "Chelsea home tutors for independent-school and 11+ families." },
  { slug: "canary-wharf", name: "Canary Wharf", city: "london", blurb: "Canary Wharf tutors visiting City banker households." },
  { slug: "hampstead", name: "Hampstead", city: "london", blurb: "Hampstead & Highgate home tutors for GCSE and A Level." },
  { slug: "richmond", name: "Richmond", city: "london", blurb: "Richmond & Kew tutors for Tiffin, Lady Eleanor Holles and 11+ prep." },
  { slug: "notting-hill", name: "Notting Hill", city: "london", blurb: "Notting Hill & Holland Park home tutors across UK boards." },
  { slug: "greenwich", name: "Greenwich", city: "london", blurb: "Greenwich & Blackheath tutors for GCSE and IB families." },
  // Manchester
  { slug: "didsbury", name: "Didsbury", city: "manchester", blurb: "Didsbury home tutors for MGS, Withington and Manchester High." },
  { slug: "altrincham", name: "Altrincham", city: "manchester", blurb: "Altrincham grammar-school prep and A Level tutors." },
  { slug: "wilmslow", name: "Wilmslow", city: "manchester", blurb: "Wilmslow home tutors for Cheshire independent schools." },
  { slug: "chorlton", name: "Chorlton", city: "manchester", blurb: "Chorlton home tutors for GCSE and A Level students." },
  { slug: "sale", name: "Sale", city: "manchester", blurb: "Sale home tutors serving Trafford grammar-school families." },
  // Birmingham
  { slug: "edgbaston", name: "Edgbaston", city: "birmingham", blurb: "Edgbaston tutors for KES, KEHS and Edgbaston High." },
  { slug: "harborne", name: "Harborne", city: "birmingham", blurb: "Harborne home tutors for GCSE and A Level students." },
  { slug: "solihull", name: "Solihull", city: "birmingham", blurb: "Solihull tutors for Solihull School, Tudor Grange and 11+." },
];

export const REGION_BY_SLUG: Record<string, Region> = Object.fromEntries(REGIONS.map(r => [r.slug, r]));
export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(CITIES.map(c => [c.slug, c]));
export const SUBJECT_BY_SLUG: Record<string, Subject> = Object.fromEntries(SUBJECTS.map(s => [s.slug, s]));
export const CURRICULUM_BY_SLUG: Record<string, Curriculum> = Object.fromEntries(CURRICULA.map(c => [c.slug, c]));
export const AREA_BY_SLUG: Record<string, Area> = Object.fromEntries(AREAS.map(a => [a.slug, a]));

// Resolve a possibly-aliased curriculum slug to a canonical Curriculum.
export const resolveCurriculum = (slug: string): Curriculum | undefined =>
  CURRICULUM_BY_SLUG[CURRICULUM_SLUG_ALIASES[slug] ?? slug];
