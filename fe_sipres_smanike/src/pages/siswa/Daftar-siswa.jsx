import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DaftarSiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userId = location.state?.userId;

  const [siswaProfile, setSiswaProfile] = useState({
    nisn: '',
    kelas_id: '',
    nama_ortu: '',
    no_telp_ortu: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setSiswaProfile({ ...siswaProfile, [id || name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      alert("ID Pengguna tidak ditemukan. Silakan daftar dari awal.");
      navigate('/daftar');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/auth/siswa/update',
        {
          userId: userId,
          ...siswaProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.status === "success" || response.status === 200) {
        alert("Profil Berhasil Dilengkapi!");
        navigate('/login'); 
      }

    } catch (err) {
      console.error("Update Error:", err.response?.data);

      if (err.response?.status === 401) {
        alert("Sesi login habis / token invalid. Login ulang.");
        navigate('/login');
      } else {
        alert(err.response?.data?.message || "Gagal melengkapi profil.");
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex flex-col items-center px-5 py-10 font-sans">

      <div className="bg-white w-full max-w-[850px] px-[70px] py-[50px] rounded-[30px] border-2 border-[#3e2723] shadow-[0_15px_35px_rgba(0,0,0,0.04)] mt-5">

        <h1 className="text-center text-[#4e342e] text-[2rem] font-extrabold mb-[40px] tracking-wide">
          PROFIL SISWA
        </h1>

        <p className="text-center mb-[20px] text-[14px] text-[#6d4c41]">
          Lengkapi NISN dan Data Orang Tua (User ID: {userId})
        </p>

        <form onSubmit={handleSubmit}>

          {/* NISN */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">NISN</label>
            <input
              id="nisn"
              type="text"
              placeholder="1234567890"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a] focus:shadow-[0_0_0_3px_rgba(188,143,90,0.2)]"
            />
          </div>

          {/* Kelas */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Pilih Kelas</label>
            <select
              id="kelas_id"
              onChange={handleChange}
              required
              defaultValue=""
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            >
              <option value="" disabled>-- Pilih Kelas --</option>
              <option value="1">Kelas X</option>
              <option value="2">Kelas XI</option>
              <option value="3">Kelas XII</option>
            </select>
          </div>

          {/* Nama Ortu */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Nama Orang Tua</label>
            <input
              id="nama_ortu"
              type="text"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* No HP Ortu */}
          <div className="flex items-center mb-[22px] gap-[30px] max-md:flex-col">
            <label className="basis-[220px] font-bold text-[#3e2723]">No.HP Orang Tua</label>
            <div className="flex-1 flex border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="px-4 bg-[#efebe9] flex items-center gap-2 font-semibold text-[#3e2723] whitespace-nowrap">
                <div className="px-4 bg-[#efebe9] flex flex-col items-center justify-center font-semibold text-[#3e2723] leading-tight">
                  <span className="text-[13px] font-bold">ID</span>
                  <span className="text-[13px] font-bold">+62</span>
                </div>
                </div>
              <input type="text" name="no_hp" placeholder="8xxxxxxxx"
                onChange={handleChange} required
                className="w-full px-[15px] outline-none"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-between mt-[50px] gap-5 max-md:flex-col-reverse">
            <button
              type="button"
              onClick={() => navigate('/daftar')}
              className="bg-[#efebe9] px-[35px] py-[12px] rounded-[10px] font-bold hover:bg-[#d7ccc8]"
            >
              Kembali
            </button>

  <button
    type="submit"
    disabled={isLoading}
    className="bg-[#6d4c41] text-white px-[30px] py-[12px] rounded-[10px] font-bold hover:bg-[#5d4037] transition disabled:bg-[#bcaaa4]"
  >
    {isLoading ? "Menyimpan..." : "Selesai & Daftar"}
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default DaftarSiswa;