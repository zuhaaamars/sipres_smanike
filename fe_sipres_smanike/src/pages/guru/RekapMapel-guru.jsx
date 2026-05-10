import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Search,
  BookOpen,
  Download,
  Users,
  CheckCircle,
  Clock,
  Filter,
  CalendarDays,
  RefreshCcw
} from 'lucide-react';

const RekapMapelGuru = () => {

  const [dataRekap, setDataRekap] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filterMapel, setFilterMapel] = useState('');
  const [filterKelas, setFilterKelas] = useState('');

  // =========================
  // FETCH DATA
  // =========================
  const fetchRekap = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        'http://localhost:5001/api/presensi-mapel/rekap-guru',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDataRekap(response.data.data || []);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Gagal mengambil data rekap");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRekap();
  }, []);

  // =========================
  // SUMMARY
  // =========================
  const totalPertemuan = new Set(
    dataRekap.map(
      item => `${item.mapel}-${item.kelas}-${item.tanggal}`
    )
  ).size;

  const totalHadir = dataRekap.filter(
    item => item.status === "Hadir"
  ).length;

  const persenHadir = dataRekap.length
    ? Math.round((totalHadir / dataRekap.length) * 100)
    : 0;

  const totalSiswa = new Set(
    dataRekap.map(item => item.siswa_id)
  ).size;

  // =========================
  // FILTER OPTIONS
  // =========================
  const uniqueMapel = [...new Set(
    dataRekap.map(item => item.mapel)
  )];

  const uniqueKelas = [...new Set(
    dataRekap.map(item => item.kelas)
  )];

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = useMemo(() => {

    return dataRekap.filter(item => {

      const cocokSearch =
        item.nama?.toLowerCase().includes(search.toLowerCase()) ||
        item.kelas?.toLowerCase().includes(search.toLowerCase());

      const cocokMapel =
        filterMapel === '' || item.mapel === filterMapel;

      const cocokKelas =
        filterKelas === '' || item.kelas === filterKelas;

      return cocokSearch && cocokMapel && cocokKelas;
    });

  }, [dataRekap, search, filterMapel, filterKelas]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      {/* WRAPPER */}
      <div className="max-w-[1200px] mx-auto p-[20px]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-[30px] flex-wrap gap-[15px]">

          <div>
            <h1 className="text-[1.9rem] font-extrabold">
              Rekap Presensi Mata Pelajaran
            </h1>

            <p className="text-sm text-[#6d4c41]/70 mt-[4px]">
              Monitoring kehadiran siswa berdasarkan QR Presensi
            </p>
          </div>

          <div className="flex gap-[10px]">

            <button
              onClick={fetchRekap}
              className="flex items-center gap-[8px] px-[18px] py-[10px] border rounded-[10px] bg-white hover:bg-gray-50 transition"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>

            <button
              className="flex items-center gap-[8px] px-[18px] py-[10px] bg-[#3e2723] text-white rounded-[10px] font-semibold hover:opacity-90 transition"
            >
              <Download size={18} />
              Download PDF
            </button>

          </div>

        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-4 gap-[20px] mb-[30px] max-lg:grid-cols-2 max-md:grid-cols-1">

          {/* TOTAL PERTEMUAN */}
          <div className="bg-white p-[20px] rounded-[18px] shadow-sm border border-gray-100">

            <div className="flex items-center gap-[12px]">

              <div className="bg-[#f3e5f5] p-[12px] rounded-[12px]">
                <BookOpen />
              </div>

              <div>
                <p className="text-sm text-[#6d4c41]/70">
                  Total Pertemuan
                </p>

                <h3 className="font-extrabold text-[1.4rem]">
                  {totalPertemuan}
                </h3>
              </div>

            </div>

          </div>

          {/* KEHADIRAN */}
          <div className="bg-white p-[20px] rounded-[18px] shadow-sm border border-gray-100">

            <div className="flex items-center gap-[12px]">

              <div className="bg-green-100 p-[12px] rounded-[12px]">
                <CheckCircle />
              </div>

              <div>
                <p className="text-sm text-[#6d4c41]/70">
                  Persentase Hadir
                </p>

                <h3 className="font-extrabold text-[1.4rem]">
                  {persenHadir}%
                </h3>
              </div>

            </div>

          </div>

          {/* TOTAL SISWA */}
          <div className="bg-white p-[20px] rounded-[18px] shadow-sm border border-gray-100">

            <div className="flex items-center gap-[12px]">

              <div className="bg-blue-100 p-[12px] rounded-[12px]">
                <Users />
              </div>

              <div>
                <p className="text-sm text-[#6d4c41]/70">
                  Total Siswa
                </p>

                <h3 className="font-extrabold text-[1.4rem]">
                  {totalSiswa}
                </h3>
              </div>

            </div>

          </div>

          {/* TOTAL HADIR */}
          <div className="bg-white p-[20px] rounded-[18px] shadow-sm border border-gray-100">

            <div className="flex items-center gap-[12px]">

              <div className="bg-orange-100 p-[12px] rounded-[12px]">
                <CalendarDays />
              </div>

              <div>
                <p className="text-sm text-[#6d4c41]/70">
                  Total Kehadiran
                </p>

                <h3 className="font-extrabold text-[1.4rem]">
                  {totalHadir}
                </h3>
              </div>

            </div>

          </div>

        </div>

        {/* FILTER */}
        <div className="flex justify-between gap-[15px] flex-wrap mb-[20px]">

          {/* SEARCH */}
          <div className="flex items-center gap-[10px] bg-white px-[16px] py-[10px] rounded-[12px] flex-1 border border-gray-200">

            <Search size={18} />

            <input
              placeholder="Cari nama atau kelas..."
              className="w-full outline-none bg-transparent text-[#6d4c41]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* FILTERS */}
          <div className="flex gap-[10px] flex-wrap">

            {/* MAPEL */}
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="px-[12px] py-[10px] rounded-[10px] border border-gray-200 bg-white text-[#6d4c41]"
            >
              <option value="">Semua Mapel</option>

              {uniqueMapel.map((mapel, index) => (
                <option key={index} value={mapel}>
                  {mapel}
                </option>
              ))}

            </select>

            {/* KELAS */}
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="px-[12px] py-[10px] rounded-[10px] border border-gray-200 bg-white text-[#6d4c41]"
            >
              <option value="">Semua Kelas</option>

              {uniqueKelas.map((kelas, index) => (
                <option key={index} value={kelas}>
                  {kelas}
                </option>
              ))}

            </select>

            <button
              className="p-[10px] bg-white border border-gray-200 rounded-[10px]"
            >
              <Filter size={18} />
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[18px] shadow-sm overflow-x-auto border border-gray-100">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50 text-[#6d4c41]/70 text-sm">

              <tr>
                <th className="p-[16px] text-left">No</th>
                <th className="p-[16px] text-left">Nama</th>
                <th className="p-[16px] text-left">Kelas</th>
                <th className="p-[16px] text-left">Mapel</th>
                <th className="p-[16px] text-left">Jam</th>
                <th className="p-[16px] text-left">Tanggal</th>
                <th className="p-[16px] text-left">Waktu Scan</th>
                <th className="p-[16px] text-left">Status</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-[40px]"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-[40px]"
                  >
                    Belum ada data presensi
                  </td>
                </tr>
              ) : (

                filteredData.map((item, index) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* NO */}
                    <td className="p-[16px] font-bold">
                      {index + 1}
                    </td>

                    {/* NAMA */}
                    <td className="p-[16px]">
                      <div>
                        <h4 className="font-bold">
                          {item.nama}
                        </h4>

                        <p className="text-xs text-gray-500">
                          NISN : {item.nisn || '-'}
                        </p>
                      </div>
                    </td>

                    {/* KELAS */}
                    <td className="p-[16px]">
                      {item.kelas}
                    </td>

                    {/* MAPEL */}
                    <td className="p-[16px]">
                      <span className="bg-[#f5f5f5] px-[12px] py-[5px] rounded-[8px] text-sm">
                        {item.mapel}
                      </span>
                    </td>

                    {/* JAM */}
                    <td className="p-[16px]">
                      <div className="flex items-center gap-[6px]">
                        <Clock size={14} />
                        {item.jam}
                      </div>
                    </td>

                    {/* TANGGAL */}
                    <td className="p-[16px]">
                      {item.tanggal}
                    </td>

                    {/* SCAN */}
                    <td className="p-[16px]">
                      {item.waktu_scan}
                    </td>

                    {/* STATUS */}
                    <td className="p-[16px]">

                      <span
                        className={`
                          px-[12px]
                          py-[5px]
                          rounded-full
                          text-xs
                          font-bold

                          ${item.status === 'Hadir'
                            ? 'bg-green-100 text-green-700'
                            : ''
                          }

                          ${item.status === 'Izin'
                            ? 'bg-yellow-100 text-yellow-700'
                            : ''
                          }

                          ${item.status === 'Alpa'
                            ? 'bg-red-100 text-red-700'
                            : ''
                          }
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default RekapMapelGuru;