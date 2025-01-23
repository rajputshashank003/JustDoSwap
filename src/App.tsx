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
            <div className="h-36 w-36 bg-[#C7F284] absolute top-1/2 left-1/2 transform-translate -translate-x-1/2 -translate-y-1/2"/>
            <Page/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App