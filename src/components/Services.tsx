import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { animate, stagger } from 'animejs';

const services = [
  { title: 'Estética Dental', desc: 'Carillas y blanqueamiento para una sonrisa perfecta, diseñada a medida.', colSpan: 'col-span-1 md:col-span-2', bg: 'bg-sand', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop', tint: 'bg-pink/30' },
  { title: 'Ortodoncia Invisible', desc: 'Alineación discreta, cómoda y altamente efectiva.', colSpan: 'col-span-1', bg: 'bg-terracotta-light', img: null },
  { title: 'Implantología', desc: 'Recupera la funcionalidad y estética con tecnología 3D.', colSpan: 'col-span-1', bg: 'bg-ink text-cream', img: null },
  { title: 'Armonización Orofacial', desc: 'Equilibrio estético del rostro y la sonrisa para resaltar tu belleza natural.', colSpan: 'col-span-1 md:col-span-2', bg: 'bg-white', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop', tint: 'bg-teal/30' },
];

function ServiceCard({ service, index }: { service: any, index: number, key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={cardRef}
      className={`bento-item rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between group overflow-hidden relative ${service.colSpan} ${service.bg}`}
      style={{ opacity: 0 }}
    >
      {service.img && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            style={{ y, scale: 1.1 }}
            src={service.img} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out" 
            referrerPolicy="no-referrer" 
          />
          <div className={`absolute inset-0 ${service.tint} mix-blend-overlay transition-opacity duration-500`} />
        </div>
      )}
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4">{service.title}</h3>
        <p className="font-light opacity-80 max-w-xs text-base sm:text-lg">{service.desc}</p>
      </div>
      <div className="relative z-10 mt-8 sm:mt-auto flex justify-end">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-current flex items-center justify-center group-hover:bg-current group-hover:text-cream transition-all duration-500">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js staggered reveal for the grid items when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate('.bento-item', {
            translateY: [100, 0],
            opacity: [0, 1],
            ease: 'outExpo',
            duration: 1200,
            delay: stagger(150)
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light leading-none">
          Nuestra <br/><span className="italic text-terracotta">Especialidad</span>
        </h2>
        <p className="max-w-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-ink/60">
          Tratamientos diseñados a medida, combinando arte, ciencia y tecnología de vanguardia.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[300px] sm:auto-rows-[350px]">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
