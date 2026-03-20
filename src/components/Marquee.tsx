import { motion } from 'motion/react';

export default function Marquee() {
  const text = "ESTÉTICA DENTAL • ORTODONCIA INVISIBLE • IMPLANTOLOGÍA • ARMONIZACIÓN OROFACIAL • ";
  
  return (
    <div className="w-full overflow-hidden bg-cream py-10 flex whitespace-nowrap -rotate-2 scale-110 origin-center border-y border-ink/5 my-20">
      <motion.div
        className="flex space-x-8"
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-8">
            <span className="text-6xl md:text-8xl font-serif font-light tracking-wide text-transparent" style={{ WebkitTextStroke: '1px rgba(20, 20, 20, 0.8)' }}>
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
