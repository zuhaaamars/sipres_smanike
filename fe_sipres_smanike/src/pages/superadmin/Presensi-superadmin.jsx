import React, { useState } from 'react';
import {
  ClipboardCheck,
  Search,
  Filter,
  Pencil,
  Trash2,
  QrCode,
  Download
} from 'lucide-react';

const PresensiSuperadmin = () => {
  const [search, setSearch] = useState('');

  const presensi = [
    {
      id: 1,
      nama: 'Ahmad Fauzi',
      kelas: 'XI RPL 1',
      tanggal: '09 Mei 2026',
      status: 'Hadir',
      jam: '07:01 WIB'
    },
    {
      id: 2,
      nama: 'Siti Rahma',
      kelas: 'XI TKJ 1',
      tanggal: '09 Mei 2026',
      status: 'Terlambat',
      jam: '07:20 WIB'
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      kelas: 'Guru',
      tanggal: '09 Mei 2026',
      status: 'Hadir',
      jam: '06:55 WIB'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:ml-64">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-[#3E3E3E]">
            Presensi
          </h1>

          <p className="text-gray-500 mt-2">
            Monitoring dan kelola data presensi sistem
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex flex-wrap gap-3">

          <button className="bg-[#F4A261] hover:bg-[#e3914c] text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
            <QrCode size={20} />
            Generate QR
          </button>

          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
            <Download size={20} />
            Export
          </button>

        </div>

      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <div className="flex items-center gap-3 border rounded-xl px-4 py-3 flex-1">

            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Cari data presensi..."
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

        {/* HEADER TABLE */}
        <div className="p-6 border-b flex items-center gap-3">

          <ClipboardCheck className="text-[#F4A261]" />

          <h2 className="text-xl font-semibold text-[#3E3E3E]">
            Data Presensi
          </h2>

        </div>

        {/* TABLE CONTENT */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500">

              <tr>
                <th className="text-left px-6 py-4">No</th>
                <th className="text-left px-6 py-4">Nama</th>
                <th className="text-left px-6 py-4">Kelas / Role</th>
                <th className="text-left px-6 py-4">Tanggal</th>
                <th className="text-left px-6 py-4">Jam</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Aksi</th>
              </tr>

            </thead>

            <tbody className="text-[#3E3E3E]">

              {presensi.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.nama}
                  </td>

                  <td className="px-6 py-4">
                    {item.kelas}
                  </td>

                  <td className="px-6 py-4">
                    {item.tanggal}
                  </td>

                  <td className="px-6 py-4">
                    {item.jam}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        item.status === 'Hadir'
                          ? 'bg-green-100 text-green-600'
                          : item.status === 'Terlambat'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.status}
                    </span>

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

export default PresensiSuperadmin;