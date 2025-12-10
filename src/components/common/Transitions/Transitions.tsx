import { motion } from 'framer-motion';
import React from 'react';

export default function Transitions({ children }: { readonly children: React.ReactNode }) {
  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      transition={{ duration: 0.3 }}
      variants={animationConfiguration}
    >
      {children}
    </motion.div>
  );
}
