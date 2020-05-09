import React from 'react';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';
import MbClient from '../../components/client/MbClient';

const Client = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <MbClient />
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: '2vw' }}>
          <MbClient />
        </div>
      </Hidden>
    </motion.div>
  );
};

export default Client;
