import React from 'react';
import { Eye, Download } from 'lucide-react';

const RiwayatValidasiKepsek = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Riwayat Validasi</h1>
          <p>Daftar surat yang telah divalidasi</p>
        </div>
      </header>

      {/* TABLE */}
      <div className="dg-table-card">
        <table className="dg-table">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Jenis Surat</th>
              <th>Tgl Ajuan</th>
              <th>Tgl Validasi</th>
              <th>Status</th>
              <th>Validator</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Aditya Pratama</td>
              <td>Surat Keterangan Sekolah</td>
              <td>01 Feb 2026</td>
              <td>02 Feb 2026</td>
              <td><span className="dg-badge hadir">Disetujui</span></td>
              <td>Drs. Ahmad Wijaya</td>
              <td className="aksi-group">
                <button className="btn-icon detail">
                  <Eye size={16} />
                </button>
                <button className="btn-icon download">
                  <Download size={16} />
                </button>
              </td>
            </tr>

            <tr>
              <td>Siti Aminah</td>
              <td>Surat Izin</td>
              <td>01 Feb 2026</td>
              <td>02 Feb 2026</td>
              <td><span className="dg-badge belum">Ditolak</span></td>
              <td>Drs. Ahmad Wijaya</td>
              <td className="aksi-group">
                <button className="btn-icon detail">
                  <Eye size={16} />
                </button>
                <button className="btn-icon download">
                  <Download size={16} />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RiwayatValidasiKepsek;
