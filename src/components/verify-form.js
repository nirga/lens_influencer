import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { ethers } from "ethers";
import { TWITTER_VERIFIER_ADDRESS } from "../utils/consts";
import HuntedAccountABI from "../utils/HuntedAccount.json";
import TwitterVerifierABI from "../utils/TwitterVerifier.json";

const claimProfile = async (
  contract,
  tweetId,
  setLoading,
  toggleVisibility
) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const huntedAccountContract = contract;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const huntedAccount = new ethers.Contract(
        huntedAccountContract,
        HuntedAccountABI.abi,
        signer.connectUnchecked()
      );
      const twitterVerifier = new ethers.Contract(
        TWITTER_VERIFIER_ADDRESS,
        TwitterVerifierABI.abi,
        signer
      );

      twitterVerifier.removeAllListeners("VerificationStarted");
      twitterVerifier.removeAllListeners("VerificationCompleted");

      twitterVerifier.once(
        "VerificationCompleted",
        async (requestId, accountContract, isVerified) => {
          console.log(
            `Verification completed for request id: ${requestId}, account contract: ${accountContract}, result: ${isVerified}`
          );

          if (accountContract === huntedAccountContract && isVerified) {
            // // TODO: support currency selection - ONLY WHITELISTED CURRENCIES!!!
            let currency = "0x9c3c9283d3e44854697cd22d3faa240cfb032889"; // WMATIC TOKEN
            // // TODO: support fee selection - ONLY GREATER THEN BPS_MAX (10,000)!!!
            let fee = 100000;

            await (await huntedAccount.claimProfile(fee, currency)).wait();

            setLoading(false);
            toggleVisibility(false);
            console.log("Profile claimed successfully!");
          }
        }
      );

      await huntedAccount.verifyProfileOwner(tweetId);
      console.log("Verifying profile...");
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

function VerifyForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    claimProfile(
      props.contract,
      data.tweetURL.split("/").pop(),
      setLoading,
      props.toggleVisibility
    );
  };
  return (
    <div className="">
      <div className="text-md font-bold mb-2">
        You need to verify your identity to claim the account
      </div>
      <div>Required steps:</div>
      <ul className="mb-4">
        <li>1. Tweet "Artemis"</li>
        <li>2. Provide the url to the tweet</li>
        <li>3. Click Verify</li>
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Tweet URL"
          className="border-2 border-slate-200 w-full rounded-md px-2 py-2 mb-2"
          {...register("tweetURL", { required: true })}
        />
        {errors.tweetURL && (
          <span className="text-red-500">Tweet URL is required</span>
        )}
        {loading ? (
          <button disabled>
            <div className="flex">
              <p className="bg-blue-400 text-white px-8 py-2 rounded-lg">
                Processing
              </p>
            </div>
          </button>
        ) : (
          <input
            type="submit"
            value="Verify"
            className="bg-blue-600 py-2 px-4 text-white rounded-md"
          />
        )}
      </form>
    </div>
  );
}

export default VerifyForm;
