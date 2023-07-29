import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celoAlfajores, celo } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider } = configureChains(
  [celoAlfajores, celo],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://celo-alfajores.infura.io/v3/49c0ef025a9a4290894e3c76c1ce8e66",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "WasteInsured",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
