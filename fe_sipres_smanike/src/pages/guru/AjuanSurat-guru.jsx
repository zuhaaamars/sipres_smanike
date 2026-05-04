import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  FileText, 
  Calendar, 
  User,
} from 'lucide-react';

const AjuanSuratGuru = () => {
  // Data dummy ajuan surat dari siswa (Bisa diganti dengan fetch API nanti)
  const [dataSurat] = useState([
    { 
      id: 1, 
      nama: 'Aditya Pratama', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Sakit', 
      tanggal: '27 Mar 2026', 
      status: 'Pending',
      keterangan: 'Demam tinggi dan pusing'
    },
    { 
      id: 2, 
      nama: 'Siti Aminah', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Keperluan Keluarga', 
      tanggal: '26 Mar 2026', 
      status: 'Pending',
      keterangan: 'Acara pernikahan kakak kandung'
    },
    { 
      id: 3, 
      nama: 'Budi Cahyono', 
      kelas: 'XII RPL 1', 
      jenis: 'Izin Lomba', 
      tanggal: '25 Mar 2026', 
      status: 'Disetujui',
      keterangan: 'Lomba LKS Tingkat Provinsi'
    },
  ]);

  return (
    <div className="as-guru-container">
      <header className="as-guru-header">
        <div className="as-header-info">
          <h1>Verifikasi E-Surat Siswa</h1>
          <p>Kelola dan verifikasi permohonan izin atau sakit siswa XII RPL 1</p>
        </div>
      </header>

      {/* FILTER & SEARCH SECTION */}
      <div className="as-filter-bar">
        <div className="as-search-box">
          <Search size={18} />
          <input type="text" placeholder="Cari nama siswa..." />
        </div>
        <div className="as-filter-options">
          <button className="btn-filter">
            <Filter size={16} /> 
            <span>Semua Status</span>
          </button>
        </div>
      </div>

      {/* TABEL DATA AJUAN */}
      <div className="as-table-card">
        <table className="as-table">
          <thead>
            <tr>
              <th><User size={16} /> Nama Siswa</th>
              <th>Jenis Surat</th>
              <th><Calendar size={16} /> Tanggal</th>
              <th>Status</th>
              <th className="text-center">Aksi Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            {dataSurat.map((surat) => (
              <tr key={surat.id}>
                <td>
                  <div className="as-student-info">
                    <strong>{surat.nama}</strong>
                    <span>{surat.kelas}</span>
                  </div>
                </td>
                <td>
                  <div className="as-type-badge">
                    <FileText size={14} /> {surat.jenis}
                  </div>
                </td>
                <td>{surat.tanggal}</td>
                <td>
                  <span className={`as-status ${surat.status.toLowerCase()}`}>
                    {surat.status}
                  </span>
                </td>
                <td>
                  <div className="as-action-group">
                    <button className="as-btn view" title="Lihat Detail">
                      <Eye size={16} />
                    </button>
                    {surat.status === 'Pending' && (
                      <>
                        <button className="as-btn approve" title="Setujui">
                          <Check size={16} />
                        </button>
                        <button className="as-btn reject" title="Tolak">
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AjuanSuratGuru;