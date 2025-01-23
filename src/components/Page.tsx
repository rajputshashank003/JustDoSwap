import { useEffect, useState } from "react";
import { quoteResponse, swap } from "../Utils/swap"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { tokens } from "./tokens";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Swapper from "./Swapper";
import { setWalletIsHovered, walletButtonStyle } from "./WalletButtonStyle.ts";
import Title from "./Title.tsx";
import Footer from "./Footer.tsx";

export interface Token {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
}

export const Page = () => {
    const [inAmount , setInAmount] : any = useState();
    const [outAmount , setOutAmount] : any = useState();
    const [qResponse , setQResponse] : any = useState();
    const [inputMint , setInputMint] = useState(0);
    const [outputMint , setOutputMint] = useState(1);
    const [listShow , setListShow] = useState([false , 0]);
    const [balance , setBalance] = useState(0);

    const wallet = useWallet();
    const {connection} = useConnection();

    const handleChange = async (amount : number) => {

        if(!amount || amount <= 0) {
            setOutAmount(0);
            return ;
        }
        setInAmount(amount);
        const quote = await quoteResponse(tokens[inputMint].address, tokens[outputMint].address, amount, 0.5 * 100);
        console.log(quote); 
        setQResponse(quote);
        if(quote.outAmount){
            console.log(tokens[outputMint])
            setOutAmount(quote.outAmount / Math.pow(10 , tokens[outputMint].decimals));
        }
    }
    const handleSwap = async () => {
        await swap(wallet, qResponse, connection)
    }
    const handleInputMintShow = (type : number) => {
        setListShow(prev => [!prev[0], type]);
    }

    const handleMintChange = (ind : number) => {
        listShow[1] == 0 ? setInputMint(ind) : setOutputMint(ind);
    }
    
    const [walletIsHovered, setWalletIsHovered] = useState(false);
    const walletHoverStyle = walletIsHovered
    ? { border: "1px solid #C7F284" }
    : { border: "none" };

    const handleChangeInput = (e:any) => {
        handleChange(e.target.value * Math.pow(10, tokens[inputMint].decimals))
    }
    useEffect(() => {
        const getBalance = async () => {
          if (wallet?.publicKey) {
            try {
              const balance = await connection.getBalance(wallet.publicKey);
              setBalance(balance / Math.pow(10 ,tokens[inputMint].decimals));
            } catch (error) {
              console.error('Error getting balance:', error);
            }
          }
        };
        getBalance();
      }, [connection, wallet]);

    return (
        <div className=" h-screen w-screen flex justify-center items-center flex-col" >
            <Title/>
            {
                listShow[0] &&
                <div onClick={() => handleInputMintShow(0)} className="absolute z-[9999] bg-opacity-[0.6] transition-all duration-500 ease-out opacity-100 scale-100 bg-black flex justify-center items-center backdrop-blur-sm w-screen h-screen">
                    <ul className="max-h-[25rem] w-[16rem] bg-slate-800 rounded-xl p-2 text-white text-xl overflow-scroll no-scrollbar">
                        {
                            tokens.slice(0, 24).map((token, ind) => (
                                <li key={ind} className="flex cursor-pointer hover:bg-slate-700 rounded-xl duration-200 flex-row gap-4 m-2">
                                    <img className="h-[2rem] rounded-full" onClick={() => handleMintChange(ind)} src={token.logoURI} alt={`${token.name} logo`} />
                                    {token.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            <Swapper onChange={handleChangeInput} inAmount={inAmount} outAmount={outAmount} setInputMint={setInputMint} setOutputMint={setOutputMint} listShow={listShow} setListShow={setListShow} inputMint={inputMint} outputMint={outputMint}/>
            <div onMouseEnter={() => setWalletIsHovered(true)} onMouseLeave={() => setWalletIsHovered(false)} className="h-fit w-fit m-2 mb-10 sm:mb-16 relative mt-8">
                {
                    !wallet.publicKey ?
                    <WalletMultiButton style={{...walletButtonStyle , ...walletHoverStyle}}/>
                    :
                    <button disabled={balance == 0} onClick={handleSwap} className="p-0 font-bold text-6xl" style={{...walletButtonStyle , ...walletHoverStyle}}>
                        {balance == 0 ? "Insufficient Balance" : "Buy"}
                    </button>
                }
            </div>
            <Footer/>
        </div>
    )
}
