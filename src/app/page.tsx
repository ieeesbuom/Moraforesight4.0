"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Images,
  Lightbulb,
  Menu,
  Play,
  Rocket,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Tshirt360Viewer } from "./components/Tshirt360Viewer";

const updatesUrl = "https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K";
const merchOrderUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6sNf8xXAkCsz5_jZw7hUJmLkAnr_4_7C0cYpOXqQPciWCvg/viewform";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Gallery", href: "#gallery" },
  { label: "Highlights", href: "#highlights" },
  { label: "Merch", href: "#merch" },
  { label: "Contact", href: "#contact" },
];

const energyTopics = [
  "Artificial Intelligence",
  "Programming",
  "Robotics",
  "IoT",
  "Entrepreneurship",
  "Leadership",
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ieeesbuom",
    icon: "/social/facebook.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/moraforesight",
    icon: "/social/linkedin.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/moraforesight.lk",
    icon: "/social/instagram.png",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ieeesbuom",
    icon: "/social/youtube.png",
  },
];

const timelineStages = [
  {
    stage: "Stage 01",
    title: "Registration Period",
    date: "03 May - 06 June",
    detail:
      "Official registration window for MoraForesight 4.0. Interested candidates register online to begin the selection process.",
    color: "#F8C312",
    x: 10,
    y: 30,
    label: "left",
    mobileX: 46,
  },
  {
    stage: "Stage 02",
    title: "Online Briefing Session",
    date: "09 July",
    detail:
      "A general briefing session conducted online to guide registered applicants through the upcoming stages and competition rules.",
    color: "#E585E4",
    x: 23.5,
    y: 40,
    label: "center",
    mobileX: 52,
  },
  {
    stage: "Stage 03",
    title: "Online Selection Round",
    date: "11 July",
    detail:
      "Initial screening quiz assessing IQ, mathematical analysis, and logical problem-solving skills to qualify candidates.",
    color: "#01D5FF",
    x: 37,
    y: 46,
    label: "center",
    mobileX: 72,
  },
  {
    stage: "Stage 04",
    title: "Impact Challenge",
    date: "21 July - 03 August",
    detail:
      "Focuses on practical programming and aesthetics. Participants complete the python course on Mora Open and gain points towards final selection.",
    color: "#F8C312",
    x: 51,
    y: 52.5,
    label: "center",
    mobileX: 52,
  },
  {
    stage: "Stage 05",
    title: "Special Category Registration",
    date: "24 July - 02 August",
    detail:
      "Selection of candidates based on exceptional co-curricular and extracurricular performance. Participants must have taken the online round.",
    color: "#F8C312",
    x: 65,
    y: 64,
    label: "center",
    mobileX: 55,
  },
  {
    stage: "Stage 06",
    title: "In-Person Final Round",
    date: "02 August",
    detail:
      "Physical selection round held at the University of Moratuwa. Tests programming, logical capabilities, and critical thinking.",
    color: "#E585E4",
    x: 79,
    y: 71,
    label: "center",
    mobileX: 52,
    // Note: Stage 07 is set below
  },
  {
    stage: "Stage 07",
    title: "Fully Funded 3-Day Bootcamp",
    date: "14, 15, 16 August",
    detail:
      "A fully funded flagship bootcamp. Day 1 covers Programming + AI; Day 2 covers Robotics + Entertainment; Day 3 focuses on Leadership + Entrepreneurship.",
    color: "#01D5FF",
    x: 93.25,
    y: 90.5,
    label: "right",
    mobileX: 59,
  },
];

const bootcampStartsAt = Date.parse("2026-08-14T00:00:00+05:30");
const bootcampEndsAt = Date.parse("2026-08-17T00:00:00+05:30");

type BootcampPhase = "selected" | "live" | "complete";

function getBootcampPhase(now = Date.now()): BootcampPhase {
  if (now >= bootcampEndsAt) return "complete";
  if (now >= bootcampStartsAt) return "live";
  return "selected";
}

const bootcampPhaseCopy: Record<
  BootcampPhase,
  { badge: string; heroBadge: string; heroBody: string }
> = {
  selected: {
    badge: "Final 100 Selected",
    heroBadge: "FINAL 100 SELECTED",
    heroBody:
      "Selection for MoraForesight 4.0 is complete. The final 100 delegates are confirmed and preparing for the fully funded 3-day bootcamp on 14–16 August.",
  },
  live: {
    badge: "Bootcamp Live",
    heroBadge: "BOOTCAMP IS LIVE",
    heroBody:
      "The fully funded 3-day bootcamp is underway at the University of Moratuwa. The final 100 delegates are in session through 16 August.",
  },
  complete: {
    badge: "Bootcamp Complete",
    heroBadge: "BOOTCAMP COMPLETE",
    heroBody:
      "MoraForesight 4.0’s fully funded 3-day bootcamp has concluded. Thank you to the final 100 delegates who joined us on 14–16 August.",
  },
};

const tracks = [
  {
    title: "AI & Programming",
    detail:
      "Build practical foundations in programming, computational thinking, and emerging AI tools.",
    icon: Cpu,
    accent: "from-[#01BEEB] to-[#66E1F7]",
  },
  {
    title: "Robotics & IoT",
    detail:
      "Explore hardware, sensors, connected systems, and automation through hands-on challenges.",
    icon: Bot,
    accent: "from-[#E585E4] to-[#F7A8F3]",
  },
  {
    title: "Entrepreneurship",
    detail:
      "Develop the entrepreneurial mindset to innovate, pitch with confidence, and transform ideas into impactful and scalable ventures.",
    icon: Lightbulb,
    accent: "from-[#F8C312] to-[#FFE27A]",
  },
];

const aboutHighlights = [
  {
    title: "Islandwide Reach",
    detail:
      "MoraForesight 4.0 scouts talent across all 25 districts through trilingual outreach.",
    icon: Users,
  },
  {
    title: "Competitive Selection",
    detail:
      "Candidates advance through layered evaluations assessing intellect, creativity, commitment, and achievement.",
    icon: BrainCircuit,
  },
  {
    title: "Expert-Led Bootcamp",
    detail:
      "The selected 100 delegates join a fully funded bootcamp with immersive workshops, mentorship, and hands-on learning led by industry experts.",
    icon: Rocket,
  },
  {
    title: "National Recognition",
    detail:
      "MoraForesight 3.0 received the IEEE Sri Lanka Section Best Student Branch Project Award for its nationwide reach and transformative student impact.",
    icon: Award,
  },
];

