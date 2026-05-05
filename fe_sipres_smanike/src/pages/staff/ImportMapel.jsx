import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

const MasterMapel = () => {

  const [mapel, setMapel] = useState([]);

  const [form, setForm] = useState({
    kode_mapel: "",
    nama_mapel: "",
    kelompok: ""
  });

  // =========================
  // GET DATA
  // =========================
  useEffect(() => {
    fetchMapel();
  }, []);

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/master-mapel");
      setMapel(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // TAMBAH MAPEL
  // =========================
  const handleAdd = async () => {
    if (!form.kode_mapel || !form.nama_mapel) return;

    try {
      await axios.post("http://localhost:5000/api/master-mapel", form);

      setForm({
        kode_mapel: "",
        nama_mapel: "",
        kelompok: ""
      });

      fetchMapel();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 md:ml-64">

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen /> Master Mapel
      </h1>

      {/* =========================
          FORM INPUT
      ========================= */}
      <div className="grid grid-cols-3 gap-2 mb-6">

        <input
          name="kode_mapel"
          value={form.kode_mapel}
          onChange={handleChange}
          placeholder="Kode Mapel (MTK01)"
          className="border p-2 rounded-xl"
        />

        <input
          name="nama_mapel"
          value={form.nama_mapel}
          onChange={handleChange}
          placeholder="Nama Mapel (Matematika)"
          className="border p-2 rounded-xl"
        />

        <input
          name="kelompok"
          value={form.kelompok}
          onChange={handleChange}
          placeholder="Kelompok (A/B/C)"
          className="border p-2 rounded-xl"
        />

      </div>

      <button
        onClick={handleAdd}
        className="mb-6 bg-teal-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} /> Tambah Mapel
      </button>

      {/* =========================
          TABLE
      ========================= */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Kode</th>
              <th className="p-3 text-left">Nama Mapel</th>
              <th className="p-3 text-left">Kelompok</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {mapel.map((m, i) => (
              <tr key={m.id} className="border-t">

                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-semibold">{m.kode_mapel}</td>
                <td className="p-3">{m.nama_mapel}</td>
                <td className="p-3">{m.kelompok || "-"}</td>

                <td className="p-3 text-center">
                  <button className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MasterMapel;