import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, UserPlus, ScanBarcode, FileText, BadgeCheck, 
  ArrowRight, GraduationCap, Users, RefreshCw, ChevronRight 
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('siswa');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-[#4A3728]">
      
      <main className="w-full mt-20">
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-[500px] lg:h-[600px] flex items-center overflow-hidden">
          {/* Background Image Utama (Gedung SMANIKE) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/gedung.png" 
              alt="Background SMANIKE" 
              className="w-full h-full object-cover object-right lg:object-center"
            />
            {/* Overlay Gradasi Krem agar teks terbaca jelas (mirip di gambar) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F1] via-[#FDF8F1]/80 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <div className="max-w-2xl">
              <h4 className="text-[#A67C52] font-bold tracking-widest mb-4 uppercase text-sm lg:text-base">
                Selamat Datang di
              </h4>
              <h1 className="text-4xl lg:text-6xl font-black text-[#4A3728] leading-tight mb-6">
                SISTEM ADMINISTRASI <br /> SMANIKE
              </h1>
              <p className="text-lg text-[#7C6A5B] mb-10 max-w-md leading-relaxed font-medium">
                Portal digital untuk mengelola presensi guru dan siswa serta layanan surat menyurat sekolah secara mudah dan terintegrasi.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/Login')}
                  className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-200"
                >
                  <LogIn size={20} /> Login
                </button>
                <button 
                  onClick={() => navigate('/daftar')}
                  className="flex items-center gap-2 bg-white border-2 border-[#D97706]/20 text-[#4A3728] hover:bg-amber-50 px-10 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                  <UserPlus size={20} /> Daftar Akun
                </button>
              </div>
            </div>
          </div>

          {/* Dekorasi Daun di pojok kiri bawah (jika ada asetnya) */}
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-40 pointer-events-none">
             <img src="/assets/leaf-deco.png" alt="" className="w-full h-full object-contain" />
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="container mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform border border-amber-50">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-[#D97706] mb-6 group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                <ScanBarcode size={40} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3728] mb-4">PRESENSI SISWA</h3>
              <p className="text-[#7C6A5B] text-sm leading-relaxed">
                Presensi harian dan mata pelajaran khusus siswa dengan fitur scan barcode otomatis yang terintegrasi teknologi geofencing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform border border-amber-50">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3728] mb-4">PERSURATAN DIGITAL</h3>
              <p className="text-[#7C6A5B] text-sm leading-relaxed">
                Pengajuan berbagai jenis surat untuk Siswa, Guru, dan Tendik secara mandiri dengan pemantauan status proses yang transparan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform border border-amber-50">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <BadgeCheck size={40} />
              </div>
              <h3 className="text-xl font-bold text-[#4A3728] mb-4">VALIDASI RESMI</h3>
              <p className="text-[#7C6A5B] text-sm leading-relaxed">
                Seluruh dokumen diverifikasi oleh Tata Usaha dan divalidasi dengan tanda tangan digital resmi oleh Kepala Sekolah.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION DAFTAR LAYANAN --- */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-bold text-center text-[#4A3728] mb-12">Layanan Persuratan Online</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-[#FDF8F1] p-10 rounded-3xl border border-amber-100">
                <div className="flex items-center gap-4 mb-6 text-[#D97706]">
                  <GraduationCap size={32} />
                  <h3 className="text-2xl font-bold">Layanan Siswa</h3>
                </div>
                <ul className="space-y-3 text-[#7C6A5B]">
                  {['Surat Keterangan Aktif Siswa', 'Surat Keterangan Belum Punya KTA', 'Rekomendasi Lomba, PIP, dll', 'Surat Dispensasi & Mutasi', 'Surat Keterangan Lulus (SKL)'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-[#D97706]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FDF8F1] p-10 rounded-3xl border border-amber-100">
                <div className="flex items-center gap-4 mb-6 text-[#D97706]">
                  <Users size={32} />
                  <h3 className="text-2xl font-bold">Layanan Guru & Tendik</h3>
                </div>
                <ul className="space-y-3 text-[#7C6A5B]">
                  {['Surat Perintah Tugas (SPT)', 'Surat Keterangan Aktif Kerja', 'Surat Keterangan Gaji'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-[#D97706]" /> {item}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 italic">
                    <RefreshCw size={16} className="text-[#D97706]" /> Reset HP Presensi
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- TUTORIAL SECTION --- */}
        <section className="bg-[#F4F7F0] py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-[#4A3728] mb-6 uppercase tracking-wider">Tutorial Penggunaan Sistem</h2>
              <div className="inline-flex bg-white p-1 rounded-full shadow-inner border">
                <button 
                  onClick={() => setActiveTab('siswa')}
                  className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'siswa' ? 'bg-[#4A3728] text-white' : 'text-[#7C6A5B]'}`}
                >
                  Siswa
                </button>
                <button 
                  onClick={() => setActiveTab('guru')}
                  className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'guru' ? 'bg-[#4A3728] text-white' : 'text-[#7C6A5B]'}`}
                >
                  Guru & Tendik
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {(activeTab === 'siswa' ? [
                { img: 'langkah_1-removebg-preview.png', text: 'Siswa membuat ajuan surat melalui sistem secara mandiri.' },
                { img: 'step2', text: 'Tata Usaha/Wali Kelas memeriksa kelengkapan data ajuan.' },
                { img: 'step3', text: 'Kepala Sekolah memvalidasi surat dengan TTD digital.' },
                { img: 'step4', text: 'Siswa menerima dan mencetak hasil validasi (PDF).' }
              ] : [
                { img: 'guru_step1', text: 'Guru memilih layanan persuratan dan mengisi data tugas/gaji.' },
                { img: 'guru_step2', text: 'Bagian Tata Usaha melakukan verifikasi draf surat pengajuan.' },
                { img: 'guru_step3', text: 'Penerbitan Tanda Tangan Elektronik oleh Kepala Sekolah.' },
                { img: 'guru_step4', text: 'Dokumen resmi siap digunakan untuk keperluan kedinasan.' }
              ]).map((step, index, array) => (
                <React.Fragment key={index}>
                  <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-[#708238] text-white rounded-full flex items-center justify-center font-bold mb-4">{index + 1}</div>
                    <div className="h-32 mb-4 flex items-center justify-center bg-gray-50 w-full rounded-xl">
                       {/* Placeholder jika img belum ada */}
                       <img src={`/assets/${step.img}.png`} alt={`Step ${index + 1}`} className="max-h-full" />
                    </div>
                    <p className="text-sm font-medium text-[#4A3728]">{step.text}</p>
                  </div>
                  {index < array.length - 1 && (
                    <ArrowRight className="hidden md:block text-[#A67C52]" size={32} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;