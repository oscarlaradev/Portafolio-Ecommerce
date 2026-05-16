import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth <= 768) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX, cursorY = mouseY;
        let followerX = mouseX, followerY = mouseY;
        let isHovering = false;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseEnter = () => {
             isHovering = true;
             if(cursorRef.current && followerRef.current) {
                 cursorRef.current.style.transform = `scale(0)`;
                 followerRef.current.style.transform = `scale(1.5)`;
                followerRef.current.style.backgroundColor = 'rgba(124, 58, 237, 0.08)';
                 followerRef.current.style.borderColor = 'transparent';
             }
        };

        const handleMouseLeave = () => {
             isHovering = false;
             if(cursorRef.current && followerRef.current) {
                 cursorRef.current.style.transform = `scale(1)`;
                 followerRef.current.style.transform = `scale(1)`;
                 followerRef.current.style.backgroundColor = 'transparent';
                followerRef.current.style.borderColor = 'rgba(124, 58, 237, 0.3)';
             }
        };

        document.addEventListener('mousemove', handleMouseMove);
        
        setTimeout(() => {
            const interactives = document.querySelectorAll('.interactive-hover, a, button');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        }, 1000);

        const renderCursor = () => {
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            if (cursorRef.current && followerRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${isHovering ? 0 : 1})`;
                followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px) scale(${isHovering ? 1.5 : 1})`;
            }

            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} id="custom-cursor" className="fixed top-0 left-0 w-3 h-3 bg-[#7C3AED] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"></div>
            <div ref={followerRef} id="cursor-follower" className="fixed top-0 left-0 w-10 h-10 border border-[#7C3AED]/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"></div>
        </>
    );
};

export default CustomCursor;