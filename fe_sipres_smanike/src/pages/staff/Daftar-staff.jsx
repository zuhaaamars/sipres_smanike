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
    <div className="daftar-container">
      <div className="daftar-card">
        <h2 className="daftar-title">LENGKAPI PROFIL STAF</h2>

        <form className="daftar-form" onSubmit={handleSubmit}>

          <div className="form-group-row">
            <label>NIP (Opsional)</label>
            <input type="text" name="nip" placeholder="Kosongkan jika honorer" onChange={handleChange} />
          </div>

          <div className="form-group-row">
            <label>Nama Lengkap</label>
            <input type="text" name="nama_lengkap" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Bagian</label>
            <select name="bagian" onChange={handleChange}>
              <option value="">-- Pilih Bagian --</option>
              <option value="Tata Usaha">Tata Usaha</option>
              <option value="Perpustakaan">Perpustakaan</option>
              <option value="Administrasi">Administrasi</option>
              <option value="Operator Sekolah">Operator Sekolah</option>
            </select>
          </div>

          <div className="form-group-row">
            <label>Nomor HP</label>
            <div className="phone-input-group">
              <div className="country-select"><span>🇮🇩 +62</span></div>
              <input type="text" name="no_hp" placeholder="8xxxxxxxx" onChange={handleChange} />
            </div>
          </div>

          <div className="daftar-footer-buttons">
            <button type="button" className="btn-kembali-daftar" onClick={() => navigate(-1)}>
              Kembali
            </button>

            <button type="submit" className="btn-lanjut" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DaftarStaff;
