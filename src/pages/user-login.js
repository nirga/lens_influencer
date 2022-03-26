import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import lensHubAbi from "../utils/LensHubABI.json";
import huntedAccountFactoryABI from "../utils/HuntedAccountFactory.json";

const LoginUser = () => {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const lensHubContractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8Fs";
  const huntedAccountFactoryAddress =
    "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";

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
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const callContractExample = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("Ethereum object exists");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const lensHubContract = new ethers.Contract(
          lensHubContractAddress,
          lensHubAbi.abi,
          signer
        );
        const HuntedAccountFactoryContract = new ethers.Contract(
          huntedAccountFactoryAddress,
          huntedAccountFactoryABI.abi,
          signer
        );

        let huntedAccount = await HuntedAccountFactoryContract.newHuntedAccount(
          "abc"
        );
        console.log(huntedAccount);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h2 className="text-3xl font-bold mb-6">example profile creation 🚀</h2>
        <div>
          <button
            className="text-3xl font-bold mb-6 text-blue-600"
            onClick={callContractExample}
          >
            Create Profile
          </button>
        </div>

        {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button
            className="text-3xl font-bold text-blue-600"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginUser;
