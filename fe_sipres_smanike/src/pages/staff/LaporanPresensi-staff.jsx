import React, { useState } from 'react';
import { 
  CalendarRange, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  FileDown
} from 'lucide-react';

const LaporanPresensi = () => {

  const [tanggalMulai, setTanggalMulai] = useState('2026-02-01');
  const [tanggalAkhir, setTanggalAkhir] = useState('2026-02-07');

  const data = [
    {
      nama: "Aditya Pratama",
      kelas: "XII RPL 1",
      hadir: 6,
      izin: 1,
      alfa: 0
    },
    {
      nama: "Bina Reza",
      kelas: "XII RPL 1",
      hadir: 5,
      izin: 1,
      alfa: 1
    },
    {
      nama: "Siti Aminah",
      kelas: "XII RPL 1",
      hadir: 4,
      izin: 2,
      alfa: 1
    },
    {
      nama: "Dewi Lestari",
      kelas: "XII RPL 2",
      hadir: 3,
      izin: 1,
      alfa: 3
    }
  ];

  // TOTAL GLOBAL
  const totalHadir = data.reduce((sum, d) => sum + d.hadir, 0);
  const totalIzin = data.reduce((sum, d) => sum + d.izin, 0);
  const totalAlfa = data.reduce((sum, d) => sum + d.alfa, 0);

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Laporan Presensi</h1>
          <p>Rekap kehadiran siswa berdasarkan periode</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Tata Usaha</span>
            <strong>Siti Rahmawati, S.Pd</strong>
          </div>
          <div className="dg-avatar">TU</div>
        </div>
      </header>

      {/* FILTER TANGGAL */}
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <CalendarRange size={16} />
          <input 
            type="date" 
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
          />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <CalendarRange size={16} />
          <input 
            type="date" 
            value={tanggalAkhir}
            onChange={(e) => setTanggalAkhir(e.target.value)}
          />
        </div>

        <button className="dg-btn">
          <FileDown size={16} /> Export
        </button>

      </div>

      {/* SUMMARY */}
      <div className="dg-action-grid">

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <CheckCircle2 size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Hadir</h3>
            <p>{totalHadir}</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <AlertCircle size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Izin</h3>
            <p>{totalIzin}</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <XCircle size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Alfa</h3>
            <p>{totalAlfa}</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <Users size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Siswa</h3>
            <p>{data.length}</p>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>
            Laporan ({tanggalMulai} s/d {tanggalAkhir})
          </h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Hadir</th>
                <th>Izin</th>
                <th>Alfa</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td><span className="dg-badge hadir">{item.hadir}</span></td>
                  <td><span className="dg-badge izin">{item.izin}</span></td>
                  <td><span className="dg-badge belum">{item.alfa}</span></td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default LaporanPresensi;
