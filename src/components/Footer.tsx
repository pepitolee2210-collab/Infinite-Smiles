import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-20 border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-serif italic mb-6 text-terracotta">IS.</h3>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs font-light">
              Redefiniendo la experiencia dental. Un espacio donde la ciencia médica se encuentra con la estética y el confort absoluto.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-cream/60 font-light">
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-terracotta" />
                +1 (234) 567-890
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-terracotta" />
                Av. Principal 123, Ciudad Médica
              </li>
              <li className="flex items-center gap-4">
                <Clock className="w-4 h-4 text-terracotta" />
                Lun - Vie: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Enlaces</h3>
            <ul className="space-y-3 text-sm text-cream/60 font-light">
              <li><a href="#inicio" className="hover:text-terracotta transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-terracotta transition-colors">Especialidades</a></li>
              <li><a href="#citas" className="hover:text-terracotta transition-colors">Reservar</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cream/10 mt-16 pt-8 text-center text-xs text-cream/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Infinite Smiles - Dra. Claudia Neyra. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
