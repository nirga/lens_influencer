// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "./HuntedAccount.sol";

/// @title The HuntedAccountFactory allows users to create HuntedAccount
contract HuntedAccountFactory {
    address immutable LENS_HUB;
    address immutable MOCK_PROFILE_CREATION_PROXY;
    address immutable FEE_FOLLOW_MODULE;
    address immutable TWITTER_VERIFIER;

    event HuntedAccountCreated(address huntedAccount);

    address[] public huntedAccounts;

    constructor(
        address lensHub,
        address mockProfileCreationProxy,
        address feeFollowModule,
        address twitterVerifier
    ) {
        LENS_HUB = lensHub;
        MOCK_PROFILE_CREATION_PROXY = mockProfileCreationProxy;
        FEE_FOLLOW_MODULE = feeFollowModule;
        TWITTER_VERIFIER = twitterVerifier;
    }

    function newHuntedAccount(
        string memory _twitterProfile,
        string memory _challenge,
        uint8 _royaltyFee
    ) public returns (address) {
        HuntedAccount instance = new HuntedAccount(
            LENS_HUB,
            MOCK_PROFILE_CREATION_PROXY,
            FEE_FOLLOW_MODULE,
            TWITTER_VERIFIER,
            _twitterProfile,
            _challenge,
            _royaltyFee
        );

        address addr = address(instance);
        huntedAccounts.push(addr);
        emit HuntedAccountCreated(address(instance));

        return addr;
    }
}
