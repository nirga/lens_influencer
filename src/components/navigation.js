import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="bg-white col-span-1 h-screen">
      <div className="flex flex-col pt-8">
        <Link to="/" className="text-lg mr-4 font-medium">
          Dashboard
        </Link>

        <hr className="mt-5" />

        {!currentAccount && (
          <div className="flex text-lg mr-4 mt-4">
            <p className="bg-blue-400 text-white px-3 py-1 rounded-lg">
              Create Profile
            </p>
          </div>
        )}
        {currentAccount && (
          <Link to="/create-profile" className="text-lg mr-4 mt-4">
            <div className="flex">
              <p className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                Create Profile
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
