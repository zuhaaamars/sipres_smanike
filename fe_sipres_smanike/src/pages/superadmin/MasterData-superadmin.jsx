import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Clock3,
  Pencil,
  Trash2
} from 'lucide-react';

const MasterDataSuperadmin = () => {
  const [activeTab, setActiveTab] = useState('mapel');

  // =========================
  // STATE
  // =========================
  const [mapel, setMapel] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [jam, setJam] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [guru, setGuru] = useState([]);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchMapel();
    fetchKelas();
    fetchJam();
    fetchSiswa();
    fetchGuru();
  }, []);

  // =========================
  // FETCH MAPEL
  // =========================
  const fetchMapel = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/mapel');
      setMapel(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH KELAS
  // =========================
  const fetchKelas = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/kelas');
      setKelas(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH JAM
  // =========================
  const fetchJam = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/jam');
      const data = res.data?.data || res.data;
      setJam(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH SISWA
  // =========================
  const fetchSiswa = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/siswa');
      setSiswa(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH GURU
  // =========================
  const fetchGuru = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/guru');
      setGuru(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // MAPEL CRUD
  // =========================
  const handleDeleteMapel = async (id) => {
    if (!window.confirm('Hapus mapel?')) return;
    await axios.delete(`http://localhost:5001/api/mapel/${id}`);
    fetchMapel();
  };

  const handleEditMapel = async (item) => {
    const kode_mapel = prompt('Kode Mapel', item.kode_mapel);
    const nama_mapel = prompt('Nama Mapel', item.nama_mapel);
    const kelompok = prompt('Kelompok', item.kelompok);

    if (!kode_mapel || !nama_mapel || !kelompok) return;

    await axios.put(`http://localhost:5001/api/mapel/${item.id}`, {
      kode_mapel,
      nama_mapel,
      kelompok
    });

    fetchMapel();
  };

  // =========================
  // KELAS CRUD
  // =========================
  const handleDeleteKelas = async (id) => {
    if (!window.confirm('Hapus kelas?')) return;
    await axios.delete(`http://localhost:5001/api/kelas/${id}`);
    fetchKelas();
  };

  const handleEditKelas = async (item) => {
    const kelasBaru = prompt('Kelas', item.kelas);
    const jurusanBaru = prompt('Jurusan', item.jurusan_id);
    const waliBaru = prompt('Wali Kelas', item.wali_kelas);

    if (!kelasBaru || !jurusanBaru || !waliBaru) return;

    await axios.put(`http://localhost:5001/api/kelas/${item.id}`, {
      kelas: kelasBaru,
      jurusan_id: jurusanBaru,
      wali_kelas: waliBaru
    });

    fetchKelas();
  };

  // =========================
  // JAM CRUD
  // =========================
  const handleDeleteJam = async (id) => {
    if (!window.confirm('Hapus jam?')) return;
    await axios.delete(`http://localhost:5001/api/jam/${id}`);
    fetchJam();
  };

  const handleEditJam = async (item) => {
    const jam_mulai = prompt('Jam Mulai', item.jam_mulai);
    const jam_selesai = prompt('Jam Selesai', item.jam_selesai);

    if (!jam_mulai || !jam_selesai) return;

    await axios.put(`http://localhost:5001/api/jam/${item.id}`, {
      jam_mulai,
      jam_selesai
    });

    fetchJam();
  };

  // =========================
  // SISWA CRUD
  // =========================
  const handleDeleteSiswa = async (nis) => {
    if (!window.confirm('Hapus siswa?')) return;
    await axios.delete(`http://localhost:5001/api/siswa/${nis}`);
    fetchSiswa();
  };

  const handleEditSiswa = async (item) => {
    const nama_lengkap = prompt('Nama', item.nama_lengkap);
    if (!nama_lengkap) return;

    await axios.put(`http://localhost:5001/api/siswa/${item.nis}`, {
      nama_lengkap
    });

    fetchSiswa();
  };

  // =========================
  // GURU CRUD
  // =========================
  const handleDeleteGuru = async (id) => {
    if (!window.confirm('Hapus guru?')) return;
    await axios.delete(`http://localhost:5001/api/guru/${id}`);
    fetchGuru();
  };

  const handleEditGuru = async (item) => {
    const nama = prompt('Nama', item.nama);
    const nip = prompt('NIP', item.nip);

    if (!nama || !nip) return;

    await axios.put(`http://localhost:5001/api/guru/${item.id}`, {
      nama,
      nip
    });

    fetchGuru();
  };

  // =========================
  // STYLE BUTTON (FIX UTAMA CSS)
  // =========================
  const editBtn =
    "bg-yellow-100 hover:bg-yellow-200 text-yellow-600 p-2 rounded-lg transition";

  const deleteBtn =
    "bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition";

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 md:ml-64">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3E3E3E]">
          Master Data
        </h1>
        <p className="text-gray-500 mt-2">
          Kelola seluruh data master sistem
        </p>
      </div>

      {/* TAB */}
      <div className="flex flex-wrap gap-3 mb-6">

        <button onClick={() => setActiveTab('siswa')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === 'siswa' ? 'bg-[#F4A261] text-white' : 'bg-white text-[#3E3E3E]'
          }`}>
          <GraduationCap size={18} /> Siswa
        </button>

        <button onClick={() => setActiveTab('guru')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === 'guru' ? 'bg-[#F4A261] text-white' : 'bg-white text-[#3E3E3E]'
          }`}>
          <Users size={18} /> Guru
        </button>

        <button onClick={() => setActiveTab('kelas')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === 'kelas' ? 'bg-[#F4A261] text-white' : 'bg-white text-[#3E3E3E]'
          }`}>
          <Building2 size={18} /> Kelas
        </button>

        <button onClick={() => setActiveTab('mapel')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === 'mapel' ? 'bg-[#F4A261] text-white' : 'bg-white text-[#3E3E3E]'
          }`}>
          <BookOpen size={18} /> Mapel
        </button>

        <button onClick={() => setActiveTab('jam')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === 'jam' ? 'bg-[#F4A261] text-white' : 'bg-white text-[#3E3E3E]'
          }`}>
          <Clock3 size={18} /> Jam
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

        {/* SISWA */}
        {activeTab === 'siswa' && (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">No</th>
                <th className="px-6 py-4 text-left">NIS</th>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((item, i) => (
                <tr key={item.nis} className="border-t">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.nis}</td>
                  <td className="px-6 py-4">{item.nama_lengkap}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEditSiswa(item)} className={editBtn}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDeleteSiswa(item.nis)} className={deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* GURU */}
        {activeTab === 'guru' && (
          <table className="w-full text-sm">
            <tbody>
              {guru.map((item, i) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{item.nip}</td>
                    <td className="px-6 py-4">{item.nama_lengkap}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEditGuru(item)} className={editBtn}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDeleteGuru(item.id)} className={deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MAPEL */}
        {activeTab === 'mapel' && (
          <table className="w-full text-sm">
            <tbody>
              {mapel.map((item, i) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.kode_mapel}</td>
                  <td className="px-6 py-4">{item.nama_mapel}</td>
                  <td className="px-6 py-4">{item.kelompok}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEditMapel(item)} className={editBtn}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDeleteMapel(item.id)} className={deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* KELAS */}
        {activeTab === 'kelas' && (
          <table className="w-full text-sm">
            <tbody>
              {kelas.map((item, i) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.kelas}</td>
                  <td className="px-6 py-4">{item.nama_jurusan}</td>
                  <td className="px-6 py-4">{item.wali_kelas}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEditKelas(item)} className={editBtn}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDeleteKelas(item.id)} className={deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* JAM */}
        {activeTab === 'jam' && (
          <table className="w-full text-sm">
            <tbody>
              {jam.map((item, i) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.jam_mulai}</td>
                  <td className="px-6 py-4">{item.jam_selesai}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEditJam(item)} className={editBtn}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDeleteJam(item.id)} className={deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default MasterDataSuperadmin;