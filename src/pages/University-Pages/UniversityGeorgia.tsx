import University, { UniversityData } from "@/components/University";
import { CalloutContent } from "@/components/University/Callout";
import { GalleryData } from "@/components/University/Gallery";

const calloutContent: CalloutContent = {
  why: {
    heading: "Why Vsource",
    paragraph:
      "Vsource was established to provide counselling and admission guidance through an exclusive collaborative network. Our experienced counsellors guide students with global standards and best practices—excellence is our way of life.",
    bullets: [
      "Expert counselling with a collaborative network",
      "End-to-end admission guidance and documentation support",
      "Global standards at every step",
      "Student-first approach with transparent communication",
    ],
    cta: { label: "Get a Free Profile Evaluation", href: "#enquiry" },
    features: [
      {
        title: "Globally Recognized",
        body: "International accreditations and worldwide recognition for academic rigor and practical skills.",
        icon: "🎓",
      },
      {
        title: "Exchange & Exposure",
        body: "Student exchange programs including Erasmus+, Mevlana, and the Bologna Process.",
        icon: "🌐",
      },
    ],
  },
  about: {
    heading: "About THE UNIVERSITY OF GEORGIA",
    paragraphs: [
      "THE UNIVERSITY OF GEORGIA (Tbilisi) is one of the top universities in the country and the largest private institution. The university offers a world-class academic and personal experience with a diverse international cohort and comprehensive student services.",
      "UGA operates the rehabilitation clinic ReavitaUG and the Scientific Institute of Health Research & Technologies, and hosts one of the biggest libraries in Georgia.",
      "According to Webometrics, UGA is the highest-ranking private university in Georgia and features among the top institutions in the European region. The university is attached to 17 hospitals with 6000+ beds and runs a modern multi-profile simulation hospital.",
    ],
    highlights: [
      "Ranked 5th in Georgia; #1 among Private Universities (Webometrics)",
      "Georgia’s largest private university",
      "17 attached hospitals • 6000+ beds",
      "Modern multi-profile simulation hospital",
      "Strong international collaborations",
    ],
    image: {
      src: "/images/University-of-Georgia.webp",
      alt: "University of Georgia campus",
    },
  },
  medicine: {
    heading: "Why Choose the Medicine Program at UGA?",
    bullets: [
      "Developed with Georgian & foreign specialists; strong global partnerships",
      "Simulation Hospital: among the first multi-profile simulation labs in Georgia",
      "Key partner of USAID Basic Education Programme",
      "PBL (Problem-Based Learning) integrated into syllabus and assessment",
    ],
    partners: [
      "University of Scranton, Pennsylvania (USA)",
      "University of Central Florida, Orlando (USA)",
      "Northwest University, Kirkland (USA)",
      "Arctic University of Norway, Tromsø (Norway)",
    ],
  },
  offers: [
    "International Accreditations",
    "Highly Experienced & Professional Faculty",
    "Member: European Higher Education Area",
    "Institutional Member: CEEMAN",
    "Student Exchange Programs (Erasmus+, Mevlana, Bologna)",
    "Worldwide Recognition",
  ],
  news: {
    heading:
      "India, Georgia Agree To Work Jointly To Further Strengthen Their Ties",
    paragraphs: [
      "External Affairs Minister S. Jaishankar met Georgian Vice Prime Minister and Foreign Minister David Zalkaliani to discuss bilateral economic cooperation, trade and connectivity.",
      "Georgia sits at the intersection of Eastern Europe and Western Asia. The talks emphasized elevating the already strong relationship, with growing projects and student mobility between the countries.",
      "Around 50,000 Indian tourists visit Georgia annually and about 8,000 Indian students study in Georgia, reflecting deepening people-to-people ties.",
    ],
    link: {
      href: "https://www.deccanchronicle.com/amp/nation/current-affairs/100721/india-georgia-agree-to-work-jointly-to-further-strengthen-their-ties.html",
      label: "Read full story",
    },
    image: {
      src: "/images/india-georgia.jpg",
      alt: "External Affairs Minister S. Jaishankar with Georgian FM David Zalkaliani",
    },
  },
  note: "India and Georgia continue to strengthen ties in tourism, education, trade, and connectivity — supporting student mobility and cooperation.",
};

