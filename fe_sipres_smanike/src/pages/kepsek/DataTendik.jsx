import React from 'react';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';

const DataTendikKepsek = () => {
  return (
    <div className="buat-surat-container">

      {/* HEADER */}
      <div className="page-header">
        <h1>Data Tenaga Kependidikan</h1>
      </div>

      <div className="form-card">


        {/* TABEL */}
        <div className="form-section">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Slamet Riyadi</td>
                <td>Tata Usaha</td>
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
                <td>Dewi Kartika</td>
                <td>Admin Sekolah</td>
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
                <td>Rudi Hartono</td>
                <td>Operator Sekolah</td>
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

export default DataTendikKepsek;
