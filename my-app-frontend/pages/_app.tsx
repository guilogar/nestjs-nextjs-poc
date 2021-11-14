import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { withStyles } from '@mui/styles';

import theme from '../src/theme';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>PoC</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

const styles: any = (theme: any) => ({});

export default withStyles(styles)(MyApp);
