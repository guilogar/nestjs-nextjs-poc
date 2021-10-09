import type { NextPage } from 'next'
import Head from 'next/head'

import { useState } from 'react'

import Home from './Home/home'
import Login from './Login/login'
import Nav from '../components/nav'
import Alert from '../components/alert'

const App: NextPage = () => {
  const [isSigned, setIsSigned] = useState<Boolean>(false);

  return (
    <>
      <Head>
        <title>We Chat App Example</title>

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link 
          href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet" />
      </Head>

      <div className={`app-container ${isSigned ? 'bg-light' : ''}`}>
        <Nav />
        <Alert />
        {
          isSigned
          &&
          <Home />
        }
        {
          !isSigned
          &&
          <Login />
        }
      </div>
    </>
  )
}

export default App