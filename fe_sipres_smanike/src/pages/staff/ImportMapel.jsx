import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Plus, Trash2, Pencil } from 'lucide-react';

const MasterMapel = () => {

  const [mapel, setMapel] = useState([]);

  const [form, setForm] = useState({
    kode_mapel: "",
    nama_mapel: "",
    kelompok: ""
  });

  // =========================
  // NOTIFIKASI
  // =========================
  const [notif, setNotif] = useState({
    show: false,
    message: ""
  });

  // =========================
  // EDIT MODAL
  // =========================
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // =========================
  // GET DATA
  // =========================
  useEffect(() => {
    fetchMapel();
  }, []);

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/mapel");
      setMapel(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // NOTIF
  // =========================
  const showNotif = (message) => {
    setNotif({
      show: true,
      message
    });

    setTimeout(() => {
      setNotif({
        show: false,
        message: ""
      });
    }, 2500);
  };

  // =========================
  // INPUT
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // ADD
  // =========================
  const handleAdd = async () => {
    if (!form.kode_mapel || !form.nama_mapel) return;

    try {
      await axios.post("http://localhost:5001/api/mapel/", form);

      setForm({
        kode_mapel: "",
        nama_mapel: "",
        kelompok: ""
      });

      fetchMapel();
      showNotif("Data berhasil ditambahkan");

    } catch (err) {
      console.log(err);
      showNotif("Gagal menambahkan data");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (m) => {
    setShowEditModal(true);
    setSelectedId(m.id);

    setForm({
      kode_mapel: m.kode_mapel,
      nama_mapel: m.nama_mapel,
      kelompok: m.kelompok || ""
    });
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/mapel/${selectedId}`,
        form
      );

      fetchMapel();
      setShowEditModal(false);
      setSelectedId(null);

      setForm({
        kode_mapel: "",
        nama_mapel: "",
        kelompok: ""
      });

      showNotif("Data berhasil diupdate");

    } catch (err) {
      console.log(err);
      showNotif("Gagal update data");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/mapel/${id}`);
      fetchMapel();
      showNotif("Data berhasil dihapus");
    } catch (err) {
      console.log(err);
      showNotif("Gagal hapus data");
    }
  };

  return (
    <div className="p-6 md:ml-64">

      {/* NOTIF */}
      {notif.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-medium">
            {notif.message}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen /> Master Mapel
      </h1>

      {/* FORM */}
      <div className="grid grid-cols-3 gap-2 mb-6">

        <input
          name="kode_mapel"
          value={form.kode_mapel}
          onChange={handleChange}
          placeholder="Kode Mapel"
          className="border p-2 rounded-xl"
        />

        <input
          name="nama_mapel"
          value={form.nama_mapel}
          onChange={handleChange}
          placeholder="Nama Mapel"
          className="border p-2 rounded-xl"
        />

        <input
          name="kelompok"
          value={form.kelompok}
          onChange={handleChange}
          placeholder="Kelompok"
          className="border p-2 rounded-xl"
        />

      </div>

      <button
        onClick={handleAdd}
        className="mb-6 bg-teal-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} /> Tambah Mapel
      </button>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Kode</th>
              <th className="p-3">Nama Mapel</th>
              <th className="p-3">Kelompok</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {mapel.map((m, i) => (
              <tr key={m.id} className="border-t">

                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-semibold">{m.kode_mapel}</td>
                <td className="p-3">{m.nama_mapel}</td>
                <td className="p-3">{m.kelompok || "-"}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => handleEdit(m)}
                      className="text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">Edit Mapel</h2>

            <input
              name="kode_mapel"
              value={form.kode_mapel}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded-xl"
            />

            <input
              name="nama_mapel"
              value={form.nama_mapel}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded-xl"
            />

            <input
              name="kelompok"
              value={form.kelompok}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded-xl"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl"
              >
                Batal
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default MasterMapel;