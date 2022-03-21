
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Overview from "./pages/overview";
import ApiExample from "./pages/api-example";
import ContractExample from "./pages/contract-example";
import CreateProfile from "./pages/create-profile";

export default function App() {
  return (
    <Router>
      <div>
        <div id="header" className="flex h-12">
          <div className="flex my-auto mx-4"> 
            <h1 className="text-lg font-bold mr-4 ">Artemis - Influencer Hunting Module</h1>
            {/* <div className="flex">
              <Link to="/" className="text-lg mr-4 text-blue-600">Dashboard</Link>
              <Link to="/create-profile" className="text-lg mr-4 text-blue-600">Create Profile</Link>
            </div> */}
          </div>
        </div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Overview/>}/>
          <Route exact path="/api-example" element={<ApiExample/>}/>
          <Route exact path="/contract-example" element={<ContractExample/>}/>
          <Route exact path="/create-profile" element={<CreateProfile/>}/>
          <Route path="*" element={<Overview/>}/>
        </Routes>
      </div>
    </Router>
  );
}