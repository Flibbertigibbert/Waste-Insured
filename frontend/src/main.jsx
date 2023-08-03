import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '../polyfills.js'
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celoAlfajores, celo } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ToastContainer } from "react-toastify";
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [celoAlfajores, celo],
  [publicProvider()],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  // [
  //   jsonRpcProvider({
  //     rpc: () => ({
  //       http: "https://celo-alfajores.infura.io/v3/49c0ef025a9a4290894e3c76c1ce8e66",
  //     }),
  //   }),
  // ]
);


const { connectors } = getDefaultWallets({
  appName: "WasteInsured",
  projectId: "0.1.0",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
      theme={lightTheme({
        accentColor: '#EFAE07',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'system',
      })}
      chains={chains}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);