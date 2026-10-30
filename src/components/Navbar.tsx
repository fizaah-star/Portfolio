import { Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { navItems, socialLinks } from '../data/profile';

type NavbarProps = {
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

export default function Navbar({ activeSection, theme, onToggleTheme }: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Fiza Ahmed home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-sm font-black text-slate-950 shadow-neon">
            FA
          </div>
          <span className="text-lg font-semibold tracking-[0.2em] text-white">FIZA</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition ${activeSection === item.href.slice(1) ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              )}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Fiza Ahmed on LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan-500/20"
          >
            <Linkedin size={18} />
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Fiza Ahmed on LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
          >
            <Linkedin size={16} />
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            aria-label="Toggle mobile navigation"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"
            onClick={() => {
              const menu = document.querySelector('[data-nav-mobile]');
              menu?.classList.toggle('hidden');
            }}
          >
            <Menu size={16} />
          </button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ opacity: 1, height: 'auto' }}
        data-nav-mobile
        className="hidden overflow-hidden border-t border-white/10 bg-slate-950/90 lg:hidden"
      >
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${activeSection === item.href.slice(1) ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
