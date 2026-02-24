"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "HTML5",       icon: "🌐", color: "#e34c26", level: 95 },
  { name: "CSS3",        icon: "🎨", color: "#264de4", level: 90 },
  { name: "JavaScript",  icon: "⚡", color: "#f7df1e", level: 88 },
  { name: "React",       icon: "⚛️",  color: "#61dafb", level: 85 },
  { name: "Next.js",     icon: "▲",  color: "#a8b4c8", level: 82 },
  { name: "Node.js",     icon: "🟢", color: "#8cc84b", level: 80 },
  { name: "Express.js",  icon: "🚀", color: "#a78bfa", level: 78 },
  { name: "MongoDB",     icon: "🍃", color: "#4db33d", level: 75 },
  { name: "MySQL",       icon: "🐬", color: "#00a0c4", level: 72 },
];

const PROJECTS = [
  {
    title: "Crown Hotel – Luxury Hotel Website",
    desc: "A modern, fully responsive luxury hotel website built with Next.js and Tailwind CSS. Designed with premium UI, smooth animations, SEO optimization, and deployed on Vercel for high performance.",
    tech: ["Next.js", "Tailwind CSS", "React", "Vercel","GSAP"],
    color: "#00d4ff",
    icon: "🏨",
    link: "https://crown-hotel-13zwn7dy1-ajeety4969-gmailcoms-projects.vercel.app",
  },
  {
    title: "Task Management App",
    desc: "Real-time collaborative task board with drag-and-drop, notifications and team features.",
    tech: ["Next.js", "Express.js", "MySQL", "Socket.io"],
    color: "#7c3aed",
    icon: "📋",
    link: "#",
  },
  {
    title: "Blog CMS",
    desc: "Content management system with rich text editor, SEO optimization and analytics.",
    tech: ["Next.js", "MongoDB", "Node.js", "CSS3"],
    color: "#f59e0b",
    icon: "✍️",
    link: "#",
  },
  {
    title: "REST API Service",
    desc: "Scalable RESTful API with JWT auth, rate limiting, caching and comprehensive docs.",
    tech: ["Express.js", "MySQL", "JWT", "Node.js"],
    color: "#10b981",
    icon: "⚙️",
    link: "#",
  },
];

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

