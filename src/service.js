import { ethers, utils } from "ethers";

const contractABI = '[{"inputs":[{"internalType":"string","name":"_greetings","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getGreetings","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greetings","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
const contractAddress = '0x43637728518F88812A36Cec4A83FEADFd8d8198C'
const providerRPC = {
    bsc: {
        name: 'bsc',
        rpc: 'https://bsctestapi.terminet.io/rpc', // Insert your RPC URL here
        chainId: 97, // 0x504 in hex,
    },
};

const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.bsc.rpc,
    {
        chainId: providerRPC.bsc.chainId,
        name: providerRPC.bsc.name,
    }
)

export const getContractGreetingMessage = async () => {
    try{

    }catch(error){
        console.log("ERROR while reading the contract value ", error)
    }
}


export const getBalance = async (account) => {
    let balance = 0;
    try {
        balance = await provider.getBalance(account);
    } catch (error) {
        console.log(error);
    }
    balance = utils.formatEther(balance);
    return balance.toString();
}