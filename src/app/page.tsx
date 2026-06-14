"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
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
  Rocket,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Tshirt360Viewer } from "./components/Tshirt360Viewer";

const registerUrl = "https://register.moraforesight.lk/";
const updatesUrl = "https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K";
const merchOrderUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6sNf8xXAkCsz5_jZw7hUJmLkAnr_4_7C0cYpOXqQPciWCvg/viewform";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Gallery", href: "#gallery" },
  { label: "Merch", href: "#merch" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/moraforesight",
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
];

const timelineStages = [
  {
    stage: "Stage 01",
    title: "Registration Period",
    date: "03 May - 06 June 2026",
    detail:
      "Open island-wide registration for school students under 20 years.",
    color: "#01BEEB",
    x: 10,
    y: 86,
    label: "left",
    mobileX: 46,
  },
  {
    stage: "Stage 02",
    title: "Awareness Sessions",
    date: "During registration",
    detail:
      "Physical school sessions plus virtual and physical sessions around technology and industry.",
    color: "#F8C312",
    x: 27.5,
    y: 72.5,
    label: "center",
    mobileX: 52,
  },
  {
    stage: "Stage 03",
    title: "Online Briefing Session",
    date: "12 June 2026",
    detail:
      "A briefing session to guide applicants before the selection process.",
    color: "#E585E4",
    x: 44.5,
    y: 67.5,
    label: "center",
    mobileX: 72,
  },
  {
    stage: "Stage 04",
    title: "Selection & Assessments",
    date: "22 June - 01 August 2026",
    detail:
      "Prime category assessments include online selection, IQ evaluation, commitment, creativity, and the physical evaluation.",
    color: "#01D5FF",
    x: 61.25,
    y: 54,
    label: "center",
    mobileX: 52,
  },
  {
    stage: "Stage 05",
    title: "Finalizing Selection",
    date: "07 Aug 2026",
    detail:
      "Final delegate selection is completed across the prime and special categories.",
    color: "#F8C312",
    x: 77.5,
    y: 46,
    label: "center",
    mobileX: 55,
  },
  {
    stage: "Stage 06",
    title: "Residential Bootcamp",
    date: "06-08 Aug 2026",
    detail:
      "A fully-funded three-day residential bootcamp for the selected delegate cohort.",
    color: "#E585E4",
    x: 93.25,
    y: 25.5,
    label: "right",
    mobileX: 59,
  },
];

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
      "Turn ideas into action through teamwork, communication, leadership, and entrepreneurial thinking.",
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
      "Top participants earn a fully funded residential bootcamp with immersive workshops, mentorship, and hands-on learning led by industry experts.",
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

const legacyEditions = [
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
];

const merchItems = [
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
  {
    title: "Ether Bloom",
    type: "Premium collar T-shirt",
    frames: [
      { label: "front view", src: "/merch/ether-front.webp" },
      { label: "back view", src: "/merch/ether-back.webp" },
    ],
    note: "A collar edition with magenta shoulder detailing, MoraForesight chest branding, and IEEE Student Branch recognition on the back.",
  },
];

const contacts = [
  {
    role: "Event Chair",
    name: "Tharusha Jayasundara",
    email: "ranidu.jaya171@gmail.com",
    phone: "+94 76 292 1236",
    image: "/contact/tharusha-cutout.webp",
    accent: {
      border: "border-[#01BEEB]",
      frame: "from-[#01BEEB]/32 via-[#04212B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(1,190,235,0.18)]",
      panel: "from-[#01BEEB] to-[#006F90]",
      text: "text-[#01BEEB]",
    },
  },
  {
    role: "Event Vice-Chair",
    name: "Kushani Umanda",
    email: "kushaniumanda2003@gmail.com",
    phone: "+94 71 697 1942",
    image: "/contact/kushani-cutout.webp",
    accent: {
      border: "border-[#E585E4]",
      frame: "from-[#E585E4]/32 via-[#24112B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(229,133,228,0.18)]",
      panel: "from-[#E585E4] to-[#7D0A82]",
      text: "text-[#E585E4]",
    },
  },
  {
    role: "Delegates Handling",
    name: "Thimeshi Nipunika",
    email: "thimeshi.np@gmail.com",
    phone: "+94 77 398 8003",
    image: "/contact/thimeshi-cutout.webp",
    accent: {
      border: "border-[#F8C312]",
      frame: "from-[#F8C312]/32 via-[#271F06]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(248,195,18,0.18)]",
      panel: "from-[#F8C312] to-[#8A6800]",
      text: "text-[#F8C312]",
    },
  },
  {
    role: "Event Vice-Chair",
    name: "Janidu Janadara",
    email: "janidujanadara@gmail.com",
    phone: "+94 71 918 9585",
    image: "/contact/janidu-cutout.webp",
    accent: {
      border: "border-[#01BEEB]",
      frame: "from-[#01BEEB]/32 via-[#04212B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(1,190,235,0.18)]",
      panel: "from-[#01BEEB] to-[#006F90]",
      text: "text-[#01BEEB]",
    },
  },
  {
    role: "Event Vice-Chair",
    name: "Lasan Perera",
    email: "lasanperera.lsp@gmail.com",
    phone: "+94 70 451 2644",
    image: "/contact/lasan-cutout-v2.webp",
    accent: {
      border: "border-[#E585E4]",
      frame: "from-[#E585E4]/32 via-[#24112B]/88 to-black",
      glow: "shadow-[0_0_34px_rgba(229,133,228,0.18)]",
      panel: "from-[#E585E4] to-[#7D0A82]",
      text: "text-[#E585E4]",
    },
  },
];

