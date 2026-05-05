import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, UserCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    username: '', 
    password: '', 
    role: ''      
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!loginData.role) {
    alert("Silakan pilih peran Anda!");
    return;
  }
  
  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username: loginData.username,
      password: loginData.password,
      role: loginData.role
    });

    if (response.data.status === "success") {
      const { access_token, user } = response.data;
      
      // Simpan data dengan key yang konsisten
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_role', user.role); // Key utama untuk pengecekan
      localStorage.setItem('user', JSON.stringify(user));

      // Mapping Route (DISESUAIKAN DENGAN App.js ANDA)
      // Mapping Route Berdasarkan Role (DISESUAIKAN DENGAN App.js)
    const routes = {
      siswa: '/siswa/Dashboard-siswa',      // Sesuai App.js 
      guru: '/guru/Dashboard-guru',        // Sesuai App.js 
      walkes: '/guru/Dashboard-guru',
      kepsek: '/kepsek/Dashboard-kepsek',  // Sesuai App.js 
      staf: '/staff/Dashboard-staff',      // Sesuai App.js 
      admin: '/admin/dashboard'
    };

      alert(response.data.message);

      // Gunakan setTimeout agar browser selesai menulis storage sebelum pindah halaman
      setTimeout(() => {
        navigate(routes[user.role] || '/');
      }, 150);
    }
  } catch (err) {
    const message = err.response?.data?.message || "Gagal terhubung ke server";
    alert(`❌ Login Gagal: ${message}`);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex items-center justify-center px-5 pt-24 pb-10 font-sans">
      
      <div className="bg-white w-full max-w-[550px] px-8 md:px-[60px] py-[40px] rounded-[30px] shadow-xl border-2 border-[#3e2723]">
        
        <h2 className="text-center text-[#3e2723] text-2xl md:text-3xl font-extrabold mb-8 tracking-tight">
          LOGIN <span className="text-[#E67E22]">AKUN</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* USERNAME */}
          <div className="space-y-2">
            <label className="block font-bold text-[#3e2723] text-sm">
              Nama Lengkap / Username
            </label>
            <div className="relative flex items-center bg-white border border-[#ddd] rounded-xl focus-within:border-[#6d4c41] focus-within:ring-2 focus-within:ring-[#6d4c41]/10 transition-all">
              <input 
                type="text" name="username" placeholder="Masukkan username" 
                value={loginData.username} onChange={handleChange} required
                className="w-full h-12 pl-4 pr-12 bg-transparent outline-none text-[#3e2723]"
              />
              <UserCircle className="absolute right-4 text-[#8d6e63]" size={20} />
            </div>
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <label className="block font-bold text-[#3e2723] text-sm">
              Pilih Peran (Role)
            </label>
            <div className="relative flex items-center bg-white border border-[#ddd] rounded-xl focus-within:border-[#6d4c41] transition-all">
              <select 
                name="role" value={loginData.role} onChange={handleChange} required
                className="w-full h-12 pl-4 pr-12 bg-transparent outline-none text-[#3e2723] appearance-none cursor-pointer"
              >
                <option value="" disabled>-- Pilih Peran --</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru / Wali Kelas</option>
                <option value="kepsek">Kepala Sekolah</option>
                <option value="staf">Tenaga Kependidikan (TU)</option>
              </select>
              <ShieldCheck className="absolute right-4 text-[#8d6e63] pointer-events-none" size={20} />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#3e2723] text-sm">Kata Sandi</label>
              <Link to="/forgot-password" size={20} className="text-[#6d4c41] text-xs font-semibold hover:underline">
                Lupa Kata Sandi?
              </Link>
            </div>
            <div className="relative flex items-center bg-white border border-[#ddd] rounded-xl focus-within:border-[#6d4c41] transition-all">
              <input 
                type={showPassword ? "text" : "password"} name="password"
                placeholder="Masukkan kata sandi" value={loginData.password}
                onChange={handleChange} required
                className="w-full h-12 pl-4 pr-12 bg-transparent outline-none text-[#3e2723]"
              />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#8d6e63] hover:text-[#3e2723]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button 
            type="submit" disabled={isLoading}
            className="w-full h-14 bg-[#3e2723] text-white rounded-xl text-lg font-bold mt-4 transition-all hover:bg-[#2d1b17] active:scale-[0.98] disabled:bg-[#bcaaa4]"
          >
            {isLoading ? "MENGECEK..." : "MASUK KE SISTEM"}
          </button>

          {/* FOOTER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
            <p className="text-sm">
              Belum Punya Akun?{" "}
              <Link to="/daftar" className="text-[#5d4037] font-bold hover:underline">
                Daftar
              </Link>
            </p>

            <button 
              type="button" onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#efebe9] text-[#3e2723] rounded-lg font-bold hover:bg-[#d7ccc8] transition-colors text-sm"
            >
              Kembali
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;