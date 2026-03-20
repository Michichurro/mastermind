import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' },
};

const SiteLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen text-[var(--color-text)] selection:bg-white/30 bg-[var(--color-bg)]">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

      <Navbar />

      <motion.main
        key={location.pathname}
        className="relative z-10"
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default SiteLayout;
