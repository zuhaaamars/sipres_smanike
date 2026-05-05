import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckCircle,
  UserCheck,
  Bell
} from 'lucide-react';

const DashboardStaff = () => {

  const [pendingUsers, setPendingUsers] = useState([]);
  const [summary, setSummary] = useState({
    total_user: 0,
    pending_verifikasi: 0,
    hadir: 0,
    belum: 0,
    alpha: 0
  });

  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/auth/pending-users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.status === "success") {
          setPendingUsers(res.data.data);

          setSummary(prev => ({
            ...prev,
            pending_verifikasi: res.data.data.length
          }));
        }

      } catch (err) {
        console.error("Error fetch pending users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 APPROVE USER
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/auth/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // hapus dari list
      setPendingUsers(prev => prev.filter(user => user.id !== id));

      // update summary
      setSummary(prev => ({
        ...prev,
        pending_verifikasi: prev.pending_verifikasi - 1
      }));

    } catch (err) {
      console.error("Approve gagal:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">

      {/* TOPBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-40 bg-white border-b flex justify-end items-center px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Bell className="text-slate-400" size={20} />
          <p className="text-sm font-bold text-[#0f3d3a]">Staff</p>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-20 px-4 md:px-8 pb-10 max-w-7xl md:ml-64">

        {/* HERO */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#0f172a]">
            Dashboard Staff
          </h1>
          <p className="text-slate-500 mt-2 font-semibold">
            Monitoring presensi & verifikasi user
          </p>
        </div>

        {/* 🔥 SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <p className="text-xs text-slate-400">Pending Verifikasi</p>
            <p className="text-2xl font-bold text-orange-500">
              {summary.pending_verifikasi}
            </p>
          </div>

        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* VERIFIKASI USER */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Verifikasi User</h3>
              <UserCheck className="text-orange-500" />
            </div>

            {pendingUsers.length > 0 ? (
              <div className="space-y-3">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-4 border rounded-xl"
                  >
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                    </div>

                    <button
                      onClick={() => handleApprove(user.id)}
                      className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Tidak ada user pending</p>
            )}
          </div>

          {/* LAPORAN PRESENSI (DUMMY DULU) */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm flex flex-col">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Laporan Presensi</h3>
              <CheckCircle className="text-teal-600" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                <span>Hadir</span>
                <span className="text-green-600 font-bold">-</span>
              </div>

              <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                <span>Belum Presensi</span>
                <span className="text-yellow-500 font-bold">-</span>
              </div>

              <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
                <span>Alpha</span>
                <span className="text-red-500 font-bold">-</span>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DashboardStaff;