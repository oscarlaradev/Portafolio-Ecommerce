import { Link, NavLink } from 'react-router-dom';
import { List } from '@phosphor-icons/react';

const Navbar = () => {
    const linkClass = ({ isActive }) => [
        'group rounded-full px-4 py-2 transition-all duration-300 border shadow-sm',
        isActive ? 'border-white/10 bg-[#0a0a0a] text-white' : 'border-transparent text-gray-400 hover:bg-[#0a0a0a] hover:text-purple-400',
    ].join(' ');

    return (
        <nav className="fixed top-0 w-full px-6 md:px-12 lg:px-24 py-8 flex justify-between items-center z-50 pointer-events-none">
            <Link to="/" className="font-display font-bold text-2xl tracking-tighter uppercase interactive-hover pointer-events-auto text-white">
                Oscar Lara <span className="text-purple-400">.</span>
            </Link>
            <div className="hidden md:flex gap-4 text-sm uppercase tracking-widest font-medium pointer-events-auto text-white items-center">
                <NavLink to="/archivo" className={linkClass}><span className="block">Exhibición</span></NavLink>
                <NavLink to="/stack" className={linkClass}><span className="block">Stack</span></NavLink>
                <NavLink to="/contacto" className={linkClass}><span className="block">Contacto</span></NavLink>
            </div>
            <button className="md:hidden interactive-hover pointer-events-auto text-white text-3xl">
                 <List weight="bold" />
            </button>
        </nav>
    );
};

export default Navbar;