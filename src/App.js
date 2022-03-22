
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Overview from "./pages/overview";
import ApiExample from "./pages/api-example";
import ContractExample from "./pages/contract-example";
import CreateProfile from "./pages/create-profile";
import UserLogin from "./pages/user-login";
import logo from './logo.png';

export default function App() {
  return (
    <Router>
      <div>
        <div id="header" className="flex h-14">
          <div className="flex my-auto mx-4"> 
            <div className="flex">
              <img src={logo} alt="Logo" className="h-10" />
              <div className="flex my-auto ml-2">
                <h1 className="text-lg font-bold">Artemis - Influencer Hunting Module</h1>
              </div>
            </div>
            
          </div>
        </div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Overview/>}/>
          <Route exact path="/api-example" element={<ApiExample/>}/>
          <Route exact path="/contract-example" element={<ContractExample/>}/>
          <Route exact path="/create-profile" element={<CreateProfile/>}/>
          <Route exact path="/user-login" element={<UserLogin/>}/>
          <Route path="*" element={<Overview/>}/>
        </Routes>
      </div>
    </Router>
  );
}