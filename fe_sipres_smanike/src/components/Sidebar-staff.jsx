import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  FileText,
  Archive,
  BarChart3,
  LogOut, 
  ChevronDown,
  UserCheck // Tambahkan icon UserCheck
} from 'lucide-react';

const SidebarTU = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    verifikasiUser: true, // Tambahkan state untuk menu verifikasi user
    verifikasiSurat: true,
    generateSurat: true,
    arsipSurat: true,
    presensi: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F4A261] text-white shadow"
      : "text-[#3E3E3E] hover:bg-[#F4A261]/20";

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#FDF8F1] flex flex-col border-r z-40">

      {/* HEADER */}
      <div className="flex flex-col items-center py-8 border-b">
        <img
          src="/assets/logo_saung.png"
          alt="Logo"
          className="w-[100px] h-[100px] object-contain"
        />
        <h2 className="text-[#8D6E63] font-bold text-base tracking-wide text-center">
          SAUNG SMANIKE
        </h2>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 mt-4 space-y-2 overflow-y-auto">

        {/* DASHBOARD */}
        <Link to="/staff/Dashboard-staff">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/staff/Dashboard-staff')}`}>
            <LayoutDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>

        {/* VERIFIKASI USER (MENU BARU) */}
        <div>
          <div
            onClick={() => toggleMenu('verifikasiUser')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <UserCheck size={20} />
              <span className="text-sm font-semibold">Verifikasi Akun</span>
            </div>
            <ChevronDown className={`transition ${openMenus.verifikasiUser ? "rotate-180" : ""}`} />
          </div>

          {openMenus.verifikasiUser && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/staff/VerifikasiUser">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/verifikasi-user')}`}>
                  <UserCheck size={16} /> Daftar Tunggu
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* VERIFIKASI SURAT */}
        <div>
          <div
            onClick={() => toggleMenu('verifikasiSurat')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <FileCheck size={20} />
              <span className="text-sm">Verifikasi Surat</span>
            </div>
            <ChevronDown className={`transition ${openMenus.verifikasiSurat ? "rotate-180" : ""}`} />
          </div>

          {openMenus.verifikasiSurat && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/staff/AjuanSurat-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/AjuanSurat-staff')}`}>
                  <ClipboardList size={16} /> Daftar Ajuan
                </div>
              </Link>

              <Link to="/staff/RiwayatVerifikasi-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/RiwayatVerifikasi-staff')}`}>
                  <History size={16} /> Riwayat
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* GENERATE SURAT */}
        <div>
          <div
            onClick={() => toggleMenu('generateSurat')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="text-sm">Generate Surat</span>
            </div>
            <ChevronDown className={`transition ${openMenus.generateSurat ? "rotate-180" : ""}`} />
          </div>

          {openMenus.generateSurat && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/staff/GenerateSurat-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/GenerateSurat-staff')}`}>
                  <FileText size={16} /> Buat Surat
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* ARSIP SURAT */}
        <div>
          <div
            onClick={() => toggleMenu('arsipSurat')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <Archive size={20} />
              <span className="text-sm">Arsip Surat</span>
            </div>
            <ChevronDown className={`transition ${openMenus.arsipSurat ? "rotate-180" : ""}`} />
          </div>

          {openMenus.arsipSurat && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/staff/ArsipSurat-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/ArsipSurat-staff')}`}>
                  <Archive size={16} /> Semua Surat
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* PRESENSI */}
        <div>
          <div
            onClick={() => toggleMenu('presensi')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={20} />
              <span className="text-sm">Presensi</span>
            </div>
            <ChevronDown className={`transition ${openMenus.presensi ? "rotate-180" : ""}`} />
          </div>

          {openMenus.presensi && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/staff/RekapHarian-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/RekapHarian-staff')}`}>
                  <History size={16} /> Rekap Harian
                </div>
              </Link>

              <Link to="/staff/LaporanPresensi-staff">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/LaporanPresensi-staff')}`}>
                  <ClipboardList size={16} /> Laporan
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* LOGOUT */}
      <div className="px-3 pb-6">
        <Link to="/login">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3E3E3E] hover:bg-red-400 hover:text-white transition">
            <LogOut size={20} />
            <span className="text-sm">Keluar</span>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default SidebarTU;