const galleryImages = (edition: string, filenames: string[]) =>
  filenames.map((filename) => `/gallery/${edition}/${filename}.webp`);

const legacyEditions: {
  year: string;
  images: string[];
  subtitle?: string;
  href?: string;
  cta?: string;
}[] = [
  {
    year: "1.0",
    images: galleryImages("1.0", [
      "1-0-18",
      "1-0-17",
      "1-0-19",
      "1-0-20",
      "1-0-21",
      "1-0-05",
      "1-0-16",
      "1-0-04",
      "1-0-08",
      "1-0-09",
    ]),
  },
  {
    year: "2.0",
    images: galleryImages("2.0", [
      "2-0-09",
      "2-0-11",
      "2-0-10",
      "2-0-18",
      "2-0-02",
      "2-0-03",
      "2-0-07",
      "2-0-12",
      "2-0-14",
      "2-0-16",
      "2-0-17",
      "2-0-19",
      "2-0-20",
      "2-0-22",
      "2-0-23",
      "2-0-24",
    ]),
  },
  {
    year: "3.0",
    images: galleryImages("3.0", [
      "3-0-09",
      "3-0-26",
      "3-0-18",
      "3-0-28",
      "3-0-13",
      "3-0-25",
      "3-0-22",
      "3-0-24",
      "3-0-03",
      "3-0-05",
      "3-0-07",
      "3-0-10",
      "3-0-11",
      "3-0-12",
      "3-0-14",
      "3-0-19",
      "3-0-20",
      "3-0-27",
      "3-0-29",
      "3-0-30",
      "3-0-31",
    ]),
  },
  {
    year: "4.0",
    subtitle: "In-Person Final Round",
    href: "https://www.facebook.com/media/set/?set=a.1470810021745303&type=3",
    images: ["/gallery/4.0/album-cover.webp"],
    cta: "Open album on Facebook",
  },
];

const highlightVideos = [
  {
    id: "S_tG3nws0c8",
    label: "Launch Film",
    title: "MoraForesight 4.0 Delegate Registrations Are Open!",
    thumbnail: "/highlights/S_tG3nws0c8.webp",
    cta: "Watch the film",
  },
  {
    id: "vU-zTdBUv1Q",
    label: "Top 400 Summit",
    title: "MoraForesight 4.0 Top 400 Summit",
    thumbnail: "/highlights/vU-zTdBUv1Q.webp",
    cta: "Watch the summit",
  },
  {
    id: "KtpOTGNyUf4",
    label: "02 August · UoM",
    title: "MoraForesight 4.0 | In-Person Final Round",
    thumbnail: "/highlights/KtpOTGNyUf4.webp",
    cta: "Watch the aftermovie",
  },
];

const merchItems = [
  {
    title: "Ether Bloom",
    type: "Premium collar T-shirt",
    frames: [
      { label: "front view", src: "/merch/ether-front.webp" },
      { label: "back view", src: "/merch/ether-back.webp" },
    ],
    note: "A collar edition with magenta shoulder detailing, MoraForesight chest branding, and IEEE Student Branch recognition on the back.",
  },
  {
    title: "Nova Pulse",
    type: "Crew-neck event T-shirt",
    frames: [
      { label: "front view", src: "/merch/nova-front.webp" },
      { label: "side view", src: "/merch/nova-side.webp" },
      { label: "back view", src: "/merch/nova-back.webp" },
    ],
    note: "A deep navy event tee carrying the Own the Next Move front artwork, subtle MoraForesight patterns, and the 4.0 back mark.",
  },
];

const contacts = [
  {
    role: "Chairman, IEEE Student Branch, University of Moratuwa",
    name: "Chanuka Anjana",
    email: "chanukaanjana01@gmail.com",
    phone: "+94 71 760 7248",
    image: "/contact/chanuka-download.webp",
    imageStyle: { transform: "translateY(3%) scale(1.18)" },
    layoutClass:
      "sm:col-span-2 sm:justify-self-center xl:col-span-2 xl:col-start-2 xl:row-start-1",
    accent: {
      border: "border-[#01BEEB]",
      frame: "from-[#01BEEB]/32 via-[#04212B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(1,190,235,0.18)]",
      panel: "from-[#01BEEB] to-[#006F90]",
      text: "text-[#01BEEB]",
    },
  },
  {
    role: "Vice Chairman, IEEE Student Branch, University of Moratuwa",
    name: "Uthsara Manul",
    email: "uthzaaawim@gmail.com",
    phone: "+94 70 312 6614",
    image: "/contact/uthsara-download.webp",
    imageStyle: { transform: "translateY(3%) scale(1.14)" },
    layoutClass:
      "sm:col-span-2 sm:justify-self-center xl:col-span-2 xl:col-start-4 xl:row-start-1",
    accent: {
      border: "border-[#F8C312]",
      frame: "from-[#F8C312]/32 via-[#271F06]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(248,195,18,0.18)]",
      panel: "from-[#F8C312] to-[#8A6800]",
      text: "text-[#F8C312]",
    },
  },
  {
    role: "Event Chairperson, MoraForesight 4.0",
    name: "Tharusha Jayasundara",
    email: "ranidu.jaya171@gmail.com",
    phone: "+94 76 292 1236",
    image: "/contact/tharusha-framed.webp",
    imageStyle: { transform: "none" },
    layoutClass:
      "sm:col-span-2 sm:justify-self-center xl:col-span-2 xl:col-start-1 xl:row-start-2",
    accent: {
      border: "border-[#01BEEB]",
      frame: "from-[#01BEEB]/32 via-[#04212B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(1,190,235,0.18)]",
      panel: "from-[#01BEEB] to-[#006F90]",
      text: "text-[#01BEEB]",
    },
  },
  {
    role: "Event ViceChairperson, MoraForesight 4.0",
    name: "Janidu Janadara",
    email: "janidujanadara@gmail.com",
    phone: "+94 71 918 9585",
    image: "/contact/janidu-framed.webp",
    imageStyle: { transform: "none" },
    layoutClass: "xl:col-start-3 xl:row-start-2",
    accent: {
      border: "border-[#01BEEB]",
      frame: "from-[#01BEEB]/32 via-[#04212B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(1,190,235,0.18)]",
      panel: "from-[#01BEEB] to-[#006F90]",
      text: "text-[#01BEEB]",
    },
  },
  {
    role: "Committee Lead, Delegates Handling Committee",
    name: "Thimeshi Nipunika",
    email: "thimeshi.np@gmail.com",
    phone: "+94 77 398 8003",
    image: "/contact/thimeshi-framed.webp",
    imageStyle: { transform: "none" },
    layoutClass: "xl:col-start-5 xl:row-start-2",
    accent: {
      border: "border-[#F8C312]",
      frame: "from-[#F8C312]/32 via-[#271F06]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(248,195,18,0.18)]",
      panel: "from-[#F8C312] to-[#8A6800]",
      text: "text-[#F8C312]",
    },
  },
];

