import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BrainCircuit, BriefcaseBusiness, Code2, Github, GraduationCap, Linkedin, Mail, ShieldCheck, Sparkles, Star, TerminalSquare, Zap } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import { certifications, learningInterests, profile, projects, skillGroups, socialLinks, typingWords } from './data/profile';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg', theme === 'dark' ? '#070B16' : '#f8fafc');
    root.style.setProperty('--bg-secondary', theme === 'dark' ? '#0B1220' : '#e2e8f0');
    root.style.setProperty('--card', theme === 'dark' ? '#101A2D' : '#ffffff');
    root.style.setProperty('--card-strong', theme === 'dark' ? 'rgba(16, 26, 45, 0.92)' : 'rgba(255,255,255,0.9)');
    root.style.setProperty('--text', theme === 'dark' ? '#F8FAFC' : '#0f172a');
    root.style.setProperty('--muted', theme === 'dark' ? '#94A3B8' : '#475569');
    root.style.setProperty('--cyan', '#00E5FF');
    root.style.setProperty('--violet', '#8B5CF6');
    root.style.setProperty('--blue', '#3B82F6');
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0% -50% 0%', threshold: 0.15 },
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[90] h-1 w-full bg-slate-900/80">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <Routes>
        <Route path="/" element={<PortfolioView theme={theme} setTheme={setTheme} activeSection={activeSection} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

type PortfolioViewProps = {
  theme: 'dark' | 'light';
  setTheme: (value: 'dark' | 'light') => void;
  activeSection: string;
  selectedProject: (typeof projects)[number] | null;
  setSelectedProject: (project: (typeof projects)[number] | null) => void;
};

function PortfolioView({ theme, setTheme, activeSection, selectedProject, setSelectedProject }: PortfolioViewProps) {
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex % typingWords.length];
    const typingDelay = isDeleting ? 60 : 110;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const updated = currentWord.slice(0, typedText.length + 1);
        setTypedText(updated);
        if (typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 950);
        }
      } else {
        const updated = currentWord.slice(0, typedText.length - 1);
        setTypedText(updated);
        if (typedText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <div className="relative overflow-x-hidden" style={{ color: 'var(--text)', background: 'var(--bg)' }}>
      <div className="pointer-events-none fixed inset-0 opacity-50" aria-hidden="true">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar activeSection={activeSection} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <main>
          <section id="home" className="section-shell relative flex min-h-screen items-center pb-16 pt-28 sm:pt-32">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="mb-6 flex flex-wrap gap-3">
                  {['BCA Student', 'AI & ML Enthusiast', 'Smart India Hackathon 2025 Participant'].map((badge) => (
                    <span key={badge} className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium tracking-[0.16em] text-cyan-200 uppercase">
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
                  {profile.heroTitle}
                </h1>

                <div className="mt-6 text-2xl font-semibold text-slate-200 sm:text-3xl">
                  <span className="gradient-text">{typedText || 'Aspiring AI/ML Engineer'}</span>
                  <span className="ml-2 inline-block h-8 w-2 animate-pulse bg-cyan-300 align-middle" />
                </div>

                <h2 className="mt-4 text-xl font-medium tracking-[0.05em] text-cyan-300 sm:text-2xl">
                  {profile.heroTagline}
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{profile.intro}</p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-neon transition hover:-translate-y-0.5">
                    Explore My Projects <ArrowRight size={16} />
                  </a>
                  <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-500/20">
                    <Linkedin size={16} /> Connect With Me
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan-500/20">
                    <Linkedin size={18} />
                  </a>
                  <a href={socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:text-white">
                    <Github size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
                <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 shadow-2xl">
                  <div className="grid-fade absolute inset-0 opacity-30" />
                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Profile</div>
                        <div className="mt-3 text-xl font-semibold text-white">{profile.name}</div>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-xl font-black text-slate-950">FA</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        ['AI', 'Research'],
                        ['ML', 'Models'],
                        ['Dev', 'Build'],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                          <div className="text-lg font-bold text-cyan-300">{label}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-xs uppercase tracking-[0.28em] text-cyan-300">System vision</div>
                        <Sparkles className="text-cyan-300" size={18} />
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-cyan-300">
                              <BrainCircuit size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white">Neuron {item}</div>
                              <div className="mt-1 h-2 w-24 rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" style={{ width: `${60 + item * 10}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">About me</p>
              <h2 className="section-title mt-4">Beyond Code. Driven by Curiosity.</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="glass-panel rounded-[2rem] p-8">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-slate-950 shadow-neon">
                  <Code2 size={28} />
                </div>
                <p className="text-lg leading-8 text-slate-300">
                  I’m Fiza Ahmed, a second-year BCA student at Integral University, specializing in Artificial Intelligence and Machine Learning.
                </p>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  My journey in technology is driven by curiosity, creativity, and a passion for understanding how intelligent systems work.
                </p>
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-cyan-200">
                  <Linkedin size={18} />
                  <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-4 hover:underline">Connect on LinkedIn</a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel rounded-[2rem] p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InfoCard icon={<GraduationCap size={20} />} label="Education" value="BCA (AI & ML)" />
                    <InfoCard icon={<BriefcaseBusiness size={20} />} label="Status" value="Second Year" />
                    <InfoCard icon={<Star size={20} />} label="University" value="Integral University" />
                    <InfoCard icon={<ShieldCheck size={20} />} label="Hackathon" value="SIH 2025" />
                  </div>
                </div>

                <div className="glass-panel rounded-[2rem] p-8 text-slate-300">
                  <p>
                    I enjoy exploring programming languages, software development, artificial intelligence, and emerging technologies.
                  </p>
                  <p className="mt-4">
                    Participating in Smart India Hackathon 2025 provided me with an opportunity to explore real-world problem statements and work on innovative software solutions, including an AI-based face recognition attendance system and URL-based phishing detection software.
                  </p>
                  <p className="mt-4">
                    I believe that continuous learning, practical experience, and creative thinking are the keys to becoming a successful technology professional.
                  </p>
                  <p className="mt-4">
                    My goal is to keep learning, building, and contributing to meaningful technological innovations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="education" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Education</p>
              <h2 className="section-title mt-4">Academic Journey</h2>
            </div>

            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 md:left-1/2" />

              <div className="space-y-10">
                <TimelineItem side="left" year="2025–2028" title="Bachelor of Computer Applications (BCA)" subtitle="Integral University, Lucknow" detail="Specialization: Artificial Intelligence and Machine Learning • Status: Currently Pursuing – Second Year" />
                <TimelineItem side="right" year="2024" title="Class 12" subtitle="CBSE Board" detail="Completed in 2024" />
                <TimelineItem side="left" year="2022" title="Class 10" subtitle="CBSE Board" detail="Completed in 2022" />
              </div>
            </div>
          </section>

          <section id="skills" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Skills</p>
              <h2 className="section-title mt-4">Technical Skills Dashboard</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="glass-panel rounded-[1.75rem] p-6">
                  <div className="mb-5 flex items-center gap-3 text-cyan-300">
                    <Zap size={18} />
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Projects</p>
              <h2 className="section-title mt-4">Hackathon Experience & Innovation</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -6 }}
                  className="glass-panel group overflow-hidden rounded-[2rem]"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${project.accent === 'cyan' ? 'from-cyan-400 via-blue-500 to-violet-500' : project.accent === 'violet' ? 'from-violet-500 via-purple-500 to-cyan-400' : 'from-blue-500 via-cyan-500 to-violet-500'}`} />
                  <div className="p-6">
                    <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                      {project.event}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-300">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">{tag}</span>
                      ))}
                    </div>
                    <button type="button" onClick={() => setSelectedProject(project)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="certifications" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Certifications</p>
              <h2 className="section-title mt-4">Learning Milestones</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-1">
              {certifications.map((cert) => (
                <div key={cert.title} className="glass-panel rounded-[2rem] p-6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-slate-950 shadow-neon">
                        <Award size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{cert.title}</h3>
                        <p className="mt-1 text-slate-300">{cert.organization}</p>
                        <p className="mt-1 text-sm text-slate-400">Completed: {cert.completionDate}</p>
                      </div>
                    </div>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
                        View Certificate <ArrowRight size={16} />
                      </a>
                    ) : (
                      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400">Certificate coming soon</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="learning" className="section-shell py-24">
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Interests</p>
              <h2 className="section-title mt-4">Learning Today. Building Tomorrow.</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {learningInterests.map((item) => (
                <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="section-shell py-24">
            <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Connect</p>
                  <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">Let’s Connect, Collaborate &amp; Create Something Amazing.</h2>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                    Have an interesting idea, a project opportunity, or simply want to talk about technology? I’d love to connect with you. Feel free to reach out to me through LinkedIn!
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-neon transition hover:-translate-y-0.5">
                      <Linkedin size={18} /> Connect With Me on LinkedIn
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-cyan-200">
                      <Linkedin size={16} /> LinkedIn
                    </a>
                    {socialLinks.email ? (
                      <a href={`mailto:${socialLinks.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        <Mail size={16} /> Email
                      </a>
                    ) : null}
                    {socialLinks.github ? (
                      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        <Github size={16} /> GitHub
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6">
                  <div className="mb-4 flex items-center gap-3 text-cyan-300">
                    <TerminalSquare size={18} />
                    <span className="text-sm uppercase tracking-[0.2em]">Profile snapshot</span>
                  </div>
                  <div className="space-y-4 text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Current focus</div>
                      <div className="mt-2 text-lg font-semibold text-white">AI &amp; ML exploration</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Academic path</div>
                      <div className="mt-2 text-lg font-semibold text-white">BCA • Integral University</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Primary connection</div>
                      <div className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-cyan-200">
                        <Linkedin size={18} /> LinkedIn
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-cyan-300">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
    </div>
  );
}

function TimelineItem({ side, year, title, subtitle, detail }: { side: 'left' | 'right'; year: string; title: string; subtitle: string; detail: string }) {
  const isLeft = side === 'left';
  return (
    <div className={`relative md:flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className="md:w-1/2 md:px-8">
        <div className={`glass-panel rounded-[1.75rem] p-6 ${isLeft ? 'md:mr-6' : 'md:ml-6'}`}>
          <div className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            {year}
          </div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-lg text-slate-200">{subtitle}</p>
          <p className="mt-3 text-slate-300">{detail}</p>
        </div>
      </div>
      <div className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-slate-950 bg-gradient-to-r from-cyan-400 to-violet-500 md:left-1/2 md:-translate-x-1/2" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_30%),_radial-gradient(circle_at_bottom,_rgba(139,92,246,0.18),_transparent_30%),_#070B16] px-4">
      <div className="glass-panel max-w-lg rounded-[2rem] p-10 text-center">
        <div className="mb-4 text-6xl font-black gradient-text">404</div>
        <h1 className="text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-slate-300">The page you are looking for doesn’t exist, but the journey continues.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
          Go back home <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default App;
