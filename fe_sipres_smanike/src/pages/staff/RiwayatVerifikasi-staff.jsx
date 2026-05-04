import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye 
} from 'lucide-react';

const RiwayatVerifikasiStaff = () => {

  const [search, setSearch] = useState('');

  const dataRiwayat = [
    {
      id: 1,
      nama: "Aditya Pratama",
      kelas: "XII RPL 1",
      jenis: "Surat Keterangan Sekolah",
      tglAjuan: "01 April 2026",
      tglVerifikasi: "02 April 2026",
      status: "Diverifikasi",
      petugas: "Siti Rahmawati"
    },
    {
      id: 2,
      nama: "Siti Aminah",
      kelas: "XII RPL 1",
      jenis: "Surat Izin",
      tglAjuan: "30 Maret 2026",
      tglVerifikasi: "31 Maret 2026",
      status: "Ditolak",
      petugas: "Siti Rahmawati"
    },
    {
      id: 3,
      nama: "Bina Reza",
      kelas: "XII RPL 1",
      jenis: "Surat Peminjaman",
      tglAjuan: "29 Maret 2026",
      tglVerifikasi: "30 Maret 2026",
      status: "Diverifikasi",
      petugas: "Siti Rahmawati"
    }
  ];

  const filteredData = dataRiwayat.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Riwayat Verifikasi Surat</h1>
          <p>Data surat yang telah diproses oleh Tata Usaha</p>
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
              <th>Tgl Ajuan</th>
              <th>Tgl Verifikasi</th>
              <th>Status</th>
              <th>Petugas</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.kelas}</td>
                <td>{item.jenis}</td>
                <td>{item.tglAjuan}</td>
                <td>{item.tglVerifikasi}</td>

                <td>
                  <span className={`dg-badge ${
                    item.status === 'Diverifikasi' ? 'hadir' : 'izin'
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.petugas}</td>

                <td>
                  <button 
                    className="dg-btn" 
                    style={{ background: '#64748b' }}
                  >
                    <Eye size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default RiwayatVerifikasiStaff;