const faqs = [
  {
    question: "Who can apply?",
    answer:
      "Registration for MoraForesight 4.0 is now closed. The program was open to school students under the age of 20 as of January 2026 from all 25 districts of Sri Lanka.",
  },
  {
    question: "How are students selected?",
    answer:
      "Participants were selected through a competitive process designed to identify motivated, future-focused individuals, including online assessments, the in-person final round, and commitment-based screening.",
  },
  {
    question: "How many students were selected?",
    answer:
      "The final 100 delegates have been selected for MoraForesight 4.0, keeping the bootcamp experience focused, engaging, and personal.",
  },
  {
    question: "Is the program fully funded?",
    answer:
      "Yes. MoraForesight is a fully funded bootcamp made possible through the support of industry partners, collaborators, and the University of Moratuwa community.",
  },
  {
    question: "What will students learn?",
    answer:
      "Delegates gain exposure to programming, artificial intelligence, robotics, innovation, entrepreneurship, leadership, and collaborative problem solving through workshops, competitions, and interactive sessions.",
  },
  {
    question: "Where will the bootcamp be held?",
    answer:
      "The bootcamp is conducted at the University of Moratuwa and affiliated partner venues, giving students direct exposure to a leading university environment.",
  },
  {
    question: "Is prior technical knowledge required?",
    answer:
      "No. Students are selected for their potential, enthusiasm, and willingness to learn. The program is designed to support participants from diverse academic backgrounds.",
  },
  {
    question: "Does the program focus only on technology?",
    answer:
      "No. While technology is a core component, MoraForesight also emphasizes teamwork, communication, leadership, creativity, and entrepreneurial thinking.",
  },
  {
    question: "Are accommodation and meals provided?",
    answer:
      "Yes. Accommodation, meals, and learning resources are provided for selected delegates throughout the program.",
  },
  {
    question: "Will parents be informed throughout the process?",
    answer:
      "Yes. Important updates, schedules, and guidelines are communicated clearly to students and parents to ensure a smooth and transparent experience.",
  },
  {
    question: "What opportunities can students gain after the program?",
    answer:
      "Participants gain exposure to emerging technologies, industry networks, collaborative projects, and a community of like-minded peers who can support their future academic and professional journeys.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={fadeUp}
      className="energy-section-header mx-auto mb-10 max-w-3xl text-center md:mb-14"
    >
      <h2 className="energy-section-title text-3xl font-semibold text-white md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
          {intro}
        </p>
      ) : null}
    </motion.div>
  );
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="energy-icon flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-[#01BEEB]">
      <Icon size={22} strokeWidth={1.8} />
    </span>
  );
}

function GradientButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="energy-primary-button inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-5 py-3 text-sm font-semibold text-white transition sm:px-6 sm:text-base"
      style={{
        background:
          "linear-gradient(#050608, #050608) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box",
      }}
    >
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

