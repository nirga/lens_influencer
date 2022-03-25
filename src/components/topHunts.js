import { Link } from "react-router-dom";

const staticProfiles = [{
    name: 'StaticProfile1',
    twitterHandle: 'TwitterStaticProfile1'
  },
  {
    name: 'StaticProfile2',
    twitterHandle: 'TwitterStaticProfile2'
  },
  {
    name: 'StaticProfil3',
    twitterHandle: 'TwitterStaticProfile3'
  },
  {
    name: 'StaticProfile4',
    twitterHandle: 'TwitterStaticProfile4'
  },
  {
    name: 'StaticProfile5',
    twitterHandle: 'TwitterStaticProfile5'
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
                            className="mb-4"
                        >
                            <div >
                                {profile.name}
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