import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";

function Help() {
    return (
      <div className="grid grid-cols-6 gap-4 px-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg p-4">
                    <div className="text-md font-bold mb-2">Reach out to us on twitter or discord</div>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
    );
  }
  
  export default Help;
  