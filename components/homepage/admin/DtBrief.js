import React from 'react';

// Next
import Head from 'next/head';

// Framer
import { motion } from 'framer-motion';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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

const DtBrief = () => {
  const matches1250up = useMediaQuery('(min-width:1250px)');
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: matches1250up ? '1fr 1fr 1fr 1fr' : '1fr 1fr',
          gridGap: '2vw',
          padding: '2vw',
        }}
      >
        {briefData.map((data) => (
          <Card key={data.id}>
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

export default DtBrief;
