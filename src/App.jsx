import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SiteFrame from './layouts/SiteFrame.jsx';
import HomePage from './pages/HomePage.jsx';
import ArchivePage from './pages/ArchivePage.jsx';
import StackPage from './pages/StackPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SiteFrame />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/archivo" element={<ArchivePage />} />
                    <Route path="/stack" element={<StackPage />} />
                    <Route path="/contacto" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;