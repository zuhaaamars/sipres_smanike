import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, Plus } from 'lucide-react';

const JadwalPelajaran = () => {

  const [jadwal, setJadwal] = useState([]);

  const [form, setForm] = useState({
    kelas_id: "",
    mapel_id: "",
    guru_id: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
    semester: "",
    tahun_ajaran: ""
  });

  useEffect(() => {
    fetchJadwal();
  }, []);

  // =========================
  // GET JADWAL
  // =========================
  const fetchJadwal = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/jadwal");
      setJadwal(res.data.data || []);
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
  // SUBMIT JADWAL
  // =========================
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5001/api/jadwal", form);

      setForm({
        kelas_id: "",
        mapel_id: "",
        guru_id: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
        semester: "",
        tahun_ajaran: ""
      });

      fetchJadwal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 md:ml-64">

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CalendarDays /> Jadwal Pelajaran
      </h1>

      {/* =========================
          FORM
      ========================= */}
      <div className="bg-white p-4 rounded-2xl border mb-6 grid grid-cols-2 gap-3">

        <input
          name="kelas_id"
          value={form.kelas_id}
          onChange={handleChange}
          placeholder="Kelas ID"
          className="border p-2 rounded-xl"
        />

        <input
          name="mapel_id"
          value={form.mapel_id}
          onChange={handleChange}
          placeholder="Mapel ID"
          className="border p-2 rounded-xl"
        />

        <input
          name="guru_id"
          value={form.guru_id}
          onChange={handleChange}
          placeholder="Guru ID"
          className="border p-2 rounded-xl"
        />

        <input
          name="hari"
          value={form.hari}
          onChange={handleChange}
          placeholder="Hari (Senin)"
          className="border p-2 rounded-xl"
        />

        <input
          name="jam_mulai"
          type="time"
          value={form.jam_mulai}
          onChange={handleChange}
          className="border p-2 rounded-xl"
        />

        <input
          name="jam_selesai"
          type="time"
          value={form.jam_selesai}
          onChange={handleChange}
          className="border p-2 rounded-xl"
        />

        <input
          name="semester"
          value={form.semester}
          onChange={handleChange}
          placeholder="Semester (Ganjil/Genap)"
          className="border p-2 rounded-xl"
        />

        <input
          name="tahun_ajaran"
          value={form.tahun_ajaran}
          onChange={handleChange}
          placeholder="Tahun Ajaran"
          className="border p-2 rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="col-span-2 bg-teal-600 text-white p-2 rounded-xl flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Tambah Jadwal
        </button>

      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Kelas</th>
              <th className="p-3">Mapel</th>
              <th className="p-3">Guru</th>
              <th className="p-3">Hari</th>
              <th className="p-3">Jam</th>
              <th className="p-3">Semester</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.map((j, i) => (
              <tr key={i} className="border-t text-center">

                <td className="p-3">{j.kelas || "-"}</td>
                <td className="p-3">{j.mapel || "-"}</td>
                <td className="p-3">{j.guru || "-"}</td>
                <td className="p-3">{j.hari}</td>
                <td className="p-3">
                  {j.jam_mulai} - {j.jam_selesai}
                </td>
                <td className="p-3">{j.semester || "-"}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default JadwalPelajaran;