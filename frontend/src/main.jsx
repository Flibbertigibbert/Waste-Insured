import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../polyfills.js'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, celo, celoAlfajores, celoCannoli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'


const {chains, publicClient} = configureChains(
  [mainnet, polygon, celo, celoAlfajores, celoCannoli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "WasteInsured",
  projectId: "0.1.0",
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true, // connect wallet on page load 
  connectors,
  publicClient,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer position='bottom-center' />
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>,
)
