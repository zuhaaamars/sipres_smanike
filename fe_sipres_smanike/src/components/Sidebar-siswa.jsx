import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  History, 
  BookOpen, 
  LogOut, 
  CalendarCheck,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

const SidebarSiswa = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    esurat: true,
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F4A261] text-white shadow"
      : "text-[#3E3E3E] hover:bg-[#F4A261]/20";

  return (
    <>
      {/* 🔥 BUTTON MOBILE */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-0 left-0 h-screen w-64 bg-[#FDF8F1] z-50"
      >
        <Menu />
      </button>

      {/* 🔥 OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-[#FDF8F1] z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col
      `}>

        {/* ❌ CLOSE BUTTON (mobile) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* 🔥 HEADER + MENU */}
        <div className="flex-1 flex flex-col">

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
          <div className="mt-4 px-3 space-y-2 overflow-y-auto">

            <Link to="/siswa/Dashboard-siswa" onClick={() => setIsOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/siswa/Dashboard-siswa')}`}>
                <LayoutDashboard size={20} />
                <span className="text-sm">Dashboard</span>
              </div>
            </Link>

            {/* E-SURAT */}
            <div>
              <div
                onClick={() => toggleMenu('esurat')}
                className="flex items-center justify-between px-4 py-3 text-[#3E3E3E] hover:bg-[#F4A261]/20 rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} />
                  <span className="text-sm">E-Surat</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition ${openMenus.esurat ? "rotate-180" : ""}`}
                />
              </div>

              {openMenus.esurat && (
                <div className="ml-8 mt-2 space-y-1">

                  <Link to="/siswa/AjuanSurat-siswa" onClick={() => setIsOpen(false)}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/siswa/AjuanSurat-siswa')}`}>
                      <Plus size={16} /> Buat Ajuan
                    </div>
                  </Link>

                  <Link to="/siswa/RiwayatSurat-siswa" onClick={() => setIsOpen(false)}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/siswa/RiwayatSurat-siswa')}`}>
                      <History size={16} /> Riwayat
                    </div>
                  </Link>

                </div>
              )}
            </div>

            <Link to="/siswa/PresensiHarian-siswa" onClick={() => setIsOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/siswa/PresensiHarian-siswa')}`}>
                <CalendarCheck size={20} />
                <span className="text-sm">Presensi Harian</span>
              </div>
            </Link>

            <Link to="/siswa/PresensiMapel-siswa" onClick={() => setIsOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/siswa/PresensiMapel-siswa')}`}>
                <BookOpen size={20} />
                <span className="text-sm">Presensi Mapel</span>
              </div>
            </Link>

          </div>
        </div>

        {/* 🔥 LOGOUT (FIXED DI BAWAH TANPA BOLONG) */}
        <div className="px-3 pb-6">
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3E3E3E] hover:bg-red-400 hover:text-white transition">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default SidebarSiswa;