import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboarduser from "./pages/DashboardUser";
import Dashboardadmin from "./pages/DashboardAdmin";
import Dashboardpartner from "./pages/DashboardPartner";
import UserDetails from "./pages/UserDetails";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import NewPickup from "./pages/NewPickup";
import UsersList from "./pages/UsersList";
import PartnersList from "./pages/PartnersList";
import ShipmentsList from "./pages/ShipmentsList";
import NewShipment from "./pages/NewShipment";
import CreateAdmin from "./pages/CreateAdmin";




export default function App() {
  return (
    <>
       <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/userdashboard" element={<Dashboarduser/>}></Route>
          <Route path="/admindashboard" element={<Dashboardadmin/>}></Route>
          <Route path="/partnerdashboard" element={<Dashboardpartner/>}></Route>
          <Route path="/userdetails" element={<UserDetails/>}></Route>
          <Route path="/dashboardLayout" element={<DashboardLayout/>}></Route>
          <Route path="/partner/new-pickup" element={<NewPickup />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/partners" element={<PartnersList />} />
          <Route path="/admin/shipments" element={<ShipmentsList />} />
          <Route path="/user/new-shipment" element={<NewShipment />} />
          <Route path="/admin/create-admin" element={<CreateAdmin />} />


       </Routes>
    </>
  );
}

