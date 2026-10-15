/**
 * Countries we serve (from the old site's region list). Home tutoring only where `homeCities` is set.
 * Client to confirm which cities really have home tutors before launch.
 */
export const countries = [
  { name: "Pakistan", homeCities: ["Islamabad", "Rawalpindi"] },
  { name: "United Arab Emirates", homeCities: [] },
  { name: "United Kingdom", homeCities: [] },
  { name: "Saudi Arabia", homeCities: [] },
  { name: "Qatar", homeCities: [] },
  { name: "Oman", homeCities: [] },
  { name: "Bahrain", homeCities: [] },
  { name: "Kuwait", homeCities: [] },
  { name: "Australia", homeCities: [] },
  { name: "United States", homeCities: [] },
  { name: "Canada", homeCities: [] },
] as const;
