import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

// Igra Network chain definition
export const igra = defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 69420),
  name: "Igra Network",
  nativeCurrency: { name: "iKAS", symbol: "iKAS", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc.igra.network"] },
  },
  blockExplorers: {
    default: {
      name: "Igra Explorer",
      url: process.env.NEXT_PUBLIC_EXPLORER_API ?? "https://explorer.igra.network",
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [igra],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_PROJECT_ID",
    }),
  ],
  transports: { [igra.id]: http() },
});
