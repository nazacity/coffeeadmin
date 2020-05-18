import React from 'react';
import { motion } from 'framer-motion';
import CreateBranch from '../../components/table/CreateBranch';

const Table = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CreateBranch />
    </motion.div>
  );
};

export default Table;
