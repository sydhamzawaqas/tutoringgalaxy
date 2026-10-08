/**
 * Business facts. Everything here is shown publicly, so only add what the client has confirmed.
 * Sources: the old Lovable site (lib/whatsapp.ts, lib/mailto.ts, data/business-stats.ts).
 */
export const site = {
  name: "Tutoring Galaxy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tutoringgalaxy.com",
  description:
    "One-to-one tutoring for O Level, A Level, IGCSE, IB, Matric, FSc, MDCAT and SAT, online or at home. Matched to your exact syllabus. First lesson free.",
  foundedYear: 2016,
  founder: { name: "Syed Waqas Ahmad", role: "Founder & CEO" },
  phone: { display: "+92 334 091 7037", e164: "+923340917037" },
  whatsapp: "923340917037",
  email: "tutoringgalaxy@gmail.com",
  city: "Islamabad",
  country: "Pakistan",
  social: {
    // Old site linked "tutoringalaxy" (one g) but displayed @tutoringgalaxy. Client to confirm the handle.
    facebook: "https://www.facebook.com/tutoringalaxy",
    instagram: "https://www.instagram.com/tutoringgalaxy",
    x: "https://x.com/tutoringgalaxy",
  },
} as const;

/** Build a WhatsApp chat link with a prefilled message. */
export function whatsappLink(message = "Hi Tutoring Galaxy, I'd like to book a free trial lesson.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
