"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Images,
  Lightbulb,
  Mail,
  Menu,
  Phone,
  Rocket,
  Shirt,
  Sparkles,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const registerUrl = "https://register.moraforesight.lk/";
const updatesUrl = "https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K";
const merchOrderUrl = process.env.NEXT_PUBLIC_MERCH_ORDER_URL || registerUrl;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Gallery", href: "#gallery" },
  { label: "Merch", href: "#merch" },
  { label: "Contact", href: "#contact" },
];

const heroStats = [
  { value: "2500+", label: "applicant target" },
  { value: "25", label: "district reach" },
  { value: "100", label: "final delegates" },
];

const timelineStages = [
  {
    stage: "Stage 01",
    title: "Registration Period",
    date: "03 May - 06 June 2026",
    detail:
      "Open island-wide registration for school students under 20 years.",
    icon: ClipboardCheck,
  },
  {
    stage: "Stage 02",
    title: "Awareness Sessions",
    date: "During registration",
    detail:
      "Physical school sessions plus virtual and physical sessions around technology and industry.",
    icon: Sparkles,
  },
  {
    stage: "Stage 03",
    title: "Online Briefing Session",
    date: "12 June 2026",
    detail:
      "A briefing session to guide applicants before the selection process.",
    icon: CalendarDays,
  },
  {
    stage: "Stage 04",
    title: "Selection Process",
    date: "22 June - 24 July 2026",
    detail:
      "Prime category assessments include online selection, IQ evaluation, commitment, and creativity tests.",
    icon: BrainCircuit,
  },
  {
    stage: "Assessment Targets",
    title: "Online & Physical Tests",
    date: "20 June & 01 Aug 2026",
    detail:
      "Online selection test target: 20 June. Physical IQ test target: 01 August.",
    icon: Building2,
  },
  {
    stage: "Stage 05",
    title: "Finalizing Selection",
    date: "07 Aug 2026",
    detail:
      "Final delegate selection is completed across the prime and special categories.",
    icon: Trophy,
  },
  {
    stage: "Stage 06",
    title: "Residential Bootcamp",
    date: "06-08 Aug 2026",
    detail:
      "A fully-funded three-day residential bootcamp for the selected delegate cohort.",
    icon: Rocket,
  },
];

const tracks = [
  {
    title: "AI & Programming",
    detail:
      "Practical foundations in modern computation, problem solving, and AI-driven thinking.",
    icon: Cpu,
    accent: "from-[#01BEEB] to-[#66E1F7]",
  },
  {
    title: "Robotics & IoT",
    detail:
      "Hands-on exposure to hardware, sensors, connected systems, and automation.",
    icon: Bot,
    accent: "from-[#E585E4] to-[#F7A8F3]",
  },
  {
    title: "Entrepreneurship",
    detail:
      "Startup thinking, leadership, communication, teamwork, and innovation-driven learning.",
    icon: Lightbulb,
    accent: "from-[#F8C312] to-[#FFE27A]",
  },
];

const outcomes = [
  "Inspiring innovation and entrepreneurship in the young generation",
  "Unlocking the potential of talented Sri Lankan youth",
  "Delivering a transformative learning experience",
  "Fostering teamwork, leadership, communication, and problem solving",
  "Nurturing the next generation of tech leaders for Sri Lanka",
];

const galleryImages = (edition: string, filenames: string[]) =>
  filenames.map((filename) => `/gallery/${edition}/${filename}.jpg`);

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
    title: "Official T-shirt",
    image: "/tshirt-40.jpeg",
    note: "Main MoraForesight 4.0 event T-shirt artwork.",
  },
  {
    title: "Collar T-shirt",
    image: "/collar-tshirt-40.jpeg",
    note: "Premium collar design aligned with the 4.0 visual identity.",
  },
];

const contacts = [
  {
    role: "Event Chair",
    name: "Tharusha Jayasundara",
    email: "ranidu.jaya171@gmail.com",
    phone: "+94 76 292 1236",
  },
  {
    role: "Event Vice-Chair",
    name: "Kushani Umanda",
    email: "kushaniumanda2003@gmail.com",
    phone: "+94 71 697 1942",
  },
  {
    role: "Event Executive Chairman",
    name: "Chanuka Anjana",
    email: "chanukaanjana01@gmai.com",
    phone: "+94 71 760 7248",
  },
];

