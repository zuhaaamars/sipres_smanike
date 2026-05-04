import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  Users, 
  BarChart3,
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const SidebarKepsek = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    validasiSurat: true,
    monitoringSekolah: true,
    dataSekolah: false
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
        <Link to="/kepsek/Dashboard-kepsek">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/kepsek/Dashboard-kepsek')}`}>
            <LayoutDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>

        {/* VALIDASI SURAT */}
        <div>
          <div
            onClick={() => toggleMenu('validasiSurat')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <FileCheck size={20} />
              <span className="text-sm">Validasi Surat</span>
            </div>
            <ChevronDown className={`transition ${openMenus.validasiSurat ? "rotate-180" : ""}`} />
          </div>

          {openMenus.validasiSurat && (
            <div className="ml-8 mt-2 space-y-1">

              <Link to="/kepsek/DaftarValidasi">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/kepsek/DaftarValidasi')}`}>
                  <ClipboardList size={16} /> Daftar Ajuan
                </div>
              </Link>

              <Link to="/kepsek/RiwayatValidasi">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/kepsek/RiwayatValidasi')}`}>
                  <History size={16} /> Riwayat
                </div>
              </Link>

            </div>
          )}
        </div>

        {/* MONITORING SEKOLAH */}
        <div>
          <div
            onClick={() => toggleMenu('monitoringSekolah')}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span className="text-sm">Monitoring Sekolah</span>
            </div>
            <ChevronDown className={`transition ${openMenus.monitoringSekolah ? "rotate-180" : ""}`} />
          </div>

          {openMenus.monitoringSekolah && (
            <div className="ml-4 mt-2 space-y-2">

              {/* PRESENSI */}
              <Link to="/kepsek/PresensiHarian">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/kepsek/PresensiHarian')}`}>
                  <BarChart3 size={16} /> Presensi Harian
                </div>
              </Link>

              <Link to="/kepsek/PresensiMapel">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive('/kepsek/PresensiMapel')}`}>
                  <BarChart3 size={16} /> Presensi Mapel
                </div>
              </Link>

              {/* DATA SEKOLAH (NESTED DROPDOWN) */}
              <div>
                <div
                  onClick={() => toggleMenu('dataSekolah')}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-[#3E3E3E] hover:bg-[#F4A261]/20"
                >
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="text-sm">Data Sekolah</span>
                  </div>
                  <ChevronDown className={`transition ${openMenus.dataSekolah ? "rotate-180" : ""}`} />
                </div>

                {openMenus.dataSekolah && (
                  <div className="ml-6 mt-1 space-y-1">

                    <Link to="/kepsek/DataGuru">
                      <div className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive('/kepsek/DataGuru')}`}>
                        <Users size={14} /> Data Guru
                      </div>
                    </Link>

                    <Link to="/kepsek/DataTendik">
                      <div className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive('/kepsek/DataTendik')}`}>
                        <Users size={14} /> Data Tendik
                      </div>
                    </Link>

                    <Link to="/kepsek/DataKelas">
                      <div className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive('/kepsek/DataKelas')}`}>
                        <Users size={14} /> Data Kelas
                      </div>
                    </Link>

                  </div>
                )}
              </div>

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

export default SidebarKepsek;