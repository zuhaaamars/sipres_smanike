import React, { useState } from 'react';
import { Search, Eye, FileDown, Clock3, CheckCircle2, XCircle } from 'lucide-react';

const RiwayatSuratSiswa = () => {
  const [riwayatSurat] = useState([
    { id: 1, tanggal: '2023-10-25', jenis: 'Surat Keterangan Aktif Siswa', perihal: 'Persyaratan Beasiswa PIP', status: 'Disetujui Kepsek' },
    { id: 2, tanggal: '2023-10-24', jenis: 'Surat Rekomendasi Lomba', perihal: 'Lomba O2SN Tingkat Kabupaten', status: 'Menunggu TU' },
    { id: 3, tanggal: '2023-10-22', jenis: 'Surat Dispensasi', perihal: 'Mengikuti Kejuaraan Pencak Silat', status: 'Ditolak' },
  ]);

  const getStatusBadgeClass = (status) => {
    if (status.includes('Disetujui')) return 'badge-success';
    if (status.includes('Menunggu')) return 'badge-warning';
    if (status.includes('Ditolak')) return 'badge-danger';
    return 'badge-secondary';
  };

  return (
    <div className="riwayat-surat-container">
      <header className="page-header">
        <h1>RIWAYAT AJUAN SURAT SISWA</h1>
      </header>

      {/* Ringkasan Status */}
      <section className="status-summary-grid">
        <div className="summary-card card-total">
          <div className="card-icon"><Eye size={24} /></div>
          <div className="card-info"><h3>3</h3><p>Total Ajuan</p></div>
        </div>
        <div className="summary-card card-pending">
          <div className="card-icon"><Clock3 size={24} /></div>
          <div className="card-info"><h3>1</h3><p>Diproses</p></div>
        </div>
        <div className="summary-card card-approved">
          <div className="card-icon"><CheckCircle2 size={24} /></div>
          <div className="card-info"><h3>1</h3><p>Disetujui</p></div>
        </div>
        <div className="summary-card card-rejected">
          <div className="card-icon"><XCircle size={24} /></div>
          <div className="card-info"><h3>1</h3><p>Ditolak</p></div>
        </div>
      </section>

      {/* Tabel Data Riwayat */}
      <section className="table-data-section">
        <div className="table-header-tools">
          <h2 className="table-title">Daftar Ajuan Surat Anda</h2>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Cari perihal..." />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="riwayat-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Jenis Surat</th>
                <th>Perihal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayatSurat.map((surat, index) => (
                <tr key={surat.id}>
                  <td>{index + 1}</td>
                  <td>{surat.tanggal}</td>
                  <td className="font-semibold">{surat.jenis}</td>
                  <td>{surat.perihal}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(surat.status)}`}>
                      {surat.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      {surat.status.includes('Disetujui') ? (
                        <button className="btn-table-action btn-download">
                          <FileDown size={16} /> Print
                        </button>
                      ) : (
                        <button className="btn-table-action btn-detail">
                          <Eye size={16} /> Detail
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> {/* Tag penutup section sekarang sudah benar */}
    </div>
  );
};

export default RiwayatSuratSiswa;