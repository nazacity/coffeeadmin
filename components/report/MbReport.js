import React from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

// Components
import MbDatePicker from './components/MbDatePicker';
import Detail from './components/Detail';
import CatagoryBrief from './components/CatagoryBrief';
import ProductSale from './components/ProductSale';

const useStyles = makeStyles((theme) => ({}));

const MbReport = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <div style={{ padding: '2vw' }}>
        <MbDatePicker />
        <div style={{ marginTop: '2vh' }}>
          <CatagoryBrief />
        </div>
        <div style={{ margin: '2vh auto' }}>
          <Detail />
        </div>
        <div style={{ marginBottom: '10vh' }}>
          <ProductSale />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MbReport;
