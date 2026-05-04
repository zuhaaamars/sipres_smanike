import React from 'react';
import { Eye, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';

const DataGuruKepsek = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Data Guru</h1>
          <p>Kelola data guru SMAN 1 Kedunggalar</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Kepala Sekolah</span>
            <strong>Drs. Ahmad Wijaya</strong>
          </div>
          <div className="dg-avatar">K</div>
        </div>
      </header>

      {/* SEARCH */}
      <div className="dg-search-box">
        <input type="text" placeholder="Cari nama guru..." />
      </div>

      {/* TABEL */}
      <div className="dg-table-card">
        <table className="dg-table">
          <thead>
            <tr>
              <th>Nama Guru</th>
              <th>NIP</th>
              <th>Mata Pelajaran</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Budi Santoso</td>
              <td>1987654321</td>
              <td>Matematika</td>
              <td><span className="dg-badge aktif">Aktif</span></td>
              <td className="aksi-group">
                <button className="btn-aksi btn-detail">
                  <Eye size={18} />
                </button>
                <button className="btn-aksi btn-approve">
                  <CheckCircle2 size={18} />
                </button>
                <button className="btn-aksi btn-reject">
                  <XCircle size={18} />
                </button>
              </td>
            </tr>

            <tr>
              <td>Siti Rahmawati</td>
              <td>1981234567</td>
              <td>Bahasa Indonesia</td>
              <td><span className="dg-badge honorer">Honorer</span></td>
              <td className="aksi-group">
                <button className="btn-aksi btn-detail">
                  <Eye size={18} />
                </button>
                <button className="btn-aksi btn-approve">
                  <CheckCircle2 size={18} />
                </button>
                <button className="btn-aksi btn-reject">
                  <XCircle size={18} />
                </button>
              </td>
            </tr>

            <tr>
              <td>Ahmad Fauzi</td>
              <td>1976543210</td>
              <td>Fisika</td>
              <td><span className="dg-badge aktif">Aktif</span></td>
              <td className="aksi-group">
                <button className="btn-aksi btn-detail">
                  <Eye size={18} />
                </button>
                <button className="btn-aksi btn-approve">
                  <CheckCircle2 size={18} />
                </button>
                <button className="btn-aksi btn-reject">
                  <XCircle size={18} />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DataGuruKepsek;
