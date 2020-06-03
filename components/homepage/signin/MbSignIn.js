import React from 'react';

// Framer motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  signinborder: {
    boxShadow: theme.common.shadow.black,
    padding: '10%',
    margin: '5%',
    backgroundImage:
      'linear-gradient(to right bottom, rgba(226, 158, 75, 0.3), rgba(132, 82, 21, 0.3)),url(/images/hero/mbhero.jpg)',
    borderRadius: '10px',
    backgroundSize: 'cover',
    height: '60vh',
  },
  logo: {
    width: '150px',
    height: '150px',
    margin: 'auto',
    boxShadow: theme.common.shadow.black,
  },
  loginbutton: {
    backgroundColor: '#00C300',
    border: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#00E000',
    },
    '&:focus': {
      backgroundColor: '#00B300',
    },
  },
  loginsubdetail: {
    fontSize: '16px',
  },
}));

const MbSignIn = () => {
  const classes = useStyles();

  const client_id = process.env.LINE_CLIENT_KEY;
  const redirect = process.env.LINE_REDIRECT_LINK;
  const scope = 'openid%20profile%20email';
  const state = 'coffeecafe';
  const lineloginlink = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=${state}&scope=${scope}`;

  return (
    <React.Fragment>
      <div className={classes.signinborder}>
        <div
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ marginTop: '10%', marginBottom: '30px' }}
          className="nav-logo"
        >
          <Avatar
            alt="line logo"
            src="./images/logo/logo.jpg"
            className={classes.logo}
          />
        </div>
        <motion.div
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ display: 'flex', justifyContent: 'center' }}
          whileTap={{ scale: 0.9 }}
        >
          <a href={lineloginlink} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.loginbutton}>
              <img
                src="./images/signin/linebutton.png"
                alt="linebutton"
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              />
              <span style={{ color: '#fff' }}>Log in with LINE</span>
            </Button>
          </a>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default MbSignIn;
