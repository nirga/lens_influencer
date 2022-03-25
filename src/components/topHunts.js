import { Link } from "react-router-dom";

const staticProfiles = [{
    name: 'Rock',
    twitterHandle: 'the_rock',
    reward: 549
  },
  {
    name: 'Bennie',
    twitterHandle: 'bennie_houston',
    reward: 387
  },
  {
    name: 'Tommy',
    twitterHandle: 'tommy_lee',
    reward: 376
  },
  {
    name: 'Ariana',
    twitterHandle: 'ariana_grande',
    reward: 280
  },
  {
    name: 'Christiano',
    twitterHandle: 'cr7',
    reward: 227
  },
]

function TopHunts() {  
  return (
    <div className="col-span-2">
        <div className="pt-4">
            <div className="bg-white w-full rounded-lg">
                <div id="hunts" className="py-4 px-4">
                    <p className="text-md font-bold mb-4">Top pending hunts</p>
                    {staticProfiles.map((profile) => ( 
                        <Link
                            key={profile.twitterHandle}
                            to={{
                                pathname: "/profile",
                                search: `?twitterHandle=${profile.twitterHandle}`,
                            }}
                        >
                            <div className="flex justify-between w-full py-2">
                                <div className="flex">
                                    <div className="m-auto">
                                        <div className="h-10 w-10 bg-blue-300 rounded-full">
                                            <div className="flex h-full">
                                                <div className="m-auto uppercase">
                                                    {profile.twitterHandle.charAt(0)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-auto ml-4">
                                        <p>@{profile.twitterHandle}</p>
                                    </div>
                                </div>
                                <div className="my-auto font-semibold">
                                    <div>$ {profile.reward}</div>
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