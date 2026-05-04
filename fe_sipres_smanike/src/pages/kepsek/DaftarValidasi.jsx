import React from 'react';
import { FileCheck, CheckCircle2, XCircle, Eye } from 'lucide-react';

const DaftarValidasiKepsek = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Validasi Surat</h1>
          <p>Persetujuan akhir oleh Kepala Sekolah</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Kepala Sekolah</span>
            <strong>Drs. Ahmad Wijaya</strong>
          </div>
          <div className="dg-avatar">K</div>
        </div>
      </header>

      {/* TABEL */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Daftar Surat Menunggu Validasi</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Jenis Surat</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Aditya Pratama</td>
                <td>Surat Keterangan Sekolah</td>
                <td>02 Feb 2026</td>
                <td><span className="dg-badge belum">Menunggu</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail" title="Detail">
                    <Eye size={16} />
                  </button>
                  <button className="btn-icon approve" title="Setujui">
                    <CheckCircle2 size={16} />
                  </button>
                  <button className="btn-icon reject" title="Tolak">
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>

              <tr>
                <td>Siti Aminah</td>
                <td>Surat Izin</td>
                <td>01 Feb 2026</td>
                <td><span className="dg-badge belum">Menunggu</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail" title="Detail">
                    <Eye size={16} />
                  </button>
                  <button className="btn-icon approve" title="Setujui">
                    <CheckCircle2 size={16} />
                  </button>
                  <button className="btn-icon reject" title="Tolak">
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>

              <tr>
                <td>Rizky Saputra</td>
                <td>Surat Peminjaman</td>
                <td>31 Jan 2026</td>
                <td><span className="dg-badge belum">Menunggu</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail" title="Detail">
                    <Eye size={16} />
                  </button>
                  <button className="btn-icon approve" title="Setujui">
                    <CheckCircle2 size={16} />
                  </button>
                  <button className="btn-icon reject" title="Tolak">
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DaftarValidasiKepsek;
