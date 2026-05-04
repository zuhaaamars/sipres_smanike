import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  Filter
} from 'lucide-react';

const RiwayatVerifikasiGuru = () => {
  // Data dummy riwayat yang sudah diproses
  const [riwayat] = useState([
    { 
      id: 1, 
      nama: 'Budi Cahyono', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Lomba', 
      tanggal: '25 Mar 2026', 
      status: 'Disetujui',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
    { 
      id: 2, 
      nama: 'Andi Wijaya', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Sakit', 
      tanggal: '24 Mar 2026', 
      status: 'Ditolak',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
    { 
      id: 3, 
      nama: 'Rina Septiani', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Keperluan Keluarga', 
      tanggal: '20 Mar 2026', 
      status: 'Disetujui',
      oleh: 'Budi Santoso (Wali Kelas)'
    },
  ]);

  return (
    <div className="rv-container">
      <header className="rv-header">
        <div className="rv-header-info">
          <h1>Riwayat Verifikasi Surat</h1>
          <p>Daftar seluruh surat siswa yang telah diproses oleh Wali Kelas.</p>
        </div>
        <button className="rv-btn-export">
          <Download size={18} />
          <span>Export Excel</span>
        </button>
      </header>

      {/* FILTER BOX */}
      <div className="rv-filter-card">
        <div className="rv-search">
          <Search size={18} />
          <input type="text" placeholder="Cari nama siswa..." />
        </div>
        <div className="rv-actions">
          <button className="rv-filter-btn"><Calendar size={18} /> Pilih Tanggal</button>
          <button className="rv-filter-btn"><Filter size={18} /> Semua Status</button>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="rv-table-wrapper">
        <table className="rv-table">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Jenis Izin</th>
              <th>Tanggal Proses</th>
              <th>Status Akhir</th>
              <th>Diverifikasi Oleh</th>
              <th className="text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="rv-name-cell">
                    <strong>{item.nama}</strong>
                    <span>{item.kelas}</span>
                  </div>
                </td>
                <td>{item.jenis}</td>
                <td>{item.tanggal}</td>
                <td>
                  <div className={`rv-status-badge ${item.status.toLowerCase()}`}>
                    {item.status === 'Disetujui' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {item.status}
                  </div>
                </td>
                <td><span className="rv-verifikator">{item.oleh}</span></td>
                <td>
                  <div className="rv-action-center">
                    <button className="rv-view-btn"><Eye size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatVerifikasiGuru;