import React from "react"

import '../styles/globals.css'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import {alchemyProvider} from 'wagmi/providers/alchemy'
import {publicProvider} from 'wagmi/providers/public'

import {MetaMaskConnector} from 'wagmi/connectors/metaMask'

import NavbarContainer from '../src/components/Navbar'

function MyApp({Component, pageProps}) {

  const {chains, provider, webSocketProvider} = configureChains(defaultChains, [
    alchemyProvider({apiKey: 'CaDXn1g7zGJvM8WOLJeAMA8MM_u1-CMV'}),
    publicProvider(),
  ]);

  
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({chains}),
    ],
    provider,
    webSocketProvider,
  });

  React.useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, []);

  return (
    <WagmiConfig client={client}>
      <NavbarContainer />
      <div className="container mx-auto flex flex-grow items-center justify-between ">
        <Component {...pageProps} />
      </div>
    </WagmiConfig>
  )
}

export default MyApp
