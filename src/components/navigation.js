import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="bg-white col-span-1 h-screen">
      <div className="flex flex-col pt-8">
        <Link to="/" className="text-lg mr-4 font-medium">
          Dashboard
        </Link>
        <Link to="/stakes" className="text-lg mr-4 font-medium">
          Stakes{" "}
        </Link>

        <hr className="mt-5" />

        <Link to="/create-profile" className="text-lg mr-4 mt-4">
          <div className="flex">
            <p className="bg-blue-600 text-white px-3 py-1 rounded-lg">
              Create Profile
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
