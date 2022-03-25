import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";
import huntedAccountFactoryABI from '../utils/HuntedAccountFactory.json'

function CreateProfile() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => callContractExample(data);

  const [currentAccount, setCurrentAccount] = useState("");
  const huntedAccountFactoryAddress = "0xfF3fB3eefdF9e74Ef897Ae45682802278eB7699a";

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
    <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4">
                        <p className="text-md font-bold mb-4">Create a new hunting Profile</p>
                        <p className="text-md">Full Name</p>
                        <input
                          placeholder="Satoshi Nakamoto" 
                          className="border-2 border-slate-200 w-full rounded-md px-2 py-2"
                          {...register("name")}
                        />
                        <p className="text-md mt-2">Twitter Handle</p>
                        <input
                          placeholder="@username" 
                          className="border-2 border-slate-200 w-full rounded-md px-2 py-2"
                          {...register("twitterHandle", { required: true })}
                        />
                        {errors.twitterRequired && <span className="text-red-500">Twitter handle is required</span>}

                        <div className="w-full flex justify-end mt-4">
                            {/*
                            * If there is no currentAccount render this button
                            */}
                            {!currentAccount && (
                                <div className="flex">
                                    <button className="bg-blue-600 py-2 px-4 text-white rounded-md" onClick={connectWallet}>
                                        Connect Wallet
                                    </button>
                                    <p className="mt-2 mx-2">Then u can</p>
                                    <button disabled className="disabled:bg-blue-400 py-2 px-4 text-white rounded-md" onClick={connectWallet}>
                                        Create Profile
                                    </button>
                                </div>
                            )}
                            {currentAccount && (
                                <input 
                                  type="submit"
                                  value="Create Profile"
                                  className="bg-blue-600 py-2 px-4 text-white rounded-md"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg p-4">
                    <div className="text-md font-bold mb-2">Creating your own hunting profile?</div>
                    <div className="">
                        After you created the profile ...
                    </div>
                    <div className="">
                        ... navigate to /profile?twitterHandle=YOUR_TWITTER_HANDLE and claim it!
                    </div>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default CreateProfile;
