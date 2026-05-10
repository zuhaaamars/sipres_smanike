import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const GenerateQRMapel = () => {

  // =====================
  // STATE
  // =====================
  const [mapel, setMapel] = useState('');
  const [kelas, setKelas] = useState('');
  const [jam, setJam] = useState('');

  const [listMapel, setListMapel] = useState([]);
  const [listKelas, setListKelas] = useState([]);
  const [listJam, setListJam] = useState([]);

  const [qrToken, setQrToken] = useState(null);

  // =====================
  // GET MASTER MAPEL
  // =====================
  const getMapel = async () => {
    try {

      const res = await axios.get(
        'http://localhost:5001/api/mapel/'
      );

      setListMapel(res.data.data || []);

    } catch (error) {
      console.error('Error mapel:', error);
    }
  };

  // =====================
  // GET MASTER KELAS
  // =====================
  const getKelas = async () => {
    try {

      const res = await axios.get(
        'http://localhost:5001/api/kelas/'
      );

      // 🔥 FIX: pastikan selalu array
      const data = res.data?.data || res.data || [];

      setListKelas(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error('Error kelas:', error);
      setListKelas([]);
    }
  };

  // =====================
  // GET MASTER JAM
  // =====================
  const getJam = async () => {
    try {

      const res = await axios.get('http://localhost:5001/api/jam');

      console.log("DATA JAM:", res.data);

      setListJam(res.data.data || []);

    } catch (error) {
      console.error('Error jam:', error);
    }
  };

  // =====================
  // LOAD DATA
  // =====================
  useEffect(() => {
    getMapel();
    getKelas();
    getJam();
  }, []);

  // =====================
  // GENERATE QR
  // =====================
  const handleGenerate = async () => {

    if (!mapel || !kelas || !jam) {
      alert('Semua field harus diisi!');
      return;
    }

    try {

      setQrToken(null);

      const res = await axios.post(
        'http://localhost:5001/api/presensi-mapel/create-qr',
        {
          mapel,
          kelas,
          jam,
          guru_id: localStorage.getItem('user_id')
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setQrToken(res.data.data.qr_token);

    } catch (error) {

      console.error('Error generate QR:', error);

      alert(
        error?.response?.data?.message ||
        'Gagal generate QR'
      );
    }
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      <div className="max-w-[1150px] mx-auto p-[20px]">

        <h2 className="text-[1.6rem] font-extrabold mb-[20px]">
          Generate QR Presensi Mapel
        </h2>

        <div className="bg-white p-[25px] rounded-[18px] mb-[30px] shadow-md">

          <div className="grid grid-cols-3 gap-[15px] max-md:grid-cols-1">

            {/* MAPEL */}
            <select
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc]"
            >
              <option value="">Pilih Mapel</option>

              {listMapel.map((item) => (
                <option key={item.id} value={item.nama_mapel}>
                  {item.nama_mapel}
                </option>
              ))}

            </select>

            {/* KELAS */}
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc]"
            >
              <option value="">Pilih Kelas</option>

              {(Array.isArray(listKelas) ? listKelas : []).map((item) => (
                <option key={item.id} value={item.kelas}>
                  {item.kelas}
                </option>
              ))}

            </select>

            {/* JAM */}
            <select
              value={jam}
              onChange={(e) => setJam(e.target.value)}
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc]"
            >
              <option value="">Pilih Jam</option>

              {listJam.map((item) => (
                <option
                  key={item.id}
                  value={`${item.jam_mulai} - ${item.jam_selesai}`}
                >
                  {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}
                </option>
              ))}

            </select>

          </div>

          <button
            onClick={handleGenerate}
            className="mt-[20px] px-[22px] py-[12px] bg-[#3e2723] text-white rounded-[12px]"
          >
            Generate QR
          </button>

        </div>

        {qrToken && (
          <div className="bg-white p-[25px] rounded-[18px] shadow-md text-center">

            <h3 className="mb-[20px] font-bold text-[#6d4c41]">
              QR Presensi Aktif
            </h3>

            <div className="flex justify-center">
              <QRCodeCanvas value={qrToken} size={220} />
            </div>

            <div className="mt-[20px] text-left space-y-2">

              <p><b>Mapel:</b> {mapel}</p>
              <p><b>Kelas:</b> {kelas}</p>
              <p><b>Jam:</b> {jam}</p>
              <p className="break-all"><b>Token:</b> {qrToken}</p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default GenerateQRMapel;