const faqs = [
  {
    question: "Who can apply?",
    answer:
      "School students under the age of 20 can apply. The program targets high-potential students across all 25 districts of Sri Lanka.",
  },
  {
    question: "How many students will be selected?",
    answer:
      "The final delegate cohort is planned for 100 students: 80 through the prime category and 20 through the special category.",
  },
  {
    question: "What makes the program fully funded?",
    answer:
      "The final three-day residential bootcamp is designed as a fully-funded learning experience for selected delegates.",
  },
  {
    question: "What will students learn?",
    answer:
      "The focus areas include AI & Programming, Robotics & IoT, Entrepreneurship, teamwork, leadership, communication, and problem solving.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
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
      <p className="mb-3 text-sm font-semibold uppercase text-[#F8C312]">
        {eyebrow}
      </p>
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
      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-6 py-4 text-base font-semibold text-white transition hover:scale-[1.02]"
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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
              src="/moraforesight-spark.png"
              alt=""
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
            />
            <span className="text-sm font-semibold uppercase text-white md:text-base">
              MoraForesight 4.0
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
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

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={updatesUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/14 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/32 hover:bg-white/[0.06] hover:text-white"
            >
              Updates
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
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] text-white md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-[#050608] px-4 py-4 md:hidden"
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
        className="relative flex min-h-[660px] items-start overflow-hidden bg-[url('/coming-soon.png')] bg-[length:auto_100%] bg-[position:72%_bottom] bg-no-repeat pt-16 md:h-[calc(100svh-3rem)] md:max-h-[920px] md:min-h-[700px] md:bg-[length:cover] md:bg-[position:62%_center]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050608_0%,rgba(5,6,8,0.98)_31%,rgba(5,6,8,0.7)_55%,rgba(5,6,8,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.62)_0%,rgba(5,6,8,0)_38%,rgba(5,6,8,0.3)_76%,#050608_100%)]" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-[minmax(0,650px)_1fr] md:px-8 md:pb-8 md:pt-8 lg:pt-10">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.75, ease: "easeOut" }}
            variants={fadeUp}
            className="min-w-0 max-w-[650px]"
          >
            <Image
              src="/moraforesight-logo.png"
              alt="MoraForesight 4.0"
              width={909}
              height={360}
              priority
              className="h-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
            />

            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/14 bg-black/34 px-3 py-2 text-xs font-semibold text-white/78 backdrop-blur-sm sm:text-sm">
              <CalendarDays size={16} className="text-[#01BEEB]" />
              03 May - 08 Aug 2026 roadmap
            </div>

            <h1 className="mt-4 max-w-[650px] break-words text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              Fully-funded bootcamp for Sri Lanka&apos;s next tech leaders.
            </h1>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-white/72 lg:text-lg">
              A fully-funded three-day residential experience for school
              students under 20, organized by the IEEE Student Branch of the
              University of Moratuwa.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <GradientButton href={registerUrl}>Register Now</GradientButton>
              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/16 bg-white/[0.04] px-6 py-4 text-base font-semibold text-white transition hover:border-white/34 hover:bg-white/[0.08]"
              >
                View Timeline
                <ChevronDown size={18} />
              </a>
            </div>

            <div className="mt-5 hidden max-w-[620px] grid-cols-3 gap-3 sm:grid">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 overflow-hidden rounded-lg border border-white/12 bg-black/38 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/62">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </section>

      <section id="about" className="relative py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 md:grid-cols-[0.92fr_1.08fr] md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
          >
            <p className="mb-3 text-sm font-semibold uppercase text-[#F8C312]">
              About MoraForesight 4.0
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              A premier catalyst for technological literacy.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/70 md:text-lg">
              Established in 2023, MoraForesight narrows the divide between
              traditional education and the cutting-edge advancements shaping
              the world. The fourth iteration continues that legacy through a
              multi-phase journey culminating in a signature residential
              bootcamp.
            </p>
            <div className="mt-8 rounded-lg border border-[#F8C312]/35 bg-black/28 p-5 shadow-[0_0_32px_rgba(248,195,18,0.08)]">
              <div className="flex items-center gap-4">
                <Image
                  src="/moraforesight-spark.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="text-sm font-semibold uppercase text-[#01BEEB]">
                    Organized by
                  </p>
                  <p className="text-xl font-semibold text-white">
                    IEEE Student Branch of UOM
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/62">
                The branch brings together 15 specialized chapters and an
                affinity group, connecting undergraduate expertise with
                school-level innovation.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Nationwide Reach",
                detail:
                  "MoraForesight 4.0 targets students across all 25 districts through a trilingual approach.",
                icon: Users,
              },
              {
                title: "Competitive Selection",
                detail:
                  "Applicants progress through IQ, creativity, commitment, and achievement-based evaluations.",
                icon: BrainCircuit,
              },
              {
                title: "Immersive Bootcamp",
                detail:
                  "The final cohort enters an intensive residential environment with workshops and mentorship.",
                icon: Rocket,
              },
              {
                title: "Recognized Legacy",
                detail:
                  "MoraForesight 3.0 was awarded for nationwide impact and transformative student influence.",
                icon: Award,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                variants={fadeUp}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
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
      </section>

      <section
        id="timeline"
        className="border-y border-white/10 bg-[#0B0D12] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="Event timeline"
            title="Target roadmap from registration to bootcamp."
            intro="Dates are taken from the event information deck. The selection finalization and bootcamp window appear very close together in the source, so both are displayed as target dates."
          />

          <div className="relative mx-auto max-w-6xl">
            <svg
              className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-44 -translate-x-1/2 md:block"
              viewBox="0 0 180 1120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M108 0 C28 130 152 245 78 390 C38 500 132 610 82 750 C40 870 138 978 78 1120"
                fill="none"
                stroke="rgba(1, 190, 235, 0.74)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M108 0 C28 130 152 245 78 390 C38 500 132 610 82 750 C40 870 138 978 78 1120"
                fill="none"
                stroke="rgba(248, 195, 18, 0.26)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className="space-y-5 md:space-y-0">
              {timelineStages.map((stage, index) => {
                const StageIcon = stage.icon;
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={`${stage.stage}-${stage.title}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    variants={fadeUp}
                    className="relative grid items-center gap-4 md:min-h-40 md:grid-cols-[1fr_150px_1fr]"
                  >
                    <div className={isLeft ? "md:pr-8" : "md:col-start-3 md:pl-8"}>
                      <article className="relative overflow-hidden rounded-lg border border-white/10 bg-[#11141B] p-5 shadow-2xl shadow-black/20">
                        <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#01BEEB]/10 blur-2xl" />
                        <div className="relative flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-md border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase text-[#F8C312]">
                            {stage.stage}
                          </span>
                          <span className="rounded-md bg-[#C8FFF4] px-3 py-1 text-xs font-semibold text-[#061013]">
                            {stage.date}
                          </span>
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-white md:text-2xl">
                          {stage.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-white/62">
                          {stage.detail}
                        </p>
                      </article>
                    </div>

                    <div className="relative hidden justify-center md:col-start-2 md:row-start-1 md:flex">
                      <span className="absolute top-1/2 h-px w-28 -translate-y-1/2 bg-[#01BEEB]/45" />
                      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0B0D12] bg-[#C8FFF4] text-[#061013] shadow-[0_0_28px_rgba(1,190,235,0.38)]">
                        <StageIcon size={26} strokeWidth={2} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <section id="tracks" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="Bootcamp focus"
            title="Technical skills, teamwork, and entrepreneurial confidence."
            intro="The program goes beyond teaching technical skills by immersing delegates in a culture of problem solving and future-focused leadership."
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

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {outcomes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-t border-white/12 pt-5"
              >
                <CheckCircle2 className="mt-1 shrink-0 text-[#F8C312]" size={18} />
                <p className="text-sm leading-6 text-white/68">{item}</p>
              </div>
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
            eyebrow="Legacy gallery"
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
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition hover:-translate-y-1 hover:border-[#01BEEB]/65 hover:bg-white/[0.07]"
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
                        sizes="(min-width: 768px) 33vw, 100vw"
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
                    sizes="(min-width: 1024px) 72vw, 100vw"
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

      <section id="merch" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="Merch"
            title="Official MoraForesight 4.0 merchandise previews."
            intro="Choose the design you prefer and place your order through the official form."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {merchItems.map((item) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                variants={fadeUp}
                className="rounded-lg border border-white/10 bg-[#11141B] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase text-[#F8C312]">
                      Order preview
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/62">
                      {item.note}
                    </p>
                  </div>
                  <IconBadge icon={Shirt} />
                </div>
                <div className="relative mt-6 aspect-[16/12] overflow-hidden rounded-lg bg-white/[0.03]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <GradientButton href={merchOrderUrl}>Order Merch</GradientButton>
                  <a
                    href={updatesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/14 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/32 hover:bg-white/[0.06] hover:text-white"
                  >
                    Ask Availability
                  </a>
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="The essentials students and parents will look for."
          />

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-lg border border-white/10 bg-white/[0.04]"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white md:text-lg">
                      {faq.question}
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
                      <p className="px-5 pb-5 text-sm leading-7 text-white/66 md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeader
            eyebrow="Contact"
            title="Reach the organizing team."
            intro="Contact details are taken from the event information deck."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact.role}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="text-sm font-semibold uppercase text-[#F8C312]">
                  {contact.role}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {contact.name}
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-5 flex items-center gap-3 text-sm text-white/68 transition hover:text-white"
                >
                  <Mail size={16} className="text-[#01BEEB]" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="mt-3 flex items-center gap-3 text-sm text-white/68 transition hover:text-white"
                >
                  <Phone size={16} className="text-[#01BEEB]" />
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-white p-5">
            <Image
              src="/ieee-uom-blue.png"
              alt="IEEE Student Branch University of Moratuwa"
              width={18035}
              height={3932}
              className="mx-auto h-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-white/54 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p>MoraForesight 4.0 - IEEE Student Branch, University of Moratuwa.</p>
          <div className="flex gap-5">
            <a href="#home" className="hover:text-white">
              Top
            </a>
            <a href="#timeline" className="hover:text-white">
              Timeline
            </a>
            <a href={registerUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              Register
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
