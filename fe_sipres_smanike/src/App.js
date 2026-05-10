import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Komponen
import Navbar from './components/navbar.jsx'; 
import SidebarSiswa from './components/Sidebar-siswa.jsx'; 
import SidebarGuru from './components/Sidebar-guru.jsx'; 
import SidebarTU from './components/Sidebar-staff.jsx';
import SidebarSuperadmin from './components/Sidebar-superadmin.jsx';

// Import Pages LOGIN DAN DAFTAR
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Daftar from './pages/Daftar';

// Import Pages role SISWA
import DaftarSiswa from './pages/siswa/Daftar-siswa';
import DashboardSiswa from './pages/siswa/Dashboard-siswa.jsx'; 
import ScanPresensiHarian from './pages/siswa/PresensiHarian-siswa.jsx';
import ScanPresensiMapel from './pages/siswa/PresensiMapel-siswa.jsx';

// Import Pages role GURU
import DaftarGuru from './pages/guru/Daftar-guru.jsx';
import DashboardGuru from './pages/guru/Dashboard-guru.jsx';
import GenerateQRMapel from './pages/guru/GenerateQRMapel-guru.jsx';
import RekapHarianGuru from './pages/guru/RekapHarian-guru.jsx';
import RekapMapelGuru from './pages/guru/RekapMapel-guru.jsx';

//import pages role staff
import DaftarStaff from './pages/staff/Daftar-staff';
import DashboardStaff from './pages/staff/Dashboard-staff';
import VerifikasiUser from './pages/staff/VerifikasiUser.jsx';
import ImportGuru from './pages/staff/ImportGuru.jsx';
import ImportSiswa from './pages/staff/ImportSiswa.jsx';
import ImportJam from './pages/staff/ImportJam.jsx';
import MasterMapel from './pages/staff/ImportMapel.jsx';
import JadwalPelajaran from './pages/staff/JadwalPelajaran.jsx';

//Import pages superadmin
import DashboardSuperadmin from './pages/superadmin/Dashboard-superadmin';
import UsersSuperadmin from './pages/superadmin/Users-superadmin.jsx';
import MasterDataSuperadmin from './pages/superadmin/MasterData-superadmin.jsx';
import JadwalSuperadmin from './pages/superadmin/Jadwal-superadmin.jsx';
import PresensiSuperadmin from './pages/superadmin/Presensi-superadmin.jsx';

// NAVBAR UNTUK LOGIN DAN DAFTAR
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-screen">
      {children}
    </div>
  </>
);

// SIDEBAR UNTUK SISWA
const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarSiswa />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);

// SIDEBAR UNTUK GURU
const GuruLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarGuru />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);

// Sidebar Tendik
const StaffLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarTU />
    <div className="flex-1 bg-[#f4f4f4]">
      {children}
    </div>
  </div>
);

// SIDEBAR SUPERADMIN
const SuperadminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SidebarSuperadmin />
    <div className="flex-1 bg-[#f4f4f4] md:ml-64">
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

        {/*DAFTAR PER ROLE*/}
        <Route path="/siswa/Daftar-siswa" element={<MainLayout><DaftarSiswa /></MainLayout>} />
        <Route path="/guru/Daftar-guru" element={<MainLayout><DaftarGuru /></MainLayout>} />
        <Route path="/staff/Daftar-staff" element={<MainLayout><DaftarStaff/></MainLayout>} />
        
        {/* --- SISWA ROUTES --- */}
        <Route path="/siswa/Dashboard-siswa" element={<DashboardLayout><DashboardSiswa /></DashboardLayout>} />
        <Route path="/siswa/PresensiHarian-siswa" element={<DashboardLayout><ScanPresensiHarian /></DashboardLayout>} />
        <Route path="/siswa/PresensiMapel-siswa" element={<DashboardLayout><ScanPresensiMapel /></DashboardLayout>} />

        {/* --- GURU ROUTES --- */}
        <Route path="/guru/Dashboard-guru" element={<GuruLayout><DashboardGuru /></GuruLayout>} />
        <Route path="/guru/RekapHarian-guru" element={<GuruLayout><RekapHarianGuru /></GuruLayout>} />
        <Route path="/guru/GenerateBarcodeMapel-guru" element={<GuruLayout><GenerateQRMapel /></GuruLayout>} />
        <Route path="/guru/RekapMapel-guru" element={<GuruLayout><RekapMapelGuru /></GuruLayout>} />

        {/* --- Staff (ROUTES) --- */}
        <Route path="/staff/Dashboard-staff" element={<StaffLayout><DashboardStaff/></StaffLayout>} />
        <Route path="/staff/VerifikasiUser" element={<StaffLayout><VerifikasiUser/></StaffLayout>} />
        <Route path="/staff/ImportGuru" element={<StaffLayout><ImportGuru/></StaffLayout>} />
        <Route path="/staff/ImportSiswa" element={<StaffLayout><ImportSiswa/></StaffLayout>} />
        <Route path="/staff/ImportJam" element={<StaffLayout><ImportJam/></StaffLayout>} />
        <Route path="/staff/ImportMapel" element={<StaffLayout><MasterMapel/></StaffLayout>} />
        <Route path="/staff/JadwalPelajaran" element={<StaffLayout><JadwalPelajaran/></StaffLayout>} />

        {/* --- SUPERADMIN --- */}
        <Route path="/superadmin/Dashboard-superadmin" element={<SuperadminLayout><DashboardSuperadmin /></SuperadminLayout>}/>
        <Route path="/superadmin/Users-superadmin" element={<SuperadminLayout><UsersSuperadmin /></SuperadminLayout>}/>
        <Route path="/superadmin/MasterData-superadmin" element={<SuperadminLayout><MasterDataSuperadmin /></SuperadminLayout>}/>
        <Route path="/superadmin/Jadwal-superadmin" element={<SuperadminLayout><JadwalSuperadmin /></SuperadminLayout>}/>
        <Route path="/superadmin/Presensi-superadmin" element={<SuperadminLayout><PresensiSuperadmin /></SuperadminLayout>}/>

      </Routes>
    </Router>
  );
}

export default App;