import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Database,
  CalendarDays,
  ClipboardCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const SidebarSuperadmin = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F4A261] text-white shadow"
      : "text-[#3E3E3E] hover:bg-[#F4A261]/20";

  return (
    <>
      {/* BUTTON MOBILE */}
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
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#FDF8F1] z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >

        {/* CLOSE BUTTON MOBILE */}
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

          <h2 className="text-[#8D6E63] font-bold text-base tracking-wide text-center">
            SUPER ADMIN
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            SAUNG SMANIKE
          </p>
        </div>

        {/* MENU */}
        <div className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto">

          {/* DASHBOARD */}
          <Link
            to="/superadmin/Dashboard-superadmin"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/superadmin/Dashboard-superadmin')}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-sm">Dashboard</span>
            </div>
          </Link>

          {/* USERS */}
          <Link
            to="/superadmin/Users-superadmin"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/superadmin/Users-superadmin')}`}
            >
              <Users size={20} />
              <span className="text-sm">Users</span>
            </div>
          </Link>

          {/* MASTER DATA */}
          <Link
            to="/superadmin/MasterData-superadmin"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/superadmin/MasterData-superadmin')}`}
            >
              <Database size={20} />
              <span className="text-sm">Master Data</span>
            </div>
          </Link>

          {/* JADWAL */}
          <Link
            to="/superadmin/Jadwal-superadmin"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/superadmin/Jadwal-superadmin')}`}
            >
              <CalendarDays size={20} />
              <span className="text-sm">Jadwal</span>
            </div>
          </Link>

          {/* PRESENSI */}
          <Link
            to="/superadmin/Presensi-superadmin"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/superadmin/Presensi-superadmin')}`}
            >
              <ClipboardCheck size={20} />
              <span className="text-sm">Presensi</span>
            </div>
          </Link>

        </div>

        {/* LOGOUT */}
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

export default SidebarSuperadmin;