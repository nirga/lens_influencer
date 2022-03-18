// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.13;

import {IReferenceModule} from "./lens/IReferenceModule.sol";
import {ModuleBase} from "./lens/ModuleBase.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {InfluencerRankingContract} from "./InfluencerRankingContract.sol";

/**
 * @title InfluencerReferenceModule
 *
 * @notice A module that allows paying influencers for distributing a post.
 */
contract InfluencerReferenceModule is IReferenceModule {
    RankingContract rankingContract;

    constructor(address hub, address rankingContractAddr) ModuleBase(hub) {
        self.rankingContract = RankingContract(rankingContractAddr);
    }

    /**
     * @dev There is nothing needed at initialization.
     */
    function initializeReferenceModule(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external pure override returns (bytes memory) {
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
    }
}
