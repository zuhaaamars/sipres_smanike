import React, { useState } from 'react';
import { 
  Archive, 
  Search, 
  FileText, 
  Download 
} from 'lucide-react';

const ArsipSurat = () => {
  const [search, setSearch] = useState('');

  const dataSurat = [
    {
      nama: "Aditya Pratama",
      jenis: "Surat Keterangan Siswa",
      tanggal: "01 Feb 2026",
      status: "Selesai"
    },
    {
      nama: "Siti Aminah",
      jenis: "Surat Izin",
      tanggal: "30 Jan 2026",
      status: "Selesai"
    },
    {
      nama: "Bina Reza",
      jenis: "Surat Rekomendasi",
      tanggal: "28 Jan 2026",
      status: "Ditolak"
    }
  ];

  const filteredData = dataSurat.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.jenis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Arsip Surat</h1>
          <p>Kelola dan lihat semua surat yang telah selesai</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Tata Usaha</span>
            <strong>Siti Rahmawati, S.Pd</strong>
          </div>
          <div className="dg-avatar">TU</div>
        </div>
      </header>

      {/* SEARCH */}
      <div style={{ margin: '20px 0' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          background: '#fff',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari nama atau jenis surat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Daftar Arsip Surat</h2>
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
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.jenis}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    <span className={`dg-badge ${
                      item.status === 'Selesai' ? 'hadir' : 'izin'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '10px' }}>
                    <button className="dg-btn">
                      <FileText size={16} /> Lihat
                    </button>
                    <button className="dg-btn">
                      <Download size={16} /> PDF
                    </button>
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

export default ArsipSurat;
