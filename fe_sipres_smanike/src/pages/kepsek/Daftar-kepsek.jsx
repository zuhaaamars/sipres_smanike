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
    <div className="daftar-container">
      <div className="daftar-card">
        <h2 className="daftar-title">LENGKAPI PROFIL KEPALA SEKOLAH</h2>

        <form className="daftar-form" onSubmit={handleSubmit}>

          <div className="form-group-row">
            <label>NIP</label>
            <input type="text" name="nip" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Nama Lengkap</label>
            <input type="text" name="nama_lengkap" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Periode Mulai</label>
            <input type="date" name="periode_mulai" onChange={handleChange} />
          </div>

          <div className="form-group-row">
            <label>Periode Selesai</label>
            <input type="date" name="periode_selesai" onChange={handleChange} />
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

export default DaftarKepsek;
