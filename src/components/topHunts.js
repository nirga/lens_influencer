import { Link } from "react-router-dom";
import { getHuntedAccounts } from "../api/hunted_accounts";
import { useAsync } from "react-use";
import { enrichHuntedAccounts } from "../api/enrich_accounts";
import { ethers } from "ethers";

function TopHunts() {
  const profiles = useAsync(async () => {
    return enrichHuntedAccounts(await getHuntedAccounts());
  }, []);

  return (
    <div className="col-span-2">
      <div className="pt-4">
        <div className="bg-white w-full rounded-lg">
          <div id="hunts" className="py-4 px-4">
            <p className="text-md font-bold mb-4">Top pending hunts</p>
            {!profiles.loading &&
              profiles.value.map((profile) => (
                <Link
                  key={profile.twitterProfile}
                  to={{
                    pathname: `/profile/${profile.twitterProfile}`,
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
                    </div>
                    <div className="my-auto font-semibold">
                      <div>
                        {ethers.utils.formatEther(profile.totalAmountStaked)}{" "}
                        MATIC ($
                        {(
                          ethers.utils.formatEther(profile.totalAmountStaked) *
                          1.58
                        ).toFixed(2)}
                        )
                      </div>
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
