import React, { useState } from 'react';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';

// Components
import DtReport from '../../components/report/DtReport';
import MbReport from '../../components/report/MbReport';

const OrderList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <DtReport />
      </Hidden>
      <Hidden mdUp>
        <MbReport />
      </Hidden>
    </motion.div>
  );
};

export default OrderList;
