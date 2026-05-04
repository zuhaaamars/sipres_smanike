import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataMapel = () => {

  const [mapel, setMapel] = useState([]);

  const [form, setForm] = useState({
    kode_mapel: '',
    nama_mapel: '',
    kelompok: '',
  });

  const getMapel = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mapel/');
      setMapel(res.data);
    } catch (error) {
      console.error('Error ambil data:', error);
    }
  };

  useEffect(() => {
    getMapel();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/mapel/', form);

      alert('Mapel berhasil ditambahkan!');
      getMapel();

      setForm({
        kode_mapel: '',
        nama_mapel: '',
        kelompok: '',
      });

    } catch (error) {
      console.error('Error tambah data:', error);
      alert('Gagal menambahkan data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-6 md:p-10 text-[#6d4c41] font-sans">

      {/* TITLE */}
      <h2 className="text-2xl font-extrabold mb-6 text-[#6d4c41]">
        Master Data Mata Pelajaran
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-8 transition hover:-translate-y-0.5"
      >
        <h3 className="text-lg font-bold mb-5 text-[#6d4c41]">
          Tambah Mata Pelajaran
        </h3>

        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">

          <input
            type="text"
            name="kode_mapel"
            placeholder="Kode Mapel (MTK01)"
            value={form.kode_mapel}
            onChange={handleChange}
            className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-[#6d4c41] focus:bg-white focus:border-[#6d4c41] focus:ring-2 focus:ring-[#6d4c41]/10 outline-none"
            required
          />

          <input
            type="text"
            name="nama_mapel"
            placeholder="Nama Mapel"
            value={form.nama_mapel}
            onChange={handleChange}
            className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-[#6d4c41] focus:bg-white focus:border-[#6d4c41] focus:ring-2 focus:ring-[#6d4c41]/10 outline-none"
            required
          />

          <select
            name="kelompok"
            value={form.kelompok}
            onChange={handleChange}
            className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-[#6d4c41] focus:bg-white focus:border-[#6d4c41] focus:ring-2 focus:ring-[#6d4c41]/10 outline-none"
            required
          >
            <option value="">Pilih Kelompok</option>
            <option value="Wajib">Wajib</option>
            <option value="Peminatan">Peminatan</option>
          </select>

        </div>

        <button
          type="submit"
          className="mt-5 px-6 py-3 rounded-xl text-white font-sans bg-[#3e2723] hover:opacity-90 transition"
        >
          Simpan
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-[#6d4c41]">

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-[#3e2723] text-white text-left font-sans">
              <th className="p-4">No</th>
              <th className="p-4">Kode</th>
              <th className="p-4">Nama Mapel</th>
              <th className="p-4">Kelompok</th>
            </tr>
          </thead>

          <tbody>
            {mapel.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8 text-[#3e2723] italic">
                  Belum ada data
                </td>
              </tr>
            ) : (
              mapel.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{item.kode_mapel}</td>
                  <td className="p-4">{item.nama_mapel}</td>
                  <td className="p-4 font-semibold">
                    ● {item.kelompok}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default DataMapel;
