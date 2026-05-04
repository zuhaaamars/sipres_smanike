import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye 
} from 'lucide-react';


const AjuanSuratStaff = () => {

  const [search, setSearch] = useState('');

  const dataAjuan = [
    {
      id: 1,
      nama: "Aditya Pratama",
      kelas: "XII RPL 1",
      jenis: "Surat Keterangan Sekolah",
      tanggal: "02 April 2026",
      status: "Menunggu"
    },
    {
      id: 2,
      nama: "Siti Aminah",
      kelas: "XII RPL 1",
      jenis: "Surat Izin",
      tanggal: "01 April 2026",
      status: "Diverifikasi"
    },
    {
      id: 3,
      nama: "Bina Reza",
      kelas: "XII RPL 1",
      jenis: "Surat Peminjaman",
      tanggal: "01 April 2026",
      status: "Ditolak"
    }
  ];

  const filteredData = dataAjuan.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Ajuan Surat Siswa</h1>
          <p>Verifikasi dan kelola ajuan surat siswa</p>
        </div>
      </header>

      {/* SEARCH */}
      <div className="dg-action-card" style={{ marginBottom: '20px' }}>
        <Search size={18} />
        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            marginLeft: '10px',
            width: '100%'
          }}
        />
      </div>

      {/* TABLE */}
      <div className="dg-table-card">
        <table className="dg-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Jenis Surat</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.kelas}</td>
                <td>{item.jenis}</td>
                <td>{item.tanggal}</td>
                <td>
                  <span className={`dg-badge ${
                    item.status === 'Menunggu' ? 'belum' :
                    item.status === 'Diverifikasi' ? 'hadir' :
                    'izin'
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td style={{ display: 'flex', gap: '8px' }}>

                  {/* DETAIL */}
                  <button className="dg-btn" style={{ background: '#64748b' }}>
                    <Eye size={16} />
                  </button>

                  {/* VERIFIKASI */}
                  {item.status === "Menunggu" && (
                    <button className="dg-btn" style={{ background: '#22c55e' }}>
                      <CheckCircle2 size={16} />
                    </button>
                  )}

                  {/* TOLAK */}
                  {item.status === "Menunggu" && (
                    <button className="dg-btn" style={{ background: '#ef4444' }}>
                      <XCircle size={16} />
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AjuanSuratStaff;
