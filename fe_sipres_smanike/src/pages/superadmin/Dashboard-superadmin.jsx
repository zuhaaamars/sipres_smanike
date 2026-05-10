import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  UserCheck,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  CalendarDays
} from 'lucide-react';

const DashboardSuperadmin = () => {

  // =========================
  // STATE DASHBOARD
  // =========================
  const [dashboard, setDashboard] = useState({
    users: 0,
    guru: 0,
    siswa: 0,
    mapel: 0,
    jam: 0,
    jadwal: 0,
    presensi: 0
  });

  // =========================
  // FETCH DASHBOARD
  // =========================
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/dashboard');
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:ml-64">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3E3E3E]">
          Dashboard Super Admin
        </h1>

        <p className="text-gray-500 mt-2">
          Monitoring seluruh data sistem SAUNG SMANIKE
        </p>
      </div>

      {/* CARD STATISTIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* USERS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.users}
              </h2>
            </div>
            <div className="bg-[#F4A261]/20 p-4 rounded-xl">
              <Users className="text-[#F4A261]" size={28} />
            </div>
          </div>
        </div>

        {/* GURU */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Guru</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.guru}
              </h2>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <UserCheck className="text-blue-500" size={28} />
            </div>
          </div>
        </div>

        {/* SISWA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Siswa</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.siswa}
              </h2>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <GraduationCap className="text-green-500" size={28} />
            </div>
          </div>
        </div>

        {/* PRESENSI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Presensi Hari Ini</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.presensi}
              </h2>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl">
              <ClipboardCheck className="text-purple-500" size={28} />
            </div>
          </div>
        </div>

        {/* MAPEL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Mapel</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.mapel}
              </h2>
            </div>
            <div className="bg-yellow-100 p-4 rounded-xl">
              <BookOpen className="text-yellow-500" size={28} />
            </div>
          </div>
        </div>

        {/* JADWAL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jadwal Pelajaran</p>
              <h2 className="text-3xl font-bold text-[#3E3E3E] mt-2">
                {dashboard.jadwal}
              </h2>
            </div>
            <div className="bg-red-100 p-4 rounded-xl">
              <CalendarDays className="text-red-500" size={28} />
            </div>
          </div>
        </div>

      </div>

      {/* TABEL AKTIVITAS */}
      <div className="bg-white rounded-2xl shadow-sm border mt-8 p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#3E3E3E]">
            Aktivitas Sistem
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-3">User</th>
                <th className="pb-3">Aktivitas</th>
                <th className="pb-3">Waktu</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-[#3E3E3E]">

              <tr className="border-b">
                <td className="py-4">Admin TU</td>
                <td>Menambahkan data siswa</td>
                <td>08:15 WIB</td>
                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Berhasil
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Guru Matematika</td>
                <td>Input presensi mapel</td>
                <td>09:00 WIB</td>
                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Berhasil
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Siswa XI RPL 1</td>
                <td>Scan QR Presensi</td>
                <td>09:30 WIB</td>
                <td>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    Tercatat
                  </span>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default DashboardSuperadmin;