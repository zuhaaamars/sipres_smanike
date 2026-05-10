import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GraduationCap,
  Plus,
  Trash2,
  Pencil
} from 'lucide-react';

const ImportGuru = () => {

  const [guru, setGuru] = useState([]);

  const [form, setForm] = useState({
    nip: "",
    nama_lengkap: ""
  });

  // =========================
  // NOTIFICATION
  // =========================
  const [notif, setNotif] = useState({
    show: false,
    message: "",
    type: ""
  });

  // =========================
  // EDIT MODAL
  // =========================
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNip, setSelectedNip] = useState(null);

  // =========================
  // GET DATA
  // =========================
  useEffect(() => {
    fetchGuru();
  }, []);

  const fetchGuru = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5001/api/guru/"
      );

      setGuru(res.data.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================
  // SHOW NOTIFICATION
  // =========================
  const showNotification = (message, type) => {

    setNotif({
      show: true,
      message,
      type
    });

    setTimeout(() => {

      setNotif({
        show: false,
        message: "",
        type: ""
      });

    }, 2500);
  };

  // =========================
  // TAMBAH GURU
  // =========================
  const handleAdd = async () => {

    if (!form.nip || !form.nama_lengkap) return;

    try {

      await axios.post(
        "http://localhost:5001/api/guru/",
        form
      );

      setForm({
        nip: "",
        nama_lengkap: ""
      });

      fetchGuru();

      showNotification(
        "Data guru berhasil ditambahkan",
        "success"
      );

    } catch (err) {

      console.log(err);

      showNotification(
        "Gagal menambahkan data guru",
        "error"
      );
    }
  };

  // =========================
  // EDIT GURU
  // =========================
  const handleEdit = (g) => {

    setShowEditModal(true);

    setSelectedNip(g.nip);

    setForm({
      nip: g.nip,
      nama_lengkap: g.nama_lengkap
    });
  };

  // =========================
  // UPDATE GURU
  // =========================
  const handleUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:5001/api/guru/${selectedNip}`,
        {
          nip: form.nip,
          nama_lengkap: form.nama_lengkap
        }
      );

      fetchGuru();

      setShowEditModal(false);

      setSelectedNip(null);

      setForm({
        nip: "",
        nama_lengkap: ""
      });

      showNotification(
        "Data guru berhasil diupdate",
        "success"
      );

    } catch (err) {

      console.log(err);

      showNotification(
        "Gagal mengupdate data guru",
        "error"
      );
    }
  };

  // =========================
  // DELETE GURU
  // =========================
  const handleDelete = async (nip) => {

    try {

      await axios.delete(
        `http://localhost:5001/api/guru/${nip}`
      );

      fetchGuru();

      showNotification(
        "Data guru berhasil dihapus",
        "success"
      );

    } catch (err) {

      console.log(err);

      showNotification(
        "Gagal menghapus data guru",
        "error"
      );
    }
  };

  return (
    <div className="p-6 md:ml-64">

      {/* =========================
      NOTIFICATION
      ========================= */}
      {notif.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]">

          <div
            className={`
              px-6 py-3 rounded-xl shadow-xl text-white font-semibold
              animate-bounce
              ${notif.type === "success"
                ? "bg-green-500"
                : "bg-red-500"}
            `}
          >
            {notif.message}
          </div>

        </div>
      )}

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <GraduationCap />
        Master Guru
      </h1>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-3 mb-6">

        <input
          type="text"
          name="nip"
          value={form.nip}
          onChange={handleChange}
          placeholder="NIP Guru"
          className="border p-2 rounded-xl"
        />

        <input
          type="text"
          name="nama_lengkap"
          value={form.nama_lengkap}
          onChange={handleChange}
          placeholder="Nama Lengkap Guru"
          className="border p-2 rounded-xl"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        className="mb-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Tambah Guru
      </button>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left w-20">No</th>
              <th className="p-3 text-left w-60">NIP</th>
              <th className="p-3 text-left">Nama Lengkap</th>
              <th className="p-3 text-center w-32">Aksi</th>
            </tr>
          </thead>

          <tbody>

            {guru.length > 0 ? (

              [...guru].map((g, i) => (
                <tr key={g.nip} className="border-t">

                  <td className="p-3">
                    {i + 1}
                  </td>

                  <td className="p-3 font-semibold">
                    {g.nip}
                  </td>

                  <td className="p-3">
                    {g.nama_lengkap}
                  </td>

                  <td className="p-3">

                    <div className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(g)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(g.nip)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-slate-400"
                >
                  Data guru tidak ditemukan
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =========================
      EDIT MODAL
      ========================= */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-bold">
                Edit Guru
              </h2>

              <button
                onClick={() => {

                  setShowEditModal(false);

                  setSelectedNip(null);

                  setForm({
                    nip: "",
                    nama_lengkap: ""
                  });

                }}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ×
              </button>

            </div>

            {/* INPUT */}
            <div className="space-y-4">

              {/* NIP */}
              <div>

                <label className="text-sm text-slate-600 block mb-1">
                  NIP
                </label>

                <input
                  type="text"
                  name="nip"
                  value={form.nip}
                  disabled
                  className="w-full border p-2 rounded-xl bg-slate-100"
                />

              </div>

              {/* NAMA */}
              <div>

                <label className="text-sm text-slate-600 block mb-1">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                  className="w-full border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {

                  setShowEditModal(false);

                  setSelectedNip(null);

                  setForm({
                    nip: "",
                    nama_lengkap: ""
                  });

                }}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300"
              >
                Batal
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Simpan Perubahan
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ImportGuru;