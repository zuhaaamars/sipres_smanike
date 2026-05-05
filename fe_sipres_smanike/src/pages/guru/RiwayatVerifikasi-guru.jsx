import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  Filter
} from 'lucide-react';

const RiwayatVerifikasiGuru = () => {

  const [riwayat] = useState([
    { 
      id: 1, 
      nama: 'Budi Cahyono', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Lomba', 
      tanggal: '25 Mar 2026', 
      status: 'Disetujui',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
    { 
      id: 2, 
      nama: 'Andi Wijaya', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Sakit', 
      tanggal: '24 Mar 2026', 
      status: 'Ditolak',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
    { 
      id: 3, 
      nama: 'Rina Septiani', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Keperluan Keluarga', 
      tanggal: '20 Mar 2026', 
      status: 'Disetujui',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      <div className="max-w-[1150px] mx-auto p-[20px]">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-[30px] flex-wrap gap-[15px]">

          <div>
            <h1 className="text-[1.8rem] font-extrabold">
              Riwayat Verifikasi Surat
            </h1>
            <p className="opacity-80 mt-[5px] text-sm">
              Daftar seluruh surat siswa yang telah diproses oleh Wali Kelas.
            </p>
          </div>

          <button className="bg-[#3e2723] text-white px-[20px] py-[10px] rounded-[10px] flex items-center gap-[10px] font-semibold hover:opacity-90 transition">
            <Download size={18} />
            Export Excel
          </button>

        </header>

        {/* FILTER */}
        <div className="bg-white p-[15px] rounded-[15px] flex flex-col md:flex-row justify-between gap-[15px] shadow-sm mb-[20px]">

          <div className="flex items-center gap-[10px] bg-[#f8fafc] px-[15px] py-[10px] rounded-[10px] border border-[#e2e8f0] flex-1">
            <Search size={18} />
            <input
              type="text"
              placeholder="Cari nama siswa..."
              className="w-full bg-transparent outline-none text-sm text-[#6d4c41]"
            />
          </div>

          <div className="flex gap-[10px] flex-wrap">

            <button className="flex items-center gap-[8px] border border-[#e2e8f0] px-[15px] py-[10px] rounded-[10px] text-sm font-semibold">
              <Calendar size={16} />
              Pilih Tanggal
            </button>

            <button className="flex items-center gap-[8px] border border-[#e2e8f0] px-[15px] py-[10px] rounded-[10px] text-sm font-semibold">
              <Filter size={16} />
              Semua Status
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-md">

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">

              <thead>
                <tr className="bg-[#f8fafc] text-sm text-[#6d4c41]">
                  <th className="p-[15px] text-left">Nama Siswa</th>
                  <th className="p-[15px] text-left">Jenis Izin</th>
                  <th className="p-[15px] text-left">Tanggal Proses</th>
                  <th className="p-[15px] text-left">Status Akhir</th>
                  <th className="p-[15px] text-left">Diverifikasi Oleh</th>
                  <th className="p-[15px] text-center">Detail</th>
                </tr>
              </thead>

              <tbody>
                {riwayat.map((item) => (
                  <tr key={item.id} className="border-b border-[#f1f5f9] hover:bg-[#fafafa]">

                    <td className="p-[15px]">
                      <strong className="block">{item.nama}</strong>
                      <span className="text-xs opacity-70">{item.kelas}</span>
                    </td>

                    <td className="p-[15px]">{item.jenis}</td>

                    <td className="p-[15px]">{item.tanggal}</td>

                    <td className="p-[15px]">
                      <span className={`inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full text-xs font-bold
                        ${item.status === 'Disetujui' && 'bg-green-100 text-green-700'}
                        ${item.status === 'Ditolak' && 'bg-red-100 text-red-700'}
                      `}>
                        {item.status === 'Disetujui' ? 
                          <CheckCircle size={14} /> : 
                          <XCircle size={14} />
                        }
                        {item.status}
                      </span>
                    </td>

                    <td className="p-[15px] text-sm opacity-80 italic">
                      {item.oleh}
                    </td>

                    <td className="p-[15px] text-center">
                      <button className="w-[35px] h-[35px] bg-[#f1f5f9] rounded-[8px] flex items-center justify-center mx-auto hover:bg-[#e2e8f0] transition">
                        <Eye size={18} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RiwayatVerifikasiGuru;