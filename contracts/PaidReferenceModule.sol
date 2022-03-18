// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

import {IReferenceModule} from "./lens/IReferenceModule.sol";
import {ModuleBase} from "./lens/ModuleBase.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {InfluencerRankingContract} from "./InfluencerRankingContract.sol";

/**
 * @title PaidReferenceModule
 *
 * @notice A module that allows paying influencers for distributing a post.
 */
contract PaidReferenceModule is ModuleBase, IReferenceModule {
    InfluencerRankingContract rankingContract;
    mapping (address => uint) pubBudgets; 

    constructor(address hub, address rankingContractAddr) ModuleBase(hub) {
        rankingContract = InfluencerRankingContract(rankingContractAddr);
    }

    /**
     * @dev There is nothing needed at initialization.
     */
    function initializeReferenceModule(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external override payable returns (bytes memory) {
        pubBudgets[pubId] = msg.value;

        return new bytes(0); 
    }

    /**
     * @notice Pays the commenting profile according to InfluencerRankingContract.
     */
    function processComment(
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed
    ) external view override {
        address commentCreator = IERC721(HUB).ownerOf(profileId);
    }

    /**
     * @notice Pays the mirroring profile according to InfluencerRankingContract.
     *
     * NOTE: We don't need to care what the pointed publication is in this context.
     */
    function processMirror(
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed
    ) external view override {
        address mirrorCreator = IERC721(HUB).ownerOf(profileId);
        
        mirrorCreator.transfer(pubBudgets[pubIdPointed]);
    }
}
