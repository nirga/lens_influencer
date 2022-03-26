import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import CreateProfile from "./pages/create-profile";
import Stakes from "./pages/stakes";

import UserLogin from "./pages/user-login";
import logo from "./logo.png";

export default function App() {
  return (
    <Router>
      <div>
        <div id="header" className="top-0 flex h-16">
          <div className="flex my-auto mx-4">
            <Link to="/">
              <div className="flex">
                <img src={logo} alt="Logo" className="h-10" />
                <div className="flex my-auto ml-2">
                  <h1 className="text-lg font-bold">
                    Artemis - Influencer Hunting Module
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/profile/:username" element={<Profile />} />
          <Route exact path="/create-profile" element={<CreateProfile />} />
          <Route exact path="/stakes" element={<Stakes />} />
          <Route path="*" element={<Dashboard />} />

          <Route exact path="/user-login" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}
