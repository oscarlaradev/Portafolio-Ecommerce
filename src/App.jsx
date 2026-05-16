import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SiteFrame from './layouts/SiteFrame.jsx';
import AdminFrame from './layouts/AdminFrame.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import HomePage from './pages/HomePage.jsx';
import ArchivePage from './pages/ArchivePage.jsx';
import StackPage from './pages/StackPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;