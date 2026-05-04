import React from 'react';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';

const DataKelasKepsek = () => {
  return (
    <div className="buat-surat-container">

      {/* HEADER */}
      <div className="page-header">
        <h1>Data Kelas</h1>
      </div>

      <div className="form-card">


        {/* TABEL */}
        <div className="form-section">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama Kelas</th>
                <th>Jurusan</th>
                <th>Wali Kelas</th>
                <th>Jumlah Siswa</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>XII RPL 1</td>
                <td>Rekayasa Perangkat Lunak</td>
                <td>Budi Santoso</td>
                <td>32</td>
                <td><span className="dg-badge aktif">Aktif</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail">
                    <Eye size={18} />
                  </button>
                  <button className="btn-icon approve">
                    <CheckCircle2 size={18} />
                  </button>
                  <button className="btn-icon reject">
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>

              <tr>
                <td>XII IPA 1</td>
                <td>Ilmu Pengetahuan Alam</td>
                <td>Siti Rahmawati</td>
                <td>30</td>
                <td><span className="dg-badge aktif">Aktif</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail">
                    <Eye size={18} />
                  </button>
                  <button className="btn-icon approve">
                    <CheckCircle2 size={18} />
                  </button>
                  <button className="btn-icon reject">
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>

              <tr>
                <td>XII IPS 1</td>
                <td>Ilmu Pengetahuan Sosial</td>
                <td>Ahmad Fauzi</td>
                <td>28</td>
                <td><span className="dg-badge nonaktif">Nonaktif</span></td>
                <td className="aksi-group">
                  <button className="btn-icon detail">
                    <Eye size={18} />
                  </button>
                  <button className="btn-icon approve">
                    <CheckCircle2 size={18} />
                  </button>
                  <button className="btn-icon reject">
                    <XCircle size={18} />
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

export default DataKelasKepsek;
