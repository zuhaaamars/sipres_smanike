import React, { useState } from 'react';
import { 
  CalendarDays, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  XCircle
} from 'lucide-react';

const RekapHarianStaff = () => {
  const [tanggal, setTanggal] = useState('2026-02-02');

  const dataPresensi = [
    {
      nama: "Aditya Pratama",
      kelas: "XII RPL 1",
      status: "Hadir",
      waktu: "07:05"
    },
    {
      nama: "Bina Reza",
      kelas: "XII RPL 1",
      status: "Hadir",
      waktu: "07:12"
    },
    {
      nama: "Siti Aminah",
      kelas: "XII RPL 1",
      status: "Izin",
      waktu: "-"
    },
    {
      nama: "Dewi Lestari",
      kelas: "XII RPL 2",
      status: "Alfa",
      waktu: "-"
    }
  ];

  // HITUNG REKAP
  const hadir = dataPresensi.filter(d => d.status === "Hadir").length;
  const izin = dataPresensi.filter(d => d.status === "Izin").length;
  const alfa = dataPresensi.filter(d => d.status === "Alfa").length;

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Rekap Presensi Harian</h1>
          <p>Monitoring kehadiran seluruh siswa per hari</p>
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
      <div style={{ margin: '20px 0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#fff',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <CalendarDays size={18} />
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            style={{
              border: 'none',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* RINGKASAN */}
      <div className="dg-action-grid">

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <CheckCircle2 size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Hadir</h3>
            <p>{hadir} Siswa</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <AlertCircle size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Izin</h3>
            <p>{izin} Siswa</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <XCircle size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Alfa</h3>
            <p>{alfa} Siswa</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <Users size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total</h3>
            <p>{dataPresensi.length} Siswa</p>
          </div>
        </div>

      </div>

      {/* TABEL */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Data Presensi ({tanggal})</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Status</th>
                <th>Waktu Masuk</th>
              </tr>
            </thead>

            <tbody>
              {dataPresensi.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.kelas}</td>
                  <td>
                    <span className={`dg-badge ${
                      item.status === 'Hadir' ? 'hadir' :
                      item.status === 'Izin' ? 'izin' : 'belum'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.waktu}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default RekapHarianStaff;
