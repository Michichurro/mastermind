import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SiteLayout from './layout/SiteLayout';
import Home from './pages/Home';
import Trabajo from './pages/Trabajo';
import Estudio from './pages/Estudio';
import Contacto from './pages/Contacto';
import BrandSoulPage from './pages/BrandSoulPage';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Site pages with Navbar + Footer */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trabajo" element={<Trabajo />} />
          <Route path="/estudio" element={<Estudio />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Brand Soul — full-screen, no site chrome */}
        <Route path="/brand-soul" element={<BrandSoulPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
