import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DaftarGuru = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nip: '',
    nama_lengkap: '',
    gelar: '',
    jenis_kelamin: '',
    no_hp: '',
    alamat: ''
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
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/auth/guru/update',
        {
          ...formData,
          user_id: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert("Profil guru berhasil disimpan!");
        navigate('/login');
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Gagal menyimpan data guru");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex flex-col items-center px-5 py-10 font-sans">

      <div className="bg-white w-full max-w-[850px] px-[70px] py-[50px] rounded-[30px] border-2 border-[#3e2723] shadow-[0_15px_35px_rgba(0,0,0,0.04)] mt-5">

        <h2 className="text-center text-[#4e342e] text-[2rem] font-extrabold mb-[40px] tracking-wide">
          LENGKAPI PROFIL GURU
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NIP */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">NIP</label>
            <input
              type="text"
              name="nip"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a] focus:shadow-[0_0_0_3px_rgba(188,143,90,0.2)]"
            />
          </div>

          {/* Nama */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Gelar */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Gelar</label>
            <input
              type="text"
              name="gelar"
              placeholder="Contoh: S.Pd"
              onChange={handleChange}
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            >
              <option value="">-- Pilih --</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          {/* No HP */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Nomor HP</label>

            <div className="flex-1 w-full flex border border-[#e0d6c7] rounded-[10px] overflow-hidden bg-white">
              
              <div className="flex flex-col items-center justify-center px-[12px] min-w-[65px] bg-[#f5e6d3] border-r border-[#e0d6c7] text-[#4e342e]">
                <span className="text-[12px]">ID</span>
                <span className="text-[13px] font-semibold leading-none">+62</span>
              </div>

              <input
                type="text"
                name="no_hp"
                onChange={handleChange}
                className="flex-1 px-[15px] py-[12px] outline-none"
              />
            </div>

            </div> 

          {/* Alamat */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold text-[#4e342e]">Alamat</label>
            <input
              type="text"
              name="alamat"
              onChange={handleChange}
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-between mt-[50px] gap-5 max-md:flex-col-reverse">
            <button
              type="button"
              onClick={() => navigate('/Daftar')}
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

export default DaftarGuru;