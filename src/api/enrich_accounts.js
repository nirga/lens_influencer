import {ethers} from "ethers";
import huntedAccountABI from "../utils/HuntedAccountFactory.json";

export const enrichHuntedAccounts = async (ids) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const HuntedAccount = new ethers.Contract(ids[0], huntedAccountABI.abi, signer);

}
