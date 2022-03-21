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
    uint256 public totalAmountStaked;

    // Emitted when amount of tokens had been staked by a hunter
    event Stake(
        address _hunter,
        uint256 _hunterAmountStaked,
        uint256 _hunterTotalAmountStaked,
        uint256 _totalAmountStaked
    );

    constructor(address hub, string memory _twitterProfile) {
        HUB = hub;
        totalAmountStaked = 0;
        twitterProfile = _twitterProfile;

        _setupRole(HUNTER_ROLE, msg.sender);
    }

    function stake() external payable {
        hunters[msg.sender] += msg.value;
        totalAmountStaked += msg.value;

        emit Stake(
            msg.sender,
            msg.value,
            hunters[msg.sender],
            totalAmountStaked
        );
    }

    function claim(string memory tweetUrl) external {}
}
