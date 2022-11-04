import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { getBalance } from './service';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';


const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97]
});


function App() {
  // metamask connection
  const [accountBalance, setAccountBalance] = useState(0.0)
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [isGreetingLoading, setIsGreetingLoading] = useState(false);
  const { activate, deactivate, active, chainId, account } = useWeb3React();

  // contract connection variables
  const [contractData, setContractData] = useState("");
  const Address = "0x2dF5D95c191603ADAd09De904d2FD9e29Fed3566";
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greetings",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getGreetings",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greetings",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // connect contract bsctest net functions
  const connectContract = async () => {
    let contract;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    return contract;
  }

  const getData = async () => {
    setIsGreetingLoading(true)

    try {
      let contract = await connectContract()
      const phrase = await contract.getGreetings()
      setContractData(phrase)
    } catch (error) {
      console.log(error);
    }

    setIsGreetingLoading(false)
  }

  const setData = async (msg) => {
    setIsGreetingLoading(true)

    try {
      let contract = await connectContract()
      const transaction = await contract.setGreeting(msg)
      await transaction.wait()
    } catch (error) {
      console.log(error);
    }

    getData()
  }

  const submit = () => {
    let msg = document.getElementById('greeting').value
    setData(msg)
  }



  // connect metamask section
  const fetchTheUserBalance = async () => {
    setIsBalanceLoading(true)
    const balanceResponse = await getBalance(account)
    setAccountBalance(balanceResponse)
    setIsBalanceLoading(false)
  }

  useEffect(() => {
    if (account) {
      fetchTheUserBalance()
    } else {
      setAccountBalance(0)
    }
  }, [account])



  return (
    <div className="App">

      <button onClick={() => { activate(Injected) }}>Metamask</button>
      <button onClick={deactivate}>Disconnect</button>

      <div>Connection Status: {active}</div>
      <div>Account: {account}</div>
      <div>Network ID: {chainId}</div>
      <div>
        Balance :
        {
          isBalanceLoading ? (<>Loading</>) : (<>{accountBalance}</>)
        }

      </div>
      <br />
      <br />
      <br />
      <button onClick={getData}>Connect Contarct</button>
      <div><h1>
        {
          isGreetingLoading ? (<>Loading</>) : (<>{contractData}</>)
        }

      </h1></div>
      <div><input type="text" id='greeting' /><button onClick={submit}>Set Greeting</button></div>
    </div>


  );
}

export default App;
