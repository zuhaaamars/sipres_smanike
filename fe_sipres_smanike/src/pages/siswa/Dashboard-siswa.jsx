import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mail, User, QrCode, Clock, CheckCircle, LogOut, Bell
} from 'lucide-react';

const DashboardSiswa = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("user_role");

      if (!token || role !== "siswa") {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.status === "success") {
          setNama(res.data.data.nama_lengkap);
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

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin h-10 w-10 border-4 border-[#0f3d3a] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">

      {/* TOPBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white border-b flex justify-end items-center px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Bell className="text-slate-400" size={20} />

          <div className="flex items-center gap-3 border-l pl-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-400">Siswa</p>
              <p className="text-sm font-bold text-[#0f3d3a]">
                {nama}
              </p>
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

      {/* MAIN */}
      <main className="pt-20 px-4 md:px-8 pb-10 max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#0f172a]">
            Selamat Datang, <br />
            <span className="text-[#0f3d3a]">{nama}!</span>
          </h1>
          <p className="text-slate-500 mt-2 font-semibold">
            Apa agenda belajarmu hari ini?
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* PRESENSI */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border shadow-sm flex flex-col">
            <div className="flex justify-between mb-6">
              <QrCode className="text-orange-500" size={28} />
              <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                Wajib Harian
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">Presensi Harian</h3>
            <p className="text-sm text-slate-400 mb-6">
              Pastikan GPS aktif saat scan
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                <span>Masuk</span>
                <span className="text-green-600 font-bold">07:15 WIB</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                <span>Pulang</span>
                <span className="text-slate-400 italic">Belum</span>
              </div>
            </div>

            <button className="mt-auto bg-[#0f3d3a] text-white py-3 rounded-xl hover:bg-[#0a2b29]">
              Scan Sekarang
            </button>
          </div>

          {/* MAPEL */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border shadow-sm flex flex-col">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Mata Pelajaran</h3>
              <CheckCircle className="text-teal-600" />
            </div>

            <div className="space-y-3 flex-1">
              {[
                { name: "Matematika", time: "07:30 - 09:00", status: "Hadir" },
                { name: "Bahasa Inggris", time: "09:00 - 10:30", status: "Hadir" },
                { name: "Seni Budaya", time: "10:45 - 12:15", status: "Belum" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded ${
                    item.status === "Hadir"
                      ? "bg-teal-100 text-teal-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 flex items-center justify-center gap-2">
              <QrCode size={18} /> Scan Mapel
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* SURAT */}
            <div className="bg-[#38bdf8] text-white p-6 rounded-3xl shadow">
              <Mail size={40} className="mb-3 opacity-80" />
              <h4 className="text-lg font-bold">Ajuan Surat</h4>
              <p className="text-sm opacity-80">2 proses • 5 selesai</p>

              <button className="mt-4 w-full bg-white text-[#38bdf8] py-2 rounded-xl font-bold">
                Buat Surat
              </button>
            </div>

            {/* PENGUMUMAN */}
            <div className="bg-white p-6 rounded-3xl border shadow-sm">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500">
                <Bell size={16} /> Pengumuman
              </h4>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="font-semibold text-[#0f3d3a]">
                  Ujian Tengah Semester
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> 15 Mei 2026
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardSiswa;