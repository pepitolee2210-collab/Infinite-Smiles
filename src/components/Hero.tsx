import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { animate, createTimeline, random } from 'animejs';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    // Anime.js floating abstract blobs
    if (blobRef1.current) {
      animate(blobRef1.current, {
        translateX: () => random(-50, 50),
        translateY: () => random(-50, 50),
        scale: () => random(1, 1.2),
        rotate: () => random(-15, 15),
        ease: 'inOutSine',
        duration: 4000,
        direction: 'alternate',
        loop: true
      });
    }

    if (blobRef2.current) {
      animate(blobRef2.current, {
        translateX: () => random(-50, 50),
        translateY: () => random(-50, 50),
        scale: () => random(0.8, 1.1),
        rotate: () => random(-15, 15),
        ease: 'inOutQuad',
        duration: 5000,
        direction: 'alternate',
        loop: true
      });
    }

    // Anime.js staggered text reveal
    const letters = textRef.current?.querySelectorAll('.letter');
    if (letters && letters.length > 0) {
      createTimeline({ loop: false })
        .add(letters, {
          translateY: [100, 0],
          translateZ: 0,
          opacity: [0, 1],
          ease: "outExpo",
          duration: 1400,
          delay: (el, i) => 300 + 40 * i
        });
    }
  }, []);

  const title = "El arte de tu sonrisa";

  return (
    <section ref={containerRef} id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: imageY, opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0]) }} 
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop"
          alt="Dental aesthetics"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        <div className="absolute inset-0 bg-pink/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream to-cream"></div>
      </motion.div>

      {/* Abstract Background Blobs */}
      <div ref={blobRef1} className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-terracotta/30 rounded-full blur-2xl md:blur-3xl opacity-70 z-0" style={{ willChange: 'transform' }}></div>
      <div ref={blobRef2} className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[30rem] md:h-[30rem] bg-sand/40 rounded-full blur-2xl md:blur-3xl opacity-70 z-0" style={{ willChange: 'transform' }}></div>

      <motion.div style={{ y, opacity, scale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-ink/10 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/80 backdrop-blur-sm text-ink shadow-sm">
              Dra. Claudia Neyra • Infinite Smiles
            </span>
          </motion.div>

          <h1 ref={textRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-4 sm:mb-6 md:mb-8 overflow-hidden py-2 sm:py-4 text-ink">
            {title.split('').map((char, index) => (
              <span key={index} className="letter inline-block" style={{ opacity: 0, transform: 'translateY(100px)' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-sm sm:text-base md:text-xl text-ink/80 max-w-2xl font-medium mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4"
          >
            Odontología integral y estética. Un espacio amigable donde cuidamos de tu salud bucal con la mejor tecnología y calidez humana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton as="a" href="#citas" className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-ink text-cream rounded-full overflow-hidden transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">
                Reservar Experiencia
                <ArrowRight className="ml-3 sm:ml-4 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
