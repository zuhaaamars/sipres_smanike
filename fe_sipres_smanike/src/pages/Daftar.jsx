import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ChevronRight, Fingerprint } from 'lucide-react';

const Daftar = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    registration_id: '',
    nama_lengkap: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    email: '',
    no_hp: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    setIsLoading(true);

    try {
      // STEP 1 REGISTER (user_models ONLY)
      const payload = {
        username: formData.username || formData.registration_id,
        password: formData.password,
        role: formData.role,
        registration_id: formData.registration_id,

        // optional data (backend boleh abaikan di step 1)
        nama_lengkap: formData.nama_lengkap,
        jenis_kelamin: formData.jenis_kelamin,
        tempat_lahir: formData.tempat_lahir,
        tanggal_lahir: formData.tanggal_lahir,
        alamat: formData.alamat,
        email: formData.email,
        no_hp: formData.no_hp
      };

      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        payload
      );

      if (res.data.status === "success") {
        alert("Register berhasil! lanjut ke pengisian profil");

        // STEP 2 REDIRECT PER ROLE
        const role = formData.role;

        if (res.data.status === "success") {
          const userId = res.data.userId;
          const userRole = formData.role; // ambil dari state form

          if (userRole === 'siswa') {
            navigate('/siswa/Daftar-siswa', { state: { userId: userId } });
          } else if (userRole === 'guru') {
            navigate('/guru/Daftar-guru', { state: { userId: userId } });
          } else if (userRole === 'staf' || userRole === 'staff') {
            navigate('/staff/Daftar-staff', { state: { userId: userId } });
          }
        }
      }

    } catch (err) {
      alert(err.response?.data?.message || "Register gagal");
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

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username (opsional)"
                onChange={handleChange}
                className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Role</label>
              <select
                name="role"
                onChange={handleChange}
                required
                className="h-10 border border-[#ddd] rounded-lg px-3 bg-white"
              >
                <option value="">-- Pilih Role --</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru</option>
                <option value="staf">Staf</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-bold text-[#3e2723] text-sm">NIS / NIP</label>
              <div className="relative">
                <input
                  type="text"
                  name="registration_id"
                  onChange={handleChange}
                  required
                  className="w-full h-10 border border-[#6d4c41] rounded-lg px-10 outline-none"
                />
                <Fingerprint className="absolute left-3 top-2.5 text-[#6d4c41]" size={18} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Password</label>
              <div className="flex border border-[#ddd] rounded-lg h-10">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="flex-1 px-3 outline-none"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="px-2">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#3e2723] text-sm">Konfirmasi Password</label>
              <div className="flex border border-[#ddd] rounded-lg h-10">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  className="flex-1 px-3 outline-none"
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="px-2">
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#3e2723] text-white px-8 py-2 rounded-xl flex items-center gap-2"
            >
              {isLoading ? "Loading..." : "Daftar"}
              <ChevronRight size={18} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Daftar;