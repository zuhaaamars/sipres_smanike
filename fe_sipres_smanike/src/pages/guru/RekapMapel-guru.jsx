import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Download, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  Filter
} from 'lucide-react';

const RekapMapelGuru = () => {
  // Data dummy rekap kehadiran per mata pelajaran
  const [dataRekap] = useState([
    { id: 1, nis: '24001', nama: 'Aditya Pratama', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Hadir', jam: '08:00 - 10:00' },
    { id: 2, nis: '24002', nama: 'Bina Reza Yuanda', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Hadir', jam: '08:00 - 10:00' },
    { id: 3, nis: '24003', nama: 'Siti Aminah', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Izin', jam: '08:00 - 10:00' },
    { id: 4, nis: '24001', nama: 'Aditya Pratama', kelas: 'XII RPL 1', mapel: 'Basis Data', status: 'Hadir', jam: '10:30 - 12:00' },
    { id: 5, nis: '24006', nama: 'Riyan Hidayat', kelas: 'XII RPL 1', mapel: 'Pemrograman Web', status: 'Alpa', jam: '08:00 - 10:00' },
  ]);

  return (
    <div className="rm-container">
      <header className="rm-header">
        <div className="rm-header-info">
          <h1>Laporan Presensi Mata Pelajaran</h1>
          <p>Rekapitulasi kehadiran siswa berdasarkan jam mengajar Anda.</p>
        </div>
        <div className="rm-header-actions">
          <button className="rm-btn secondary"><Calendar size={18} /> Pilih Periode</button>
          <button className="rm-btn primary"><Download size={18} /> Download PDF</button>
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <div className="rm-summary-grid">
        <div className="rm-summary-card">
          <div className="rm-card-icon blue"><BookOpen size={24} /></div>
          <div className="rm-card-text">
            <span>Total Pertemuan</span>
            <h3>12 Kali</h3>
          </div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-card-icon green"><CheckCircle size={24} /></div>
          <div className="rm-card-text">
            <span>Rata-rata Kehadiran</span>
            <h3>94%</h3>
          </div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-card-icon orange"><Users size={24} /></div>
          <div className="rm-card-text">
            <span>Siswa Terajin</span>
            <h3>32 Siswa</h3>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="rm-filter-bar">
        <div className="rm-search-input">
          <Search size={18} />
          <input type="text" placeholder="Cari nama atau kelas..." />
        </div>
        <div className="rm-filter-group">
          <select className="rm-select">
            <option>Semua Mata Pelajaran</option>
            <option>Pemrograman Web</option>
            <option>Basis Data</option>
          </select>
          <select className="rm-select">
            <option>Semua Kelas</option>
            <option>XII RPL 1</option>
            <option>XII RPL 2</option>
          </select>
          <button className="rm-filter-btn"><Filter size={18} /></button>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="rm-table-container">
        <table className="rm-table">
          <thead>
            <tr>
              <th>NIS</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Mata Pelajaran</th>
              <th>Jam Pelajaran</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataRekap.map((item) => (
              <tr key={item.id}>
                <td className="fw-bold">{item.nis}</td>
                <td>{item.nama}</td>
                <td>{item.kelas}</td>
                <td><span className="rm-mapel-tag">{item.mapel}</span></td>
                <td>
                  <div className="rm-time-info">
                    <Clock size={14} /> {item.jam}
                  </div>
                </td>
                <td>
                  <span className={`rm-status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RekapMapelGuru;