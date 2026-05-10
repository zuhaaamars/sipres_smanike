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

    if (!userId) {
      alert("User ID tidak ditemukan, ulangi dari daftar");
      navigate('/daftar');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/staf/update",
        {
          user_id: userId,
          ...formData
        }
      );

      if (res.data.status === "success") {
        alert("Profil staf berhasil disimpan");
        navigate("/login");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan data staf");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex items-center justify-center px-5 pt-24 pb-10 font-sans">

      <div className="bg-white w-full max-w-[600px] px-8 md:px-12 py-10 rounded-[30px] border-2 border-[#3e2723] shadow-xl">

        <h2 className="text-center text-[#3e2723] text-2xl font-extrabold mb-8 uppercase">
          LENGKAPI PROFIL STAF
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NIP */}
          <input
            name="nip"
            onChange={handleChange}
            placeholder="NIP (Opsional)"
            className="w-full h-11 px-4 border border-[#ddd] rounded-xl focus:border-[#6d4c41] outline-none"
          />

          {/* Nama */}
          <input
            name="nama_lengkap"
            onChange={handleChange}
            placeholder="Nama Lengkap"
            required
            className="w-full h-11 px-4 border border-[#ddd] rounded-xl focus:border-[#6d4c41] outline-none"
          />

          {/* Bagian */}
          <select
            name="bagian"
            onChange={handleChange}
            className="w-full h-11 px-4 border border-[#ddd] rounded-xl bg-white"
          >
            <option value="">-- Pilih Bagian --</option>
            <option value="Tata Usaha">Tata Usaha</option>
            <option value="Perpustakaan">Perpustakaan</option>
            <option value="Administrasi">Administrasi</option>
            <option value="Operator Sekolah">Operator Sekolah</option>
          </select>

          {/* No HP */}
          <input
            name="no_hp"
            onChange={handleChange}
            placeholder="No HP"
            required
            className="w-full h-11 px-4 border border-[#ddd] rounded-xl focus:border-[#6d4c41] outline-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#3e2723] text-white rounded-xl font-bold hover:bg-[#2d1b17] transition disabled:bg-[#bcaaa4]"
          >
            {isLoading ? "Menyimpan..." : "Simpan Profil"}
          </button>

          {/* BACK */}
          <button
            type="button"
            onClick={() => navigate('/daftar')}
            className="w-full h-10 bg-[#efebe9] text-[#3e2723] rounded-xl font-bold hover:bg-[#d7ccc8]"
          >
            Kembali
          </button>

        </form>
      </div>
    </div>
  );
};

export default DaftarStaff;