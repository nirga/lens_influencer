import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";
import huntedAccountFactoryABI from '../utils/HuntedAccountFactory.json'

function Profile() {
  const onSubmit = data => callContractExample(data);
  let query = useQuery();

  const [currentAccount, setCurrentAccount] = useState("");
  const huntedAccountFactoryAddress = "0xfF3fB3eefdF9e74Ef897Ae45682802278eB7699a";

  function useQuery() {
    const { search } = useLocation();
    console.log(search)
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

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

  const callContractExample = async (data) => {
    console.log(data)

    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("Ethereum object exists")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const HuntedAccountFactoryContract = new ethers.Contract(huntedAccountFactoryAddress, huntedAccountFactoryABI.abi, signer);

        let huntedAccount = await HuntedAccountFactoryContract.newHuntedAccount(data.twitterHandle);
        console.log(huntedAccount)
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
    <div className="grid grid-cols-6 gap-4 mx-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg">
                    <p className="text-md font-bold mb-4">Hunting Profile</p>
                    <p className="text-md">Twitter Handle - {query.get("twitterHandle")}</p>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default Profile;
