import {ethers} from "ethers";
import huntedAccountFactoryABI from "../utils/HuntedAccountFactory.json";
import {HUNTED_ACCOUNT_FACTORY_ADDRESS} from "../utils/consts"

export const getHuntedAccounts = async () => {
    let accounts
    try {
        const {ethereum} = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const HuntedAccountFactoryContract = new ethers.Contract(HUNTED_ACCOUNT_FACTORY_ADDRESS, huntedAccountFactoryABI.abi, signer);
            accounts = await HuntedAccountFactoryContract.getHuntedAccounts()
        } else {
        }
    } catch (error) {
        console.log(error);
    }
    return accounts
}
