import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="bg-white col-span-1 h-screen">
        <div className="flex flex-col pt-8">
            <Link to="/" className="text-lg mr-4 text-blue-600">Dashboard</Link>
            <Link to="/create-profile" className="text-lg mr-4 text-blue-600">Create Profile</Link>
            <Link to="/stake-profile" className="text-lg mr-4 text-blue-600">Stake Profile</Link>
            <Link to="/claim-profile" className="text-lg mr-4 text-blue-600">Claim Profile</Link>

            <Link to="/docs" className="text-lg mr-4 text-blue-600 mt-10">Docs</Link>
            <Link to="/help" className="text-lg mr-4 text-blue-600">Help</Link>
        </div>
    </div>
  );
}

export default Navigation;