import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  Users,
  Pencil,
  Trash2,
  UserPlus
} from 'lucide-react';

const UsersSuperadmin = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5001/api/auth/users'
      );

      if (response.data.status === 'success') {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data users');
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Yakin ingin menghapus user ini?'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/auth/users/${id}`
      );

      alert('User berhasil dihapus');

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus user');
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // FILTER SEARCH
  // =========================
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:ml-64">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-[#3E3E3E]">
            Manajemen Users
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola seluruh akun pengguna sistem
          </p>
        </div>

        {/* BUTTON TAMBAH */}
        <button className="bg-[#F4A261] hover:bg-[#e3914c] text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <UserPlus size={20} />
          Tambah User
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">

        <div className="flex items-center gap-3 border rounded-xl px-4 py-3">

          <Search className="text-gray-400" size={20} />

          <input
            type="text"
            placeholder="Cari user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="p-6 border-b flex items-center gap-3">
          <Users className="text-[#F4A261]" />

          <h2 className="text-xl font-semibold text-[#3E3E3E]">
            Data Users
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-6 py-4">No</th>
                <th className="text-left px-6 py-4">Username</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Verifikasi</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-[#3E3E3E]">

              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {user.username}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.is_verified
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {user.is_verified
                        ? 'Terverifikasi'
                        : 'Pending'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.is_active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {user.is_active
                        ? 'Aktif'
                        : 'Nonaktif'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 p-2 rounded-lg transition">
                        <Pencil size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default UsersSuperadmin;