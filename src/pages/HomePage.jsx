import React from 'react';
import { useOutletContext } from 'react-router-dom';

import Hero from '../sections/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Exhibicion from '../sections/Exhibicion.jsx';
import Stack from '../sections/Stack.jsx';
import Footer from '../sections/Footer.jsx';

const HomePage = () => {
    const { isLoaded } = useOutletContext();

    React.useEffect(() => {
        // record visit
        fetch('/api/stats/record', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'visits', increment: 1, meta: JSON.stringify({ page: '/' }) }) }).catch(() => {});
    }, []);

    return (
        <>
            <Hero isLoaded={isLoaded} />
            <Marquee />
            <Exhibicion />
            <Stack />
            <Footer />
        </>
    );
};

export default HomePage;