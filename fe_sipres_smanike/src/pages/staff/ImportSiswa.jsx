import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  Plus,
  Trash2,
  Pencil
} from 'lucide-react';

const ImportSiswa = () => {

  const [siswa, setSiswa] = useState([]);

  const [form, setForm] = useState({
    nis: "",
    nama_lengkap: ""
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
  const [selectedNis, setSelectedNis] = useState(null);

  // =========================
  // GET DATA
  // =========================
  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5001/api/siswa/"
      );

      setSiswa(res.data.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SHOW NOTIF
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
  // TAMBAH SISWA
  // =========================
  const handleAdd = async () => {

    if (!form.nis || !form.nama_lengkap) return;

    try {

      await axios.post(
        "http://localhost:5001/api/siswa/",
        form
      );

      setForm({
        nis: "",
        nama_lengkap: ""
      });

      fetchSiswa();

      showNotif("Data berhasil ditambahkan");

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT SISWA
  // =========================
  const handleEdit = (s) => {

    setShowEditModal(true);

    setSelectedNis(s.nis);

    setForm({
      nis: s.nis,
      nama_lengkap: s.nama_lengkap
    });
  };

  // =========================
  // UPDATE SISWA
  // =========================
  const handleUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:5001/api/siswa/${selectedNis}`,
        {
          nama_lengkap: form.nama_lengkap
        }
      );

      fetchSiswa();

      setShowEditModal(false);

      setSelectedNis(null);

      setForm({
        nis: "",
        nama_lengkap: ""
      });

      showNotif("Data berhasil diupdate");

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE SISWA
  // =========================
  const handleDelete = async (nis) => {

    try {

      await axios.delete(
        `http://localhost:5001/api/siswa/${nis}`
      );

      fetchSiswa();

      showNotif("Data berhasil dihapus");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:ml-64">

      {/* =========================
      NOTIFIKASI
      ========================= */}
      {notif.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-medium animate-bounce">
            {notif.message}
          </div>

        </div>
      )}

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users />
        Data Siswa
      </h1>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-3 mb-6">

        <input
          type="text"
          name="nis"
          value={form.nis}
          onChange={handleChange}
          placeholder="NIS Siswa"
          className="border p-2 rounded-xl"
        />

        <input
          type="text"
          name="nama_lengkap"
          value={form.nama_lengkap}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="border p-2 rounded-xl"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        className="mb-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Plus size={18} />
        Tambah Siswa
      </button>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">NIS</th>
              <th className="p-3">Nama Lengkap</th>
              <th className="p-3 text-center w-32">Aksi</th>
            </tr>
          </thead>

          <tbody>

            {siswa.length > 0 ? (

              siswa.map((s, i) => (
                <tr key={i} className="border-t">

                  <td className="p-3">
                    {s.nis}
                  </td>

                  <td className="p-3">
                    {s.nama_lengkap}
                  </td>

                  <td className="p-3">

                    <div className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(s.nis)}
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
                  colSpan="3"
                  className="p-4 text-center text-slate-400"
                >
                  Tidak ada data siswa
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
                Edit Siswa
              </h2>

              <button
                onClick={() => {

                  setShowEditModal(false);

                  setSelectedNis(null);

                  setForm({
                    nis: "",
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

              <div>

                <label className="text-sm text-slate-600 block mb-1">
                  NIS
                </label>

                <input
                  type="text"
                  value={form.nis}
                  disabled
                  className="w-full border p-2 rounded-xl bg-slate-100"
                />

              </div>

              <div>

                <label className="text-sm text-slate-600 block mb-1">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-xl"
                />

              </div>

            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {

                  setShowEditModal(false);

                  setSelectedNis(null);

                  setForm({
                    nis: "",
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

export default ImportSiswa;