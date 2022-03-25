
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import CreateProfile from "./pages/create-profile";
import Stakes from "./pages/stakes";
import Docs from "./pages/docs";
import Help from "./pages/help";


import ApiExample from "./pages/api-example";
import ContractExample from "./pages/contract-example";
import UserLogin from "./pages/user-login";
import logo from './logo.png';

export default function App() {
  return (
    <Router>
      <div>
        <div id="header" className="top-0 flex h-14">
          <div className="flex my-auto mx-4"> 
            <Link to="/">
              <div className="flex">
                <img src={logo} alt="Logo" className="h-10" />
                <div className="flex my-auto ml-2">
                  <h1 className="text-lg font-bold">Artemis - Influencer Hunting Module</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/create-profile" element={<CreateProfile/>}/>
          <Route exact path="/stakes" element={<Stakes/>}/>
          <Route exact path="/help" element={<Help/>}/>
          <Route exact path="/docs" element={<Docs/>}/>
          <Route path="*" element={<Dashboard/>}/>


          <Route exact path="/user-login" element={<UserLogin/>}/>

          <Route exact path="/api-example" element={<ApiExample/>}/>
          <Route exact path="/contract-example" element={<ContractExample/>}/>
        </Routes>
      </div>
    </Router>
  );
}