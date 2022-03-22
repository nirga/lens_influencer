
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const LoginUser = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const login = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
    }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h2 className="text-3xl font-bold mb-6">
          Example User login 🚀
        </h2>
        <button className="text-3xl font-bold mb-6" onClick={login}>
          LOGIN
        </button>

         {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="text-3xl font-bold" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div> 
  );
}

export default LoginUser;
