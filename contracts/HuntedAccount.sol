// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract HuntedAccount is AccessControl {
    bytes32 public constant HUNTER_ROLE = keccak256("HUNTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    address immutable HUB;

    // Used to identify the true owner of the account.
    string public twitterProfile;
    address _profileOwner;

    mapping(address => uint256) hunters;
    // TODO: change from const
    uint16  public royaltyFee = 2;
    uint256 public totalAmountStaked;
    uint256 public totalRoyaltiesWithdrawn;
    address _feesCurrency;

    // Emitted when amount of tokens had been staked by a hunter
    event Stake(address _hunter, uint256 _hunterAmountStaked, uint256 _hunterTotalAmountStaked, uint256 _totalAmountStaked);

    constructor(
        address hub,
        string memory _twitterProfile
    ) {
        HUB = hub;
        totalAmountStaked = 0;
        twitterProfile = _twitterProfile;

        _setupRole(HUNTER_ROLE, msg.sender);
    }

    function stake() external payable {
        require(msg.value > 0);

        hunters[msg.sender] += msg.value;
        totalAmountStaked += msg.value;

        emit Stake(msg.sender, msg.value, hunters[msg.sender], totalAmountStaked);
    }

    function claimProfile(string memory tweetUrl, address feesCurrency) external {
        require(_verifyProfileOwner());

        // Store the profile owner address
        _profileOwner = msg.sender;
        _feesCurrency = feesCurrency;

        // TODO: Create the profile with FeeFollowModule with this contract address as recipient and feesCurrency as currency
        uint256 profileId = 0;

        // Transfer the staked assets (in MATIC) to the profile owner
        payable(profileOwner).transfer(totalAmountStaked);
    }

    function claimRewards() external {
        uint256 currentRoyaltiesBalance = IERC20(feesCurrency).balanceOf(address(this));
        uint256 allTimeRoyaltiesBalance = currentBalance + totalRoyaltiesWithdrawn;
        uint256 ownerRoyaltiesShare = (allTimeRoyaltiesBalance * (100 - royaltyFee)) / 100;
        uint256 huntersRoyaltiesShare = allTimeRoyaltiesBalance - ownerRoyaltiesShare;

        if (msg.sender == profileOwner) {
            
        } else {

        }

        // IERC20(feesCurrency).safeTransferFrom(address(this), msg.sender, currentBalance);
    }

    function _verifyProfileOwner() internal { 
        // TODO: Implement
        return true; 
    }
}
