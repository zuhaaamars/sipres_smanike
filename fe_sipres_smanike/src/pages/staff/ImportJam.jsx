import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Plus, Trash2, Pencil } from 'lucide-react';

const ImportJam = () => {

  const [jam, setJam] = useState([]);

  const [form, setForm] = useState({
    jam_mulai: "",
    jam_selesai: ""
  });

  const [notif, setNotif] = useState({
    show: false,
    message: ""
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchJam();
  }, []);

  const fetchJam = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/jam");
      setJam(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // NOTIF
  // =========================
  const showNotif = (message) => {
    setNotif({ show: true, message });

    setTimeout(() => {
      setNotif({ show: false, message: "" });
    }, 2500);
  };

  // =========================
  // INPUT HANDLER
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // FIX FORMAT JAM
  // =========================
  const normalizeTime = (value) => {
    if (!value) return "";

    // 08:00 -> 08:00:00
    if (value.length === 5) {
      return value + ":00";
    }

    return value;
  };

  // =========================
  // ADD JAM
  // =========================
  const handleAdd = async () => {

    if (!form.jam_mulai || !form.jam_selesai) {
      showNotif("Jam tidak boleh kosong");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5001/api/jam",
        {
          jam_mulai: normalizeTime(form.jam_mulai),
          jam_selesai: normalizeTime(form.jam_selesai)
        }
      );

      setForm({
        jam_mulai: "",
        jam_selesai: ""
      });

      fetchJam();
      showNotif("Data jam berhasil ditambahkan");

    } catch (err) {
      console.log(err);
      showNotif("Gagal menambahkan data jam");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (j) => {

    setShowEditModal(true);
    setSelectedId(j.id);

    setForm({
      jam_mulai: j.jam_mulai ? j.jam_mulai.slice(0, 5) : "",
      jam_selesai: j.jam_selesai ? j.jam_selesai.slice(0, 5) : ""
    });
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:5001/api/jam/${selectedId}`,
        {
          jam_mulai: normalizeTime(form.jam_mulai),
          jam_selesai: normalizeTime(form.jam_selesai)
        }
      );

      fetchJam();
      setShowEditModal(false);
      setSelectedId(null);

      setForm({
        jam_mulai: "",
        jam_selesai: ""
      });

      showNotif("Data jam berhasil diupdate");

    } catch (err) {
      console.log(err);
      showNotif("Gagal update data jam");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5001/api/jam/${id}`
      );

      fetchJam();
      showNotif("Data jam berhasil dihapus");

    } catch (err) {
      console.log(err);
      showNotif("Gagal hapus data jam");
    }
  };

  return (
    <div className="p-6 md:ml-64">

      {/* NOTIF */}
      {notif.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">
            {notif.message}
          </div>
        </div>
      )}

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clock />
        Master Jam
      </h1>

      {/* INPUT */}
      <div className="grid grid-cols-2 gap-3 mb-6">

        <input
          type="time"
          name="jam_mulai"
          value={form.jam_mulai}
          onChange={handleChange}
          className="border p-2 rounded-xl"
        />

        <input
          type="time"
          name="jam_selesai"
          value={form.jam_selesai}
          onChange={handleChange}
          className="border p-2 rounded-xl"
        />

      </div>

      <button
        onClick={handleAdd}
        className="mb-6 bg-teal-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Tambah Jam
      </button>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Jam Mulai</th>
              <th className="p-3">Jam Selesai</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>

            {jam.map((j, i) => (
              <tr key={j.id} className="border-t">

                <td className="p-3">{i + 1}</td>
                <td className="p-3">{j.jam_mulai}</td>
                <td className="p-3">{j.jam_selesai}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">

                    <button onClick={() => handleEdit(j)} className="text-blue-500">
                      <Pencil size={18} />
                    </button>

                    <button onClick={() => handleDelete(j.id)} className="text-red-500">
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">Edit Jam</h2>

            <input
              type="time"
              name="jam_mulai"
              value={form.jam_mulai}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded-xl"
            />

            <input
              type="time"
              name="jam_selesai"
              value={form.jam_selesai}
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

export default ImportJam;