function FaqItem({
  answer,
  index,
  isOpen,
  onToggle,
  question,
}: {
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  question: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white/[0.035] transition ${isOpen ? "border-[#01BEEB]/45" : "border-white/10 hover:border-white/20"
        }`}
    >
      <button
        type="button"
        className="flex w-full items-center gap-4 px-5 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-xs font-semibold tabular-nums ${isOpen ? "text-[#01BEEB]" : "text-white/34"
            }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-base font-semibold text-white md:text-lg">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#01BEEB] transition ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <p className="border-t border-white/10 px-5 pb-5 pl-[3.75rem] pt-4 text-sm leading-7 text-white/66 md:text-base">
            {answer}
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryEditionIndex, setGalleryEditionIndex] = useState<number | null>(
    null,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [bootcampPhase, setBootcampPhase] =
    useState<BootcampPhase>(getBootcampPhase);
  const phaseCopy = bootcampPhaseCopy[bootcampPhase];

  const closeMenu = () => setMenuOpen(false);
  const activeVideo =
    highlightVideos.find((video) => video.id === activeVideoId) ?? null;
  const galleryEdition =
    galleryEditionIndex === null ? null : legacyEditions[galleryEditionIndex];
  const modalImages = galleryEdition
    ? galleryEdition.images.map((src, imageIndex) => ({
      src,
      imageIndex,
    }))
    : [];
  const selectedModalImage = modalImages[activeImageIndex] ?? modalImages[0];

  const openGallery = (editionIndex: number) => {
    if (legacyEditions[editionIndex]?.href) return;
    setActiveVideoId(null);
    setGalleryEditionIndex(editionIndex);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    let timeoutId = 0;

    const schedulePhase = () => {
      const now = Date.now();
      setBootcampPhase(getBootcampPhase(now));

      const nextBoundary =
        now < bootcampStartsAt
          ? bootcampStartsAt
          : now < bootcampEndsAt
            ? bootcampEndsAt
            : null;

      if (nextBoundary === null) return;

      timeoutId = window.setTimeout(
        schedulePhase,
        nextBoundary - now + 250,
      );
    };

    schedulePhase();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0
          ? Math.min(100, (window.scrollY / scrollableHeight) * 100)
          : 0,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleGalleryCardClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLButtonElement>("[data-gallery-index]");
      if (!trigger) return;

      const editionIndex = Number(trigger.dataset.galleryIndex);
      if (!Number.isInteger(editionIndex)) return;
      if (legacyEditions[editionIndex]?.href) return;

      setActiveVideoId(null);
      setGalleryEditionIndex(editionIndex);
      setActiveImageIndex(0);
    };

    document.addEventListener("click", handleGalleryCardClick);

    return () => {
      document.removeEventListener("click", handleGalleryCardClick);
    };
  }, []);

  const closeGallery = () => {
    setGalleryEditionIndex(null);
    setActiveImageIndex(0);
  };

  const openVideo = (videoId: string) => {
    setGalleryEditionIndex(null);
    setActiveImageIndex(0);
    setActiveVideoId(videoId);
  };

  const closeVideo = () => {
    setActiveVideoId(null);
  };

  const setModalImage = (imageIndex: number) => {
    if (!modalImages.length) return;
    const normalizedIndex =
      (imageIndex + modalImages.length) % modalImages.length;
    setActiveImageIndex(normalizedIndex);
  };

  useEffect(() => {
    if (galleryEditionIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const totalImages = legacyEditions[galleryEditionIndex].images.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryEditionIndex(null);
        setActiveImageIndex(0);
      }
      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % totalImages);
      }
      if (event.key === "ArrowLeft") {
        setActiveImageIndex(
          (current) => (current - 1 + totalImages) % totalImages,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryEditionIndex]);

  useEffect(() => {
    if (activeVideoId === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideoId(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoId]);

  return (
    <main className="site-shell min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5">
        <div
          className="h-full bg-[linear-gradient(90deg,#01BEEB,#E585E4,#F8C312)] shadow-[0_0_16px_rgba(1,190,235,0.8)] transition-[width] duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="energy-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050608]/76 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            onClick={closeMenu}
            className="group flex items-center gap-3"
            aria-label="MoraForesight 4.0 home"
          >
            <Image
              src="/moraforesight-spark-nav.webp"
              alt=""
              width={124}
              height={130}
              unoptimized
              className="nav-spark h-6 w-6 shrink-0 object-contain"
            />
            <span className="text-sm font-semibold uppercase text-white md:text-base">
              MoraForesight 4.0
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="energy-nav-link text-sm font-medium text-white/70 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={updatesUrl}
              target="_blank"
              rel="noreferrer"
              className="energy-secondary-button rounded-md border border-white/14 px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              WhatsApp Channel
            </a>
            <span className="phase-status rounded-md px-4 py-2 text-sm font-semibold">
              {phaseCopy.badge}
            </span>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] text-white lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-[#050608] px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-white/76 hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={updatesUrl}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-semibold text-white/76 hover:bg-white/[0.06] hover:text-white"
              >
                WhatsApp Channel
              </a>
              <span className="phase-status mt-3 rounded-md px-4 py-3 text-center text-sm font-semibold">
                {phaseCopy.badge}
              </span>
            </div>
          </motion.div>
        ) : null}
      </nav>

      <section
        id="home"
        className="hero-shell energetic-hero relative flex items-stretch overflow-hidden bg-[#050608] pt-16"
      >
        <div
          className="hero-energy-orb hero-energy-orb-cyan"
          aria-hidden="true"
        />
        <div
          className="hero-energy-orb hero-energy-orb-pink"
          aria-hidden="true"
        />
        <div className="hero-energy-ring" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              style={{ "--particle": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="hero-artwork hidden lg:block" aria-hidden="true">
          <Image
            src="/coming-soon-characters.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1536px) 900px, (min-width: 1024px) 58vw, 100vw"
            className="hero-characters object-contain"
          />
        </div>
        <div className="hero-horizontal-shade absolute inset-0" />
        <div className="hero-vertical-shade absolute inset-0" />
        <div className="hero-grid absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[minmax(0,600px)_1fr] lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,650px)_1fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.75, ease: "easeOut" }}
            variants={fadeUp}
            className="min-w-0 max-w-[42rem] xl:max-w-[650px]"
          >
            <Image
              src="/moraforesight-logo-compact.webp"
              alt="MoraForesight 4.0"
              width={651}
              height={182}
              priority
              sizes="(min-width: 1024px) 235px, (min-width: 640px) 220px, 190px"
              unoptimized
              className="hero-logo h-auto w-full max-w-[160px] sm:max-w-[210px] xl:max-w-[235px]"
            />

            <h1 className="hero-title mt-6 max-w-[11ch] break-words text-[clamp(2.65rem,11vw,4.6rem)] font-bold leading-[0.93] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.82)] lg:max-w-[690px] lg:text-6xl xl:text-[4rem]">
              Build what&apos;s next.
              <span className="hero-gradient-text block">Lead the future.</span>
            </h1>
            <p className="phase-status mt-5 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]">
              {phaseCopy.heroBadge}
            </p>
            <p className="mt-4 max-w-[36rem] text-base leading-7 text-white/74 sm:text-lg lg:text-lg">
              {phaseCopy.heroBody}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <GradientButton href={updatesUrl}>
                Join WhatsApp Channel
              </GradientButton>
              <a
                href="#timeline"
                className="energy-secondary-button inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/16 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition sm:w-auto sm:px-6 sm:text-base"
              >
                View Timeline
                <ChevronDown size={18} />
              </a>
            </div>
          </motion.div>

          <div className="hidden md:block" aria-hidden="true" />
        </div>

        <a
          href="#about"
          className="hero-scroll-cue absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/46 lg:flex"
        >
          Explore
          <span className="hero-scroll-line" />
        </a>
      </section>

      <div className="energy-ticker" aria-label="MoraForesight focus areas">
        <div className="energy-ticker-track">
          <div className="energy-ticker-group">
            {energyTopics.map((topic) => (
              <span key={`primary-${topic}`}>
                <Zap size={15} />
                {topic}
              </span>
            ))}
          </div>
          <div className="energy-ticker-group" aria-hidden="true">
            {energyTopics.map((topic) => (
              <span key={`secondary-${topic}`}>
                <Zap size={15} />
                {topic}
              </span>
            ))}
          </div>
          <div className="energy-ticker-group" aria-hidden="true">
            {energyTopics.map((topic) => (
              <span key={`tertiary-${topic}`}>
                <Zap size={15} />
                {topic}
              </span>
            ))}
          </div>
          <div className="energy-ticker-group" aria-hidden="true">
            {energyTopics.map((topic) => (
              <span key={`quaternary-${topic}`}>
                <Zap size={15} />
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        id="about"
        className="energy-section relative py-14 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeIn}
              className="flex h-full flex-col"
            >
              <h2 className="energy-section-title text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-[2.45rem]">
                The Launchpad For Tomorrow’s Tech
              </h2>
              <p className="mt-5 text-base leading-[1.65] text-white/70">
                Launched in 2023, MoraForesight empowers young minds to move beyond traditional learning, explore emerging technologies, and become the innovators and technology leaders of tomorrow. The fourth edition continues this journey by discovering Sri Lanka’s brightest talents and transforming their potential through a fully-funded flagship bootcamp.
              </p>
              <div className="energy-glass mt-5 border-l-2 border-[#F8C312] bg-white/[0.025] px-5 py-3.5 lg:flex-1">
                <p className="text-sm font-semibold uppercase text-[#01BEEB]">
                  Organized by
                </p>
                <Image
                  src="/ieee-uom-blue.webp"
                  alt="University of Moratuwa IEEE Student Branch"
                  width={1600}
                  height={350}
                  sizes="(min-width: 1024px) 300px, 90vw"
                  className="mt-3 h-auto w-full max-w-[300px]"
                />
                <p className="mt-2.5 text-sm leading-6 text-white/62">
                  The Student Branch unites a diverse community of 16 spcialized Chapters and an Affinity Group, channeling undergraduate expertise into school-level innovation.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  variants={fadeIn}
                  className="energy-card rounded-lg border border-white/10 bg-white/[0.035] p-5 transition"
                >
                  <IconBadge icon={item.icon} />
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Past Events Photo Highlights ──────────────────────────────── */}
      <section
        id="past-highlights"
        className="photo-strip-section border-y border-white/[0.07] bg-[#050608] py-14 md:py-20"
        aria-label="Past events highlights"
      >
        <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 md:px-8 md:mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#01BEEB]">
                MoraForesight 1.0 · 2.0 · 3.0
              </p>
              <h2 className="energy-section-title mt-2 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                Three editions. Hundreds of stories.
              </h2>
            </div>
            <a
              href="#gallery"
              className="energy-secondary-button shrink-0 inline-flex items-center gap-2 rounded-md border border-white/14 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              View All Galleries
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="photo-strip-track-wrap mb-3">
          <div className="photo-strip-track">
            {/* duplicated for seamless loop */}
            {[0, 1].map((dupe) => (
              <div key={dupe} className="photo-strip-row" aria-hidden={dupe === 1}>
                {/* 1.0 picks */}
                {(
                  [
                    { src: "/gallery/1.0/1-0-18.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                    { src: "/gallery/1.0/1-0-17.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                    { src: "/gallery/2.0/2-0-03.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/2.0/2-0-07.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/3.0/3-0-03.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                    { src: "/gallery/3.0/3-0-28.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                    { src: "/gallery/1.0/1-0-19.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                    { src: "/gallery/2.0/2-0-09.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/3.0/3-0-26.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                  ] as { src: string; edition: string; color: string }[]
                ).map((item, idx) => (
                  <div
                    key={`r1-${dupe}-${idx}`}
                    className="photo-strip-item"
                    style={{
                      width: idx % 3 === 0 ? "260px" : idx % 3 === 1 ? "220px" : "240px",
                      height: "200px",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={`${item.edition} event photo`}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                    <div className="photo-strip-item-overlay">
                      <span
                        className="photo-strip-item-label"
                        style={{ color: item.color, textShadow: `0 0 12px ${item.color}` }}
                      >
                        {item.edition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right (reverse direction) */}
        <div className="photo-strip-track-wrap">
          <div className="photo-strip-track reverse">
            {[0, 1].map((dupe) => (
              <div key={dupe} className="photo-strip-row" aria-hidden={dupe === 1}>
                {(
                  [
                    { src: "/gallery/3.0/3-0-09.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                    { src: "/gallery/3.0/3-0-13.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                    { src: "/gallery/2.0/2-0-02.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/2.0/2-0-17.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/1.0/1-0-16.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                    { src: "/gallery/1.0/1-0-20.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                    { src: "/gallery/3.0/3-0-05.webp", edition: "MoraForesight 3.0", color: "#E585E4" },
                    { src: "/gallery/2.0/2-0-22.webp", edition: "MoraForesight 2.0", color: "#01BEEB" },
                    { src: "/gallery/1.0/1-0-04.webp", edition: "MoraForesight 1.0", color: "#F8C312" },
                  ] as { src: string; edition: string; color: string }[]
                ).map((item, idx) => (
                  <div
                    key={`r2-${dupe}-${idx}`}
                    className="photo-strip-item"
                    style={{
                      width: idx % 3 === 0 ? "230px" : idx % 3 === 1 ? "260px" : "210px",
                      height: "200px",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={`${item.edition} event photo`}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                    <div className="photo-strip-item-overlay">
                      <span
                        className="photo-strip-item-label"
                        style={{ color: item.color, textShadow: `0 0 12px ${item.color}` }}
                      >
                        {item.edition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="timeline"
        className="energy-section energy-section-alt overflow-hidden border-y border-white/10 bg-[#0B0D12] pb-14 pt-24 md:pb-20 md:pt-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            variants={fadeUp}
            className="mb-5 lg:flex lg:justify-end"
          >
            <h2 className="energy-section-title text-2xl font-semibold text-white sm:text-3xl lg:ml-auto lg:max-w-none lg:whitespace-nowrap lg:text-right">
              From registration closure to the flagship bootcamp.
            </h2>
          </motion.div>

          <div className="relative mx-auto hidden h-[440px] max-w-7xl lg:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 1200 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="timeline-road-gradient"
                  x1="40"
                  y1="130"
                  x2="1180"
                  y2="600"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#01BEEB" />
                  <stop offset="38%" stopColor="#01D5FF" />
                  <stop offset="65%" stopColor="#E585E4" />
                  <stop offset="84%" stopColor="#F8C312" />
                  <stop offset="100%" stopColor="#E585E4" />
                </linearGradient>
                <filter
                  id="timeline-road-glow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="timeline-arrow"
                  markerWidth="12"
                  markerHeight="12"
                  refX="9"
                  refY="5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#E585E4" />
                </marker>
              </defs>
              <path
                d="M20 130 C80 200 110 185 150 185 C250 185 245 260 330 270 C430 282 440 330 535 300 C610 276 650 340 735 385 C820 430 860 380 930 435 C1000 490 1030 480 1080 530 C1120 570 1145 560 1180 600"
                fill="none"
                stroke="#02070C"
                strokeWidth="86"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 130 C80 200 110 185 150 185 C250 185 245 260 330 270 C430 282 440 330 535 300 C610 276 650 340 735 385 C820 430 860 380 930 435 C1000 490 1030 480 1080 530 C1120 570 1145 560 1180 600"
                fill="none"
                stroke="url(#timeline-road-gradient)"
                strokeWidth="70"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
                filter="url(#timeline-road-glow)"
              />
              <path
                d="M20 130 C80 200 110 185 150 185 C250 185 245 260 330 270 C430 282 440 330 535 300 C610 276 650 340 735 385 C820 430 860 380 930 435 C1000 490 1030 480 1080 530 C1120 570 1145 560 1180 600"
                fill="none"
                stroke="#06131E"
                strokeWidth="56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 130 C80 200 110 185 150 185 C250 185 245 260 330 270 C430 282 440 330 535 300 C610 276 650 340 735 385 C820 430 860 380 930 435 C1000 490 1030 480 1080 530 C1120 570 1145 560 1180 600"
                fill="none"
                stroke="url(#timeline-road-gradient)"
                strokeWidth="4"
                strokeDasharray="12 14"
                strokeLinecap="round"
                markerEnd="url(#timeline-arrow)"
              />
            </svg>

            {timelineStages.map((stage, index) => (
              <motion.div
                key={`${stage.stage}-${stage.title}`}
                initial={{ opacity: 0, y: -24, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.08 }}
                className="absolute z-10"
                style={{
                  left: `${stage.x}%`,
                  top: `${stage.y}%`,
                  color: stage.color,
                }}
              >
                <div className="relative">
                  <div
                    className={`absolute bottom-[116px] w-48 ${stage.label === "left"
                      ? "left-[-18px] text-left"
                      : stage.label === "right"
                        ? "right-[-18px] text-right"
                        : "left-1/2 -translate-x-1/2 text-center"
                      }`}
                  >
                    <p
                      className="text-lg font-extrabold uppercase leading-none"
                      style={{ textShadow: `0 0 18px ${stage.color}` }}
                    >
                      {stage.stage}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold uppercase leading-4 text-white/70">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-sm font-bold uppercase leading-4 text-current">
                      {stage.date}
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-1/2 h-16 w-px -translate-x-1/2 bg-current shadow-[0_0_12px_currentColor]" />
                  <div
                    className="absolute bottom-[78px] left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border-[5px] border-current bg-[#0B0D12]"
                    style={{ boxShadow: `0 0 20px ${stage.color}` }}
                  />

                  <div
                    className="absolute left-1/2 top-1/2 h-14 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-current bg-[#07111A]"
                    style={{ boxShadow: `0 0 22px ${stage.color}` }}
                  >
                    <div className="absolute inset-[5px] rounded-[50%] border border-current/70 bg-black/70" />
                    <div
                      className="absolute inset-[13px] rounded-[50%] bg-current opacity-80"
                      style={{ boxShadow: `0 0 18px ${stage.color}` }}
                    />
                    <div className="absolute inset-x-3 bottom-1 h-px bg-white/55" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative mx-auto max-w-xl lg:hidden">
            <svg
              className="pointer-events-none absolute bottom-12 left-4 top-10 h-[calc(100%-5.5rem)] w-20 overflow-visible"
              viewBox="0 0 80 900"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="timeline-mobile-gradient"
                  x1="20"
                  y1="0"
                  x2="60"
                  y2="900"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#01BEEB" />
                  <stop offset="35%" stopColor="#F8C312" />
                  <stop offset="65%" stopColor="#E585E4" />
                  <stop offset="100%" stopColor="#01D5FF" />
                </linearGradient>
              </defs>
              <path
                d="M24 0 C64 90 12 180 50 280 C74 350 18 430 42 520 C68 610 14 700 48 900"
                fill="none"
                stroke="#02070C"
                strokeWidth="38"
                strokeLinecap="round"
              />
              <path
                d="M24 0 C64 90 12 180 50 280 C74 350 18 430 42 520 C68 610 14 700 48 900"
                fill="none"
                stroke="url(#timeline-mobile-gradient)"
                strokeWidth="28"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M24 0 C64 90 12 180 50 280 C74 350 18 430 42 520 C68 610 14 700 48 900"
                fill="none"
                stroke="#07131D"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M24 0 C64 90 12 180 50 280 C74 350 18 430 42 520 C68 610 14 700 48 900"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="8 10"
                strokeLinecap="round"
                opacity="0.62"
              />
            </svg>

            <div className="space-y-5">
              {timelineStages.map((stage, index) => (
                <motion.article
                  key={`${stage.stage}-${stage.title}-mobile`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  variants={fadeUp}
                  className="relative min-h-36 pl-28 pt-3"
                  title={stage.detail}
                >
                  <div
                    className="absolute top-10 h-9 w-14 -translate-x-1/2 rounded-[50%] border-2 bg-[#07111A]"
                    style={{
                      left: `${stage.mobileX}px`,
                      borderColor: stage.color,
                      boxShadow: `0 0 18px ${stage.color}`,
                    }}
                  >
                    <div
                      className="absolute inset-[8px] rounded-[50%] opacity-80"
                      style={{
                        backgroundColor: stage.color,
                        boxShadow: `0 0 12px ${stage.color}`,
                      }}
                    />
                  </div>

                  <p
                    className="text-base font-extrabold uppercase"
                    style={{
                      color: stage.color,
                      textShadow: `0 0 14px ${stage.color}`,
                    }}
                  >
                    {stage.stage}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p
                    className="mt-1 text-sm font-bold uppercase"
                    style={{ color: stage.color }}
                  >
                    {stage.date}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
                    {stage.detail}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" className="energy-section py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Building technical excellence, team-driven collaboration, and entrepreneurial mindset."
            intro="A prestigious bootcamp immersing delegates in a culture of creation, teamwork, and problem solving within a fast-moving, future-ready environment."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {tracks.map((track, index) => (
              <motion.article
                key={track.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                variants={fadeUp}
                className="energy-card rounded-lg border border-white/10 bg-white/[0.04] p-6"
              >
                <div
                  className={`mb-8 h-1.5 w-24 rounded-md bg-gradient-to-r ${track.accent}`}
                />
                <IconBadge icon={track.icon} />
                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {track.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/66">
                  {track.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="energy-section energy-section-alt border-y border-white/10 bg-[#0B0D12] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Year by year, the project has grown in scale and impact."
            intro="Each edition opens into a combined photo archive"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {legacyEditions.map((edition, index) => {
              const isExternal = Boolean(edition.href);
              const previewImages = edition.images.slice(0, 3);
              const cardClassName =
                "energy-card group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition";
              const cardBody = (
                <>
                  <div
                    className={
                      previewImages.length === 1
                        ? "relative aspect-square overflow-hidden rounded-md bg-black"
                        : "grid h-64 grid-cols-2 grid-rows-2 gap-2"
                    }
                  >
                    {previewImages.map((image, imageIndex) => (
                      <div
                        key={image}
                        className={
                          previewImages.length === 1
                            ? "absolute inset-0"
                            : `relative overflow-hidden rounded-md bg-black/35 ${imageIndex === 0 ? "row-span-2" : ""}`
                        }
                      >
                        <Image
                          src={image}
                          alt={`MoraForesight ${edition.year} gallery preview ${imageIndex + 1}`}
                          fill
                          sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold uppercase text-[#F8C312]">
                        MoraForesight {edition.year}
                      </span>
                      {edition.subtitle ? (
                        <span className="mt-1 block text-sm font-semibold text-white">
                          {edition.subtitle}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-[#01BEEB] transition group-hover:border-[#01BEEB]/55">
                      {isExternal ? <ArrowUpRight size={19} /> : <Images size={19} />}
                    </span>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#01BEEB]">
                    {edition.cta ?? "Open edition gallery"}
                    {isExternal ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
                  </span>
                </>
              );

              if (edition.href) {
                return (
                  <a
                    key={edition.year}
                    href={edition.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cardClassName}
                  >
                    {cardBody}
                  </a>
                );
              }

              return (
                <button
                  key={edition.year}
                  type="button"
                  data-gallery-index={index}
                  onClick={() => openGallery(index)}
                  className={cardClassName}
                >
                  {cardBody}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="highlights" className="energy-section py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="The 4.0 story, told on film."
            intro="Official highlights from across the edition."
          />

          <div
            className={
              highlightVideos.length >= 3
                ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                : "mx-auto grid max-w-5xl gap-5 md:grid-cols-2"
            }
          >
            {highlightVideos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => openVideo(video.id)}
                className="energy-card group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition"
              >
                <div className="relative aspect-video overflow-hidden rounded-md bg-black/35">
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} video thumbnail`}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/16 bg-black/58 text-[#01BEEB] backdrop-blur transition group-hover:border-[#01BEEB]/55 group-hover:bg-black/78">
                      <Play size={22} fill="currentColor" />
                    </span>
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase text-[#F8C312]">
                    {video.label}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-[#01BEEB] transition group-hover:border-[#01BEEB]/55">
                    <Play size={19} />
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold leading-snug text-white md:text-2xl">
                  {video.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#01BEEB]">
                  {video.cta}
                  <ArrowRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {galleryEdition && selectedModalImage ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`MoraForesight ${galleryEdition.year} gallery`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#030406]/98 px-3 py-3 backdrop-blur-xl sm:px-5"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col">
            <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-[#030406]/92 py-3 backdrop-blur-xl">
              <p className="min-w-0 truncate text-sm font-semibold uppercase text-[#F8C312]">
                MoraForesight {galleryEdition.year}
              </p>
              <button
                type="button"
                aria-label="Close gallery"
                onClick={closeGallery}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] text-white transition hover:border-white/32 hover:bg-white/[0.08]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid flex-1 gap-3 pb-3 lg:grid-cols-[minmax(0,1fr)_330px]">
              <div className="relative min-w-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                <div className="relative aspect-[16/10] min-h-[290px] md:min-h-[620px]">
                  <Image
                    key={selectedModalImage.src}
                    src={selectedModalImage.src}
                    alt={`MoraForesight ${galleryEdition.year} gallery photo ${activeImageIndex + 1}`}
                    fill
                    sizes="(min-width: 1280px) 920px, (min-width: 1024px) calc(100vw - 390px), 100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <span className="rounded-md bg-black/72 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                    {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                    {String(modalImages.length).padStart(2, "0")}
                  </span>
                </div>

                {modalImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => setModalImage(activeImageIndex - 1)}
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-black/58 text-white backdrop-blur transition hover:border-white/36 hover:bg-black/78"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => setModalImage(activeImageIndex + 1)}
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-black/58 text-white backdrop-blur transition hover:border-white/36 hover:bg-black/78"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                ) : null}
              </div>

              <div className="grid max-h-[72vh] grid-cols-3 gap-2 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.035] p-2 sm:grid-cols-4 lg:grid-cols-2">
                {modalImages.map((image, imageIndex) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Open MoraForesight ${galleryEdition.year} photo ${imageIndex + 1}`}
                    onClick={() => setModalImage(imageIndex)}
                    className={`group relative cursor-pointer overflow-hidden rounded-md border transition ${imageIndex % 7 === 0
                      ? "aspect-[4/5]"
                      : imageIndex % 5 === 0
                        ? "aspect-[16/10]"
                        : "aspect-square"
                      } ${activeImageIndex === imageIndex
                        ? "border-[#F8C312] opacity-100 shadow-[0_0_0_1px_rgba(248,195,18,0.55)]"
                        : "border-white/10 opacity-75 hover:border-white/34 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 160px, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {activeVideo ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#030406]/98 px-3 py-3 backdrop-blur-xl sm:px-5"
        >
          <div className="mx-auto flex min-h-full max-w-5xl flex-col">
            <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-[#030406]/92 py-3 backdrop-blur-xl">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase text-[#F8C312]">
                  {activeVideo.label}
                </p>
                <p className="mt-1 truncate text-base font-semibold text-white">
                  {activeVideo.title}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close video"
                onClick={closeVideo}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] text-white transition hover:border-white/32 hover:bg-white/[0.08]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      <section id="merch" className="energy-section py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="mx-auto mb-7 max-w-2xl text-center md:mb-9"
          >
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Official MoraForesight 4.0 merch.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/66">
              Choose the design you prefer and place your order through the
              official form.
            </p>
          </motion.div>

          <div className="space-y-10 md:space-y-14">
            {merchItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                variants={fadeUp}
                className="energy-merch-row grid items-center gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Tshirt360Viewer frames={item.frames} label={item.title} />
                </div>

                <div
                  className={`max-w-xl ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <h3 className="text-3xl font-semibold text-white md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-lg font-semibold text-[#01BEEB]">
                    {item.type}
                  </p>
                  <p className="mt-5 text-base leading-8 text-white/66">
                    {item.note}
                  </p>
                  <div className="mt-7">
                    <GradientButton href={merchOrderUrl}>
                      Order Merch
                    </GradientButton>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="energy-section energy-section-alt border-y border-white/10 bg-[#0B0D12] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <SectionHeader title="All essential information for students and parents, right here." />

          <div className="space-y-3 lg:hidden">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                {...faq}
                index={index}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>

          <div className="hidden items-start gap-4 lg:grid lg:grid-cols-2">
            {[0, 1].map((column) => (
              <div key={column} className="space-y-4">
                {faqs.map((faq, index) =>
                  index % 2 === column ? (
                    <FaqItem
                      key={faq.question}
                      {...faq}
                      index={index}
                      isOpen={openFaq === index}
                      onToggle={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    />
                  ) : null,
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="energy-section relative border-t border-white/10 bg-[#050608] py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Connect With the MoraForesight 4.0 Team"
            intro="For bootcamp, delegate, and event-related inquiries, reach out to the team below."
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-6 xl:gap-7 xl:auto-rows-[1fr]">
            {contacts.map((contact) => (
              <article
                key={contact.name}
                className={`relative mx-auto w-full max-w-[360px] pt-[210px] sm:pt-[220px] xl:col-span-2 ${contact.layoutClass}`}
              >
                <div
                  className={`absolute left-1/2 top-0 z-10 h-[235px] w-[72%] -translate-x-1/2 overflow-hidden rounded-lg border-[3px] ${contact.accent.border} bg-gradient-to-br ${contact.accent.frame} md:h-[245px] lg:h-[255px] ${contact.accent.glow}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_42%)]" />
                  <div className="absolute inset-x-4 bottom-0 h-[26px] rounded-t-lg bg-gradient-to-t from-black/45 to-transparent" />
                  <Image
                    src={contact.image}
                    alt={contact.name}
                    fill
                    sizes="(min-width: 1280px) 260px, (min-width: 768px) 24vw, 80vw"
                    className="origin-top object-contain object-top px-2 pt-2"
                    style={contact.imageStyle}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
                </div>

                <div
                  className={`relative z-20 min-h-[145px] rounded-lg border-[3px] ${contact.accent.border} bg-black/58 px-4 pb-5 pt-10 text-center backdrop-blur-sm ${contact.accent.glow}`}
                >
                  <div
                    className={`absolute left-1/2 top-0 flex min-h-[56px] w-[calc(100%+0.5rem)] -translate-x-1/2 -translate-y-[58%] items-center justify-center rounded-lg bg-gradient-to-r ${contact.accent.panel} px-3 py-2 text-center text-[clamp(0.8rem,0.98vw,1.05rem)] font-extrabold uppercase leading-tight text-white shadow-[0_18px_42px_rgba(0,0,0,0.30)] md:min-h-[54px]`}
                  >
                    {contact.role}
                  </div>

                  <h3 className="text-[1.18rem] font-extrabold leading-tight text-white md:text-[1.12rem] lg:text-[1.2rem] xl:text-[1.26rem]">
                    {contact.name}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className={`mt-2 block break-words text-[0.88rem] leading-snug text-white/78 md:text-[0.86rem] lg:text-[0.9rem] xl:text-[0.96rem] ${contact.accent.text}`}
                  >
                    {contact.email}
                  </a>
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-[0.92rem] font-medium leading-tight text-white md:text-[0.88rem] lg:text-[0.92rem] xl:text-[0.98rem]"
                    >
                      {contact.phone}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="relative overflow-hidden border-t border-white/10 bg-[#030407]"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#01BEEB_0%,#01BEEB_28%,#E585E4_50%,#F8C312_72%,#F8C312_100%)]" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(1,190,235,0.08),transparent_28%,rgba(229,133,228,0.06)_58%,transparent_72%,rgba(248,195,18,0.07))]" />
          <div className="absolute right-0 top-0 h-64 w-80 bg-[radial-gradient(circle,rgba(248,195,18,0.34)_1px,transparent_1.5px)] bg-[size:18px_18px] opacity-35" />
          <div className="absolute -left-24 bottom-8 h-px w-[34rem] rotate-[-34deg] bg-gradient-to-r from-transparent via-[#01BEEB] to-transparent opacity-30" />
          <div className="absolute right-0 top-28 h-px w-[28rem] rotate-[38deg] bg-gradient-to-r from-transparent via-[#E585E4] to-transparent opacity-25" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-14 sm:px-6 md:px-8 md:pt-16">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.65fr_0.9fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src="/moraforesight-spark.webp"
                  alt=""
                  width={80}
                  height={80}
                  unoptimized
                  className="h-[68px] w-[68px] shrink-0 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase text-[#01BEEB]">
                    IEEE SB of UOM presents
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">
                    MoraForesight 4.0
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/62">
                A fully-funded three-day bootcamp empowering Sri
                Lanka&apos;s next generation through technology, innovation, and
                entrepreneurship.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="phase-status min-h-11 rounded-md px-5 text-sm font-bold">
                  {phaseCopy.badge}
                </span>
                <a
                  href={updatesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/16 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#01BEEB]/60 hover:bg-[#01BEEB]/10"
                >
                  WhatsApp Channel
                </a>
              </div>
            </div>

            <nav aria-label="Footer navigation">
              <p className="text-xs font-semibold uppercase text-[#F8C312]">
                Explore
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="w-fit text-sm text-white/62 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="md:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase text-[#E585E4]">
                Organized by
              </p>
              <Image
                src="/ieee-uom-blue.webp"
                alt="IEEE Student Branch, University of Moratuwa"
                width={1600}
                height={350}
                sizes="(min-width: 1024px) 340px, 300px"
                className="mt-4 h-auto w-full max-w-[340px]"
              />
              <p className="mt-7 text-xs font-semibold uppercase text-white/48">
                Follow MoraForesight
              </p>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] transition hover:border-[#01BEEB]/60 hover:bg-[#01BEEB]/10"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="h-5 w-5 object-contain opacity-80 transition group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-11 items-center justify-center pt-7 text-center text-xs text-white/42">
            <div className="leading-5">
              <p className="font-medium text-white/52">
                &copy; 2026 MoraForesight 4.0. All rights reserved.
              </p>
              <p className="mt-0.5">
                IEEE Student Branch, University of Moratuwa.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="#home"
        aria-label="Back to top"
        title="Back to top"
        className={`fixed bottom-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-white/18 bg-black/72 text-white/76 shadow-[0_12px_32px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-200 hover:border-[#F8C312]/70 hover:bg-[#F8C312]/14 hover:text-white sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 ${showBackToTop
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
          }`}
      >
        <ArrowUp size={19} />
      </a>
    </main>
  );
}
