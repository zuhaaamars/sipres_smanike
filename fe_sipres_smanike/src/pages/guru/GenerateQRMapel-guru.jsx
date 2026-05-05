import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const GenerateQRMapel = () => {
  const [mapel, setMapel] = useState('');
  const [kelas, setKelas] = useState('');
  const [jam, setJam] = useState('');
  const [qrData, setQrData] = useState(null);
  const [listMapel, setListMapel] = useState([]);

  const getMapel = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mapel/');
      setListMapel(res.data);
    } catch (error) {
      console.error('Error ambil mapel:', error);
    }
  };

  useEffect(() => {
    getMapel();
  }, []);

  const handleGenerate = async () => {
    if (!mapel || !kelas || !jam) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      setQrData(null);

      const res = await axios.post(
        'http://localhost:5000/api/presensi/generate',
        { mapel, kelas, jam },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setTimeout(() => {
        setQrData(res.data.qr_code);
      }, 200);

    } catch (error) {
      console.error('Error generate QR:', error);
      alert('Gagal generate QR');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#6d4c41] ml-0 md:ml-[250px]">

      {/* WRAPPER 1150 */}
      <div className="max-w-[1150px] mx-auto p-[20px]">

        {/* TITLE */}
        <h2 className="text-[1.6rem] font-extrabold mb-[20px]">
          Generate QR Presensi Mapel
        </h2>

        {/* FORM */}
        <div className="bg-white p-[25px] rounded-[18px] mb-[30px] shadow-md">

          <h3 className="mb-[20px] font-bold text-[#6d4c41]">
            Form Generate QR
          </h3>

          <div className="grid grid-cols-2 gap-[15px] max-md:grid-cols-1">

            {/* MAPEL */}
            <select
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] text-[#6d4c41] outline-none focus:ring-2 focus:ring-[#3e2723]/20 focus:border-[#3e2723]"
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
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] text-[#6d4c41] outline-none focus:ring-2 focus:ring-[#3e2723]/20 focus:border-[#3e2723]"
            >
              <option value="">Pilih Kelas</option>
              <option>XII RPL 1</option>
              <option>XII RPL 2</option>
            </select>

            {/* JAM */}
            <select
              value={jam}
              onChange={(e) => setJam(e.target.value)}
              className="p-[12px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] text-[#6d4c41] outline-none focus:ring-2 focus:ring-[#3e2723]/20 focus:border-[#3e2723]"
            >
              <option value="">Pilih Jam</option>
              <option>Jam ke 1-2</option>
              <option>Jam ke 3-4</option>
              <option>Jam ke 5-6</option>
              <option>Jam ke 7-8</option>
            </select>

          </div>

          <button
            onClick={handleGenerate}
            className="mt-[20px] px-[22px] py-[12px] bg-[#3e2723] text-white rounded-[12px] font-semibold hover:opacity-90 transition"
          >
            Generate QR
          </button>

        </div>

        {/* QR RESULT */}
        {qrData && (
          <div className="bg-white p-[25px] rounded-[18px] shadow-md text-center">

            <h3 className="mb-[20px] font-bold text-[#6d4c41]">
              QR Presensi Aktif
            </h3>

            <div className="flex justify-center">
              <QRCodeCanvas value={qrData} size={220} />
            </div>

            <div className="mt-[15px] text-left">
              <p><b>Mapel:</b> {mapel}</p>
              <p><b>Kelas:</b> {kelas}</p>
              <p><b>Jam:</b> {jam}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default GenerateQRMapel;