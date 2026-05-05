import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Komponen
import Navbar from './components/navbar.jsx'; 
import SidebarSiswa from './components/Sidebar-siswa.jsx'; 
import SidebarMaster from './components/Sidebar-master.jsx'; 
import SidebarGuru from './components/Sidebar-guru.jsx'; 
import SidebarTU from './components/Sidebar-staff.jsx';

// Import Pages LOGIN DAN DAFTAR
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Daftar from './pages/Daftar';

// Import Pages role SISWA
import DaftarSiswa from './pages/siswa/Daftar-siswa';
import DashboardSiswa from './pages/siswa/Dashboard-siswa.jsx'; 
import ScanPresensiHarian from './pages/siswa/PresensiHarian-siswa.jsx';
import ScanPresensiMapel from './pages/siswa/PresensiMapel-siswa.jsx';
import ScanQR from './pages/siswa/ScanQRMapel-siswa.jsx';

// Import Pages role GURU
import DaftarGuru from './pages/guru/Daftar-guru.jsx';
import DashboardGuru from './pages/guru/Dashboard-guru.jsx';
import GenerateQRMapel from './pages/guru/GenerateQRMapel-guru.jsx';
import RekapHarianGuru from './pages/guru/RekapHarian-guru.jsx';
import RekapMapelGuru from './pages/guru/RekapMapel-guru.jsx';

//import pages role staff
import DaftarStaff from './pages/staff/Daftar-staff';
import VerifikasiUser from './pages/staff/VerifikasiUser.jsx';


//import pages role master
import DataMapel from './pages/master/DataMapel.jsx';


// 1. NAVBAR UNTUK LOGIN DAN DAFTAR
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-screen">
      {children}
    </div>
  </>
);

// 2. SIDEBAR UNTUK SISWA
const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarSiswa />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);

// 3. SIDEBAR UNTUK GURU
const GuruLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarGuru />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);

// 5. Sidebar Tendik
const StaffLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarTU />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);


//7. Si debar master
const MasterLayout = ({ children }) => (
  <div 
    className="master-container" 
    style={{ display: 'flex', minHeight: '100vh' }}
  >
    <SidebarMaster/>

    <div 
      className="master-main-content" 
      style={{ flex: 1, backgroundColor: '#f4f4f4' }}
    >
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/Login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/daftar" element={<MainLayout><Daftar /></MainLayout>} />
        
        {/* --- SISWA ROUTES --- */}
        <Route path="/siswa/Daftar-siswa" element={<MainLayout><DaftarSiswa /></MainLayout>} />
        <Route path="/siswa/Dashboard-siswa" element={<DashboardLayout><DashboardSiswa /></DashboardLayout>} />
        <Route path="/siswa/PresensiHarian-siswa" element={<DashboardLayout><ScanPresensiHarian /></DashboardLayout>} />
        <Route path="/siswa/PresensiMapel-siswa" element={<DashboardLayout><ScanPresensiMapel /></DashboardLayout>} />
        <Route path="/siswa/ScanQR-siswa" element={<DashboardLayout><ScanQR/></DashboardLayout>} />

        {/* --- GURU ROUTES --- */}
        <Route path="/guru/Daftar-guru" element={<MainLayout><DaftarGuru /></MainLayout>} />
        <Route path="/guru/Dashboard-guru" element={<GuruLayout><DashboardGuru /></GuruLayout>} />
        <Route path="/guru/RekapHarian-guru" element={<GuruLayout><RekapHarianGuru /></GuruLayout>} />
        <Route path="/guru/GenerateBarcodeMapel-guru" element={<GuruLayout><GenerateQRMapel /></GuruLayout>} />
        <Route path="/guru/RekapMapel-guru" element={<GuruLayout><RekapMapelGuru /></GuruLayout>} />

        {/* --- Staff (ROUTES) --- */}
        <Route path="/staff/Daftar-staff" element={<MainLayout><DaftarStaff/></MainLayout>} />
        <Route path="/staff/VerifikasiUser" element={<StaffLayout><VerifikasiUser/></StaffLayout>} />

        {/* --- Master (ROUTES) --- */}
        <Route path="/master/DataMapel" element={<MasterLayout><DataMapel /></MasterLayout>} />


      </Routes>
    </Router>
  );
}

export default App;