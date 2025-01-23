import { Page } from "./components/Page"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  return (
    <div className="relative bg-[#1C2936] h-screen w-screen text-white text-2xl">
      <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Page/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App