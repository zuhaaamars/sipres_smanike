import React, { useState, useRef } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import axios from 'axios';
import {
  Camera,
  CheckCircle2,
  Loader2,
  XCircle
} from 'lucide-react';

const PresensiMapelSiswa = () => {

      // =========================
      // STATE
      // =========================
      const [isScanning, setIsScanning] = useState(false);
      const [showScanner, setShowScanner] = useState(false);
      const [isProcessing, setIsProcessing] = useState(false);

      const [scanResult, setScanResult] = useState(null);
      const [errorMessage, setErrorMessage] = useState('');

      const scannerRef = useRef(null);

    // =========================
    // START SCANNER
    // =========================
    const handleStartScan = async () => {

      setShowScanner(true);
      setIsScanning(true);
      setErrorMessage('');

      // 🔥 kasih delay agar div reader muncul dulu
      setTimeout(async () => {

        try {

          const html5QrCode = new Html5Qrcode("reader");

          scannerRef.current = html5QrCode;

          await html5QrCode.start(
            { facingMode: "environment" },

            {
              fps: 10,
              qrbox: {
                width: 250,
                height: 250
              }
            },

            async (decodedText) => {

              await stopScanner();

              handleSuccessFlow(decodedText);
            }
          );

        } catch (err) {

          console.error(err);

          setErrorMessage("Kamera gagal dibuka");

          setIsScanning(false);
          setShowScanner(false);
        }

      }, 300); // 🔥 delay render
    };

  // =========================
  // STOP SCANNER
  // =========================
  const stopScanner = async () => {

    try {

      if (scannerRef.current) {

        await scannerRef.current.stop();
        await scannerRef.current.clear();

        scannerRef.current = null;
      }

    } catch (err) {
      console.log(err);
    }

    setIsScanning(false);
    setShowScanner(false);
  };

  // =========================
  // HANDLE HASIL SCAN
  // =========================
  const handleSuccessFlow = async (qrToken) => {

    setIsProcessing(true);

    try {

      // AMBIL TOKEN LOGIN
      const token = localStorage.getItem('token');
      const siswa_id = localStorage.getItem('siswa_id');

      // HIT API BACKEND
      const response = await axios.post(
        'http://localhost:5001/api/presensi-mapel/scan',

        {
          qr_token: qrToken,
          siswa_id: siswa_id
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // SUCCESS
      setScanResult({
        success: true,
        message: response.data.message,
        data: response.data.data
      });

    } catch (err) {

      console.error(err);

      // ERROR
      setScanResult({
        success: false,
        message:
          err.response?.data?.message ||
          "Gagal melakukan presensi"
      });

    } finally {

      setIsProcessing(false);
    }
  };

  // =========================
  // RESET
  // =========================
  const resetScan = () => {

    setScanResult(null);
    setErrorMessage('');
  };

  // =========================
  // UI
  // =========================
  return (

    <div className="min-h-screen bg-[#f8fafc] p-[20px] md:ml-[250px]">

      <div className="max-w-[600px] mx-auto">

        {/* =========================
            HEADER
        ========================= */}
        <div className="text-center mb-[30px]">

          <h1 className="text-[28px] font-extrabold text-[#3e2723]">
            PRESENSI MAPEL SISWA
          </h1>

          <p className="text-[#6d4c41] mt-[8px]">
            Scan QR dari guru untuk melakukan presensi
          </p>

        </div>

        {/* =========================
            CARD
        ========================= */}
        <div className="bg-white rounded-[24px] shadow-md p-[40px]">

          {/* =========================
              SCANNER MODAL
          ========================= */}
          {showScanner && (

            <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col items-center justify-center">

              <div
                id="reader"
                className="w-full max-w-[400px] bg-white rounded-[16px] overflow-hidden"
              ></div>

              <p className="text-white mt-[20px]">
                Arahkan kamera ke QR Code
              </p>

              <button
                onClick={stopScanner}
                className="mt-[20px] bg-white px-[20px] py-[10px] rounded-[12px]"
              >
                Tutup Scanner
              </button>

            </div>
          )}

          {/* =========================
              LOADING
          ========================= */}
          {isProcessing && (

            <div className="flex flex-col items-center py-[40px]">

              <Loader2
                size={60}
                className="animate-spin text-[#3e2723]"
              />

              <p className="mt-[15px]">
                Memverifikasi presensi...
              </p>

            </div>
          )}

          {/* =========================
              HASIL SCAN
          ========================= */}
          {scanResult && !isProcessing && (

            <div className="flex flex-col items-center text-center">

              {scanResult.success ? (
                <CheckCircle2
                  size={80}
                  className="text-green-500"
                />
              ) : (
                <XCircle
                  size={80}
                  className="text-red-500"
                />
              )}

              <h2 className="text-[22px] font-bold mt-[15px]">

                {scanResult.success
                  ? 'Presensi Berhasil'
                  : 'Presensi Gagal'}

              </h2>

              <p className="mt-[10px] text-[16px]">
                {scanResult.message}
              </p>

              {/* DETAIL */}
              {scanResult.data && (

                <div className="mt-[20px] text-left bg-[#f8fafc] p-[20px] rounded-[16px] w-full">

                  <p>
                    <b>Mapel:</b>{" "}
                    {scanResult.data.mapel}
                  </p>

                  <p>
                    <b>Kelas:</b>{" "}
                    {scanResult.data.kelas}
                  </p>

                  <p>
                    <b>Jam:</b>{" "}
                    {scanResult.data.jam}
                  </p>

                </div>
              )}

              <button
                onClick={resetScan}
                className="mt-[25px] bg-[#3e2723] text-white px-[24px] py-[12px] rounded-[12px]"
              >
                Scan Lagi
              </button>

            </div>
          )}

          {/* =========================
              ERROR
          ========================= */}
          {errorMessage && (

            <div className="bg-red-100 text-red-600 p-[12px] rounded-[12px] mb-[20px] text-center">

              {errorMessage}

            </div>
          )}

          {/* =========================
              BUTTON AKTIFKAN
          ========================= */}
          {!showScanner && !scanResult && !isProcessing && (

            <div className="flex flex-col items-center">

              <div className="bg-[#f8fafc] p-[30px] rounded-full">

                <Camera
                  size={60}
                  className="text-[#3e2723]"
                />

              </div>

              <p className="mt-[20px] text-center">
                Klik tombol di bawah untuk mulai scan QR presensi mapel
              </p>

              <button
                onClick={handleStartScan}
                className="mt-[30px] bg-[#3e2723] hover:bg-[#5d4037] text-white px-[35px] py-[16px] rounded-[16px] font-bold"
              >
                AKTIFKAN KAMERA
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PresensiMapelSiswa;