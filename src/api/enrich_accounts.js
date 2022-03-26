import {ethers} from "ethers";
import huntedAccountABI from "../utils/HuntedAccount.json";

export const enrichHuntedAccounts = async (ids) => {
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    let accounts = []
    await Promise.all(ids.map(async (id) => {
        const account = await enrichAccount(id,signer)
        accounts.push(account)
    }))
    return accounts
}

export const enrichAccount = async (id,signer) => {
    const huntedAccount = new ethers.Contract(id, huntedAccountABI.abi, signer);
    const [royaltyFee, totalAmountStaked, profileHunted,
        huntedProfile] = await Promise.all([huntedAccount.royaltyFee(),
        huntedAccount.totalAmountStaked(),huntedAccount.profileHunted(), huntedAccount.huntedProfile()])
    return {
        royaltyFee: royaltyFee,
        totalAmountStaked: totalAmountStaked,
        profileHunted: profileHunted,
        twitterProfile: huntedProfile.twitterProfile,
    }
}
