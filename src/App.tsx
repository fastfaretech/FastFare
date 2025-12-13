import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DashboardLayout from './components/DashboardLayout';
import CreateAdmin from './pages/CreateAdmin';
import Dashboardadmin from "./pages/DashboardAdmin";
import Dashboardpartner from "./pages/DashboardPartner";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboardlayout" element={<DashboardLayout children={undefined} />}></Route>
        <Route path="/admin/create-admin" element={<CreateAdmin />}></Route>
        <Route path="/admindashboard" element={<Dashboardadmin/>}></Route>
        <Route path="/partnerdashboard" element={<Dashboardpartner/>}></Route>
                            
          {/* Add your dashboard pages here */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
