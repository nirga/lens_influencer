const chai = require("chai");
const { expect } = require("chai");
const { ethers } = require("hardhat");

chai.use(require('chai-bignumber')());

describe("HuntedAccount", () => {
    const twitterProfile = "www.twitter.com/elonmusk";
    const royaltyFee = 5;
    let HuntedAccount;
    let huntedAccount;
    let initiatorRole;
    let ownerRole;
    let hunterRole;
    let deployer;
    let provider;

    before(async () => {
        provider = ethers.provider;
        deployer = await (await ethers.getSigner()).address;
        HuntedAccount = await ethers.getContractFactory("HuntedAccount");
        huntedAccount = await HuntedAccount.deploy('0xE551A554789C7aC3acF3ACeeaC031b7f855938E9', twitterProfile, royaltyFee);

        initiatorRole = await huntedAccount.INITIATOR_ROLE();
        ownerRole = await huntedAccount.OWNER_ROLE();
        hunterRole = await huntedAccount.HUNTER_ROLE();
    });

    beforeEach(async () => {        
        huntedAccount = await HuntedAccount.deploy('0xE551A554789C7aC3acF3ACeeaC031b7f855938E9', twitterProfile, royaltyFee);
    })

    it("should deploy the contract", async () => {
        expect(await huntedAccount.deployed()).to.not.equal(null);
    })

    it("should return the royalty fee passed when deployed", async () => {
        expect(await huntedAccount.royaltyFee()).to.equal(royaltyFee);
    })

    // it("should return the twitter profile passed when deployed", async () => {
    //     expect(await huntedAccount.royaltyFee()).to.equal(royaltyFee);
    // })

    it("should have no balance", async () => {
        expect(await provider.getBalance(huntedAccount.address)).to.be.bignumber.that.is.zero;
    })

    it("should have initiator", async () => {
        expect(await huntedAccount.hasRole(initiatorRole, deployer)).to.equal(true);
    })

    describe("stake", () => {
        it("Should  new greeting once it's changed", async function () {

        });
    })
});
