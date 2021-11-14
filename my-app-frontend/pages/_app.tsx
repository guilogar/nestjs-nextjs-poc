import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import React from "react";
import Head from "next/head";

import { isSigned } from "../src/services/is-signed";
import { availablePathWithoutLogin } from "../src/services/available-paths-without-login";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import theme from "../src/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLog, setIsLog] = useState<Boolean>(isSigned());
  const router = useRouter();

  useEffect(() => {
    if (!isLog) {
      if (!availablePathWithoutLogin(router.pathname)) {
        router.push("/login");
      }
    } else {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <Head>
        <title>We-Chat</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/*
            CssBaseline kickstart an elegant, consistent,
            and simple baseline to build upon.
          */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

const styles: any = (theme: any) => ({});

export default withStyles(styles)(MyApp);
