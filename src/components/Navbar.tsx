import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'top-4' : 'top-8'}`}
    >
      <div className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-lg border border-ink/5 w-[95%] max-w-4xl' : 'bg-transparent w-full max-w-7xl'}`}>
        <div className="font-sans text-xl md:text-2xl font-extrabold tracking-tight flex gap-1">
          <span className="text-sand">Infi</span>
          <span className="text-terracotta-light">ni</span>
          <span className="text-terracotta">te</span>
          <span className="text-ink ml-1">Smiles</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors">Inicio</a>
          <a href="#servicios" className="text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors">Servicios</a>
          <a href="#citas" className="text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors">Citas</a>
        </div>

        <MagneticButton as="a" href="#citas" className="w-10 h-10 rounded-full border border-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors group">
          <svg className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
