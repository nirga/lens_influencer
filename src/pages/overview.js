import { Link } from "react-router-dom";

function Overview() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="flex flex-col">
          <p className="text-3xl font-bold mb-4">
            Get Started
          </p>
          <Link to="/create-profile" className="text-lg">
            <p className="text-3xl text-blue-600 mb-4">
              Create Profile
            </p> 
          </Link>
          <Link to="/api-example" className="text-lg">
            <p className="text-3xl text-blue-600 mb-4">
              Lens API Example
            </p> 
          </Link>
          <Link to="/contract-example" className="text-lg">
            <p className="text-3xl text-blue-600 mb-4">
              Smart Contract Example
            </p> 
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default Overview;
