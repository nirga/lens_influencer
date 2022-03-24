// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract HuntedAccount is AccessControl {
    using SafeERC20 for IERC20;

    struct RoyaltiesShare { 
      uint256 owner;
      uint256 hunters;
    }

    struct Hunter {
        uint256 amountStaked;
        uint256 amountWithdrawn;
    }

    struct HuntedProfile {
        // Used to identify the true owner of the account.
        string twitterProfile;
        uint256 amountWithdrawn;
        address owner;
    }

    bytes32 public constant INITIATOR_ROLE = keccak256("INITIATOR_ROLE");
    bytes32 public constant HUNTER_ROLE = keccak256("HUNTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    address immutable HUB;
    HuntedProfile _huntedProfile;

<<<<<<< HEAD
    mapping(address => Hunter) hunters;
    uint8 public royaltyFee;
    uint256 public totalAmountStaked;
    uint256 public totalRoyaltiesWithdrawn;
    address _feesCurrency;
    bool _profileHunted;

    // Emitted when amount of tokens had been staked by a hunter
    event Stake(address _hunter, uint256 _hunterAmountStaked, uint256 _hunterTotalAmountStaked, uint256 _totalAmountStaked);
    // Emitted when amount of royalties had been withdrawn
    event RoyaltiesWithdrawn(address _withdrawer, uint256 _withdrawnAmount, uint256 _allTimeWithdrawnAmount);

    constructor(
        address hub,
        string memory _twitterProfile,
        uint8 _royaltyFee
    ) {
=======
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
>>>>>>> 6996df27e20404fc0bd8d966146a14d5c93f499e
        HUB = hub;
        _huntedProfile = HuntedProfile(_twitterProfile, 0, address(0));
        totalAmountStaked = 0;
        royaltyFee = _royaltyFee;
        _profileHunted = false;

        _setupRole(INITIATOR_ROLE, msg.sender);
    }

    function stake() external payable {
        require(!_profileHunted);
        require(msg.value > 0);

        hunters[msg.sender].amountStaked += msg.value;
        totalAmountStaked += msg.value;

        emit Stake(msg.sender, msg.value, hunters[msg.sender].amountStaked, totalAmountStaked);

        _setupRole(HUNTER_ROLE, msg.sender);
    }

    function claimProfile(string memory tweetUrl, address feesCurrency) external {
        require(_verifyProfileOwner());

<<<<<<< HEAD
        // Store the profile owner address
        _huntedProfile.owner = msg.sender;
        _feesCurrency = feesCurrency;

        // TODO: Create the profile with FeeFollowModule with this contract address as recipient and feesCurrency as currency
        uint256 profileId = 0;
        // TODO: Transfer the profile NFT to the profile owner?

        // Transfer the staked assets (in MATIC) to the profile owner
        payable(_huntedProfile.owner).transfer(totalAmountStaked);

        // Mark that the profile was hunted in-order to avoid future staking
        _profileHunted = true;
=======
        emit Stake(
            msg.sender,
            msg.value,
            hunters[msg.sender],
            totalAmountStaked
        );
>>>>>>> 6996df27e20404fc0bd8d966146a14d5c93f499e
    }

    function withdrawOwnerRewards() external {
        require(hasRole(OWNER_ROLE, msg.sender), "Caller is not an owner"); 

        uint256 ownerAllTimeRoyalties = _allTimesRoyaltiesShare().owner;
        require(ownerAllTimeRoyalties > _huntedProfile.amountWithdrawn, "No royalties to withdraw");  

        uint256 amountToWithdraw = ownerAllTimeRoyalties - _huntedProfile.amountWithdrawn; 

        IERC20(_feesCurrency).safeTransferFrom(address(this), payable(_huntedProfile.owner), amountToWithdraw);
        _huntedProfile.amountWithdrawn += amountToWithdraw;

        emit RoyaltiesWithdrawn(_huntedProfile.owner, amountToWithdraw, _huntedProfile.amountWithdrawn);
    }

    function withdrawHunterRewards() external {
        address payable withdrawer = payable(msg.sender);

        require(hasRole(HUNTER_ROLE, withdrawer), "Caller is not a hunter");

        uint256 allTimeRoyalties = _allTimesRoyaltiesShare().hunters;
        uint256 hunterAllTimeShare = hunters[withdrawer].amountStaked / totalAmountStaked * allTimeRoyalties;
        uint256 amountToWithdraw = hunterAllTimeShare - hunters[withdrawer].amountWithdrawn;
        
        require(amountToWithdraw > 0, "No royalties to withdraw");

        IERC20(_feesCurrency).safeTransferFrom(address(this), withdrawer, amountToWithdraw);
        hunters[withdrawer].amountWithdrawn += amountToWithdraw;

        emit RoyaltiesWithdrawn(withdrawer, amountToWithdraw, hunters[withdrawer].amountWithdrawn);
    }

    function _verifyProfileOwner() internal pure returns(bool) { 
        // TODO: Implement
        return true; 
    }

    function _balance() internal view returns(uint256) {
        return IERC20(_feesCurrency).balanceOf(address(this));
    }

    function _allTimeBalance() internal view returns(uint256) {
        // Calculate the amount of total royalties earned by the hunted profile along time by adding those which were already withdrawn to the existing balance
        return _balance() + totalRoyaltiesWithdrawn;
    }

    function _allTimesRoyaltiesShare() internal view returns(RoyaltiesShare memory) {
        RoyaltiesShare memory share;
        uint256 allTimeRoyaltiesEarned = _allTimeBalance();

        share.owner = (allTimeRoyaltiesEarned * (100 - royaltyFee)) / 100;
        share.hunters = allTimeRoyaltiesEarned - share.owner;

        return share;
    }
}
