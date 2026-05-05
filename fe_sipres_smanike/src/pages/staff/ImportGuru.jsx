import React, { useState } from 'react';

const ImportGuru = () => {

  // 🔥 DUMMY DATA
  const [guru] = useState([
    { nip: "198001", nama: "Budi Santoso", gelar: "S.Pd" },
    { nip: "198002", nama: "Siti Aminah", gelar: "M.Pd" },
    { nip: "198003", nama: "Andi Wijaya", gelar: "S.Kom" },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:ml-64">

      <h1 className="text-2xl font-bold mb-4">Data Guru</h1>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">NIP</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Gelar</th>
            </tr>
          </thead>

          <tbody>
            {guru.length > 0 ? (
              guru.map((g, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{g.nip}</td>
                  <td className="p-3">{g.nama}</td>
                  <td className="p-3">{g.gelar}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-slate-400">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ImportGuru;