import React, { useState } from 'react';

const ImportSiswa = () => {

  const [siswa] = useState([
    { nis: "1001", nama: "Ahmad", kelas: "X A" },
    { nis: "1002", nama: "Siti", kelas: "X A" },
    { nis: "1003", nama: "Budi", kelas: "XI A" },
    { nis: "1004", nama: "Rina", kelas: "XI B" },
    { nis: "1005", nama: "Dewi", kelas: "XI A" },
  ]);

  const [filterKelas, setFilterKelas] = useState("Semua");

  // 🔥 ambil list kelas unik
  const kelasList = ["Semua", ...new Set(siswa.map(s => s.kelas))];

  // 🔥 filter sesuai pilihan
  const filteredData = siswa.filter((s) => {
    if (filterKelas === "Semua") return true;
    return s.kelas === filterKelas;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:ml-64">

      <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>

      {/* 🔥 FILTER KELAS */}
      <div className="mb-4">
        <select
          value={filterKelas}
          onChange={(e) => setFilterKelas(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          {kelasList.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>
      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">NIS</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Kelas</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{s.nis}</td>
                  <td className="p-3">{s.nama}</td>
                  <td className="p-3">{s.kelas}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-slate-400">
                  Tidak ada data di kelas ini
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ImportSiswa;