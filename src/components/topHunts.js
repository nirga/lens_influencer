import { Link } from "react-router-dom";

function TopHunts() {
  return (
    <div className="col-span-2">
        <div className="pt-4">
            <div className="bg-white w-full rounded-lg">
                <div id="hunts" className="py-4 px-4">
                    <p className="text-md font-bold">Top pending hunts</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default TopHunts;