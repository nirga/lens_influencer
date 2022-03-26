import React from 'react';
import { Link } from "react-router-dom";
import { getHuntedAccounts } from "../api/hunted_accounts";
import { useAsync } from "react-use";
import { enrichHuntedAccounts} from "../api/enrich_accounts";
import {ethers} from "ethers";

const sortAccounts = async (accounts) => {
    accounts.sort(function(a, b){
        if (a.profileHunted && !b.profileHunted) { // if a is claimed and b is not put b first
            return 1
        }
        if (b.profileHunted && !a.profileHunted) { // if b is claimed and a is not put a first
            return -1
        }
        if (b.totalAmountStaked.gte(a.totalAmountStaked)) { //if b is greater than a put b first
            return 1
        }
        return -1
    });
    return accounts
}


function TopHunts() {
    const profiles = useAsync( async () => {
        return sortAccounts(await enrichHuntedAccounts(await getHuntedAccounts()))
    },[]);

    return (
        <div className="col-span-2">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg">
                    <div id="hunts" className="py-4 px-4">
                        <p className="text-md font-bold mb-4">Top pending hunts</p>
                        {!profiles.loading && profiles.value.map((profile) => (
                            <Link
                                key={profile.twitterProfile}
                                to={{
                                    pathname: "/profile",
                                    search: `?twitterHandle=${profile.twitterProfile}`,
                                }}
                            >
                                <div className="flex justify-between w-full py-2">
                                    <div className="flex">
                                        <div className="m-auto">
                                            <div className="h-10 w-10 bg-blue-300 rounded-full">
                                                <div className="flex h-full">
                                                    <div className="m-auto uppercase">
                                                        {profile.twitterProfile.charAt(0)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-auto ml-4">
                                            <p>@{profile.twitterProfile}</p>
                                        </div>
                                        {profile.profileHunted &&
                                        <div className="m-auto ml-4">
                                            <div className="h-7 w-20 bg-green-300 rounded">
                                                <div className="flex h-full">
                                                    <div className="m-auto">
                                                        claimed
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="my-auto font-semibold">
                                        <div>{ethers.utils.formatEther(
                                            profile.totalAmountStaked
                                        )} MATIC (${(
                                            ethers.utils.formatEther(
                                                profile.totalAmountStaked
                                            ) * 1.58
                                        ).toFixed(2)})</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHunts;

