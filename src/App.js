
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

export default function App() {
  return (
    <Router>
      <div>
        <div className="flex">
          <h1 className="text-lg mr-4">Basic Navigation:</h1>
          <div className="flex">
            <Link to="/" className="text-lg mr-4">Overview</Link>
            <Link to="/api-example" className="text-lg mr-4">API Example</Link>
            <Link to="/contract-example" className="text-lg mr-4">Contract Example</Link>
          </div>
        </div>

        <hr />

        <Routes>
          <Route exact path="/" element={<Overview/>}/>
          <Route exact path="/api-example" element={<ApiExample/>}/>
          <Route exact path="/contract-example" element={<ContractExample/>}/>
          <Route path="*" element={<Overview/>}/>
        </Routes>
      </div>
    </Router>
  );
}