import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAsyncRetry } from "react-use";
import { useParams } from "react-router";
import { ethers } from "ethers";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";
import ModalTrigger from "../components/modal-trigger";
import { HUNTED_ACCOUNT_FACTORY_ADDRESS } from "../utils/consts";
import HuntedAccountABI from "../utils/HuntedAccount.json";
import HuntedAccountFactoryABI from "../utils/HuntedAccountFactory.json";
import { enrichAccount } from "../api/enrich_accounts";

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => stakeProfile(data);
  const { username } = useParams();

  const [loading, setLoading] = useState(false);
  const huntedAccountData = useAsyncRetry(async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const HuntedAccountFactory = new ethers.Contract(
      HUNTED_ACCOUNT_FACTORY_ADDRESS,
      HuntedAccountFactoryABI.abi,
      signer
    );
    const contract =
      await HuntedAccountFactory.getHuntedAccountByTwitterProfile(username);
    console.log("Hunted Contract: " + contract);
    const { totalAmountStaked: balance, profileHunted: isHunted } =
      await enrichAccount(contract, signer);
    console.log("Balance: " + balance);

    return { contract, balance, isHunted };
  }, [username]);

  const stakeProfile = async (data) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("Ethereum object exists");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const HuntedAccountContract = new ethers.Contract(
          huntedAccountData.value.contract,
          HuntedAccountABI.abi,
          signer
        );

        setLoading(true);
        const options = { value: ethers.utils.parseEther(data.stakeValue) };
        let stakedHuntAccount = await HuntedAccountContract.stake(options);
        let awaitedStake = await stakedHuntAccount.wait();
        console.log(awaitedStake);
        setLoading(false);
        huntedAccountData.retry();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
      <Navigation />
      <div className="col-span-3 bg-slate-50">
        <div className="pt-4">
          <div className="bg-white w-full rounded-lg py-4 px-4">
            <div className="flex justify-between">
              <p className="text-md mb-4">Hunting Profile</p>
              {!huntedAccountData.loading && !huntedAccountData.value.isHunted && (
                <div className="flex">
                  <ModalTrigger contract={huntedAccountData.value.contract}>
                    <button className="bg-blue-600 text-white px-8 py-2 rounded-lg">
                      Claim
                    </button>
                  </ModalTrigger>
                </div>
              )}
            </div>
            <div className="flex mt-4">
              <div className="my-auto">
                <div className="h-16 w-16 bg-blue-300 rounded-full">
                  <div className="flex h-full">
                    <div className="m-auto text-2xl uppercase">
                      {username.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between my-auto ml-4 pt-2">
                <p className="text-lg font-bold ">@{username}</p>
                <p className="text-md font-bold mb-4">
                  {!huntedAccountData.loading &&
                    `Stake: ${ethers.utils.formatEther(
                      huntedAccountData.value.balance
                    )} MATIC ($${(
                      ethers.utils.formatEther(
                        huntedAccountData.value.balance
                      ) * 1.58
                    ).toFixed(2)})`}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!huntedAccountData.loading && !huntedAccountData.value.isHunted && (
          <div className="pt-4">
            <div className="bg-slate-200 w-full rounded-lg py-4 px-4">
              <p className="text-md font-bold mb-4">
                This profile has not been claimed yet
              </p>
              <p className="text-md">
                You can stake to share in this influencer's future earnings
                below ...
              </p>
              <p className="text-md mb-4">
                ... or claim this profile if it should be yours.
              </p>
              <p className="text-md font-bold mt-8 mb-2">
                Stake MATIC in this profile
              </p>
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
                  {errors.stakeValue && (
                    <span className="text-red-500">
                      stake value is required
                    </span>
                  )}
                </div>
                {loading ? (
                  <button disabled>
                    <div className="flex">
                      <p className="bg-blue-400 text-white px-8 py-2 rounded-lg">
                        Processing
                      </p>
                    </div>
                  </button>
                ) : (
                  <button type="submit">
                    <div className="flex">
                      <p className="bg-blue-600 text-white px-8 py-2 rounded-lg">
                        Stake
                      </p>
                    </div>
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
      <TopHunts />
    </div>
  );
}

export default Profile;
