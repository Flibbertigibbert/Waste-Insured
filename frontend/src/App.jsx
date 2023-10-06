import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PartnerHospital from "./pages/PartnerHospital";
import Navbar from "./components/Navbar";




export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index  element={<Home />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/hospital" element={<PartnerHospital />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <Navbar  />
      <div >
        <Outlet />
      </div>
    </div>
  );
};