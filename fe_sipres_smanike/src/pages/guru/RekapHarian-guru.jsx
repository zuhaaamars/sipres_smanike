import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Download,
  Calendar,
  Users,
  UserCheck,
  UserMinus,
  Clock,
  MapPin,
  MessageCircle,
  XCircle
} from 'lucide-react';

const RekapHarianGuru = () => {
  const [dataRekap, setDataRekap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchRekap();
  }, []);

  const fetchRekap = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        'http://localhost:5001/api/presensi/rekap-guru'
      );

      if (response.data.status === 'success') {
        setDataRekap(response.data.data || []);
      }

    } catch (err) {
      console.error("Gagal ambil data:", err);

      alert(
        err.response?.data?.message ||
        "Gagal mengambil data rekap"
      );

      setDataRekap([]);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER SEARCH
  // =========================
  const filteredData = dataRekap.filter((item) => {
    const nama = item.nama?.toLowerCase() || "";
    const nis = item.nis?.toString() || "";

    return (
      nama.includes(searchTerm.toLowerCase()) ||
      nis.includes(searchTerm)
    );
  });

  // =========================
  // STATS
  // =========================
  const stats = {
    total: dataRekap.length,
    hadir: dataRekap.filter(i => i.status === 'Hadir').length,
    alpa: dataRekap.filter(i => i.status === 'Alpa').length,
    terlambat: dataRekap.filter(i => i.status === 'Terlambat').length
  };

  // =========================
  // LOADING
  // =========================
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
            <h1 className="text-2xl font-bold">
              Rekap Presensi Harian
            </h1>

            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          <div className="flex gap-2 mt-3 md:mt-0">

            <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded">
              <Calendar size={16} />
              Hari Ini
            </button>

            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Download size={16} />
              Export
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <Users className="text-gray-500 mb-2" />

            <p className="text-sm text-gray-500">
              Total
            </p>

            <h2 className="text-xl font-bold">
              {stats.total}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <UserCheck className="text-green-500 mb-2" />

            <p className="text-sm text-gray-500">
              Hadir
            </p>

            <h2 className="text-xl font-bold">
              {stats.hadir}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <Clock className="text-yellow-500 mb-2" />

            <p className="text-sm text-gray-500">
              Terlambat
            </p>

            <h2 className="text-xl font-bold">
              {stats.terlambat}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <UserMinus className="text-red-500 mb-2" />

            <p className="text-sm text-gray-500">
              Alpa
            </p>

            <h2 className="text-xl font-bold">
              {stats.alpa}
            </h2>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-4 flex items-center gap-2 bg-white p-3 rounded shadow">

          <Search size={18} />

          <input
            type="text"
            className="w-full outline-none"
            placeholder="Cari NIS atau nama siswa..."
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
                <th className="p-3 text-left">Lokasi</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">WA</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>

            </thead>

            <tbody>

              {filteredData.length > 0 ? (
                filteredData.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* NIS */}
                    <td className="p-3 font-medium">
                      {item.nis}
                    </td>

                    {/* SISWA */}
                    <td className="p-3">

                      <div className="flex items-center gap-3">

                        {item.foto ? (
                          <img
                            src={item.foto}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-110 transition"
                            onClick={() => setSelectedPhoto(item.foto)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/no-photo.png";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <XCircle
                              size={18}
                              className="text-red-400"
                            />
                          </div>
                        )}

                        <div>
                          <p className="font-medium">
                            {item.nama}
                          </p>

                          <p className="text-xs text-gray-500">
                            {item.kelas}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* MASUK */}
                    <td className="p-3">
                      {item.jam_masuk || '--:--'}
                    </td>

                    {/* PULANG */}
                    <td className="p-3">
                      {item.jam_pulang || '--:--'}
                    </td>

                    {/* LOKASI */}
                    <td className="p-3">

                      {item.latitude && item.longitude ? (
                        <a
                          href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-green-600 hover:underline"
                        >
                          <MapPin size={16} />
                          Maps
                        </a>
                      ) : (
                        <span className="text-red-500">
                          Tidak ada
                        </span>
                      )}

                    </td>

                    {/* STATUS */}
                    <td className="p-3">

                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${item.status === 'Hadir'
                            ? 'bg-green-100 text-green-700'
                            : ''
                          }

                          ${item.status === 'Alpa'
                            ? 'bg-red-100 text-red-700'
                            : ''
                          }

                          ${item.status === 'Terlambat'
                            ? 'bg-yellow-100 text-yellow-700'
                            : ''
                          }
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* WA */}
                    <td className="p-3">

                      {item.no_telp_ortu ? (
                        <a
                          href={`https://wa.me/62${item.no_telp_ortu.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:scale-110 transition inline-block"
                        >
                          <MessageCircle size={18} />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Tidak ada
                        </span>
                      )}

                    </td>

                    {/* AKSI */}
                    <td className="p-3">

                      <button
                        onClick={() => setSelectedPhoto(item.foto)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Cek
                      </button>

                    </td>

                  </tr>

                ))
              ) : (
                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-400"
                  >
                    Tidak ada data presensi
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL FOTO */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-white p-4 rounded-lg max-w-md w-full">

            <img
              src={selectedPhoto}
              alt="Preview"
              className="w-full rounded-lg"
            />

            <button
              onClick={() => setSelectedPhoto(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
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