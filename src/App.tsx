import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DashboardLayout from './components/DashboardLayout';
import CreateAdmin from './pages/CreateAdmin';
import Dashboardadmin from "./pages/DashboardAdmin";
import Dashboardpartner from "./pages/DashboardPartner";
import Dashboarduser from "./pages/DashboardUser";
import Login from "./pages/Login";
import NewPickup from "./pages/NewPickup";
import NewShipment from "./pages/NewShipment";
import PartnersList from "./pages/PartnersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboardlayout" element={<DashboardLayout children={undefined} />}></Route>
        <Route path="/admin/create-admin" element={<CreateAdmin />}></Route>
        <Route path="/admindashboard" element={<Dashboardadmin />}></Route>
        <Route path="/partnerdashboard" element={<Dashboardpartner />}></Route>
        <Route path="/userdashboard" element={<Dashboarduser />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/partner/new-pickup" element={<NewPickup />} />
        <Route path="/user/new-shipment" element={<NewShipment />} />
        <Route path="/admin/partners" element={<PartnersList />} />

        {/* Add your dashboard pages here */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
