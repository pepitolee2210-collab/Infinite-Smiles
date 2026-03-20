import React, { useState } from 'react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    service: 'Estética Dental',
    date: '',
  });

  const WHATSAPP_NUMBER = "1234567890"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, deseo iniciar mi transformación dental.
*Nombre:* ${formData.name}
*Tratamiento:* ${formData.service}
*Fecha deseada:* ${formData.date}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="citas" className="py-24 sm:py-32 bg-ink text-cream rounded-t-[2rem] sm:rounded-t-[3rem] mt-12 sm:mt-20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light leading-[0.9] mb-6 sm:mb-8 relative z-10">
              Inicia tu <br/><span className="italic text-terracotta">Transformación</span>
            </h2>
            <p className="text-cream/60 font-light max-w-md text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 relative z-10">
              Déjanos tus datos y nuestro concierge se pondrá en contacto contigo vía WhatsApp para coordinar tu visita en un horario exclusivo para ti.
            </p>

            <motion.div 
              className="absolute -bottom-10 -right-4 sm:-bottom-20 sm:-right-10 w-48 h-64 sm:w-64 sm:h-80 rounded-2xl overflow-hidden opacity-20 md:opacity-100 hidden sm:block"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1598256989800-fea5f6c810fd?q=80&w=600&auto=format&fit=crop"
                alt="Dental care"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-plum/20 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8 sm:space-y-12 bg-cream/5 p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-cream/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="border-b border-cream/20 pb-3 sm:pb-4 relative group">
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu Nombre" 
                className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif outline-none placeholder:text-cream/30 transition-colors focus:placeholder:text-cream/10" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-terracotta transition-all duration-500 group-focus-within:w-full"></div>
            </div>
            
            <div className="border-b border-cream/20 pb-3 sm:pb-4 relative group">
              <select 
                name="service" 
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif outline-none text-cream/80 appearance-none cursor-pointer"
              >
                <option value="Estética Dental" className="bg-ink text-base sm:text-lg">Estética Dental</option>
                <option value="Ortodoncia Invisible" className="bg-ink text-base sm:text-lg">Ortodoncia Invisible</option>
                <option value="Implantología" className="bg-ink text-base sm:text-lg">Implantología</option>
                <option value="Consulta de Valoración" className="bg-ink text-base sm:text-lg">Consulta de Valoración</option>
              </select>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-terracotta transition-all duration-500 group-focus-within:w-full"></div>
            </div>
            
            <div className="border-b border-cream/20 pb-3 sm:pb-4 relative group">
              <input 
                type="date" 
                name="date" 
                required 
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif outline-none text-cream/80 appearance-none cursor-pointer" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-terracotta transition-all duration-500 group-focus-within:w-full"></div>
            </div>
            
            <MagneticButton 
              type="submit" 
              className="w-full py-4 sm:py-6 rounded-full bg-terracotta text-ink text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:bg-cream transition-colors duration-500"
            >
              Solicitar Cita por WhatsApp
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
