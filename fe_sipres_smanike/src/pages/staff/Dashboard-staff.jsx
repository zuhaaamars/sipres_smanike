import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  
  FileCheck, 
  FileText,
  BarChart3,
  Archive,
  AlertCircle, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

const DashboardStaff = () => {
  const navigate = useNavigate();

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Dashboard Tenaga Kependidikan</h1>
          <p>Manajemen Administrasi Surat & Presensi Sekolah</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Tata Usaha</span>
            <strong>Siti Rahmawati, S.Pd</strong>
          </div>
          <div className="dg-avatar">TU</div>
        </div>
      </header>

      {/* ACTION CARDS */}
      <div className="dg-action-grid">

        {/* VERIFIKASI SURAT */}
        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <FileCheck size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Verifikasi E-Surat</h3>
            <p>12 ajuan menunggu verifikasi</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/tendik/AjuanSurat')}
            >
              Periksa Sekarang <ArrowRight size={16} />
            </button>

          </div>
        </div>

        {/* GENERATE SURAT */}
        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <FileText size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Generate Surat</h3>
            <p>Buat & cetak surat resmi sekolah</p>
            <button className="dg-btn">
              Buat Surat <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* REKAP PRESENSI */}
        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <BarChart3 size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Rekap Presensi</h3>
            <p>Lihat kehadiran siswa hari ini</p>
            <button className="dg-btn">
              Lihat Rekap <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ARSIP SURAT */}
        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <Archive size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Arsip Surat</h3>
            <p>Kelola semua surat yang telah selesai</p>
            <button className="dg-btn">
              Buka Arsip <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="dg-main-layout">

        {/* TABEL AJUAN SURAT */}
        <div className="dg-table-section">
          <div className="dg-section-title">
            <h2>Daftar Ajuan Surat</h2>
          </div>

          <div className="dg-table-card">
            <table className="dg-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Jenis Surat</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Aditya Pratama</td>
                  <td>Surat Keterangan Siswa</td>
                  <td>02 Feb 2026</td>
                  <td><span className="dg-badge belum">Pending</span></td>
                  <td><button className="dg-btn">Verifikasi</button></td>
                </tr>

                <tr>
                  <td>Siti Aminah</td>
                  <td>Surat Izin</td>
                  <td>02 Feb 2026</td>
                  <td><span className="dg-badge izin">Revisi</span></td>
                  <td><button className="dg-btn">Periksa</button></td>
                </tr>

                <tr>
                  <td>Bina Reza</td>
                  <td>Surat Rekomendasi</td>
                  <td>01 Feb 2026</td>
                  <td><span className="dg-badge hadir">Terverifikasi</span></td>
                  <td><button className="dg-btn">Detail</button></td>
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
              <p>12 ajuan surat belum diverifikasi.</p>
            </div>

            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>8 surat telah dikirim ke Kepala Sekolah.</p>
            </div>

            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>Laporan presensi harian tersedia.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardStaff;
