import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  
  FileCheck, 
  QrCode, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

const DashboardGuru = () => {

  const [isPiket] = useState(true);
  const [nama, setNama] = useState('');
  const [gelar, setGelar] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setNama(res.data.data.nama_lengkap);
        setGelar(res.data.data.gelar);

      } catch (err) {
        console.log("Gagal ambil data user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full max-w-[1150px] mx-auto p-[30px] box-border font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-[40px] max-[992px]:flex-col max-[992px]:items-start max-[992px]:gap-[20px]">
        
        <div>
          <h1 className="text-[1.8rem] font-extrabold">
            Panel Kendali Guru
          </h1>
          <p className="text-sm opacity-80">
            SMAN 1 Kedunggalar - Sistem Informasi Presensi & E-Surat
          </p>
        </div>

        <div className="flex items-center gap-[15px] bg-white px-[20px] py-[10px] rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] max-[992px]:w-full max-[992px]:justify-between">
          
          <div className="text-right">
            <strong>
              {nama ? `${nama} ${gelar || ''}` : 'Loading...'}
            </strong>
          </div>

          <div className="w-[40px] h-[40px] bg-[#3e2723] text-white rounded-full flex items-center justify-center font-bold">
            {nama ? nama.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </header>

      {/* ACTION GRID */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[20px] mb-[30px]">

        {/* CARD 1 */}
        <div className="bg-white p-[25px] rounded-[20px] flex gap-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:translate-y-[-5px] transition">
          <div className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center bg-[#fff7ed] text-[#ea580c]">
            <FileCheck size={24} />
          </div>

          <div>
            <h3 className="font-bold">Verifikasi E-Surat</h3>
            <p className="text-sm opacity-80">5 Siswa mengajukan izin hari ini</p>
            <button className="mt-[15px] px-[16px] py-[8px] rounded-[8px] bg-[#3e2723] text-white flex items-center gap-[8px] text-sm">
              Periksa Sekarang <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* CARD 2 */}
        {isPiket && (
          <div className="bg-white p-[25px] rounded-[20px] flex gap-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.03)] border-l-[5px] border-[#3b82f6] hover:translate-y-[-5px] transition">
            
            <div className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center bg-[#eff6ff] text-[#3b82f6]">
              <CalendarCheck size={24} />
            </div>

            <div>
              <h3 className="font-bold">Petugas Piket</h3>
              <p className="text-sm opacity-80">Generate QR Presensi Gerbang</p>
              <button className="mt-[15px] px-[16px] py-[8px] rounded-[8px] bg-[#3e2723] text-white flex items-center gap-[8px] text-sm">
                Buka QR Harian <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* CARD 3 */}
        <div className="bg-white p-[25px] rounded-[20px] flex gap-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:translate-y-[-5px] transition">
          
          <div className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center bg-[#f0fdfa] text-[#14b8a6]">
            <QrCode size={24} />
          </div>

          <div>
            <h3 className="font-bold">Presensi Mapel</h3>
            <p className="text-sm opacity-80">Generate QR</p>
            <button className="mt-[15px] px-[16px] py-[8px] rounded-[8px] bg-[#3e2723] text-white flex items-center gap-[8px] text-sm">
              Buka Barcode <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-[2fr_1fr] gap-[30px] max-[992px]:grid-cols-1">

        {/* TABLE */}
        <div>
          <h2 className="font-bold mb-[10px]">Monitoring Kehadiran Kelas (XII RPL 1)</h2>

          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.03)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] text-sm opacity-80">
                  <th className="p-[15px] text-left">Nama Siswa</th>
                  <th className="p-[15px] text-left">Harian</th>
                  <th className="p-[15px] text-left">Mapel</th>
                  <th className="p-[15px] text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nama: "Aditya", harian: "Hadir", mapel: "Masuk", waktu: "07:05" },
                  { nama: "Bina", harian: "Hadir", mapel: "Belum", waktu: "07:12" },
                ].map((siswa, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-[15px]">{siswa.nama}</td>
                    <td className="p-[15px]">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        {siswa.harian}
                      </span>
                    </td>
                    <td className="p-[15px]">{siswa.mapel}</td>
                    <td className="p-[15px]">{siswa.waktu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTIF */}
        <div>
          <h2 className="font-bold mb-[10px]">Pemberitahuan</h2>

          <div className="flex flex-col gap-[10px]">
            
            <div className="flex gap-[12px] p-[15px] bg-white rounded-[12px] border-l-[4px] border-red-500 text-sm">
              <AlertCircle size={18} />
              <p>4 Siswa di luar radius</p>
            </div>

            <div className="flex gap-[12px] p-[15px] bg-white rounded-[12px] border-l-[4px] border-blue-500 text-sm">
              <CheckCircle2 size={18} />
              <p>Laporan siap diunduh</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardGuru;
