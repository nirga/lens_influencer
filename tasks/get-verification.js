task(
  "get-verification",
  "Calls an API Consumer Contract to read data obtained from an external API"
)
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .addParam("transactionid", "The transaction ID returned from calling verify")
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
    let result = (
      await twitterVerifierContract.getResult(taskArgs.transactionid)
    ).toString();
    console.log("Data is: ", result);
  });

module.exports = {};
