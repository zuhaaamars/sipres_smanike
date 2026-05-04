import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import axios from 'axios';
import { Camera, CheckCircle2, Loader2 } from 'lucide-react';

const PresensiMapelSiswa = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const scannerRef = useRef(null);

  const handleStartScan = async () => {
    setShowScanner(true);
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (text) => {
          html5QrCode.stop();
          handleSuccessFlow(text);
        }
      );

    } catch (err) {
      alert("Kamera Error: " + err.message);
      setIsScanning(false);
      setShowScanner(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      }
    } catch {}
  };

  const handleSuccessFlow = async (data) => {
    setIsScanning(false);
    setShowScanner(false);
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/presensi/mapel',
        { qr_code: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setScanResult({
        message: response.data.message,
        raw: data
      });

    } catch (err) {
      alert(err.response?.data?.message || "Gagal presensi");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-[180px] pt-[100px] md:pt-[120px] font-sans text-[#6d4c41]">

      {/* HEADER */}
      <header className="flex justify-center items-center mb-[30px]">
        <div className="text-center">
          <h1 className="text-[24px] font-extrabold text-[#6d4c41] tracking-tight">
            PRESENSI MATA PELAJARAN
          </h1>
          <p className="text-[14px] text-[#6d4c41] mt-[5px]">
            Scan barcode guru untuk melakukan absensi kehadiran
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex justify-center items-center w-full">

        <div className="bg-white rounded-[24px] p-[40px] flex flex-col items-center border border-[#f1f5f9] shadow-[0_10px_25px_rgba(0,0,0,0.02)] w-full max-w-[500px]">

          {/* SCANNER */}
          {showScanner && (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">

              <div id="reader" className="w-full max-w-[400px] rounded-[24px] overflow-hidden"></div>

              <div className="absolute top-[20px] bg-white/90 px-[10px] py-[8px] rounded-[10px] text-center text-[#6d4c41]">
                <p>Arahkan kamera ke QR guru</p>
              </div>

              <button
                className="absolute bottom-[20px] px-[20px] py-[10px] bg-white rounded-[10px] text-[#6d4c41]"
                onClick={() => {
                  stopScanner();
                  setShowScanner(false);
                  setIsScanning(false);
                }}
              >
                Tutup
              </button>

            </div>
          )}

          {/* LOADING */}
          {isProcessing && (
            <div className="flex flex-col items-center justify-center py-[40px] text-center text-[#6d4c41]">
              <Loader2 className="animate-spin" size={48} />
              <p>Memverifikasi data kehadiran...</p>
            </div>
          )}

          {/* SUCCESS */}
          {scanResult && (
            <div className="flex flex-col items-center text-center py-[40px] animate-[fadeIn_0.5s] text-[#6d4c41]">
              <CheckCircle2 size={60} className="text-green-500" />
              <h3 className="font-bold mt-[10px]">Absensi Berhasil!</h3>

              <p className="font-semibold">{scanResult.message}</p>

              <button
                className="mt-[15px] px-[20px] py-[8px] border border-[#6d4c41] text-[#6d4c41] rounded-[8px] font-semibold"
                onClick={() => setScanResult(null)}
              >
                Scan Lagi
              </button>
            </div>
          )}

          {/* PLACEHOLDER */}
          {!isScanning && !scanResult && !isProcessing && (
            <div className="flex flex-col items-center gap-[15px] text-[#6d4c41]">
              <Camera size={48} />
              <p className="font-semibold text-[14px]">Kamera siap digunakan</p>
            </div>
          )}

          {/* BUTTON */}
          {!isScanning && !scanResult && !isProcessing && (
            <button
              className="mt-[30px] bg-[#3e2723] text-white px-[40px] py-[18px] rounded-[16px] font-bold flex items-center gap-[12px] shadow-lg hover:translate-y-[-3px] hover:bg-[#3e2723] transition"
              onClick={handleStartScan}
            >
              <Camera size={20} /> AKTIFKAN KAMERA
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default PresensiMapelSiswa;
