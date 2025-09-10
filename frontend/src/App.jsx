import {Navigate, Route, Routes} from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import MedicinePage from "./pages/MedicinePage";
import MedicineDetailPage from "./pages/MedicineDetailPage";
import AddMedicinePage from "./pages/AddMedicinePage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import ConsultationRoom from "./pages/ConsultationRoom";
import AiConsultPage from "./pages/AiConsultPage";
import AdminDashboard from "./pages/AdminDashboard";
import JitsiMeet from "./pages/JitsiMeet";
const App = () => {

  const {authUser, checkAuth} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/medicines" element={authUser ? <MedicinePage /> : <Navigate to="/login" />} />
        <Route path="/medicines/:id" element={authUser ? <MedicineDetailPage /> : <Navigate to="/login" />} />
        <Route path="/medicines/add" element={authUser ? <AddMedicinePage /> : <Navigate to="/login" />} />
        {/* <Route path="/meeting/:roomName" element={authUser ? <ConsultationRoom /> : <Navigate to="/login" />} /> */}
        <Route path="/doctors" element={authUser ? <DoctorsPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={authUser ? <DoctorDashboard /> : <Navigate to="/login" />} />
        <Route path="/ai-consult" element={authUser ? <AiConsultPage /> : <Navigate to="/login" />} />

        <Route path="/doctor/approval" element={authUser ? <AdminDashboard /> : <Navigate to="/login" />} />

        <Route path="/meeting/:name" element={authUser ? <JitsiMeet  /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App