// ─── Typing Hook ──────────────────────────────────────────────────────────────
function useTyping(words: string[], speed = 80) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplay(word.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
          setCharIdx(0);
        } else setCharIdx((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return display;
}

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrolledCls = isDark
    ? "bg-[#060810]/90 backdrop-blur-xl border-b border-white/5 py-3"
    : "bg-[#f0f4ff]/90 backdrop-blur-xl border-b border-black/5 py-3";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? scrolledCls : "py-6"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-mono text-lg font-semibold">
          <span className="text-[#00d4ff]">&lt;</span>
          <span className={isDark ? "text-white" : "text-gray-800"}>AY</span>
          <span className="text-[#00d4ff]">/&gt;</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <Link
                href={`#${link.toLowerCase()}`}
                className={`nav-link text-sm transition-colors duration-200 hover:text-[#00d4ff] ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className={`theme-toggle ${!isDark ? "light-mode" : ""}`}>
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none select-none"
                style={{ opacity: isDark ? 1 : 0, transition: "opacity 0.3s" }}>🌙</span>
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none select-none"
                style={{ opacity: !isDark ? 1 : 0, transition: "opacity 0.3s" }}>☀️</span>
            </button>
          </li>
          <li>
            <Link
              href="mailto:ajeety4969@gmail.com"
              className="btn-primary px-4 py-2 rounded-lg border border-[#00d4ff]/40 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              Hire Me
            </Link>
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className={`theme-toggle ${!isDark ? "light-mode" : ""}`} />
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={isDark ? "text-gray-400" : "text-gray-500"}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden backdrop-blur-xl border-t px-6 py-4 ${isDark ? "bg-[#0d1117]/95 border-white/5" : "bg-[#f0f4ff]/95 border-black/5"}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 hover:text-[#00d4ff] transition-colors border-b ${isDark ? "text-gray-400 border-white/5" : "text-gray-500 border-black/5"}`}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ isDark }: { isDark: boolean }) {
  const typed = useTyping(["Full Stack Developer", "Next.js Developer", "React Enthusiast", "Node.js Engineer"]);
  // ✅ State: agar image load na ho to fallback dikhao
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-[#00d4ff]/20"
            style={{
              left: `${(i % 5) * 22 + 5}%`,
              top: `${Math.floor(i / 5) * 25 + 10}%`,
              animation: `floatY ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
            }} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest">AVAILABLE FOR WORK</span>
            </div>

            <h1 className="font-display font-extrabold leading-tight mb-4">
              <span className={`block text-xl font-normal mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hello, I'm</span>
              <span className={`block text-5xl md:text-6xl lg:text-7xl ${isDark ? "text-white" : "text-gray-900"}`}>Ajeet</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl gradient-text">Yadav</span>
            </h1>

            <div className="flex items-center gap-2 h-10 mb-6">
              <span className={`font-mono text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>{typed}</span>
              <span className="cursor-blink font-mono text-xl">|</span>
            </div>

            <p className={`text-base leading-relaxed mb-8 max-w-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Passionate full-stack developer crafting high-performance web applications with modern tech.
              I turn complex problems into elegant, scalable solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: "linear-gradient(135deg, #00d4ff, #0099bb)" }}
              >
                View Projects →
              </Link>
              <Link
                href="mailto:ajeety4969@gmail.com"
                className={`btn-primary px-6 py-3 rounded-xl font-semibold text-sm border transition-all ${
                  isDark ? "text-white border-white/10 hover:border-[#00d4ff]/30" : "text-gray-700 border-gray-200 hover:border-[#00d4ff]/40"}`}
              >
                Get In Touch
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <span className={`text-xs font-mono ${isDark ? "text-gray-600" : "text-gray-400"}`}>CONNECT</span>
              <div className={`h-px max-w-12 flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
              {[
                { label: "GitHub",   href: "https://github.com/ajeetyadav1111",   path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/ajeet-yadav1127", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 ${
                    isDark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-400"}`}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Avatar Circle */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative float">
              {/* Spinning orbit rings */}
              <div className="absolute inset-0 rounded-full border border-[#00d4ff]/10 scale-110"
                style={{ animation: "spinSlow 12s linear infinite" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00d4ff]" />
              </div>
              <div className="absolute inset-0 rounded-full border border-[#7c3aed]/10 scale-125"
                style={{ animation: "spinSlow 18s linear infinite reverse" }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#7c3aed]" />
              </div>

              {/*
                ✅ IMAGE SETUP:
                Apni photo ko /public/Ajeet.png mein rakhein.
                Next.js mein src="/Ajeet.png" likhte hain — "./public/" nahi.
                next.config.js mein kuch nahi karna — public folder automatic serve hota hai.
              */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#00d4ff]/20"
                style={{ boxShadow: "0 0 60px rgba(0,212,255,0.15)" }}
              >
                {!imgError ? (
                  <Image
                    src="/Ajeet.png"
                    alt="Ajeet Yadav"
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback — agar /public/Ajeet.png na mile */
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg,#0d1117 0%,#1a1f2e 50%,#0d1117 100%)"
                        : "linear-gradient(135deg,#dbeafe 0%,#ede9fe 50%,#dbeafe 100%)",
                    }}
                  >
                    <span
                      className="text-7xl font-extrabold"
                      style={{
                        background: "linear-gradient(135deg,#00d4ff,#7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      AY
                    </span>
                    <span className={`font-mono text-xs mt-2 tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      FULL STACK
                    </span>
                  </div>
                )}
              </div>

              {/* Floating tech badges */}
              {[
                { cls: "absolute -right-4 top-8",    text: "⚛️ React",   color: "#61dafb" },
                { cls: "absolute -left-8 bottom-12", text: "🟢 Node.js", color: "#8cc84b" },
                { cls: "absolute -right-2 bottom-6", text: "▲ Next.js",  color: "#a8b4c8" },
              ].map((b) => (
                <div key={b.text} className={`${b.cls} border rounded-xl px-3 py-2 shadow-xl ${isDark ? "bg-[#0d1117] border-white/10" : "bg-white border-gray-200"}`}>
                  <div className="font-mono text-xs" style={{ color: b.color }}>{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00d4ff]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills({ isDark }: { isDark: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cardBase = isDark ? "bg-[#0d1117] border-[#1e2433]" : "bg-white border-gray-200";

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#00d4ff]/60 tracking-widest mb-3">02. SKILLS</div>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className={isDark ? "text-gray-500" : "text-gray-400"}>
            Tools and technologies I use to build modern, scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill, i) => (
            <div key={skill.name}
              className={`skill-card border rounded-2xl p-5 cursor-pointer group ${cardBase}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}>
              <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {skill.icon}
              </div>
              <div className={`font-display font-bold text-sm mb-3 transition-colors group-hover:text-[#00d4ff] ${isDark ? "text-white" : "text-gray-800"}`}>
                {skill.name}
              </div>
              <div className={`h-1 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hoveredIdx === i ? `${skill.level}%` : "30%",
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                    boxShadow: hoveredIdx === i ? `0 0 8px ${skill.color}66` : "none",
                  }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className={`font-mono text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>Proficiency</span>
                <span className="font-mono text-[10px] transition-all duration-300"
                  style={{ color: hoveredIdx === i ? skill.color : isDark ? "#4b5563" : "#9ca3af" }}>
                  {hoveredIdx === i ? `${skill.level}%` : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { value: "9+",   label: "Technologies" },
            { value: "10+",  label: "Projects Built" },
            { value: "2+",   label: "Years Coding" },
            { value: "100%", label: "Dedication" },
          ].map((stat) => (
            <div key={stat.label} className={`text-center p-6 rounded-2xl border group hover:border-[#00d4ff]/20 transition-all duration-300 ${cardBase}`}>
              <div className="font-display font-extrabold text-3xl gradient-text mb-1">{stat.value}</div>
              <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ isDark }: { isDark: boolean }) {
  const cardBase = isDark
    ? "bg-[#0d1117] border-[#1e2433]"
    : "bg-white border-gray-200";

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#00d4ff]/60 tracking-widest mb-3">
            03. PROJECTS
          </div>

          <h2
            className={`font-display font-extrabold text-4xl md:text-5xl mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Featured <span className="gradient-text">Work</span>
          </h2>

          <p className={isDark ? "text-gray-500" : "text-gray-400"}>
            A selection of projects that showcase my skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-6 group relative transition-all duration-300 ${cardBase}`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3
                  className={`font-display font-bold text-lg group-hover:text-[#00d4ff] transition-colors ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {project.title}
                </h3>

                {/* 🔥 FIXED LINK HERE */}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-gray-600"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              </div>

              <p
                className={`text-sm leading-relaxed mb-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-lg border"
                    style={{
                      background: `${project.color}10`,
                      borderColor: `${project.color}40`,
                      color: project.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ isDark }: { isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("ajeety4969@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-xs text-[#00d4ff]/60 tracking-widest mb-3">04. CONTACT</div>
        <h2 className={`font-display font-extrabold text-4xl md:text-5xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className={`text-lg mb-12 max-w-lg mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>

        <div className={`relative border rounded-3xl p-10 mb-8 overflow-hidden glow-border ${isDark ? "bg-[#0d1117] border-[#1e2433]" : "bg-white border-gray-200"}`}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)", transform: "translate(-30%, 30%)" }} />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#00d4ff" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <Link
                href="mailto:ajeety4969@gmail.com"
                className={`contact-link font-mono text-xl md:text-2xl font-medium ${isDark ? "text-white" : "text-gray-800"}`}
              >
                ajeety4969@gmail.com
              </Link>
              <button onClick={copyEmail} title="Copy email"
                className={`w-8 h-8 rounded-lg border flex items-center justify-center hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all duration-300 ${isDark ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-400"}`}>
                {copied
                  ? <svg width="14" height="14" fill="none" stroke="#00d4ff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                }
              </button>
            </div>

            {copied && <div className="text-[#00d4ff] font-mono text-xs mb-4">✓ Email copied!</div>}

            <Link
              href="mailto:ajeety4969@gmail.com"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-black"
              style={{ background: "linear-gradient(135deg, #00d4ff, #0099bb)" }}
            >
              Send Me an Email
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-green-400">Open to full-time &amp; freelance opportunities</span>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className={`border-t py-8 ${isDark ? "border-[#1e2433]" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-mono text-sm">
          <span className="text-[#00d4ff]">&lt;</span>
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>AY</span>
          <span className="text-[#00d4ff]">/&gt;</span>
          <span className={`ml-3 text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>Ajeet Yadav</span>
        </Link>
        <div className={`font-mono text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          Built with <span className="text-[#00d4ff]">Next.js</span> &amp; <span className="text-[#00d4ff]">Tailwind</span> · 2025
        </div>
        <Link
          href="mailto:ajeety4969@gmail.com"
          className={`font-mono text-xs hover:text-[#00d4ff] transition-colors ${isDark ? "text-gray-600" : "text-gray-400"}`}
        >
          ajeety4969@gmail.com
        </Link>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark((d) => {
      const next = !d;
      if (typeof document !== "undefined") {
        document.body.classList.toggle("light", next === false);
      }
      return next;
    });
  }

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CursorGlow />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero isDark={isDark} />
        <Skills isDark={isDark} />
        <Projects isDark={isDark} />
        <Contact isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </>
  );
}