import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ChevronRight, Fingerprint } from 'lucide-react';

const Daftar = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '', 
    jenis_kelamin: '', 
    tempat_lahir: '',
    tanggal_lahir: '', 
    alamat: '', 
    email: '',
    no_hp: '', 
    role: '', 
    registration_id: '', // NIS untuk Siswa, NIP untuk Guru/Staff/Kepsek
    password: '', 
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Password
    if (formData.password !== formData.confirmPassword) {
      alert("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);
    
    // Payload disesuaikan dengan kebutuhan Backend [cite: 8, 79, 82]
    const payload = {
      username: formData.nama_lengkap, // Menggunakan nama sebagai username awal
      password: formData.password,
      role: formData.role,
      registration_id: formData.registration_id, 
      nama_lengkap: formData.nama_lengkap,
      tanggal_lahir: formData.tanggal_lahir,
      tempat_lahir: formData.tempat_lahir,
      jenis_kelamin: formData.jenis_kelamin,
      alamat: formData.alamat,
      email: formData.email,
      no_hp: formData.no_hp
    };

    try {
      // Endpoint register Tahap 1 [cite: 9, 79]
      const res = await axios.post('http://localhost:5000/api/auth/register', payload);
      
      if (res.data.status === "success") {
        alert("Pendaftaran Tahap 1 Berhasil! Silakan lengkapi data profil Anda.");
        
        // Navigasi otomatis ke halaman lengkapi data sesuai role [cite: 10]
        // Contoh: /siswa/Daftar-siswa atau /guru/Daftar-guru
        navigate(`/${formData.role}/Daftar-${formData.role}`, { 
          state: { userId: res.data.userId } 
        });
      }
    } catch (err) {
      // Menampilkan pesan error dari backend (misal: NIS tidak terdaftar) [cite: 10, 80, 81]
      alert(err.response?.data?.message || "Gagal Daftar. Pastikan NIS/NIP benar dan sesuai data sekolah.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex items-center justify-center px-5 pt-24 pb-10 font-sans">
      
      <div className="bg-white w-full max-w-4xl px-6 md:px-10 py-8 rounded-[30px] border-2 border-[#3e2723] shadow-xl">
        
        <h2 className="text-center text-[#3e2723] text-2xl font-extrabold mb-6 tracking-wide uppercase">
          DAFTAR AKUN BARU
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            
            {/* Input Nama */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Nama Lengkap</label>
              <input type="text" name="nama_lengkap" placeholder="Nama Lengkap sesuai Ijazah" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]" />
            </div>

            {/* Pilih Role */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Role (Peran)</label>
              <select name="role" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 bg-white outline-none focus:border-[#6d4c41]">
                <option value="">-- Pilih Peran --</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru</option>
                <option value="kepsek">Kepala Sekolah</option>
                <option value="staf">Staf TU</option>
              </select>
            </div>

            {/* Input NIS/NIP Dinamis [cite: 17, 18, 19, 21] */}
            <div className={`flex flex-col gap-1 md:col-span-2 transition-all ${formData.role ? 'opacity-100' : 'opacity-50'}`}>
              <label className="font-bold text-[#3e2723] text-sm">
                {formData.role === 'siswa' ? 'NIS (Nomor Induk Siswa)' : 
                 formData.role ? 'NIP (Nomor Induk Pegawai)' : 'NIS / NIP'}
              </label>
              <div className="relative">
                <input 
                    type="text" 
                    name="registration_id" 
                    placeholder={formData.role === 'siswa' ? "Masukkan NIS Anda" : "Masukkan NIP Anda"} 
                    onChange={handleChange} 
                    required 
                    disabled={!formData.role}
                    className="w-full h-10 border border-[#6d4c41] border-2 rounded-lg px-10 outline-none focus:ring-2 focus:ring-[#6d4c41]/20" 
                />
                <Fingerprint className="absolute left-3 top-2.5 text-[#6d4c41]" size={18} />
              </div>
              <p className="text-[10px] text-gray-500">*Data ini akan divalidasi dengan database Master Sekolah </p>
            </div>

            {/* Data Pribadi */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Email</label>
              <input type="email" name="email" placeholder="contoh@gmail.com" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Jenis Kelamin</label>
              <select name="jenis_kelamin" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none bg-white">
                <option value="">-- Pilih --</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Nomor HP</label>
              <div className="flex border border-[#ddd] rounded-lg overflow-hidden h-10">
                <div className="bg-[#efebe9] px-2 flex items-center text-[10px] font-bold border-r">+62</div>
                <input type="text" name="no_hp" placeholder="8xxxxxxxx" onChange={handleChange} required
                  className="flex-1 px-3 outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Tempat Lahir</label>
              <input type="text" name="tempat_lahir" placeholder="Contoh: Ngawi" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Tanggal Lahir</label>
              <input type="date" name="tanggal_lahir" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]" />
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-bold text-[#3e2723] text-sm">Alamat Lengkap</label>
              <input type="text" name="alamat" placeholder="Alamat domisili saat ini" onChange={handleChange} required
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]" />
            </div>

            {/* Password Fields [cite: 31, 34] */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Kata Sandi</label>
              <div className="flex border border-[#ddd] rounded-lg overflow-hidden h-10 focus-within:border-[#6d4c41]">
                <input type={showPass ? "text" : "password"} name="password" onChange={handleChange} required
                  className="flex-1 px-3 outline-none" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="px-2 text-gray-500 hover:text-[#3e2723]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Konfirmasi Kata Sandi</label>
              <div className="flex border border-[#ddd] rounded-lg overflow-hidden h-10 focus-within:border-[#6d4c41]">
                <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" onChange={handleChange} required
                  className="flex-1 px-3 outline-none" />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="px-2 text-gray-500 hover:text-[#3e2723]">
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Aksi [cite: 36, 37] */}
          <div className="flex justify-between items-center mt-8 gap-4">
            <button type="button" onClick={() => navigate('/login')}
              className="text-[#3e2723] font-bold text-sm hover:underline hover:text-red-600 transition-colors">
              Sudah punya akun? Login
            </button>
            <button type="submit" disabled={isLoading}
              className="bg-[#3e2723] text-white px-8 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#2d1b17] transition-all text-sm font-bold shadow-lg active:scale-95 disabled:bg-gray-400">
              {isLoading ? "Memproses..." : "Daftar Tahap 1"} <ChevronRight size={18}/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;