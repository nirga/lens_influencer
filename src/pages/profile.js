import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";
import huntedAccountFactoryABI from '../utils/HuntedAccountFactory.json'

function Profile() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  let query = useQuery();

  const [currentAccount, setCurrentAccount] = useState("");
  const huntedAccountFactoryAddress = "0xfF3fB3eefdF9e74Ef897Ae45682802278eB7699a";

  function useQuery() {
    const { search } = useLocation();
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
    <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg py-4 px-4">
                  <div className="flex justify-between">
                    <p className="text-md mb-4">Hunting Profile</p>
                    <div className="flex">
                      <p className="bg-blue-600 text-white px-8 py-2 rounded-lg">
                          Claim
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className="my-auto">
                        <div className="h-16 w-16 bg-blue-300 rounded-full">
                            <div className="flex h-full">
                                <div className="m-auto text-2xl uppercase">
                                  {query.get("twitterHandle").charAt(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-between my-auto ml-4 pt-2">
                      <p className="text-lg font-bold ">@{query.get("twitterHandle")}</p>
                      <p className="text-md font-bold mb-4">Stake: $ XX</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="bg-slate-200 w-full rounded-lg py-4 px-4">
                    <p className="text-md font-bold mb-4">This profile has not been claimed yet</p>
                    <p className="text-md">You can stake to share in this influencer's future earnings below ...</p>
                    <p className="text-md mb-4">... or claim this profile if it should be yours.</p>
                    <p className="text-md font-bold mt-8 mb-2">Stake MATIC in this profile</p>
                    <form 
                      className="flex w-full justify-between"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {/* register your input into the hook by invoking the "register" function */}
                      <div className="flex flex-col">
                        <input 
                          placeholder="amount" 
                          {...register("stakeValue", { required: true })} 
                          className="border-2 border-slate-200 rounded-md px-2 py-2 text-center"
                        />
                        {errors.stakeValue && <span className="text-red-500">stake value is required</span>}
                      </div>
                      <button type="submit">
                        <div className="flex">
                          <p className="bg-blue-600 text-white px-8 py-2 rounded-lg">
                              Stake
                          </p>
                        </div>
                      </button>
                    </form>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default Profile;
