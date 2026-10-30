import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { socialLinks } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">Fiza Ahmed</div>
            <p className="mt-2 text-slate-300">Designed &amp; Developed by Fiza Ahmed.</p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan-500/20"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={socialLinks.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:text-white"
            >
              <Github size={18} />
            </a>
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 transition hover:-translate-y-0.5 hover:bg-violet-500/20"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 text-center text-sm text-slate-400">
          © {year} Fiza Ahmed. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
