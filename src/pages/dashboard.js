import { Link } from "react-router-dom";

import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";

function Dashboard() {
  return (
    <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg p-4">
                    <div className="text-md font-bold mb-2">IDEA</div>
                    <div className="mb-12">
                        We want to build a framework where current users of lens can put stake on influencers that can be redeemed by that influencer once s/he joins the platform. The users, or hunters as we call them, can then get a cut of the revenue those newly registered influencers get on the platform (sort of like referral).
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg p-4">
                    <div className="text-md font-bold mb-4">GET STARTED ...</div>
                    <div className="flex flex-col">
                        <Link to="/create-profile" className="text-lg mr-4 text-blue-600">Create a Profile</Link>
                        <Link to="/profile?twitterHandle=cr7" className="text-lg mr-4 text-blue-600">Stake in a Profile</Link>
                        <Link to="/profile?twitterHandle=cr7" className="text-lg mr-4 text-blue-600">Claim a Profile</Link>
                    </div>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default Dashboard;
