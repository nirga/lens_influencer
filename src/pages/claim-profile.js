import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";

function ClaimProfile() {
  return (
    <div className="grid grid-cols-6 gap-4 mx-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg p-4">
                    <p className="text-md font-bold mb-4">Claim a Profile</p>

                    
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default ClaimProfile;
