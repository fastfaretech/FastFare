import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Home";
import DashboardLayout from './components/DashboardLayout';
import CreateAdmin from './pages/CreateAdmin';
import Dashboardadmin from "./pages/DashboardAdmin";
import Dashboardpartner from "./pages/DashboardPartner";
import Dashboarduser from "./pages/DashboardUser";
import Login from "./pages/Login";
import NewPickup from "./pages/NewPickup";
import NewShipment from "./pages/NewShipment";
import PartnersList from "./pages/PartnersList";
import Register from "./pages/Register";
import ShipmentsList from "./pages/ShipmentsList";
import UserDetails from "./pages/UserDetails";
import UsersList from "./pages/UsersList";
import AppLayout from "./layouts/AppLayout";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";



function App() {
  return (
    <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="/dashboardlayout" element={<DashboardLayout children={undefined} />}></Route>

        <Route
          path="/admin/create-admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CreateAdmin />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Dashboardadmin />
            </RoleProtectedRoute>
          }/>
          <Route
            path="/partner"
            element={
              <RoleProtectedRoute allowedRoles={["partner"]}>
                <Dashboardpartner/>
              </RoleProtectedRoute>
            }/>

          <Route
            path="/user"
            element={
              <RoleProtectedRoute allowedRoles={["user"]}>
                <Dashboarduser />
              </RoleProtectedRoute>
            }/>

        <Route path="/login" element={<Login />}></Route>

           <Route path="/partner/new-pickup" element={
              <RoleProtectedRoute allowedRoles={["partner"]}>
                <NewPickup/>
              </RoleProtectedRoute> }/>       

         <Route path="/user/new-shipment"
            element={
              <RoleProtectedRoute allowedRoles={["user"]}>
                <NewShipment />
              </RoleProtectedRoute>
            }/>

        <Route path="/register" element={<Register />}></Route>

          <Route path="/admin/shipments"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ShipmentsList />
            </RoleProtectedRoute>
          } />

           <Route path="/user/userdetails"
            element={
              <RoleProtectedRoute allowedRoles={["user"]}>
                <UserDetails />
              </RoleProtectedRoute>
            }/> 
            
            <Route path="/admin/users" element={
             <RoleProtectedRoute allowedRoles={["admin"]}>
               <UsersList />
             </RoleProtectedRoute>
             }/>

        <Route
          path="/admin/partners"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <PartnersList />
            </RoleProtectedRoute>
          }
        />

      </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
