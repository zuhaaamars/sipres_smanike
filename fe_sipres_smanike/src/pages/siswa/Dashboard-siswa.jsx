import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User, QrCode, CheckCircle, LogOut, Bell
} from 'lucide-react';

const DashboardSiswa = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [presensi, setPresensi] = useState(null);
  const [ringkasan, setRingkasan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("user_role");

      if (!token || role !== "siswa") {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/dashboard/siswa", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.status === "success") {
          setNama(res.data.data.nama);
          setPresensi(res.data.data.presensi_harian);
          setRingkasan(res.data.data.ringkasan);
        }

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const formatJam = (jam) => {
    if (!jam) return "Belum";
    return jam.slice(0, 5) + " WIB";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin h-10 w-10 border-4 border-[#0f3d3a] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">

      {/* ================= TOPBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white border-b flex justify-end items-center px-6 shadow-sm">

        <div className="flex items-center gap-4">
          <Bell className="text-slate-400" size={20} />

          <div className="flex items-center gap-3 border-l pl-4">

            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-400">Siswa</p>
              <p className="text-sm font-bold text-[#0f3d3a]">{nama}</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={20} />
            </div>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-red-500 hover:text-red-600"
            >
              <LogOut size={18} />
            </button>

          </div>
        </div>

      </nav>

      {/* ================= MAIN ================= */}
      <main className="pt-20 px-4 md:px-8 pb-10 max-w-7xl md:ml-64">

        {/* HERO */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#0f172a]">
            Selamat Datang, <br />
            <span className="text-[#0f3d3a]">{nama}!</span>
          </h1>

          <p className="text-slate-500 mt-2 font-semibold">
            Berikut status presensimu hari ini
          </p>
        </div>

        {/* RINGKASAN */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <p className="text-xs text-slate-400">Hadir Bulan Ini</p>
            <p className="text-2xl font-bold text-green-600">
              {ringkasan?.hadir ?? 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <p className="text-xs text-slate-400">Belum Pulang</p>
            <p className="text-2xl font-bold text-yellow-500">
              {ringkasan?.belum_pulang ?? 0}
            </p>
          </div>

        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ================= PRESENSI HARIAN ================= */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col">

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <QrCode className="text-orange-500" size={26} />
                <h3 className="text-xl font-bold text-[#0f172a]">
                  Presensi Harian
                </h3>
              </div>

              <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
                Selfie + GPS
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-5">
              Presensi dilakukan menggunakan <b>selfie wajah</b> dan validasi <b>geofencing lokasi sekolah</b>.
            </p>

            <div className="space-y-3">

              <div className="flex justify-between bg-slate-50 p-4 rounded-xl border">
                <span className="text-slate-600">Masuk</span>
                <span className="text-green-600 font-bold">
                  {formatJam(presensi?.jam_masuk)}
                </span>
              </div>

              <div className="flex justify-between bg-slate-50 p-4 rounded-xl border">
                <span className="text-slate-600">Pulang</span>
                <span className="text-slate-400 font-medium">
                  {formatJam(presensi?.jam_pulang)}
                </span>
              </div>

            </div>

            <div className="mt-6 text-sm">
              Status:
              <span className="ml-2 font-semibold text-[#0f3d3a]">
                {presensi?.status || "Belum Absen"}
              </span>
            </div>

          </div>

          {/* ================= PRESENSI MAPEL ================= */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col">

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-600" size={26} />
                <h3 className="text-xl font-bold text-[#0f172a]">
                  Presensi Mapel
                </h3>
              </div>

              <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full font-semibold">
                Barcode Scan
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-5">
              Presensi dilakukan dengan <b>scan barcode per mata pelajaran</b>.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm border-dashed border-2 rounded-xl p-6">

              <QrCode size={40} className="mb-2 text-slate-300" />

              <p className="text-center">
                Belum ada aktivitas presensi mapel hari ini
              </p>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DashboardSiswa;