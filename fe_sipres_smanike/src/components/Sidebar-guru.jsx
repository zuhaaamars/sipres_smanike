import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  CalendarCheck, 
  BookOpenCheck, 
  LogOut,
  ChevronDown 
} from 'lucide-react';

const SidebarGuru = () => {
  const location = useLocation();

  const [isPiket] = useState(true);

  const [openMenus, setOpenMenus] = useState({
    verifikasiSurat: true,
    presensiMapel: false
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
        <Link to="/guru/Dashboard-guru">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/guru/Dashboard-guru')}`}>
            <LayoutDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>

        {/* VERIFIKASI SURAT */}
        <div>
          <div
            onClick={() => toggleMenu('verifikasiSurat')}
            className="flex items-center justify-between px-4 py-3 text-[#3E3E3E] hover:bg-[#F4A261]/20 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileCheck size={20} />
              <span className="text-sm">Verifikasi Surat</span>
            </div>
            <ChevronDown className={`transition ${openMenus.verifikasiSurat ? "rotate-180" : ""}`} />
          </div>

          {openMenus.verifikasiSurat && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/guru/AjuanSurat-guru">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/guru/AjuanSurat-guru')}`}>
                  <ClipboardList size={16} /> Daftar Ajuan
                </div>
              </Link>

              <Link to="/guru/RiwayatVerifikasi-guru">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/guru/RiwayatVerifikasi-guru')}`}>
                  <History size={16} /> Riwayat
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* REKAP HARIAN */}
        {isPiket && (
          <Link to="/guru/RekapHarian-guru">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/guru/RekapHarian-guru')}`}>
              <CalendarCheck size={20} />
              <span className="text-sm">Rekap Harian</span>
            </div>
          </Link>
        )}

        {/* PRESENSI MAPEL */}
        <div>
          <div
            onClick={() => toggleMenu('presensiMapel')}
            className="flex items-center justify-between px-4 py-3 text-[#3E3E3E] hover:bg-[#F4A261]/20 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <BookOpenCheck size={20} />
              <span className="text-sm">Presensi Mapel</span>
            </div>
            <ChevronDown className={`transition ${openMenus.presensiMapel ? "rotate-180" : ""}`} />
          </div>

          {openMenus.presensiMapel && (
            <div className="ml-8 mt-2 space-y-1">
              <Link to="/guru/GenerateBarcodeMapel-guru">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/guru/GenerateBarcodeMapel-guru')}`}>
                  <ClipboardList size={16} /> Generate QR
                </div>
              </Link>

              <Link to="/guru/RekapMapel-guru">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/guru/RekapMapel-guru')}`}>
                  <History size={16} /> Rekap Presensi
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* 🔥 LOGOUT */}
      <div className="px-3 pb-6">
        <Link to="/login">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3E3E3E] hover:bg-red-400 hover:text-white transition cursor-pointer">
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default SidebarGuru;