import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ TAMBAHAN
import { 
  FileCheck, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';

const DashboardKepalaSekolah = () => {

  const navigate = useNavigate(); // ✅ TAMBAHAN

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Dashboard Kepala Sekolah</h1>
          <p>Validasi Sistem & Monitoring Sekolah</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Kepala Sekolah</span>
            <strong>Drs. Ahmad Wijaya</strong>
          </div>
          <div className="dg-avatar">K</div>
        </div>
      </header>

      {/* ACTION CARDS */}
      <div className="dg-action-grid">

        {/* VALIDASI SURAT */}
        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <FileCheck size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Validasi E-Surat</h3>
            <p>8 surat menunggu tanda tangan</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/kepsek/DaftarValidasi')} 
            >
              Validasi Sekarang <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* LAPORAN PRESENSI */}
        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <BarChart3 size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Laporan Presensi</h3>
            <p>Lihat laporan harian & mapel</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/kepsek/LaporanPresensi')} // optional
            >
              Lihat Laporan <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* DATA SEKOLAH */}
        <div className="dg-action-card">
          <div className="dg-icon-box blue" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Data Sekolah</h3>
            <p>Total siswa, guru & tendik</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/kepsek/DataSekolah')} // optional
            >
              Lihat Data <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="dg-main-layout">

        {/* STATISTIK */}
        <div className="dg-table-section">
          <div className="dg-section-title">
            <h2>Ringkasan Hari Ini</h2>
          </div>

          <div className="dg-table-card">
            <table className="dg-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Presensi Hadir</td>
                  <td>320 Siswa</td>
                  <td><span className="dg-badge hadir">Baik</span></td>
                </tr>

                <tr>
                  <td>Siswa Izin</td>
                  <td>15 Siswa</td>
                  <td><span className="dg-badge izin">Perlu Perhatian</span></td>
                </tr>

                <tr>
                  <td>Terlambat</td>
                  <td>8 Siswa</td>
                  <td><span className="dg-badge belum">Monitoring</span></td>
                </tr>

                <tr>
                  <td>Surat Masuk</td>
                  <td>12 Surat</td>
                  <td><span className="dg-badge hadir">Diproses</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTIFIKASI */}
        <div className="dg-side-section">
          <div className="dg-section-title">
            <h2>Pemberitahuan</h2>
          </div>

          <div className="dg-notif-list">

            <div className="dg-notif-item alert">
              <AlertCircle size={18} />
              <p>8 surat membutuhkan validasi segera.</p>
            </div>

            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>Laporan presensi hari ini sudah tersedia.</p>
            </div>

            <div className="dg-notif-item alert">
              <AlertCircle size={18} />
              <p>Beberapa siswa terdeteksi di luar radius presensi.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardKepalaSekolah;