const galleryData: GalleryData = {
  university: [
    "/images/gallery/imgi_6_un1.jpg",
    "/images/gallery/imgi_7_un2.jpg",
    "/images/gallery/imgi_8_un33.jpg",
    "/images/gallery/imgi_9_un4.jpg",
    "/images/gallery/imgi_10_un55.jpg",
    "/images/gallery/imgi_11_un6.jpg",
    "/images/gallery/imgi_12_un7.jpg",
    "/images/gallery/imgi_13_un8.jpg",
    "/images/gallery/imgi_14_un9.jpg",
    "/images/gallery/imgi_15_un10.jpg",
    "/images/gallery/imgi_16_un11.jpg",
    "/images/gallery/imgi_17_un133.jpg",
  ],
  hostels: [
    "/images/gallery/imgi_18_hostel3.jpg",
    "/images/gallery/imgi_19_hostel4.jpg",
  ],
  hospitals: [
    { src: "/images/gallery/imgi_20_hosp1.jpg", name: "GERMAN HOSPITAL" },
    {
      src: "/images/gallery/imgi_21_hosp2.jpg",
      name: "VIVAMEDI MEDICAL CENTRE",
    },
    { src: "/images/gallery/imgi_22_hosp3.jpg", name: "NEW HOSPITALS" },
    { src: "/images/gallery/imgi_23_hosp4.jpg", name: "AMTEL HOSPITAL" },
    { src: "/images/gallery/imgi_24_hosp5.jpg", name: "ENMEDIC" },
    {
      src: "/images/gallery/imgi_25_hosp6.jpg",
      name: "CENTRAL REPUBLICAN HOSPITAL",
    },
    {
      src: "/images/gallery/imgi_26_hosp7.jpg",
      name: "EVEX CLINICS AND HOSPITALS",
    },
    { src: "/images/gallery/imgi_27_hosp8.jpg", name: "MEDICAL CENTER" },
    { src: "/images/gallery/imgi_28_hosp9.jpg", name: "JSC MEGALAB" },
  ],
};

const data: UniversityData = {
  country: "Georgia",
  title: "THE UNIVERSITY OF GEORGIA",
  summary:
    "Georgia’s largest private university—top-ranked by Webometrics among private institutions; modern simulation hospital, 17 attached hospitals and international collaborations.",
  heroUrl: "/images/universities/university-of-georgia.jpg",
  mobileObjectPosition: "center 25%",
  desktopObjectPosition: "center",
  highlights: [
    "U.S. DFC multi-million investment",
    "Scientific Institute of Health Research & Technologies",
    "Erasmus+, Mevlana, Bologna Process exchanges",
    "Modern simulation hospital + 17 attached hospitals",
    "Webometrics top private university in Georgia",
    "Strong international collaborations",
  ],
  quickLinks: [
    { label: "THE UNIVERSITY OF GEORGIA", target: "overview" },
    { label: "Admission Procedure", target: "admission" },
    { label: "Infrastructure & Campus", target: "infrastructure" },
    { label: "Gallery", target: "gallery" },
    { label: "Fees 2025–26", target: "fees" },
    { label: "Modern Hostel", target: "hostel" },
    { label: "About University", target: "about" },
    { label: "FAQ’s", target: "faqs" },
  ],
  stats: [
    { label: "Professors", value: "688+" },
    { label: "Students", value: "5,200+" },
    { label: "International Students", value: "1,485" },
    { label: "Attached Hospitals", value: 17 },
    { label: "Hospital Beds", value: "6,000+" },
    {
      label: "Simulation Lab",
      value: "Multi-profile",
      tooltip: "Modern multi-profile simulation hospital",
    },
  ],
  callouts: [{ content: calloutContent } as any],
  gallery: galleryData,
  fees: {
    rows: [
      { year: "1st Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "1st Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
      { year: "2nd Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "2nd Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
      { year: "3rd Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "3rd Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
      { year: "4th Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "4th Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
      { year: "5th Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "5th Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
      { year: "6th Year", semester: "Sem 1", usd: 3250, inr: "₹ 2,43,750" },
      { year: "6th Year", semester: "Sem 2", usd: 3250, inr: "₹ 2,43,750" },
    ],
    note: "Hostel & other fees excluded. Rate used: $1 = ₹75.",
    extras: {
      heading: "Fees (2025–26) Structure",
      subheading: "Academic Year 2025–2026",
      disclaimers: ["Excluded Hostel Fee & Other Fee", "Note: 1$ = Rs. 75"],
      servicesTitle:
        "List of Services Included going to THE UNIVERSITY OF GEORGIA",
      services: [
        "Admission Letter",
        "Rectors Letter from University",
        "Visa from India",
        "Visa Appointment and Preparation",
        "Embassy Fee",
        "Invitation letter from Ministry",
        "Authentication from Ministry of External Affairs",
        "Immigration Clearance Certificate in Georgia",
        "Mobile Sim Card in Georgia",
        "Bank account opening in Georgia Bank",
        "International Forex Debit Card (TCBC)",
      ],
    },
  },
  faqs: [
    {
      q: "Where is Georgia located?",
      a: "At the crossroads of Eastern Europe and Western Asia; capital: Tbilisi.",
    },
    {
      q: "Is Georgia safe?",
      a: "Yes—Tbilisi offers a safe, student-friendly environment.",
    },
    {
      q: "Language of instruction?",
      a: "English for international MBBS (MD) cohorts.",
    },
    { q: "Currency?", a: "Georgian Lari (GEL)." },
  ],
};

export default function Page() {
  return (
    <>
      {/* The rest of the university page */}
      <University {...(data as UniversityData)} />
    </>
  );
}
