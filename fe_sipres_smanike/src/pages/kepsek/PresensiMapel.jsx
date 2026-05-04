import React from 'react';
import { Eye } from 'lucide-react';

const PresensiMapelKepsek = () => {
  return (
    <div className="dg-container">

      <h1>Presensi Mata Pelajaran</h1>

      {/* FILTER */}
      <div className="filter-bar">
        <input type="date" />
        <select>
          <option>Kelas</option>
          <option>XII RPL 1</option>
        </select>
        <select>
          <option>Mata Pelajaran</option>
          <option>Matematika</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div>Total: 36</div>
        <div>Hadir: 30</div>
        <div>Tidak Hadir: 6</div>
      </div>

      {/* TABEL */}
      <table className="dg-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Mapel</th>
            <th>Jam</th>
            <th>Guru</th>
            <th>Status</th>
            <th>Scan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Aditya</td>
            <td>XII RPL 1</td>
            <td>Matematika</td>
            <td>07:00 - 08:30</td>
            <td>Bu Sari</td>
            <td><span className="dg-badge hadir">Hadir</span></td>
            <td>07:02</td>
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

export default PresensiMapelKepsek;
