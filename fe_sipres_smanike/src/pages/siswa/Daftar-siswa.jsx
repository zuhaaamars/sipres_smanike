import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DaftarSiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil userId dari halaman pendaftaran sebelumnya
  const userId = location.state?.userId;

  const [isLoading, setIsLoading] = useState(false);
  const [kelasList, setKelasList] = useState([]);

  const [siswaProfile, setSiswaProfile] = useState({
    nisn: '',
    kelas_id: '',
    nama_ortu: '',
    no_telp_ortu: ''
  });

  // 🔥 1. LOGIKA AMBIL DATA MASTER KELAS (DITAMBAHKAN)
  useEffect(() => {
    const fetchKelas = async () => {
      try {
        // Pastikan port 5001 dan endpoint /api/kelas sesuai dengan backend
        const res = await axios.get("http://localhost:5001/api/kelas");
        
        // Cek jika res.data adalah array (sesuai return jsonify k.id, k.kelas kamu)
        if (Array.isArray(res.data)) {
          setKelasList(res.data);
        } else if (res.data.data) {
          setKelasList(res.data.data);
        }
      } catch (err) {
        console.error("Gagal load daftar kelas. Pastikan backend jalan di port 5001:", err);
      }
    };

    fetchKelas();
  }, []);

  // 🔥 2. PROTEKSI HALAMAN (DITAMBAHKAN)
  // Jika tidak ada userId (akses paksa lewat URL), balikkan ke halaman daftar awal
  useEffect(() => {
    if (!userId) {
      alert("Sesi pendaftaran tidak valid. Silakan isi form pendaftaran awal.");
      navigate("/daftar");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setSiswaProfile({
      ...siswaProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID tidak ditemukan. Silakan daftar ulang.");
      navigate("/daftar");
      return;
    }

    setIsLoading(true);

    try {
      // Mengirim data ke endpoint update profil siswa
      const res = await axios.post(
        "http://localhost:5001/api/auth/siswa/update",
        {
          user_id: userId,
          ...siswaProfile
        }
      );

      if (res.data.status === "success" || res.status === 201 || res.status === 200) {
        alert("Profil siswa berhasil dilengkapi! Silakan login.");
        navigate("/login");
      }

    } catch (err) {
      console.error("Error update profil:", err);
      alert(err.response?.data?.message || "Gagal menyimpan profil siswa");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex flex-col items-center px-5 py-24 font-sans">

      <div className="bg-white w-full max-w-[850px] px-[70px] py-[50px] rounded-[30px] border-2 border-[#3e2723] shadow-[0_15px_35px_rgba(0,0,0,0.04)] mt-5">

        <h1 className="text-center text-[#4e342e] text-[2rem] font-extrabold mb-[40px] tracking-wide">
          PROFIL SISWA
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NISN */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#3e2723] text-sm">NISN</label>
            <input
              name="nisn"
              type="text"
              placeholder="Contoh: 1234567890"
              onChange={handleChange}
              required
              className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* KELAS (DROPDOWN OTOMATIS) */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#3e2723] text-sm">Kelas</label>
            <select
              name="kelas_id"
              onChange={handleChange}
              value={siswaProfile.kelas_id}
              required
              className="h-10 border border-[#ddd] rounded-lg px-3 outline-none bg-white focus:border-[#6d4c41]"
            >
              <option value="">-- Pilih Kelas --</option>
              {kelasList.map((k) => (
                <option key={k.id} value={k.id}>
                  {/* k.kelas diambil dari return jsonify backend kamu tadi */}
                  {k.kelas} {k.nama_jurusan ? `- ${k.nama_jurusan}` : ""}
                </option>
              ))}
            </select>
            {kelasList.length === 0 && (
              <span className="text-xs text-red-500 italic">* Belum ada data kelas di database</span>
            )}
          </div>

          {/* NAMA ORTU */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#3e2723] text-sm">Nama Orang Tua</label>
            <input
              name="nama_ortu"
              type="text"
              placeholder="Masukkan nama lengkap orang tua"
              onChange={handleChange}
              required
              className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* NO HP ORTU */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#3e2723] text-sm">No HP Orang Tua</label>
            <input
              name="no_telp_ortu"
              type="tel"
              placeholder="08xxxxxxxxxx"
              onChange={handleChange}
              required
              className="h-10 border border-[#ddd] rounded-lg px-3 outline-none focus:border-[#6d4c41]"
            />
          </div>

          {/* BUTTON SIMPAN */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#3e2723] text-white rounded-xl font-bold hover:bg-[#2d1b17] transition disabled:bg-[#bcaaa4] mt-4"
          >
            {isLoading ? "Sedang Menyimpan..." : "Simpan Profil & Selesai"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/daftar')}
            className="w-full h-10 bg-[#efebe9] text-[#3e2723] rounded-xl font-bold hover:bg-[#d7ccc8] transition"
          >
            Kembali
          </button>

        </form>
      </div>
    </div>
  );
};

export default DaftarSiswa;