import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserCheck,
  School,
  Users,
  BookOpen,
  LogOut
} from 'lucide-react';

const SidebarMaster = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F4A261] text-white shadow"
      : "text-[#3E3E3E] hover:bg-[#F4A261]/20";

  return (
    <div className="w-64 bg-[#FDF8F1] flex flex-col h-screen border-r">

      {/* HEADER (SAMA DENGAN SISWA) */}
      <div className="flex flex-col items-center py-8 border-b">
        <img
          src="/assets/logo smanike.png"
          alt="Logo SMANIKE"
          className="w-[100px] h-[100px] object-contain"
        />
        <h2 className="text-[#8D6E63] font-bold text-base tracking-wide text-center">
          MASTER DATA
        </h2>
      </div>

      {/* MENU */}
      <div className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto">

        <Link to="/master/DataMapel-master">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive('/master/DataMapel-master')}`}>
            <BookOpen size={20} />
            <span className="text-sm">Data Mapel</span>
          </div>
        </Link>

      </div>

      {/* FOOTER */}
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

export default SidebarMaster;