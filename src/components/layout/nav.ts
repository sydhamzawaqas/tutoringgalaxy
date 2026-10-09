export const mainNav = [
  { href: "/tutoring/online", label: "Online tutoring" },
  { href: "/tutoring/home", label: "Home tutoring" },
  { href: "/curricula", label: "Curricula" },
  { href: "/tutors", label: "Tutors" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
] as const;

export const footerNav = [
  {
    title: "Tutoring",
    links: [
      { href: "/tutoring/online", label: "Online tutoring" },
      { href: "/tutoring/home", label: "Home tutoring" },
      { href: "/curricula", label: "Curricula" },
      { href: "/subjects", label: "Subjects" },
      { href: "/tutors", label: "Find a tutor" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/resources", label: "Guides for parents" },
      { href: "/join-as-tutor", label: "Teach with us" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/refunds", label: "Refund policy" },
    ],
  },
] as const;
