import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";
import { HUNTED_ACCOUNT_FACTORY_ADDRESS } from "../utils/consts";
import huntedAccountFactoryABI from "../utils/HuntedAccountFactory.json";

function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => createHuntedAccount(data);

  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);

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

  const createHuntedAccount = async (data) => {
    let twitterHandleClean = data.twitterHandle;
    if (data.twitterHandle.startsWith("@")) {
      twitterHandleClean = data.twitterHandle.substring(1);
    }

    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true)
        console.log("Ethereum object exists");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const HuntedAccountFactoryContract = new ethers.Contract(
          HUNTED_ACCOUNT_FACTORY_ADDRESS,
          huntedAccountFactoryABI.abi,
          signer
        );

        let huntedAccount = await HuntedAccountFactoryContract.newHuntedAccount(
          twitterHandleClean,
          "artemis",
          2
        );
        let awaitedHuntedAccount = await huntedAccount.wait();
        console.log(awaitedHuntedAccount);
        setLoading(false)
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
    <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
      <Navigation />
      <div className="col-span-3 bg-slate-50">
        <div className="pt-4">
          <div className="bg-white w-full rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4">
              <p className="text-md font-bold mb-4">
                Create a new hunting Profile
              </p>
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
              {errors.twitterHandle && (
                <span className="text-red-500">Twitter handle is required</span>
              )}

              <div className="w-full flex justify-end mt-4"> 
                {loading ? 
                  <button disabled>
                    <div className="flex">
                      <p className="bg-blue-400 text-white px-8 py-2 rounded-lg">
                        Processing
                      </p>
                    </div>
                  </button>
                  : 
                  <button type="submit">
                    <div className="flex">
                      <p className="bg-blue-600 text-white px-8 py-2 rounded-lg">
                        Create Profile
                      </p>
                    </div>
                  </button>
                }
              </div>
            </form>
          </div>
        </div>
        <div className="pt-4">
          <div className="bg-white w-full rounded-lg p-4">
            <div className="text-md font-bold mb-2">
              Creating your own hunting profile?
            </div>
            <div className="">After you created the profile ...</div>
            <div className="">
              ... navigate to /profile/yourTwitterHandle and
              claim it!
            </div>
          </div>
        </div>
      </div>
      <TopHunts />
    </div>
  );
}

export default CreateProfile;
