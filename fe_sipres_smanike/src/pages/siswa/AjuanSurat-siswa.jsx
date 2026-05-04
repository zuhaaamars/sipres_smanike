import React, { useState } from 'react';
import { Info } from 'lucide-react';

const AjuanSuratSiswa = () => {
  const [formData, setFormData] = useState({
    jenisSurat: '',
    perihal: '',
    isi: '',
    dokumen: null
  });

  // Data Otomatis sesuai mockup (User Tkt 1)
  const user = {
    nama: "Budi Santoso",
    nisn: "1234567890",
    kelas: "XI MIPA 1",
    whatsapp: "+628XXXXXXXXXX"
  };

  return (
    <div className="buat-surat-container">
      <header className="page-header">
        <h1>FORMULIR AJUAN SURAT BARU</h1>
      </header>

      <div className="form-card">
        {/* SECTION 1: DATA PEMOHON (OTOMATIS) - Background Teal */}
        <section className="form-section section-readonly">
          <div className="section-header">
            <h2>Data Pemohon (Otomatis)</h2>
          </div>
          <div className="grid-inputs">
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input type="text" value={user.nama} readOnly className="input-disabled" />
            </div>
            <div className="input-group">
              <label>NISN</label>
              <input type="text" value={user.nisn} readOnly className="input-disabled" />
            </div>
            <div className="input-group">
              <label>Kelas</label>
              <input type="text" value={user.kelas} readOnly className="input-disabled" />
            </div>
            <div className="input-group">
              <label>Whatsapp</label>
              <input type="text" value={user.whatsapp} readOnly className="input-disabled" />
            </div>
          </div>
        </section>

        {/* SECTION 2: DETAIL AJUAN SURAT */}
        <section className="form-section">
          <div className="section-header-detail">
            <h2>DETAIL AJUAN SURAT</h2>
          </div>
          
          <div className="main-form-grid">
            <div className="left-column">
              <div className="input-group">
                <label>Jenis Surat <Info size={14} className="info-icon" /></label>
                <select 
                  value={formData.jenisSurat} 
                  onChange={(e) => setFormData({...formData, jenisSurat: e.target.value})}
                >
                  <option value="">Pilih Jenis Surat</option>
                  <option>Surat Keterangan Benar-benar Siswa / Keterangan Aktif</option>
                  <option>Surat Keterangan Belum Punya KTA</option>
                  <option>Surat Rekomendasi (Lomba, PIP, dll)</option>
                  <option>Surat Dispensasi</option>
                  <option>Surat Mutasi (Masuk/Keluar)</option>
                  <option>Surat Perintah Tugas</option>
                  <option>Surat Keterangan Lulus / Sudah Mengikuti Ujian</option>
                  <option>Lain - lain</option>
                </select>
              </div>

              <div className="input-group">
                <label>Tanggal Ajuan <Info size={14} className="info-icon" /></label>
                <input type="text" value={new Date().toLocaleDateString('id-ID')} readOnly className="input-disabled" />
                <span className="helper-text">Default input, default to today</span>
              </div>
            </div>

            <div className="right-column">
              <div className="input-group">
                <label>Perihal Surat</label>
                <input 
                  type="text" 
                  placeholder="Masukkan perihal surat"
                  onChange={(e) => setFormData({...formData, perihal: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Isi / Keperluan Surat <Info size={14} className="info-icon" /></label>
                <textarea 
                  placeholder="Jelaskan detail keperluan surat Anda..."
                  rows="5"
                  onChange={(e) => setFormData({...formData, isi: e.target.value})}
                ></textarea>
              </div>

              <div className="input-group">
                <label>Upload Dokumen Pendukung</label>
                <p className="helper-text">PDF/Image max 5MB</p>
                <div className="file-upload-wrapper">
                  <input type="file" id="file-upload" hidden />
                  <label htmlFor="file-upload" className="btn-upload-label">Pilih file</label>
                  <span className="file-name-text">Belum ada file dipilih</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TOMBOL AKSI */}
        <div className="form-actions-bar">
          <button className="btn-batal-kirim">
            BATAL KIRIM
          </button>
          <button className="btn-kirim-ajuan">
            KIRIM AJUAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjuanSuratSiswa;