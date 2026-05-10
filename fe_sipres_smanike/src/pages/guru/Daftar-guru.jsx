import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

    if (!userId) {
      alert("User tidak ditemukan");
      navigate("/daftar");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5001/api/auth/guru/update",
        {
          user_id: userId,
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.status === "success" || res.status === 200) {
        alert("Profil guru berhasil dilengkapi");
        navigate("/login");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Gagal guru");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex items-center justify-center px-5 py-24 font-sans">

      <div className="bg-white w-full max-w-[650px] px-8 md:px-[60px] py-[40px] rounded-[30px] shadow-xl border-2 border-[#3e2723]">

        <h2 className="text-center text-[#3e2723] text-2xl font-extrabold mb-8">
          PROFIL GURU
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NIP */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">NIP</label>
            <input
              name="nip"
              onChange={handleChange}
              placeholder="Nomor Induk Pegawai"
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* NAMA */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">Nama Lengkap</label>
            <input
              name="nama_lengkap"
              onChange={handleChange}
              placeholder="Nama lengkap"
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* GELAR */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">Gelar</label>
            <input
              name="gelar"
              onChange={handleChange}
              placeholder="Contoh: S.Pd"
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* JENIS KELAMIN */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              onChange={handleChange}
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none bg-white focus:border-[#6d4c41]"
            >
              <option value="">Pilih</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          {/* NO HP */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">No HP</label>
            <input
              name="no_hp"
              onChange={handleChange}
              placeholder="08xxxxxxxx"
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* ALAMAT */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#3e2723]">Alamat</label>
            <input
              name="alamat"
              onChange={handleChange}
              placeholder="Alamat lengkap"
              className="w-full h-12 px-4 border border-[#ddd] rounded-xl outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#3e2723] text-white rounded-xl font-bold hover:bg-[#2d1b17] transition disabled:bg-[#bcaaa4]"
          >
            {isLoading ? "Menyimpan..." : "Simpan Profil"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/daftar")}
            className="w-full h-10 bg-[#efebe9] text-[#3e2723] rounded-xl font-bold hover:bg-[#d7ccc8] transition"
          >
            Kembali
          </button>

        </form>
      </div>
    </div>
  );
};

export default DaftarGuru;