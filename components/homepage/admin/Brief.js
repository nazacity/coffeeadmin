import React from 'react';

// Framer
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  ActionAreaRoot: {
    padding: '0',
  },
}));

const briefData = [
  {
    id: 1,
    name: 'ประจำวัน',
    data: 3500,
    icon: <img src="./svg/coins.svg" alt="today" style={{ height: '50px' }} />,
    bgColor: '#f9fbe7',
  },
  {
    id: 2,
    name: 'ยอดรวม',
    data: 26500,
    icon: (
      <img src="./svg/suitcase.svg" alt="today" style={{ height: '50px' }} />
    ),
    bgColor: '#e0f7fa',
  },
  {
    id: 3,
    name: 'ลูกค้าประจำวัน',
    data: 36,
    icon: (
      <img src="./svg/business.svg" alt="today" style={{ height: '50px' }} />
    ),
    bgColor: '#fce4ec',
  },
  {
    id: 4,
    name: 'สมาชิกใหม่',
    data: 8,
    icon: <img src="./svg/login.svg" alt="today" style={{ height: '50px' }} />,
    bgColor: '#efebe9',
  },
];

const Brief = () => {
  const matches400down = useMediaQuery('(max-width:400px)');
  const classes = useStyles();
  return (
    <React.Fragment>
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: matches400down ? '1fr' : '1fr 1fr',
          gridGap: '2vw',
          padding: '2vw',
        }}
      >
        {briefData.map((data) => (
          <Card
            style={{
              width: matches400down ? '80%' : '100%',
              margin: matches400down ? 'auto' : undefined,
            }}
            key={data.id}
          >
            <CardActionArea>
              <Box
                display={'flex'}
                classes={{ root: classes.ActionAreaRoot }}
                style={{ height: 100 }}
              >
                <Box
                  p={2}
                  style={{
                    backgroundColor: data.bgColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 2vw',
                  }}
                >
                  {data.icon}
                </Box>
                <Box
                  p={2}
                  flex={'auto'}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography style={{ color: '#b4b4b4', marginBottom: '1vh' }}>
                    {data.name}
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {data.data}
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </motion.div>
    </React.Fragment>
  );
};

export default Brief;
