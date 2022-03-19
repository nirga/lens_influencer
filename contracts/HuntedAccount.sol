// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract HuntedAccount is AccessControl {
    bytes32 public constant HUNTER_ROLE = keccak256("HUNTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    address immutable HUB;

    // Used to identify the true owner of the account.
    string public twitterProfile;

    mapping(address => uint256) hunters;

    constructor(
        address hub,
        address hunter,
        string twitterProfile,
        string challenge
    ) {
        HUB = hub;

        _setupRole(HUNTER_ROLE, msg.sender);
    }

    function hunt() payable {}

    function claim(string tweetUrl) {}
}
