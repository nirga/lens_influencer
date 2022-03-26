import {ethers} from "ethers";
import huntedAccountABI from "../utils/HuntedAccount.json";

export const enrichHuntedAccounts = async (ids) => {
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const account = await enrichAccount(ids[0],signer)
    console.log("here2")
    console.log(account)
}

export const enrichAccount = async (id,signer) => {
    console.log("here1")
    const huntedAccount = new ethers.Contract(id, huntedAccountABI.abi, signer);
    const royaltyFee = await huntedAccount.royaltyFee();
    const totalAmountStaked = await huntedAccount.totalAmountStaked();
    const profileHunted = await huntedAccount.profileHunted();
    console.log("here1.1")
    return {
        royaltyFee: royaltyFee,
        totalAmountStaked: totalAmountStaked,
        profileHunted: profileHunted,
    }
}
