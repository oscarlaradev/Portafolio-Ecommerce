import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SiteFrame from './layouts/SiteFrame.jsx';
import HomePage from './pages/HomePage.jsx';
import ArchivePage from './pages/ArchivePage.jsx';
import StackPage from './pages/StackPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Lazy loaded Admin routes to optimize public site bundle size
const AdminFrame = lazy(() => import('./layouts/AdminFrame.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="h-screen w-screen bg-[#050505] flex items-center justify-center text-white font-mono text-sm">Cargando...</div>}>
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminFrame />}>
                        <Route index element={<AdminPage />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Route>
                    <Route element={<SiteFrame />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/archivo" element={<ArchivePage />} />
                        <Route path="/stack" element={<StackPage />} />
                        <Route path="/contacto" element={<ContactPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;