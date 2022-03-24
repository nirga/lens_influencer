// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract TwitterVerifier is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    event VerificationStarted(bytes32 requestId);
    event VerificationCompleted(
        bytes32 requestId,
        address accountContract,
        bool isVerified
    );

    struct TwitterProfile {
        address accountContract;
        bool isVerified;
    }
    mapping(bytes32 => TwitterProfile) public verifiedProfiles;

    /**
     * @notice Executes once when a contract is created to initialize state variables
     *
     * @param _oracle - address of the specific Chainlink node that a contract makes an API call from
     * @param _jobId - specific job for :_oracle: to run; each job is unique and returns different types of data
     * @param _fee - node operator price per API call / data request
     * @param _link - LINK token address on the corresponding network
     */
    constructor(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee,
        address _link
    ) {
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function verifyTweet(string memory tweetId, string memory challenge)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory url = string(
            abi.encodePacked(
                "https://lfgrow-hack-influencer.netlify.app/.netlify/functions/app/?tweet=",
                tweetId,
                "&challenge=",
                challenge
            )
        );
        request.add("get", url);
        request.add("path", "data");
        request.addInt("value", 1);
        request.add("operator", "eq");

        // Sends the request
        bytes32 reqId = sendChainlinkRequestTo(oracle, request, fee);

        verifiedProfiles[reqId].accountContract = address(msg.sender);
        verifiedProfiles[reqId].isVerified = false;

        emit VerificationStarted(reqId);

        return reqId;
    }

    /**
     * Receive the response in the form of string
     */
    function fulfill(bytes32 _requestId, bool isVerified)
        public
        recordChainlinkFulfillment(_requestId)
    {
        verifiedProfiles[_requestId].isVerified = isVerified;
        emit VerificationCompleted(
            _requestId,
            verifiedProfiles[_requestId].accountContract,
            isVerified
        );
    }

    function getResult(bytes32 requestId) public view returns (bool) {
        return verifiedProfiles[requestId].isVerified;
    }
}
