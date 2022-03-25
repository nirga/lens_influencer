// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "./HuntedAccount.sol";

/// @title The HuntedAccountFactory allows users to create HuntedAccount
contract HuntedAccountFactory {
    address immutable HUB;
    address immutable TWITTER_VERIFIER;

    event HuntedAccountCreated(address huntedAccount);

    address[] public huntedAccounts;

    constructor(address hub), address twitterVerifier {
        HUB = hub;
        TWITTER_VERIFIER = twitterVerifier;
    }

    function newHuntedAccount(
        string memory _twitterProfile,
        string memory _challenge,
        uint8 _royaltyFee
    ) public returns (address) {
        HuntedAccount instance = new HuntedAccount(
            HUB,
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
