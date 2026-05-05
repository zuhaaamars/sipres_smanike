import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DaftarKepsek = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nip: '',
    nama_lengkap: '',
    periode_mulai: '',
    periode_selesai: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/kepsek', {
        ...formData,
        user_id: userId
      });

      if (response.status === 201) {
        alert("Profil Kepala Sekolah berhasil disimpan!");
        navigate('/login');
      }

    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan data kepsek");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] font-sans px-5 py-10">

      <div className="w-full max-w-[850px] bg-white px-[70px] py-[50px] rounded-[30px] border-2 border-[#3e2723] shadow-[0_15px_35px_rgba(0,0,0,0.04)]">

        <h2 className="text-center text-[2rem] font-extrabold text-[#4e342e] mb-[40px] tracking-wide">
          LENGKAPI PROFIL KEPALA SEKOLAH
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NIP */}
          <div className="flex items-center gap-[30px] max-md:flex-col max-md:items-start">
            <label className="w-[220px] font-bold text-[#4e342e]">NIP</label>
            <input
              type="text"
              name="nip"
              onChange={handleChange}
              required
              className="flex-1 w-full border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a] focus:shadow-[0_0_0_3px_rgba(188,143,90,0.2)]"
            />
          </div>

          {/* Nama */}
          <div className="flex items-center gap-[30px] max-md:flex-col max-md:items-start">
            <label className="w-[220px] font-bold text-[#4e342e]">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              onChange={handleChange}
              required
              className="flex-1 w-full border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Periode Mulai */}
          <div className="flex items-center gap-[30px] max-md:flex-col max-md:items-start">
            <label className="w-[220px] font-bold text-[#4e342e]">Periode Mulai</label>
            <input
              type="date"
              name="periode_mulai"
              onChange={handleChange}
              className="flex-1 w-full border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Periode Selesai */}
          <div className="flex items-center gap-[30px] max-md:flex-col max-md:items-start">
            <label className="w-[220px] font-bold text-[#4e342e]">Periode Selesai</label>
            <input
              type="date"
              name="periode_selesai"
              onChange={handleChange}
              className="flex-1 w-full border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-between mt-[50px] gap-5 max-md:flex-col-reverse">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#efebe9] text-[#4e342e] px-[35px] py-[12px] rounded-[10px] font-bold hover:bg-[#e0d6c7] transition"
            >
              Kembali
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6d4c41] text-white px-[30px] py-[12px] rounded-[10px] font-bold hover:bg-[#5d4037] transition disabled:bg-[#bcaaa4]"
            >
              {isLoading ? "Menyimpan..." : "Simpan Profil"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default DaftarKepsek;
