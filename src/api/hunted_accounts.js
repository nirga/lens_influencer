import {ethers} from "ethers";
import huntedAccountFactoryABI from "../utils/HuntedAccountFactory.json";
import {HuntedAccountFactoryAddress} from "../constants/const";

export const getHuntedAccounts = async () => {
    try {
        const {ethereum} = window;
        if (ethereum) {
            console.log("hi ! Ethereum object exists")
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const HuntedAccountFactoryContract = new ethers.Contract(HuntedAccountFactoryAddress, huntedAccountFactoryABI.abi, signer);
            let accounts = await HuntedAccountFactoryContract.huntedAccounts(0)
            console.log(accounts)
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error);
    }
}
