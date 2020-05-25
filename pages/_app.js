import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '../apollo/apolloClient';

// Framer-motion
import { AnimatePresence } from 'framer-motion';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Next
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import BottomNavbar from '../components/layouts/BottomNavbar';
import TopNavbar from '../components/layouts/TopNavbar';

// Other
import NProgress from 'nprogress';

// Toast
import { ToastProvider } from 'react-toast-notifications';

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
        <link rel="stylesheet" type="text/css" href="/styles/nprogress.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/styles/SwipeableList.css"
        />
        <meta
          name="description"
          content="ระบบ full system e-commerce รองรับการยืนยันตัวตนด้วย Line
              เพื่อเพิ่มความสะดวกสบายให้กับผู้ใช้งาน ทั้ง Admin และ Client
              ระบบออกแบบมาให้คล้ายกับ POS มีทั้งเว็บหน้าบ้าน สำหรับ โปรโมท โฆษณา
              สั่ง สินค้า/อาหาร ระบบตะกร้า ชำระเงินด้วย PAYMENY GATEWAY
              เว็บหลังบ้าน สำหรับจัดการสินค้า คลัง สรุปข้อมูล และอื่นๆ
              ทั้งยังมีระบบแจ้งเตือนลูกค้าด้วย LINE OA ให้ครบวงจร"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald|Paprika|Roboto&display=swap"
          rel="stylesheet"
        ></link>
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

// MyApp.getInitialProps = async ({ ctx, router }) => {
//   if (process.browser) {
//     return __NEXT_DATA__.props.pageProps;
//   }
//   const { headers } = ctx.req;

//   const cookies = headers && cookie.parse(headers.cookie || '');

//   if (!accessToken) {
//     if (
//       router.pathname === '/client' ||
//       router.pathname === '/product' ||
//       router.pathname === '/report' ||
//       router.pathname === '/promotion' ||
//       router.pathname === '/employee'
//     ) {
//       ctx.res.writeHead(302, { Location: '/' });
//       ctx.res.end();
//       return null;
//     }
//   }

//   const accessToken = cookies && cookies.accessToken;

//   const uri = process.env.APOLLO_URL;
//   if (accessToken) {
//     const responseUser = await fetch(uri, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `${accessToken}` || '',
//       },
//       body: JSON.stringify(QUERY_USER),
//     });
//     const responeUsers = await fetch(uri, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `${accessToken}` || '',
//       },
//       body: JSON.stringify(QUERY_USERS),
//     });
//     if (responseUser.ok && responeUsers.ok) {
//       const user = await responseUser.json();
//       const users = await responeUsers.json();

//       return { user: user.data.user, client: users.data.users };
//     } else {
//       if (
//         router.pathname === '/client' ||
//         router.pathname === '/product' ||
//         router.pathname === '/report' ||
//         router.pathname === '/promotion' ||
//         router.pathname === '/employee'
//       ) {
//         ctx.res.writeHead(302, { Location: '/' });
//         ctx.res.end();
//         return null;
//       }
//       return null;
//     }
//   }
// };

export default apolloClient(MyApp);
