import { ArrowRight } from '@phosphor-icons/react';

const Footer = () => {
    return (
        <footer id="contacto" className="pt-32 pb-10 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden">
            <div className="w-full text-center flex flex-col items-center">
                <h2 className="text-[12vw] md:text-[8vw] font-display font-black uppercase tracking-tighter leading-[0.8] mb-12 scroll-anim-footer opacity-0 translate-y-10">
                    Inicia la<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 filter drop-shadow-[0_0_20px_rgba(124,58,237,0.18)]">Secuencia</span>
                </h2>
                
                <div className="mt-8">
                    <a href="https://wa.me/528331119884" className="scroll-anim-footer opacity-0 translate-y-10 group relative inline-flex items-center justify-center px-12 py-6 md:px-16 md:py-8 font-bold text-white transition-all duration-300 bg-purple-600 rounded-full hover:bg-[#6D28D9] hover:scale-105 interactive-hover overflow-hidden shadow-lg shadow-[#7C3AED]/20">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#0a0a0a] rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                        <span className="relative flex items-center gap-4 text-xl md:text-3xl font-display uppercase tracking-wider">WhatsApp <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" /></span>
                    </a>
                </div>
            </div>
            
            <div className="w-full mt-40 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/60 font-mono border-t border-white/10 pt-8">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
                    <p>DISPONIBLE PARA NUEVOS PROYECTOS</p>
                </div>
                <p>© {new Date().getFullYear()} OSCAR LARA / AUREUS.</p>
                <div className="flex gap-8">
                    <a href="https://github.com/oscarlaradev" className="hover:text-purple-400 transition-colors interactive-hover underline underline-offset-4" target="_blank" rel="noreferrer">GITHUB</a>
                    <a href="https://www.facebook.com/profile.php?id=100084211045756" className="hover:text-[#A855F7] transition-colors interactive-hover underline underline-offset-4" target="_blank" rel="noreferrer">FACEBOOK</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;