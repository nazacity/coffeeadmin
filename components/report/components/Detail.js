import React, { useState, useEffect } from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Redux
import { useSelector } from 'react-redux';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

// Component
import BranchDetailItem from './BranchDetailItem';

const Detail = () => {
  const theme = useTheme();
  const branchs = useSelector((state) => state.store.branch);
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1200down = useMediaQuery('(max-width:1200px)');

  const [state, setState] = useState(0);

  const [rerender, setRerender] = useState(false);

  const handleChange = (event, value) => {
    setState(value);
  };

  const handleChangeIndex = (index) => {
    setState(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <React.Fragment>{children}</React.Fragment>}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Tabs value={state} variant="fullWidth" onChange={handleChange}>
        {branchs.map((branch) => (
          <Tab label={branch.branch} key={branch.id} />
        ))}
      </Tabs>
      {branchs.map((branch, i) => (
        <TabPanel key={branch.id} value={state} index={i}>
          <BranchDetailItem key={branch.id} branchId={branch.id} />
        </TabPanel>
      ))}
    </React.Fragment>
  );
};

export default Detail;
