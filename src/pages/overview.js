import { Link } from "react-router-dom";

function Overview() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">
            This is a basic overview to get you started.
          </p>
          <p className="text-3xl font-bold mb-8">
            Is includes two example.
          </p>
          <Link to="/" className="text-lg">
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Home
            </p> 
          </Link>
          <Link to="/api-example" className="text-lg">
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Lens API Example
            </p> 
          </Link>
          <Link to="/contract-example" className="text-lg">
            <p className="text-3xl font-bold text-blue-600 mb-4">
              Smart Contract Example
            </p> 
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default Overview;
