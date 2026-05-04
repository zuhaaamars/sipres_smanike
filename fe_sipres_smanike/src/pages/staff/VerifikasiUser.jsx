import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, User, Shield, Loader2 } from 'lucide-react';

const VerifikasiUser = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Ambil daftar user yang belum diverifikasi
  const fetchPendingUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/auth/pending-users');
      setPendingUsers(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert("Gagal mengambil daftar pendaftar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // Fungsi untuk menyetujui user
  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/approve/${userId}`);
      alert(response.data.message);
      // Update list lokal agar user yang sudah di-approve hilang dari daftar
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch (error) {
      alert("Gagal memverifikasi user");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] pt-28 pb-10 px-5 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-[#E67E22]" size={32} />
          <h1 className="text-3xl font-extrabold text-[#3e2723]">
            VERIFIKASI <span className="text-[#E67E22]">AKUN BARU</span>
          </h1>
        </div>

        <div className="bg-white rounded-[25px] shadow-xl border-2 border-[#3e2723]/10 overflow-hidden">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center text-[#8d6e63]">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold text-lg">Memuat data pendaftar...</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="p-20 text-center text-[#8d6e63]">
              <XCircle className="mx-auto mb-4 opacity-20" size={60} />
              <p className="font-bold text-xl text-[#3e2723]">Tidak ada antrean verifikasi</p>
              <p>Semua pendaftar baru telah diproses.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#3e2723] text-white">
                    <th className="py-5 px-6 font-bold uppercase text-sm tracking-wider">Nama / Username</th>
                    <th className="py-5 px-6 font-bold uppercase text-sm tracking-wider">Role</th>
                    <th className="py-5 px-6 font-bold uppercase text-sm tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#f5e6d3]/20 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#efebe9] flex items-center justify-center text-[#3e2723]">
                            <User size={20} />
                          </div>
                          <span className="font-bold text-[#3e2723]">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                          user.role === 'siswa' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => handleApprove(user.id)}
                          disabled={actionLoading === user.id}
                          className="inline-flex items-center gap-2 bg-[#27ae60] hover:bg-[#219150] text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === user.id ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            <CheckCircle size={18} />
                          )}
                          SETUJUI
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <p className="mt-6 text-center text-sm text-[#8d6e63]">
          Menampilkan {pendingUsers.length} pendaftar yang membutuhkan persetujuan.
        </p>
      </div>
    </div>
  );
};

export default VerifikasiUser;