import React, { useState } from 'react';
import { Search, BookOpen, Download, Calendar, Users, CheckCircle, Clock, Filter } from 'lucide-react';

const RekapMapelGuru = () => {

  const [dataRekap] = useState([
    { id: 1, nis: '24001', nama: 'Aditya Pratama', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Hadir', jam: '08:00 - 10:00' },
    { id: 2, nis: '24002', nama: 'Bina Reza Yuanda', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Hadir', jam: '08:00 - 10:00' },
    { id: 3, nis: '24003', nama: 'Siti Aminah', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Izin', jam: '08:00 - 10:00' },
    { id: 4, nis: '24001', nama: 'Aditya Pratama', kelas: 'XII RPL 1', mapel: 'Basis Data', status: 'Hadir', jam: '10:30 - 12:00' },
    { id: 5, nis: '24006', nama: 'Riyan Hidayat', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Alpa', jam: '08:00 - 10:00' },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      {/* WRAPPER 1150 */}
      <div className="max-w-[1150px] mx-auto p-[20px]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-[30px] flex-wrap gap-[15px]">

          <div>
            <h1 className="text-[1.8rem] font-extrabold">
              Laporan Presensi Mata Pelajaran
            </h1>
            <p className="text-sm text-[#6d4c41]/70">
              Rekap kehadiran siswa berdasarkan jam mengajar
            </p>
          </div>

          <button className="flex items-center gap-[8px] px-[18px] py-[10px] bg-[#3e2723] text-white rounded-[10px] font-semibold hover:opacity-90 transition">
            <Download size={18} />
            Download PDF
          </button>

        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-[20px] mb-[30px] max-md:grid-cols-1">

          <div className="bg-white p-[20px] rounded-[16px] flex items-center gap-[12px] shadow-sm">
            <BookOpen />
            <div>
              <p className="text-sm text-[#6d4c41]/70">Total Pertemuan</p>
              <h3 className="font-bold">12 Kali</h3>
            </div>
          </div>

          <div className="bg-white p-[20px] rounded-[16px] flex items-center gap-[12px] shadow-sm">
            <CheckCircle />
            <div>
              <p className="text-sm text-[#6d4c41]/70">Rata-rata Kehadiran</p>
              <h3 className="font-bold">94%</h3>
            </div>
          </div>

          <div className="bg-white p-[20px] rounded-[16px] flex items-center gap-[12px] shadow-sm">
            <Users />
            <div>
              <p className="text-sm text-[#6d4c41]/70">Siswa Teraktif</p>
              <h3 className="font-bold">32 Siswa</h3>
            </div>
          </div>

        </div>

        {/* FILTER */}
        <div className="flex justify-between gap-[15px] flex-wrap mb-[20px]">

          <div className="flex items-center gap-[10px] bg-white px-[16px] py-[10px] rounded-[12px] flex-1 border border-gray-200">
            <Search size={18} />
            <input
              placeholder="Cari nama atau kelas..."
              className="w-full outline-none bg-transparent text-[#6d4c41]"
            />
          </div>

          <div className="flex gap-[10px] flex-wrap">

            <select className="px-[12px] py-[10px] rounded-[10px] border border-gray-200 bg-white text-[#6d4c41]">
              <option>Semua Mapel</option>
              <option>Pemrograman Web</option>
              <option>Basis Data</option>
            </select>

            <select className="px-[12px] py-[10px] rounded-[10px] border border-gray-200 bg-white text-[#6d4c41]">
              <option>Semua Kelas</option>
              <option>XII RPL 1</option>
              <option>XII RPL 2</option>
            </select>

            <button className="p-[10px] bg-white border border-gray-200 rounded-[10px]">
              <Filter size={18} />
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[16px] shadow-sm overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-gray-50 text-[#6d4c41]/70 text-sm">
              <tr>
                <th className="p-[15px] text-left">NIS</th>
                <th className="p-[15px] text-left">Nama</th>
                <th className="p-[15px] text-left">Kelas</th>
                <th className="p-[15px] text-left">Mapel</th>
                <th className="p-[15px] text-left">Jam</th>
                <th className="p-[15px] text-left">Status</th>
              </tr>
            </thead>

            <tbody>

              {dataRekap.map((item) => (
                <tr key={item.id} className="border-b">

                  <td className="p-[15px] font-bold">{item.nis}</td>
                  <td className="p-[15px]">{item.nama}</td>
                  <td className="p-[15px]">{item.kelas}</td>

                  <td className="p-[15px]">
                    <span className="bg-gray-100 px-[10px] py-[4px] rounded-[6px] text-sm">
                      {item.mapel}
                    </span>
                  </td>

                  <td className="p-[15px] flex items-center gap-[6px]">
                    <Clock size={14} />
                    {item.jam}
                  </td>

                  <td className="p-[15px]">
                    <span className={`px-[12px] py-[4px] rounded-full text-xs font-bold
                      ${item.status === 'Hadir' && 'bg-green-100 text-green-700'}
                      ${item.status === 'Izin' && 'bg-yellow-100 text-yellow-700'}
                      ${item.status === 'Alpa' && 'bg-red-100 text-red-700'}
                    `}>
                      {item.status}
                    </span>
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

export default RekapMapelGuru;