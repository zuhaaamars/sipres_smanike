import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Download, Calendar, Users, 
  UserCheck, UserMinus, Clock, MapPin, 
  MessageCircle, XCircle
} from 'lucide-react';

const RekapHarianGuru = () => {
  const [dataRekap, setDataRekap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // FIX: Memanggil fungsi fetch di dalam useEffect
  useEffect(() => {
    const fetchRekap = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/presensi/rekap-guru');
        if (response.data.status === 'success') {
          setDataRekap(response.data.data || []);
        }
      } catch (err) {
        console.error("Gagal ambil data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRekap(); // <--- Fungsi wajib dipanggil di sini
  }, []);

  // Filter dengan proteksi nilai null agar tidak crash
  const filteredData = dataRekap.filter(item => {
    const nama = item.nama ? item.nama.toLowerCase() : "";
    const nis = item.nis ? item.nis.toString() : "";
    return nama.includes(searchTerm.toLowerCase()) || nis.includes(searchTerm);
  });

  const stats = {
    total: dataRekap.length,
    hadir: dataRekap.filter(i => i.status === 'Hadir').length,
    alpa: dataRekap.filter(i => i.status === 'Alpa').length,
    terlambat: dataRekap.filter(i => i.status === 'Terlambat').length
  };

  if (loading) return <div className="loading">Memuat Data Presensi...</div>;

  return (
    <div className="rh-full-wrapper">
      <div className="rh-container">
        <header className="rh-header">
          <div className="rh-header-info">
            <h1>Rekap Presensi Harian</h1>
            <p>Data real-time tanggal: {new Date().toLocaleDateString('id-ID')}</p>
          </div>
          <div className="rh-header-actions">
            <button className="rh-btn secondary"><Calendar size={18} /> Hari Ini</button>
            <button className="rh-btn primary"><Download size={18} /> Export Excel</button>
          </div>
        </header>

        <div className="rh-stats-grid">
          <div className="rh-stat-card total">
            <div className="rh-stat-icon"><Users size={22} /></div>
            <div className="rh-stat-info"><span>Total Siswa</span><h3>{stats.total}</h3></div>
          </div>
          <div className="rh-stat-card hadir">
            <div className="rh-stat-icon"><UserCheck size={22} /></div>
            <div className="rh-stat-info"><span>Hadir</span><h3>{stats.hadir}</h3></div>
          </div>
          <div className="rh-stat-card pending">
            <div className="rh-stat-icon"><Clock size={22} /></div>
            <div className="rh-stat-info"><span>Terlambat</span><h3>{stats.terlambat}</h3></div>
          </div>
          <div className="rh-stat-card alpa">
            <div className="rh-stat-icon"><UserMinus size={22} /></div>
            <div className="rh-stat-info"><span>Alpa</span><h3>{stats.alpa}</h3></div>
          </div>
        </div>

        <div className="rh-filter-section">
          <div className="rh-search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Cari NIS atau nama..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rh-table-card">
          <div className="rh-table-wrapper">
            <table className="rh-table">
              <thead>
                <tr>
                  <th>NIS</th>
                  <th>Siswa & Bukti</th>
                  <th>Waktu Masuk</th>
                  <th>Waktu Pulang</th>
                  <th>Geo</th>
                  <th>Status</th>
                  <th>WA</th>
                  <th>Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td><span className="rh-nis-badge">{item.nis}</span></td>
                    <td>
                      <div className="rh-student-cell">
                        <div className="rh-avatar-wrapper">
                          {item.foto ? (
                            <img src={item.foto} alt="Selfie" className="rh-student-photo" />
                          ) : (
                            <div className="rh-no-photo"><XCircle size={20} /></div>
                          )}
                        </div>
                        <div className="rh-student-info">
                          <span className="rh-student-name">{item.nama}</span>
                          <span className="rh-student-kelas">{item.kelas}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="rh-time masuk">{item.waktuMasuk}</span></td>
                    <td><span className="rh-time pulang">{item.waktuPulang}</span></td>
                    <td><MapPin size={14} color={item.jarak !== '-' ? '#22c55e' : '#ef4444'} /></td>
                    <td>
                      <span className={`rh-badge ${item.status?.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td><MessageCircle size={14} className={item.wa?.toLowerCase()} /></td>
                    <td>
                      <button className={`rh-btn-vld ${item.validated ? 'active' : ''}`}>
                        {item.validated ? 'Valid' : 'Cek'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapHarianGuru;