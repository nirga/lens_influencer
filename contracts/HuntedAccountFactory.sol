// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "./HuntedAccount.sol";

/// @title The HuntedAccountFactory allows users to create HuntedAccount
contract HuntedAccountFactory {
    address immutable HUB;

    constructor(address hub) {
        HUB = hub;
    }

    function newHuntedAccount(
        address _hunter,
        string _twitterProfile,
        string _challenge
    ) public returns (address) {
        HuntedAccount instance = new HuntedAccount(
            HUB,
            _owner,
            _twitterProfile,
            _challenge
        );
        return address(instance);
    }
}
