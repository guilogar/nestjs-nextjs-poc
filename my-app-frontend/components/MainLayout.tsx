import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import Topbar from './Topbar';
import Footer from './Footer';

import React from 'react';

import { withStyles } from '@mui/styles';

const styles: any = (theme: any) => ({});

Router.events.on('routeChangeStart', (url: string) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MainLayout extends React.Component<{
  children: any;
  title: string;
}> {
  render() {
    const { children, title } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Topbar></Topbar>
        {children}
        <Footer></Footer>
      </>
    );
  }
}

export default withStyles(styles)(MainLayout);
