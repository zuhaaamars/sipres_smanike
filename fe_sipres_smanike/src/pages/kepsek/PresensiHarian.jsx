import React from 'react';
import { Eye } from 'lucide-react';

const PresensiHarianKepsek = () => {
  return (
    <div className="dg-container">

      <h1>Presensi Harian</h1>

      {/* RINGKASAN */}
      <div className="summary-grid">
        <div>Hadir: 320</div>
        <div>Izin: 15</div>
        <div>Sakit: 10</div>
        <div>Terlambat: 8</div>
        <div>Alpha: 5</div>
      </div>

      {/* TABEL */}
      <table className="dg-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Masuk</th>
            <th>Pulang</th>
            <th>Status</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Aditya</td>
            <td>XII RPL 1</td>
            <td>07:00</td>
            <td>15:00</td>
            <td><span className="dg-badge hadir">Hadir</span></td>
            <td>Valid</td>
            <td>
              <button className="btn-icon detail">
                <Eye size={16} />
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};

export default PresensiHarianKepsek;
