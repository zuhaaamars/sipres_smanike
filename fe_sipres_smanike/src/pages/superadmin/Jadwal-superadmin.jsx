import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

const JadwalSuperadmin = () => {
  const [search, setSearch] = useState('');

  const jadwal = [
    {
      id: 1,
      hari: 'Senin',
      kelas: 'XI RPL 1',
      mapel: 'Matematika',
      guru: 'Budi Santoso',
      jam: '07:00 - 07:45'
    },
    {
      id: 2,
      hari: 'Senin',
      kelas: 'XI TKJ 1',
      mapel: 'Bahasa Inggris',
      guru: 'Andi Wijaya',
      jam: '08:00 - 08:45'
    },
    {
      id: 3,
      hari: 'Selasa',
      kelas: 'XI RPL 2',
      mapel: 'Pemrograman Web',
      guru: 'Dewi Lestari',
      jam: '09:00 - 09:45'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:ml-64">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-[#3E3E3E]">
            Jadwal Pelajaran
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola seluruh jadwal pelajaran sekolah
          </p>
        </div>

        <button className="bg-[#F4A261] hover:bg-[#e3914c] text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <Plus size={20} />
          Tambah Jadwal
        </button>

      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <div className="flex items-center gap-3 border rounded-xl px-4 py-3 flex-1">

            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Cari jadwal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />

          </div>

          {/* FILTER */}
          <button className="border rounded-xl px-5 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <Filter size={18} />
            Filter
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* TITLE */}
        <div className="p-6 border-b flex items-center gap-3">

          <CalendarDays className="text-[#F4A261]" />

          <h2 className="text-xl font-semibold text-[#3E3E3E]">
            Data Jadwal Pelajaran
          </h2>

        </div>

        {/* TABLE CONTENT */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500">

              <tr>
                <th className="text-left px-6 py-4">No</th>
                <th className="text-left px-6 py-4">Hari</th>
                <th className="text-left px-6 py-4">Kelas</th>
                <th className="text-left px-6 py-4">Mapel</th>
                <th className="text-left px-6 py-4">Guru</th>
                <th className="text-left px-6 py-4">Jam</th>
                <th className="text-center px-6 py-4">Aksi</th>
              </tr>

            </thead>

            <tbody className="text-[#3E3E3E]">

              {jadwal.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {item.hari}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.kelas}
                  </td>

                  <td className="px-6 py-4">
                    {item.mapel}
                  </td>

                  <td className="px-6 py-4">
                    {item.guru}
                  </td>

                  <td className="px-6 py-4">
                    {item.jam}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 p-2 rounded-lg transition">
                        <Pencil size={18} />
                      </button>

                      {/* DELETE */}
                      <button className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition">
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

export default JadwalSuperadmin;