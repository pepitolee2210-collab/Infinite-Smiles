import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const images = [
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", tint: "bg-pink/20" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop", tint: "bg-teal/20" },
  { src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop", tint: "bg-orange/20" },
  { src: "https://images.unsplash.com/photo-1598256989800-fea5f6c810fd?q=80&w=800&auto=format&fit=crop", tint: "bg-plum/20" },
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", tint: "bg-blue/20" }
];

export default function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-ink text-cream">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-6 lg:left-8 z-10 max-w-[90vw]">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-light">La Experiencia</h2>
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase mt-4 opacity-70">Un ambiente diseñado para tu confort</p>
        </div>
        
        <motion.div style={{ x }} className="flex gap-4 sm:gap-8 pl-[10vw] sm:pl-[20vw] md:pl-[40vw] mt-20">
          {images.map((img, index) => (
            <div key={index} className="group relative h-[45vh] w-[80vw] sm:h-[50vh] sm:w-[70vw] md:h-[60vh] md:w-[40vw] overflow-hidden rounded-2xl sm:rounded-3xl shrink-0">
              <motion.img 
                src={img.src} 
                alt={`Gallery image ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 ${img.tint} mix-blend-overlay transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
