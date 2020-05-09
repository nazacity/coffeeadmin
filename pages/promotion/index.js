import React from 'react';

// framer motion
import { motion } from 'framer-motion';

const Promotion = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      promotion
    </motion.div>
  );
};

export default Promotion;
