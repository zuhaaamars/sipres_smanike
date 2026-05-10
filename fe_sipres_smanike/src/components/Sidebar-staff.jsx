import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Database,
  BookOpen,
  CalendarDays
} from 'lucide-react';

const SidebarTU = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    verifikasiUser: true,
    masterData: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F4A261] text-white shadow"
      : "text-[#3E3E3E] hover:bg-[#F4A261]/20";

  return (
    <>
      {/* HAMBURGER */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-4 z-[60] md:hidden bg-white p-2 rounded-lg shadow"
      >
        <Menu />
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-[#FDF8F1] z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col border-r
      `}>

        {/* CLOSE */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* HEADER */}
        <div className="flex flex-col items-center py-8 border-b">
          <img
            src="/assets/logo_saung.png"
            alt="Logo"
            className="w-[100px] h-[100px] object-contain"
          />
          <h2 className="text-[#8D6E63] font-bold text-base text-center">
            SAUNG SMANIKE
          </h2>
        </div>

        {/* MENU */}
        <div className="flex-1 px-3 mt-4 space-y-2 overflow-y-auto">

          {/* DASHBOARD */}
          <Link to="/staff/Dashboard-staff" onClick={() => setIsOpen(false)}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/staff/Dashboard-staff')}`}>
              <LayoutDashboard size={20} />
              <span className="text-sm">Dashboard</span>
            </div>
          </Link>

          {/* VERIFIKASI AKUN */}
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
                <Link to="/staff/VerifikasiUser" onClick={() => setIsOpen(false)}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/VerifikasiUser')}`}>
                    User Pending
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 🔥 MASTER DATA */}
          <div>
            <div
              onClick={() => toggleMenu('masterData')}
              className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
            >
              <div className="flex items-center gap-3">
                <Database size={20} />
                <span className="text-sm font-semibold">Master Data</span>
              </div>
              <ChevronDown className={`transition ${openMenus.masterData ? "rotate-180" : ""}`} />
            </div>

            {openMenus.masterData && (
              <div className="ml-8 mt-2 space-y-1">

                <Link to="/staff/ImportSiswa" onClick={() => setIsOpen(false)}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${isActive('/staff/ImportSiswa')}`}>
                    📥 Data Siswa
                  </div>
                </Link>

                <Link to="/staff/ImportGuru" onClick={() => setIsOpen(false)}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${isActive('/staff/ImportGuru')}`}>
                    📥 Data Guru
                  </div>
                </Link>

                <Link to="/staff/ImportJam" onClick={() => setIsOpen(false)}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${isActive('/staff/ImportJam')}`}>
                    📥 Data Jam Pelajaran
                  </div>
                </Link>

                {/* 🔥 TAMBAHAN BARU */}
                <Link to="/staff/ImportMapel" onClick={() => setIsOpen(false)}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${isActive('/staff/ImportMapel')}`}>
                    📥 Data Mata Pelajaran
                  </div>
                </Link>

                <Link to="/staff/JadwalPelajaran" onClick={() => setIsOpen(false)}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/staff/JadwalPelajaran')}`}>
                    <CalendarDays size={16} />
                    Jadwal Pelajaran
                  </div>
                </Link>

              </div>
            )}
          </div>

        </div>

        {/* LOGOUT */}
        <div className="px-3 pb-6">
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3E3E3E] hover:bg-red-400 hover:text-white transition">
              <LogOut size={20} />
              <span className="text-sm">Keluar</span>
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default SidebarTU;