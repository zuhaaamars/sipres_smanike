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
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchRekap = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/presensi/rekap-guru');

        if (response.data.status === 'success') {
          setDataRekap(response.data.data || []);
        } else {
          setDataRekap([]);
        }

      } catch (err) {
        console.error("Gagal ambil data:", err.message);
        setDataRekap([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRekap();
  }, []);

  const filteredData = dataRekap.filter(item => {
    const nama = item.nama?.toLowerCase() || "";
    const nis = item.nis?.toString() || "";
    return (
      nama.includes(searchTerm.toLowerCase()) ||
      nis.includes(searchTerm)
    );
  });

  const stats = {
    total: dataRekap.length,
    hadir: dataRekap.filter(i => i.status === 'Hadir').length,
    alpa: dataRekap.filter(i => i.status === 'Alpa').length,
    terlambat: dataRekap.filter(i => i.status === 'Terlambat').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memuat Data Presensi...
      </div>
    );
  }

  return (
    <div className="ml-0 md:ml-64 bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Rekap Presensi Harian</h1>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString('id-ID')}
            </p>
          </div>

          <div className="flex gap-2 mt-3 md:mt-0">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded">
              <Calendar size={16} /> Hari Ini
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <Users className="text-gray-500" />
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-xl font-bold">{stats.total}</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <UserCheck className="text-green-500" />
            <p className="text-sm text-gray-500">Hadir</p>
            <h2 className="text-xl font-bold">{stats.hadir}</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <Clock className="text-yellow-500" />
            <p className="text-sm text-gray-500">Terlambat</p>
            <h2 className="text-xl font-bold">{stats.terlambat}</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <UserMinus className="text-red-500" />
            <p className="text-sm text-gray-500">Alpa</p>
            <h2 className="text-xl font-bold">{stats.alpa}</h2>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-4 flex items-center gap-2 bg-white p-2 rounded shadow">
          <Search size={18} />
          <input
            className="w-full outline-none"
            placeholder="Cari NIS atau nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-x-auto">

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">NIS</th>
                <th className="p-3 text-left">Siswa</th>
                <th className="p-3 text-left">Masuk</th>
                <th className="p-3 text-left">Pulang</th>
                <th className="p-3 text-left">Geo</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">WA</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t">

                  <td className="p-3 font-medium">{item.nis}</td>

                  <td className="p-3 flex items-center gap-2">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-110 transition"
                        onClick={() => setSelectedPhoto(item.foto)}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100?text=No+Photo";
                        }}
                      />
                    ) : (
                      <XCircle size={18} className="text-red-400" />
                    )}

                    <div>
                      <p className="font-medium">{item.nama}</p>
                      <p className="text-xs text-gray-500">{item.kelas}</p>
                    </div>
                  </td>

                  <td className="p-3">{item.waktuMasuk}</td>
                  <td className="p-3">{item.waktuPulang}</td>

                  <td className="p-3">
                    <MapPin
                      size={16}
                      className={item.jarak !== '-' ? 'text-green-500' : 'text-red-500'}
                    />
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-gray-200 text-xs">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <MessageCircle size={16} />
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => setSelectedPhoto(item.foto)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      Cek
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* MODAL FOTO */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <img src={selectedPhoto} className="w-full rounded" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RekapHarianGuru;