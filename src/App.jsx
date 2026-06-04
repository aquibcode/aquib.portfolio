import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Brain,
  Bot,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  Eye,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Network,
  PenTool,
  Play,
  Server,
  Send,
  ShieldCheck,
  Share2,
  Sparkles,
  Terminal,
  Twitter,
  Video,
  X,
  Youtube
} from "lucide-react";
import {
  contentCards,
  highlights,
  journey,
  navItems,
  projects,
  skills,
  socials
} from "./data/portfolio";

const iconMap = {
  "IIT Madras": GraduationCap,
  "Machine Learning": Brain,
  "Research Mindset": Sparkles,
  "AI Engineering": Code2,
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter,
  YouTube: Youtube
};

const heroWords = ["AI products", "ML systems", "neural workflows", "data stories"];

const floatingTech = [
  { label: "Py", Icon: Terminal, position: "left-[7%] top-[20%]", color: "text-mint", delay: "0s" },
  { label: "AI", Icon: Brain, position: "right-[9%] top-[18%]", color: "text-accent", delay: "0.6s" },
  { label: "DB", Icon: Database, position: "left-[11%] bottom-[24%]", color: "text-coral", delay: "1.1s" },
  { label: "API", Icon: Server, position: "right-[13%] bottom-[27%]", color: "text-amber", delay: "1.6s" },
  { label: "CV", Icon: Eye, position: "left-[22%] top-[6%]", color: "text-sky-300", delay: "2s" },
  { label: "NN", Icon: Network, position: "right-[24%] top-[7%]", color: "text-violet-300", delay: "2.4s" }
];

const skillIconMap = {
  Python: Terminal,
  "Machine Learning": Brain,
  "Deep Learning": Network,
  TensorFlow: Cpu,
  PyTorch: Cpu,
  "Data Science": BarChart3,
  NLP: MessageSquare,
  "Computer Vision": Eye,
  React: Layers,
  "Next.js": Code2,
  SQL: Database,
  "AI Product Dev": Sparkles
};

const projectIconMap = {
  "AI Recommendation System": Network,
  "Malware Detection System": ShieldCheck,
  "AI Content Generation Tool": Sparkles,
  "ML Dashboard with Streamlit": BarChart3,
  "AI Chatbot Platform": Bot
};

const contentIconMap = {
  "AI Videos": Video,
  "Educational Content": GraduationCap,
  "Tech Writing": PenTool,
  "Video Editing": Clapperboard,
  "Social Media Growth": Share2
};

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fullWord = heroWords[wordIndex];
    const isComplete = letters === fullWord;
    const isEmpty = letters.length === 0;
    const delay = isComplete && !deleting ? 1150 : deleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (isComplete && !deleting) {
        setDeleting(true);
        return;
      }

      if (isEmpty && deleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % heroWords.length);
        return;
      }

      setLetters((current) =>
        deleting ? fullWord.slice(0, current.length - 1) : fullWord.slice(0, current.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letters, wordIndex]);

  return (
    <span className="typing-cursor inline-flex min-w-[11rem] justify-start bg-gradient-to-r from-accent via-mint to-coral bg-clip-text font-bold text-transparent sm:min-w-[15rem]">
      {letters || "\u00a0"}
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "border-b border-white/10 bg-surface/85 shadow-2xl shadow-black/30 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <button
          className="bg-gradient-to-r from-accent via-mint to-coral bg-clip-text text-lg font-black tracking-normal text-transparent"
          onClick={() => handleNav("hero")}
        >
          Aquib.
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                active === item.id ? "bg-accent/10 text-accent" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-surface/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-4 py-3 text-left text-base font-semibold transition ${
                  active === item.id ? "bg-accent/10 text-accent" : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative h-[310px] overflow-hidden sm:h-[380px] lg:h-[430px]">
        <img
          src="/IMG_20260517_112150130.jpg"
          alt="Aquib profile banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/5 via-surface/20 to-surface" />
      </div>

      <div className="relative -mt-24 flex min-h-[calc(100vh-130px)] items-center justify-center px-5 pb-20 pt-28 text-center sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.18),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
          {floatingTech.map(({ label, Icon, position, color, delay }) => (
            <div
              key={label}
              className={`float-chip glass absolute ${position} inline-flex items-center gap-2 rounded-lg px-3 py-2 ${color}`}
              style={{ animationDelay: delay }}
            >
              <Icon size={18} />
              <span className="font-mono text-xs font-bold">{label}</span>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl" data-reveal>
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-accent">
            <ShieldCheck size={16} />
            Available for opportunities
          </div>

          <h1 className="text-4xl font-black leading-[1.08] tracking-normal sm:text-6xl lg:text-7xl">
            Machine Learning
            <br />
            <span className="bg-gradient-to-r from-accent via-mint to-coral bg-clip-text text-transparent">
              Engineer
            </span>{" "}
            at IIT Madras
          </h1>

          <p className="mx-auto mt-6 flex max-w-2xl flex-col items-center justify-center gap-2 text-base text-white/65 sm:flex-row sm:text-lg md:text-xl">
            <span>I build</span>
            <TypewriterText />
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg md:text-xl">
            Building intelligent systems, AI products, and digital experiences that merge technology, design, and storytelling.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 font-bold text-surface transition hover:bg-cyan-200 hover:shadow-glow sm:w-auto"
            >
              <Play size={17} />
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="glass inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-7 font-bold text-white/80 transition hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Mail size={17} />
              Contact Me
            </button>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="mx-auto mt-14 hidden text-white/35 transition hover:text-accent sm:block"
            aria-label="Scroll to about"
          >
            <ArrowDown className="animate-bounce" size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">About</span>
          <h2 className="heading-xl">Who I Am</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="glass rounded-lg p-6 sm:p-8" data-reveal>
            <p className="body-muted text-lg text-white/70">
              I'm <span className="font-bold text-white">Aquib</span>, a Machine Learning Engineer at{" "}
              <span className="font-bold text-accent">IIT Madras</span> with a deep passion for building intelligent systems
              that solve real-world problems.
            </p>
            <p className="body-muted mt-5">
              My work sits at the intersection of AI engineering, research, and creative technology. I believe in building
              things that work, inspire, learn, adapt, and create meaningful impact.
            </p>
            <p className="body-muted mt-5">
              Whether it is training deep learning models, crafting AI-powered products, or creating educational content
              about technology, I am driven by the desire to push boundaries and share knowledge.
            </p>
          </div>

          <div className="grid gap-4">
            {highlights.map((item) => {
              const Icon = iconMap[item.label] || Sparkles;
              return (
                <article key={item.label} className="glass card-hover rounded-lg p-5" data-reveal>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon size={21} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{item.label}</h3>
                      <p className="mt-1 text-sm text-white/45">{item.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Skills</span>
          <h2 className="heading-xl">Technical Arsenal</h2>
          <p className="body-muted mt-4">A curated set of technologies and domains I work with daily to build intelligent systems.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skillIconMap[skill.name] || Code2;
            return (
              <article key={skill.name} className="glass card-hover rounded-lg p-5" data-reveal>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent">
                      <Icon size={19} />
                    </div>
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                  </div>
                  <span className="font-mono text-xs text-white/35">{skill.category}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.from} ${skill.to}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-2 text-right font-mono text-xs text-white/35">{skill.level}%</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [openProject, setOpenProject] = useState(0);

  return (
    <section id="projects" className="section-shell">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Projects</span>
          <h2 className="heading-xl">Featured Work</h2>
          <p className="body-muted mt-4">Real-world AI solutions built with rigorous engineering and creative problem-solving.</p>
        </div>

        <div className="grid gap-5">
          {projects.map((project, index) => {
            const isOpen = openProject === index;
            const ProjectIcon = projectIconMap[project.title] || Sparkles;
            return (
              <article
                key={project.title}
                data-reveal
                className={`glass overflow-hidden rounded-lg transition duration-300 ${
                  isOpen ? "border-accent/35 shadow-glow" : "hover:border-white/20"
                }`}
              >
                <div className={`bg-gradient-to-r ${project.tone} p-6 sm:p-8`}>
                  <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                          <ProjectIcon size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white sm:text-2xl">{project.title}</h3>
                      </div>
                      <p className="body-muted mt-2">{project.problem}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
                        <Github size={17} />
                      </button>
                      <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
                        <ArrowUpRight size={17} />
                      </button>
                      <button
                        onClick={() => setOpenProject(isOpen ? -1 : index)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                        aria-label="Toggle project details"
                      >
                        {isOpen ? <X size={17} /> : <MessageSquare size={17} />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/60">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {isOpen && (
                  <div className="grid gap-5 border-t border-white/10 p-6 sm:grid-cols-2 sm:p-8">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">Problem</h4>
                      <p className="body-muted mt-2">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">Impact</h4>
                      <p className="body-muted mt-2">{project.impact}</p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="experience" className="section-shell">
      <div className="mx-auto w-full max-w-4xl">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Journey</span>
          <h2 className="heading-xl">My Path</h2>
        </div>

        <div className="relative grid gap-6 before:absolute before:left-5 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-gradient-to-b before:from-accent before:to-transparent sm:before:left-6">
          {journey.map((item) => (
            <article
              key={`${item.year}-${item.title}`}
              className="relative grid grid-cols-[44px_1fr] gap-4 sm:grid-cols-[52px_1fr]"
              data-reveal
            >
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-accent/35 bg-surface font-mono text-xs font-bold text-accent sm:h-12 sm:w-12">
                {item.year === "Present" ? "Now" : item.year.slice(2)}
              </div>
              <div className="glass rounded-lg p-5">
                <p className="font-mono text-xs text-accent">{item.year} / {item.tag}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="body-muted mt-2">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Content() {
  return (
    <section id="content" className="section-shell">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Content</span>
          <h2 className="heading-xl">Creator Side</h2>
          <p className="body-muted mt-4">Sharing knowledge and building community at the intersection of AI, technology, and storytelling.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contentCards.map((card) => {
            const Icon = contentIconMap[card.title] || Sparkles;
            return (
              <article key={card.title} className="glass card-hover rounded-lg p-6" data-reveal>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent/75">{card.stat}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="body-muted mt-2">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const isDisabled = useMemo(() => status === "sending", [status]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not send message");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      window.setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto w-full max-w-5xl">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="heading-xl">Get in Touch</h2>
          <p className="body-muted mt-4">Have a project in mind, a question, or just want to connect? I'd love to hear from you.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-6">
            <div className="glass rounded-lg p-6" data-reveal>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={19} />
                </div>
                <div>
                  <p className="text-sm text-white/40">Email</p>
                  <p className="font-semibold text-white">aquib@iitm.ac.in</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/10 text-mint">
                  <MapPin size={19} />
                </div>
                <div>
                  <p className="text-sm text-white/40">Location</p>
                  <p className="font-semibold text-white">IIT Madras, Chennai</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-6" data-reveal>
              <span className="eyebrow">Connect</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {socials.map((social) => {
                  const Icon = iconMap[social.label] || ArrowUpRight;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm font-semibold text-white/55 transition hover:bg-accent/10 hover:text-accent"
                    >
                      <Icon size={16} />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass grid gap-5 rounded-lg p-6 sm:p-8" data-reveal>
            {status === "sent" && (
              <div className="rounded-lg border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-emerald-100">
                Message sent successfully.
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <label className="grid gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Name
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                required
                disabled={isDisabled}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-sans text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10 disabled:opacity-50"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                required
                disabled={isDisabled}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-sans text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10 disabled:opacity-50"
                placeholder="you@email.com"
              />
            </label>

            <label className="grid gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                required
                disabled={isDisabled}
                rows={5}
                className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-sans text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10 disabled:opacity-50"
                placeholder="Tell me about your project or idea..."
              />
            </label>

            <button
              type="submit"
              disabled={isDisabled}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-bold text-surface transition hover:bg-cyan-200 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={17} />
              {isDisabled ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-white/35 sm:flex-row sm:text-left">
        <p>Aquib - ML Engineer at IIT Madras</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.slice(0, 3).map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition hover:text-accent">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Content />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
