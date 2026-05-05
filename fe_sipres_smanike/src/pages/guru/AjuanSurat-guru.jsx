import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  FileText, 
  Calendar, 
  User,
} from 'lucide-react';

const AjuanSuratGuru = () => {

  const [dataSurat] = useState([
    { 
      id: 1, 
      nama: 'Aditya Pratama', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Sakit', 
      tanggal: '27 Mar 2026', 
      status: 'Pending',
      keterangan: 'Demam tinggi dan pusing'
    },
    { 
      id: 2, 
      nama: 'Siti Aminah', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Keperluan Keluarga', 
      tanggal: '26 Mar 2026', 
      status: 'Pending',
      keterangan: 'Acara pernikahan kakak kandung'
    },
    { 
      id: 3, 
      nama: 'Budi Cahyono', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Lomba', 
      tanggal: '25 Mar 2026', 
      status: 'Disetujui',
      keterangan: 'Lomba LKS Tingkat Provinsi'
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">
      
      <div className="max-w-[1150px] mx-auto p-[20px]">

        {/* HEADER */}
        <header className="mb-[30px]">
          <h1 className="text-[1.8rem] font-extrabold mb-[5px]">
            Verifikasi E-Surat Siswa
          </h1>
          <p className="text-sm opacity-80">
            Kelola dan verifikasi permohonan izin atau sakit siswa XII RPL 1
          </p>
        </header>

        {/* FILTER BAR */}
        <div className="flex justify-between gap-[15px] mb-[25px] flex-wrap">

          {/* SEARCH */}
          <div className="flex items-center gap-[12px] bg-white px-[18px] py-[12px] rounded-[12px] flex-1 max-w-[450px] shadow-sm border border-[#f1f5f9]">
            <Search size={18} />
            <input
              type="text"
              placeholder="Cari nama siswa..."
              className="w-full outline-none text-sm text-[#6d4c41] bg-transparent"
            />
          </div>

          {/* FILTER */}
          <button className="flex items-center gap-[10px] bg-white border border-[#e2e8f0] px-[20px] py-[10px] rounded-[12px] font-semibold text-[#6d4c41] hover:bg-[#f8fafc] transition">
            <Filter size={16} />
            Semua Status
          </button>

        </div>

        {/* TABLE (SUDAH DIPINDAH KE DALAM WRAPPER) */}
        <div className="bg-white rounded-[16px] shadow-md border border-[#f1f5f9] overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">

              <thead>
                <tr className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#6d4c41]">
                  <th className="p-[20px] text-left flex items-center gap-[8px]">
                    <User size={16} /> Nama Siswa
                  </th>
                  <th className="p-[20px] text-left">Jenis Surat</th>
                  <th className="p-[20px] text-left flex items-center gap-[8px]">
                    <Calendar size={16} /> Tanggal
                  </th>
                  <th className="p-[20px] text-left">Status</th>
                  <th className="p-[20px] text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {dataSurat.map((surat) => (
                  <tr key={surat.id} className="border-b border-[#f1f5f9] hover:bg-[#fafafa]">

                    {/* NAMA */}
                    <td className="p-[20px]">
                      <div>
                        <strong className="block text-[#6d4c41]">
                          {surat.nama}
                        </strong>
                        <span className="text-xs opacity-70">
                          {surat.kelas}
                        </span>
                      </div>
                    </td>

                    {/* JENIS */}
                    <td className="p-[20px] flex items-center gap-[8px] text-sm">
                      <FileText size={14} />
                      {surat.jenis}
                    </td>

                    {/* TANGGAL */}
                    <td className="p-[20px] text-sm">
                      {surat.tanggal}
                    </td>

                    {/* STATUS */}
                    <td className="p-[20px]">
                      <span
                        className={`text-xs font-bold uppercase px-[14px] py-[6px] rounded-full
                          ${surat.status === 'Pending' && 'bg-orange-100 text-orange-600'}
                          ${surat.status === 'Disetujui' && 'bg-green-100 text-green-700'}
                          ${surat.status === 'Ditolak' && 'bg-red-100 text-red-600'}
                        `}
                      >
                        {surat.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-[20px]">
                      <div className="flex justify-center gap-[10px]">

                        <button className="w-[38px] h-[38px] bg-[#f1f5f9] text-[#6d4c41] rounded-[10px] flex items-center justify-center hover:scale-105 transition">
                          <Eye size={16} />
                        </button>

                        {surat.status === 'Pending' && (
                          <>
                            <button className="w-[38px] h-[38px] bg-green-100 text-green-700 rounded-[10px] flex items-center justify-center hover:scale-105 transition">
                              <Check size={16} />
                            </button>

                            <button className="w-[38px] h-[38px] bg-red-100 text-red-600 rounded-[10px] flex items-center justify-center hover:scale-105 transition">
                              <X size={16} />
                            </button>
                          </>
                        )}

                      </div>
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

export default AjuanSuratGuru;