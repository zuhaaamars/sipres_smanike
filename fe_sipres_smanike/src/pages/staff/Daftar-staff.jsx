import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DaftarStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nip: '',
    nama_lengkap: '',
    bagian: '',
    no_hp: ''
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
      const response = await axios.post('http://localhost:5000/api/staf', {
        ...formData,
        user_id: userId
      });

      if (response.status === 201) {
        alert("Profil staf berhasil disimpan!");
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan data staf");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex flex-col items-center px-5 py-24 font-sans text-[#6d4c41]">

      <div className="bg-white w-full max-w-[850px] px-[70px] py-[50px] rounded-[30px] border-2 border-[#3e2723] shadow-[0_15px_35px_rgba(0,0,0,0.04)]">

        <h2 className="text-center text-[2rem] font-extrabold mb-[40px] tracking-wide text-[#4e342e]">
          LENGKAPI PROFIL STAF
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NIP */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold">NIP (Opsional)</label>
            <input
              type="text"
              name="nip"
              placeholder="Kosongkan jika honorer"
              onChange={handleChange}
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Nama */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              onChange={handleChange}
              required
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            />
          </div>

          {/* Bagian */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold">Bagian</label>
            <select
              name="bagian"
              onChange={handleChange}
              className="flex-1 w-full bg-white border border-[#e0d6c7] rounded-[10px] px-[15px] py-[12px] outline-none focus:border-[#bc8f5a]"
            >
              <option value="">-- Pilih Bagian --</option>
              <option value="Tata Usaha">Tata Usaha</option>
              <option value="Perpustakaan">Perpustakaan</option>
              <option value="Administrasi">Administrasi</option>
              <option value="Operator Sekolah">Operator Sekolah</option>
            </select>
          </div>

          {/* No HP */}
          <div className="flex items-center mb-[25px] gap-[30px] max-md:flex-col max-md:items-start">
            <label className="basis-[220px] font-bold">Nomor HP</label>

            <div className="flex-1 w-full flex border border-[#e0d6c7] rounded-[10px] overflow-hidden">
              <div className="flex items-center justify-center px-4 bg-[#f5e6d3] border-r border-[#e0d6c7] text-[#4e342e] font-semibold">
                +62
              </div>

              <input
                type="text"
                name="no_hp"
                placeholder="8xxxxxxxx"
                onChange={handleChange}
                className="flex-1 px-[15px] py-[12px] outline-none"
              />
            </div>
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
              className="bg-[#6d4c41] text-white px-[35px] py-[12px] rounded-[10px] font-bold hover:bg-[#5d4037] transition disabled:bg-[#bcaaa4]"
            >
              {isLoading ? "Menyimpan..." : "Simpan Profil"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default DaftarStaff;
