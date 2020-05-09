import React from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

// Components
import DtDatePicker from './components/DtDatePicker';
import Detail from './components/Detail';
import CatagoryBrief from './components/CatagoryBrief';
import ProductSale from './components/ProductSale';

const useStyles = makeStyles((theme) => ({}));

const DtReport = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <div
        style={{ maxWidth: theme.layer.maxWidth, width: '80%', margin: 'auto' }}
      >
        <DtDatePicker />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '2vh',
          }}
        >
          <CatagoryBrief />
          <Detail />
        </div>
        <div>
          <ProductSale />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DtReport;
