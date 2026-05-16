import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { animate } from 'animejs';

import Preloader from '../components/Preloader.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import Navbar from '../components/Navbar.jsx';

const seoByPath = {
    '/': {
        title: 'Venta de páginas web y sitios web profesionales | Oscar Lara',
        description: 'Diseño y desarrollo páginas web que venden: sitios web profesionales, rápidos y elegantes para captar clientes y elevar tu marca.',
        keywords: 'venta de páginas web, sitios web, desarrollo web profesional, páginas web que venden, diseñador web, sitio web profesional, landing page, páginas web para negocios',
    },
    '/archivo': {
        title: 'Portafolio de páginas web y sitios web profesionales | Oscar Lara',
        description: 'Explora proyectos de páginas web, interfaces editoriales y sitios web hechos para comunicar mejor, convertir mejor y verse impecables.',
        keywords: 'portafolio páginas web, sitios web profesionales, proyectos web, diseño web editorial, desarrollo web creativo',
    },
    '/stack': {
        title: 'Tecnología para crear páginas web rápidas y profesionales | Oscar Lara',
        description: 'Stack y procesos para construir sitios web rápidos, escalables y listos para vender más con una experiencia visual premium.',
        keywords: 'tecnología páginas web, sitios web rápidos, stack desarrollo web, rendimiento web, animaciones web, frontend profesional',
    },
    '/contacto': {
        title: 'Pide tu página web por WhatsApp | Oscar Lara',
        description: 'Escríbeme por WhatsApp para cotizar una página web, sitio web o landing page profesional orientada a captar clientes.',
        keywords: 'cotizar página web, pedir sitio web, página web por WhatsApp, desarrollo web para negocios, landing page profesional',
    },
};

const updateOrCreateMeta = (selector, createAttributes, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        Object.entries(createAttributes).forEach(([attribute, attributeValue]) => {
            element.setAttribute(attribute, attributeValue);
        });
        document.head.appendChild(element);
    }

    if ('content' in element && value !== undefined) {
        element.setAttribute('content', value);
    }

    return element;
};

