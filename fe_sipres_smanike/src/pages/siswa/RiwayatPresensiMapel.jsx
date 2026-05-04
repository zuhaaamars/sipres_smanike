import React, { useState } from 'react';
import { BookOpen, Calendar, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

const RiwayatPresensiMapel = () => {
  // Simulasi data berdasarkan Modul Presensi Mata Pelajaran 
  const [riwayatMapel] = useState([
    { id: 1, tanggal: '2026-03-27', mapel: 'Pemrograman Web', guru: 'Bapak Ahmad', masuk: '08:05', keluar: '10:00', status: 'Hadir' },
    { id: 2, tanggal: '2026-03-27', mapel: 'Bahasa Indonesia', guru: 'Ibu Siti', masuk: '10:15', keluar: '12:00', status: 'Hadir' },
    { id: 3, tanggal: '2026-03-26', mapel: 'Matematika', guru: 'Bapak Budi', masuk: '-', keluar: '-', status: 'Alpa' },
    { id: 4, tanggal: '2026-03-26', mapel: 'Fisika', guru: 'Ibu Maya', masuk: '13:05', keluar: '14:30', status: 'Izin' },
  ]);

  const getStatusClass = (status) => {
    if (status === 'Hadir') return 'status-mapel-hadir';
    if (status === 'Alpa') return 'status-mapel-alpa';
    return 'status-mapel-izin';
  };

  return (
    <div className="riwayat-mapel-container">
      <header className="page-header">
        <h1>RIWAYAT PRESENSI MATA PELAJARAN</h1>
        <p>Rekap kehadiran per mata pelajaran berdasarkan scan barcode kelas </p>
      </header>

      {/* Ringkasan Kehadiran Mapel */}
      <section className="mapel-stats-grid">
        <div className="mapel-stat-box total">
          <BookOpen size={20} />
          <span>Total Mapel: 4</span>
        </div>
        <div className="mapel-stat-box hadir">
          <CheckCircle2 size={20} />
          <span>Hadir: 2</span>
        </div>
        <div className="mapel-stat-box alpa">
          <XCircle size={20} />
          <span>Tidak Hadir: 2</span>
        </div>
      </section>

      {/* Konten Utama */}
      <div className="mapel-table-card">
        <div className="mapel-table-header">
          <div className="mapel-search">
            <Search size={18} />
            <input type="text" placeholder="Cari nama mata pelajaran..." />
          </div>
          <button className="btn-filter-mapel"><Filter size={18} /> Filter Mapel</button>
        </div>

        <div className="mapel-table-wrapper">
          <table className="mapel-history-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Mata Pelajaran</th>
                <th>Guru</th>
                <th>Scan Mulai</th>
                <th>Scan Selesai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayatMapel.map((item) => (
                <tr key={item.id}>
                  <td><div className="date-cell"><Calendar size={14} /> {item.tanggal}</div></td>
                  <td className="font-bold-mapel">{item.mapel}</td>
                  <td>{item.guru}</td>
                  <td><span className="time-tag">{item.masuk}</span></td>
                  <td><span className="time-tag">{item.keluar}</span></td>
                  <td>
                    <span className={`mapel-status-badge ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPresensiMapel;