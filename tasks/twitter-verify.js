task(
  "twitter-verify",
  "Calls an API Consumer Contract to read data obtained from an external API"
)
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .addParam("tweetid", "The tweet ID to verify")
  .addParam("challenge", "The challenge to verify against")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    console.log(
      "Calling verify of TwitterVerifier contract ",
      contractAddr,
      " on network ",
      network.name
    );
    const TwitterVerifier = await ethers.getContractFactory("TwitterVerifier");

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    //Create connection to Twitter Verifier Contract and call the createRequestTo function
    const twitterVerifierContract = new ethers.Contract(
      contractAddr,
      TwitterVerifier.interface,
      signer
    );
    var tx = await twitterVerifierContract.verifyTweet(
      taskArgs.tweetid,
      taskArgs.challenge
    );
    console.log(
      "Contract ",
      contractAddr,
      " external data request successfully called. Transaction Hash: ",
      tx.hash
    );
    const result = await tx.wait();
    const event = result.events.find((x) => x.event === "VerificationStarted");
    console.log(
      "Contract ",
      contractAddr,
      " external data request successfully called. Transaction ID: ",
      event.args.requestId
    );
    console.log("Run the following to read the returned result:");
    console.log(
      "npx hardhat read-data --contract " +
        contractAddr +
        " --network " +
        network.name
    );
  });

module.exports = {};