const faqs = [
  {
    question: "Who can apply?",
    answer:
      "School students under the age of 20 as of January 2026 are eligible to apply. MoraForesight welcomes high-potential students from all 25 districts of Sri Lanka who demonstrate curiosity, commitment, and leadership potential.",
  },
  {
    question: "How are students selected?",
    answer:
      "Participants are selected through a competitive process designed to identify motivated, future-focused individuals. The stages may include online assessments, physical evaluations, and commitment-based screening.",
  },
  {
    question: "How many students will be selected?",
    answer:
      "A limited number of delegates are selected to keep the learning experience engaging and personal. Previous editions have hosted approximately 100 participants from across the island.",
  },
  {
    question: "Is the program fully funded?",
    answer:
      "Yes. MoraForesight is a fully funded residential bootcamp made possible through the support of industry partners, collaborators, and the University of Moratuwa community.",
  },
  {
    question: "What will students learn?",
    answer:
      "Delegates gain exposure to programming, artificial intelligence, robotics, innovation, entrepreneurship, leadership, and collaborative problem solving through workshops, competitions, and interactive sessions.",
  },
  {
    question: "Where will the bootcamp be held?",
    answer:
      "The residential bootcamp is conducted at the University of Moratuwa and affiliated partner venues, giving students direct exposure to a leading university environment.",
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
      "Yes. Accommodation, meals, and learning resources are provided for selected delegates throughout the residential program.",
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

function SectionHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={fadeUp}
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
    >
      <h2 className="text-3xl font-semibold text-white md:text-5xl">
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
    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-[#01BEEB]">
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
      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] sm:px-6 sm:text-base"
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
      className={`overflow-hidden rounded-lg border bg-white/[0.035] transition ${
        isOpen
          ? "border-[#01BEEB]/45"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center gap-4 px-5 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-xs font-semibold tabular-nums ${
            isOpen ? "text-[#01BEEB]" : "text-white/34"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-base font-semibold text-white md:text-lg">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#01BEEB] transition ${
            isOpen ? "rotate-180" : ""
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryEditionIndex, setGalleryEditionIndex] = useState<number | null>(
    null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const closeMenu = () => setMenuOpen(false);
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
    setGalleryEditionIndex(editionIndex);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
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
          (current) => (current - 1 + totalImages) % totalImages
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050608]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-3"
            aria-label="MoraForesight 4.0 home"
          >
            <Image
              src="/moraforesight-spark-nav.webp"
              alt=""
              width={124}
              height={130}
              unoptimized
              className="h-6 w-6 shrink-0 object-contain"
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
                className="text-sm font-medium text-white/70 transition hover:text-white"
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
              className="rounded-md border border-white/14 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/32 hover:bg-white/[0.06] hover:text-white"
            >
              WhatsApp
            </a>
            <a
              href={registerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F8C312]"
            >
              Register
              <ArrowRight size={16} />
            </a>
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
                WhatsApp
              </a>
              <a
                href={registerUrl}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="mt-3 rounded-md bg-white px-4 py-3 text-center text-sm font-semibold text-black"
              >
                Register
              </a>
            </div>
          </motion.div>
        ) : null}
      </nav>

      <section
        id="home"
        className="hero-shell relative flex items-start overflow-hidden bg-[#050608] pt-16"
      >
        <div className="hero-artwork" aria-hidden="true">
          <Image
            src="/coming-soon-characters.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1536px) 900px, (min-width: 1024px) 58vw, (min-width: 640px) 72vw, 122vw"
            className="object-contain"
          />
        </div>
        <div className="hero-horizontal-shade absolute inset-0" />
        <div className="hero-vertical-shade absolute inset-0" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-4 sm:px-6 sm:py-8 md:grid-cols-[minmax(0,600px)_1fr] md:px-8 xl:grid-cols-[minmax(0,650px)_1fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.75, ease: "easeOut" }}
            variants={fadeUp}
            className="min-w-0 max-w-[620px] xl:max-w-[650px]"
          >
            <Image
              src="/moraforesight-logo-compact.webp"
              alt="MoraForesight 4.0"
              width={651}
              height={182}
              priority
              sizes="(min-width: 1024px) 235px, (min-width: 640px) 220px, 190px"
              unoptimized
              className="h-auto w-full max-w-[180px] sm:max-w-[210px] xl:max-w-[235px]"
            />

            <h1 className="mt-4 max-w-[650px] break-words text-4xl font-semibold leading-[1.03] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.82)] sm:text-5xl lg:text-5xl xl:text-[3.375rem]">
              Fully-funded bootcamp for Sri Lanka&apos;s next tech leaders.
            </h1>
            <p className="mt-4 max-w-[570px] text-base leading-7 text-white/76 lg:text-lg">
              A fully-funded three-day residential experience for school
              students under 20, organized by the IEEE Student Branch of the
              University of Moratuwa.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <GradientButton href={registerUrl}>Register Now</GradientButton>
              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/16 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/34 hover:bg-white/[0.08] sm:px-6 sm:text-base"
              >
                View Timeline
                <ChevronDown size={18} />
              </a>
            </div>
          </motion.div>

          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </section>

      <section id="about" className="relative py-10 md:py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-semibold text-white md:text-5xl">
                A visionary launchpad for aspiring tech innovators.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/70 md:text-lg">
                Launched in 2023, MoraForesight leads students beyond the
                conventional curriculum and towards the drive to innovate with
                technology. The fourth edition carries that vision forward
                through thoughtfully designed stages, rewarding top
                participants with a fully funded flagship residential bootcamp.
              </p>
              <div className="mt-8 border-l-2 border-[#F8C312] bg-white/[0.025] px-5 py-5">
                <p className="text-sm font-semibold uppercase text-[#01BEEB]">
                  Organized by
                </p>
                <Image
                  src="/ieee-uom-blue.webp"
                  alt="University of Moratuwa IEEE Student Branch"
                  width={1600}
                  height={350}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="mt-4 h-auto w-full max-w-[420px]"
                />
                <p className="mt-4 text-sm leading-7 text-white/62">
                  The branch unites 15 specialized chapters and an affinity
                  group, channeling undergraduate expertise into school-level
                  innovation.
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
                  variants={fadeUp}
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20 hover:bg-white/[0.055]"
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

      <section
        id="timeline"
        className="overflow-hidden border-y border-white/10 bg-[#0B0D12] py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            variants={fadeUp}
            className="mb-5"
          >
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              From registration to the residential bootcamp.
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
                  y1="590"
                  x2="1180"
                  y2="120"
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
                d="M20 590 C80 520 110 535 150 535 C250 535 245 460 330 450 C430 438 440 390 535 420 C610 444 650 380 735 335 C820 290 860 340 930 285 C1000 230 1030 240 1080 190 C1120 150 1145 160 1180 120"
                fill="none"
                stroke="#02070C"
                strokeWidth="86"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 590 C80 520 110 535 150 535 C250 535 245 460 330 450 C430 438 440 390 535 420 C610 444 650 380 735 335 C820 290 860 340 930 285 C1000 230 1030 240 1080 190 C1120 150 1145 160 1180 120"
                fill="none"
                stroke="url(#timeline-road-gradient)"
                strokeWidth="70"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
                filter="url(#timeline-road-glow)"
              />
              <path
                d="M20 590 C80 520 110 535 150 535 C250 535 245 460 330 450 C430 438 440 390 535 420 C610 444 650 380 735 335 C820 290 860 340 930 285 C1000 230 1030 240 1080 190 C1120 150 1145 160 1180 120"
                fill="none"
                stroke="#06131E"
                strokeWidth="56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 590 C80 520 110 535 150 535 C250 535 245 460 330 450 C430 438 440 390 535 420 C610 444 650 380 735 335 C820 290 860 340 930 285 C1000 230 1030 240 1080 190 C1120 150 1145 160 1180 120"
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
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
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
                    className={`absolute bottom-[116px] w-48 ${
                      stage.label === "left"
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

      <section id="tracks" className="py-20 md:py-28">
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
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
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
        className="border-y border-white/10 bg-[#0B0D12] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Year by year, the project has grown in scale and impact."
            intro="Each edition opens into a combined photo archive, curated from the official MoraForesight Facebook albums."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {legacyEditions.map((edition, index) => (
              <button
                key={edition.year}
                type="button"
                data-gallery-index={index}
                onClick={() => openGallery(index)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition hover:-translate-y-1 hover:border-[#01BEEB]/65 hover:bg-white/[0.07]"
              >
                <div className="grid h-64 grid-cols-2 grid-rows-2 gap-2">
                  {edition.images.slice(0, 3).map((image, imageIndex) => (
                    <div
                      key={image}
                      className={`relative overflow-hidden rounded-md bg-black/35 ${
                        imageIndex === 0 ? "row-span-2" : ""
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`MoraForesight ${edition.year} gallery preview ${imageIndex + 1}`}
                        fill
                        sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase text-[#F8C312]">
                    MoraForesight {edition.year}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-[#01BEEB] transition group-hover:border-[#01BEEB]/55">
                    <Images size={19} />
                  </span>
                </div>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#01BEEB]">
                  Open edition gallery
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
                    className={`group relative overflow-hidden rounded-md border transition ${
                      imageIndex % 7 === 0
                        ? "aspect-[4/5]"
                        : imageIndex % 5 === 0
                          ? "aspect-[16/10]"
                          : "aspect-square"
                    } ${
                      activeImageIndex === imageIndex
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

      <section id="merch" className="py-12 md:py-16">
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
                className="grid items-center gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Tshirt360Viewer
                    frames={item.frames}
                    label={item.title}
                  />
                </div>

                <div
                  className={`max-w-xl ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
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
        className="border-y border-white/10 bg-[#0B0D12] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="All essential information for students and parents, right here."
          />

          <div className="space-y-3 lg:hidden">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                {...faq}
                index={index}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
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
                  ) : null
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative border-t border-white/10 bg-[#050608] py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            title="Contact the MoraForesight 4.0 organizing team."
            intro="For registration, selection, and event-related inquiries, reach out to the team below."
          />
        </div>

        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 xl:grid-cols-6 xl:gap-7">
            {contacts.map((contact, index) => (
              <motion.article
                key={contact.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                variants={fadeUp}
                className={`group relative min-h-[430px] pt-[270px] sm:min-h-[470px] sm:pt-[300px] md:min-h-[430px] md:pt-[270px] lg:min-h-[470px] lg:pt-[300px] xl:col-span-2 ${
                  index === 3 ? "xl:col-start-2" : ""
                } ${
                  index === 4
                    ? "md:col-span-2 md:w-full md:max-w-[520px] md:justify-self-center xl:col-start-4 xl:col-span-2 xl:max-w-none"
                    : ""
                }`}
              >
                <div
                  className={`absolute left-1/2 top-0 z-10 h-[295px] w-[76%] -translate-x-1/2 overflow-hidden rounded-[30px] border-[3px] ${contact.accent.border} bg-gradient-to-br ${contact.accent.frame} md:h-[286px] lg:h-[320px] ${contact.accent.glow}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_42%)]" />
                  <div className="absolute inset-x-6 bottom-0 h-36 rounded-t-lg bg-gradient-to-t from-black/45 to-transparent" />
                  <Image
                    src={contact.image}
                    alt={contact.name}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 28vw, 70vw"
                    className="origin-bottom scale-[1.05] object-contain object-bottom px-1 pt-2 transition duration-500 group-hover:scale-[1.09]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                </div>

                <div
                  className={`relative z-20 min-h-[168px] rounded-[10px] border-[3px] ${contact.accent.border} bg-black/58 px-5 pb-6 pt-11 text-center backdrop-blur-sm ${contact.accent.glow}`}
                >
                  <div
                    className={`absolute left-1/2 top-0 flex min-h-[68px] w-[calc(100%+0.75rem)] -translate-x-1/2 -translate-y-[58%] items-center justify-center rounded-[13px] bg-gradient-to-r ${contact.accent.panel} px-4 py-3 text-center text-[clamp(0.95rem,1.35vw,1.7rem)] font-extrabold uppercase leading-tight text-white shadow-[0_18px_42px_rgba(0,0,0,0.30)] md:min-h-[62px] xl:min-h-[68px]`}
                  >
                    {contact.role}
                  </div>

                  <h3 className="text-[1.55rem] font-extrabold leading-tight text-white md:text-[1.35rem] lg:text-[1.55rem] xl:text-[1.75rem]">
                    {contact.name}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className={`mt-2 block break-words text-[1.05rem] leading-snug transition hover:text-white md:text-[0.95rem] lg:text-[1.05rem] xl:text-[1.25rem] ${contact.accent.text}`}
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-[1.1rem] font-medium leading-tight text-white transition hover:text-white/75 md:text-[1rem] lg:text-[1.2rem] xl:text-[1.45rem]"
                  >
                    {contact.phone}
                  </a>
                </div>
              </motion.article>
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
                A fully-funded three-day residential bootcamp empowering Sri
                Lanka&apos;s next generation through technology, innovation,
                and entrepreneurship.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-black transition hover:bg-[#F8C312]"
                >
                  Register
                  <ArrowRight size={17} />
                </a>
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
        className={`fixed bottom-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-white/18 bg-black/72 text-white/76 shadow-[0_12px_32px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-200 hover:border-[#F8C312]/70 hover:bg-[#F8C312]/14 hover:text-white sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp size={19} />
      </a>
    </main>
  );
}
