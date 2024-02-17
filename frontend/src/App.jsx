import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Edit from "./pages/EditUser";
import PrivateRoute from "./components/PrivateRoute";

import "./index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/create" element={<Create />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/edituser" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
