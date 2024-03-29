import React from 'react';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import '../public/styles/nprogress.css';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '../apollo/apolloClient';

// Framer-motion
import { AnimatePresence } from 'framer-motion';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Next
import Head from 'next/head';
import { useRouter } from 'next/router';
import Router from 'next/router';

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import BottomNavbar from '../components/layouts/BottomNavbar';
import TopNavbar from '../components/layouts/TopNavbar';

// Toast
import { ToastProvider } from 'react-toast-notifications';

import NProgress from 'nprogress';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  const matches600down = useMediaQuery('(max-width:600px)');

  return (
    <React.Fragment>
      <Head>
        <title>Admin page with Line</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="./images/logo/logo.jpg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="description"
          content="ระบบ full system e-commerce รองรับการยืนยันตัวตนด้วย Line
              เพื่อเพิ่มความสะดวกสบายให้กับผู้ใช้งาน ทั้ง Admin และ Client
              ระบบออกแบบมาให้คล้ายกับ POS มีทั้งเว็บหน้าบ้าน สำหรับ โปรโมท โฆษณา
              สั่ง สินค้า/อาหาร ระบบตะกร้า ชำระเงินด้วย PAYMENY GATEWAY
              เว็บหลังบ้าน สำหรับจัดการสินค้า คลัง สรุปข้อมูล และอื่นๆ
              ทั้งยังมีระบบแจ้งเตือนลูกค้าด้วย LINE OA ให้ครบวงจร"
        />
      </Head>
      <ApolloProvider client={apollo}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ToastProvider
              placement={matches600down ? 'bottom-center' : 'top-center'}
              autoDismissTimeout={2000}
            >
              <React.Fragment>
                <Hidden smDown>
                  <TopNavbar />
                </Hidden>
                <AnimatePresence exitBeforeEnter>
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
                <Hidden mdUp>
                  <BottomNavbar />
                </Hidden>
              </React.Fragment>
            </ToastProvider>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default apolloClient(MyApp);
