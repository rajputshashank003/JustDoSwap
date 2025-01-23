import { VersionedTransaction } from "@solana/web3.js";
import axios from "axios";

export const jupApi = 'https://quote-api.jup.ag/v6/quote?';

export const quoteResponse = async (inputMint : String , outputMint : String, amount : Number, slippageBps : Number) => {
    try {
        const response = await axios.get(jupApi + "inputMint=" + inputMint + "&outputMint=" + outputMint + '&amount=' + amount + '&slippageBps=' + slippageBps)
        return response.data;
    } catch (err : any) {
        console.log(err);
        return "not found" + err.message;
    }
};

export const swap = async (
  wallet: any, 
  quoteResponse: any, 
  connection: any
) => {
  try {
    const {
      data: { swapTransaction },
    } = await axios.post('https://quote-api.jup.ag/v6/swap', {
      quoteResponse,
      userPublicKey: wallet.publicKey?.toString(),
    });

    console.log("Received swapTransaction");
    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    console.log("Deserialized transaction:", transaction);

    const latestBlockHash = await connection.getLatestBlockhash();

    if (!wallet.signTransaction) {
      throw new Error("Wallet does not support signing transactions.");
    }

    const signedTransaction = await wallet.signTransaction(transaction);

    const rawTransaction = signedTransaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    });

    console.log(`Transaction sent: https://solscan.io/tx/${txid}`);

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid,
    });

    console.log("Transaction confirmed successfully!");
  } catch (error) {
    console.error("Error during swap transaction:", error);
  }
};