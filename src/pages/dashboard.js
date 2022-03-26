import React, { useEffect, useState } from "react";

import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";

function Dashboard() {
    const [currentAccount, setCurrentAccount] = useState("");

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

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
            <Navigation/>
            {!currentAccount && (
                <div className="col-span-4 flex flex-col h-full">
                    <div className="m-auto">
                        <div className="font-medium mb-4">Want to go on a hunt?</div>
                        <button
                            className="bg-blue-600 py-2 px-4 text-white rounded-md"
                            onClick={connectWallet}
                        >
                            Connect Wallet
                        </button>
                    </div>
                </div>
            )}
            {currentAccount && (
                <div className="col-span-5 bg-slate-50">
                    <TopHunts/>
                </div>
            )}     
        </div>
    );
}

export default Dashboard;