const SiteFrame = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const routeSeo = seoByPath[location.pathname] ?? seoByPath['/'];
        const canonicalUrl = `${window.location.origin}${location.pathname}`;
        const socialImage = `${window.location.origin}/og-image.svg`;

        document.title = routeSeo.title;
        updateOrCreateMeta('meta[name="description"]', { name: 'description' }, routeSeo.description);
        updateOrCreateMeta('meta[name="keywords"]', { name: 'keywords' }, routeSeo.keywords);
        updateOrCreateMeta('meta[name="author"]', { name: 'author' }, 'Oscar Lara');
        updateOrCreateMeta('meta[name="robots"]', { name: 'robots' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
        updateOrCreateMeta('meta[property="og:title"]', { property: 'og:title' }, routeSeo.title);
        updateOrCreateMeta('meta[property="og:description"]', { property: 'og:description' }, routeSeo.description);
        updateOrCreateMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
        updateOrCreateMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
        updateOrCreateMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'Oscar Lara | Aureus');
        updateOrCreateMeta('meta[property="og:image"]', { property: 'og:image' }, socialImage);
        updateOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
        updateOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, routeSeo.title);
        updateOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, routeSeo.description);
        updateOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, socialImage);

        let canonicalLink = document.head.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);

        let jsonLdScript = document.head.querySelector('#seo-json-ld');
        if (!jsonLdScript) {
            jsonLdScript = document.createElement('script');
            jsonLdScript.setAttribute('id', 'seo-json-ld');
            jsonLdScript.setAttribute('type', 'application/ld+json');
            document.head.appendChild(jsonLdScript);
        }

        jsonLdScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Person',
                    '@id': `${window.location.origin}/#person`,
                    name: 'Oscar Lara',
                    jobTitle: 'Desarrollador web y diseñador UI',
                    url: window.location.origin,
                    sameAs: [
                        'https://github.com/oscarlaradev',
                        'https://www.facebook.com/profile.php?id=100084211045756',
                    ],
                },
                {
                    '@type': 'WebSite',
                    '@id': `${window.location.origin}/#website`,
                    name: 'Oscar Lara | Aureus',
                    url: window.location.origin,
                    description: 'Diseño y desarrollo páginas web que venden: sitios web profesionales, rápidos y elegantes para captar clientes y elevar tu marca.',
                    publisher: { '@id': `${window.location.origin}/#person` },
                    inLanguage: 'es-MX',
                },
                {
                    '@type': 'Service',
                    name: 'Venta de páginas web y sitios web profesionales',
                    serviceType: 'Diseño y desarrollo web',
                    provider: { '@id': `${window.location.origin}/#person` },
                    areaServed: 'MX',
                    description: 'Páginas web y sitios web profesionales orientados a captar clientes, comunicar valor y convertir visitas en contactos.',
                },
            ],
        });
    }, [location.pathname]);

    useEffect(() => {
        if (!isLoaded) return;

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            const progressEl = document.getElementById('scroll-progress');
            if (progressEl) progressEl.style.width = `${progress}%`;
        };

        const orbTargets = {
            orb1: { x: 0, y: 0 },
            orb2: { x: 0, y: 0 },
        };
        const orbGoals = {
            orb1: { x: 0, y: 0 },
            orb2: { x: 0, y: 0 },
        };
        let rafId = 0;

        const tickOrbs = () => {
            orbTargets.orb1.x += (orbGoals.orb1.x - orbTargets.orb1.x) * 0.08;
            orbTargets.orb1.y += (orbGoals.orb1.y - orbTargets.orb1.y) * 0.08;
            orbTargets.orb2.x += (orbGoals.orb2.x - orbTargets.orb2.x) * 0.08;
            orbTargets.orb2.y += (orbGoals.orb2.y - orbTargets.orb2.y) * 0.08;

            const orb1 = document.getElementById('orb1');
            const orb2 = document.getElementById('orb2');
            if (orb1) orb1.style.transform = `translate3d(${orbTargets.orb1.x}px, ${orbTargets.orb1.y}px, 0)`;
            if (orb2) orb2.style.transform = `translate3d(${orbTargets.orb2.x}px, ${orbTargets.orb2.y}px, 0)`;

            rafId = window.requestAnimationFrame(tickOrbs);
        };

        document.body.classList.remove('admin-mode');

        const handleMouseMove = (event) => {
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;
            orbGoals.orb1.x = x * 100;
            orbGoals.orb1.y = y * 100;
            orbGoals.orb2.x = x * -100;
            orbGoals.orb2.y = y * -100;
        };

        const revealIn = (element) => {
            animate(element, {
                translateY: [80, 0],
                opacity: [0, 1],
                duration: 900,
                ease: 'outQuart',
                delay: Number(element.dataset.delay || 0),
            });
        };

        const revealFooter = (element) => {
            animate(element, {
                translateY: [50, 0],
                opacity: [0, 1],
                scale: [0.96, 1],
                duration: 900,
                ease: 'outQuart',
                delay: Number(element.dataset.delay || 0),
            });
        };

        const resetReveal = (element) => {
            animate(element, {
                translateY: element.classList.contains('scroll-anim-footer') ? 48 : 72,
                opacity: 0,
                scale: element.classList.contains('scroll-anim-footer') ? 0.98 : 1,
                duration: 250,
                ease: 'outQuad',
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('scroll-anim')) {
                        revealIn(entry.target);
                    }

                    if (entry.target.classList.contains('scroll-anim-footer')) {
                        revealFooter(entry.target);
                    }
                } else {
                    if (entry.target.classList.contains('scroll-anim') || entry.target.classList.contains('scroll-anim-footer')) {
                        resetReveal(entry.target);
                    }
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        tickOrbs();
        handleScroll();

        const observeTargets = () => {
            observer.disconnect();
            document.querySelectorAll('.scroll-anim, .scroll-anim-footer').forEach((el) => resetReveal(el));
            document.querySelectorAll('.scroll-anim, .scroll-anim-footer').forEach((el) => observer.observe(el));
        };

        const observeTimer = window.setTimeout(observeTargets, 60);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
            window.cancelAnimationFrame(rafId);
            window.clearTimeout(observeTimer);
            observer.disconnect();
        };
    }, [isLoaded, location.pathname]);

    const backgroundStyles = useMemo(() => ({
        noise: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        },
        grid: {
            backgroundImage: 'linear-gradient(to right, rgba(124, 58, 237, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.08) 1px, transparent 1px)',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        },
    }), []);

    return (
        <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
            <div id="scroll-progress" className="fixed top-0 left-0 w-0 h-[3px] bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 z-[9999] transition-all duration-100"></div>
            <div className="fixed inset-0 z-[-2] pointer-events-none opacity-[0.03]" style={backgroundStyles.noise}></div>
            <div className="fixed inset-0 z-[-3] pointer-events-none bg-[length:50px_50px]" style={backgroundStyles.grid}></div>
            <div id="orb1" className="fixed rounded-full blur-[100px] opacity-25 z-[-4] pointer-events-none bg-purple-600 w-[40vw] h-[40vw] top-[-10%] left-[-10%]"></div>
            <div id="orb2" className="fixed rounded-full blur-[100px] opacity-30 z-[-4] pointer-events-none bg-blue-600 w-[30vw] h-[30vw] bottom-[-10%] right-[-5%]"></div>

            {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
            <CustomCursor />
            <Navbar />

            <main className={!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                <Outlet context={{ isLoaded }} />
            </main>
        </div>
    );
};

export default SiteFrame;