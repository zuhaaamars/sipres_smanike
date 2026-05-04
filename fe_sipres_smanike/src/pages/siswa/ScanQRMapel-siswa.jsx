import React, { useState } from 'react';
import axios from 'axios';
// ✅ Library baru yang kompatibel dengan React 19
import { Scanner } from '@yudiel/react-qr-scanner'; 

const ScanQR = () => {
  const [hasil, setHasil] = useState(null);
  const [status, setStatus] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = async (result) => {
    // Di library baru, result adalah array. Kita ambil data pertama.
    if (!result || result.length === 0) return;

    // Hentikan scan sementara agar tidak mengirim API berkali-kali
    setIsScanning(false);

    try {
      // 🔹 Ambil data string dari QR dan ubah jadi JSON
      const rawValue = result[0].rawValue;
      const data = JSON.parse(rawValue);

      setHasil(data);
      setStatus('Mengirim presensi...');

      // 🔥 KIRIM KE BACKEND
      await axios.post('http://localhost:5000/api/presensi', data);

      setStatus('✅ Presensi berhasil!');
    } catch (error) {
      console.error("Detail Error:", error);
      setStatus('❌ QR tidak valid / gagal kirim');
      
      // Jika gagal, izinkan scan ulang setelah 3 detik
      setTimeout(() => setIsScanning(true), 3000);
    }
  };

  return (
    <div className="scan-container">
      <h2 className="scan-title">Scan QR Presensi</h2>

      {/* CAMERA */}
      <div className="scan-card">
        <div className="scan-camera">
          {isScanning ? (
            <Scanner
              onScan={(result) => handleScan(result)}
              onError={(error) => console.error(error)}
              constraints={{ facingMode: 'environment' }}
              allowMultiple={false}
              scanDelay={2000}
            />
          ) : (
            <div className="scan-paused" style={{ textAlign: 'center', padding: '20px' }}>
              <p>Scan Selesai</p>
              <button 
                onClick={() => { setIsScanning(true); setStatus(''); setHasil(null); }}
                className="btn-retry"
                style={{ marginTop: '10px', padding: '5px 15px', cursor: 'pointer' }}
              >
                Scan Lagi
              </button>
            </div>
          )}
        </div>

        <p className={`scan-status 
          ${status.includes('berhasil') ? 'scan-success' : ''} 
          ${status.includes('gagal') ? 'scan-error' : ''} 
          ${status.includes('❌') ? 'scan-error' : ''}`}>
          {status}
        </p>
      </div>

      {/* HASIL */}
      {hasil && (
        <div className="scan-card scan-result">
          <h3>Data Presensi</h3>
          <p><span>Mapel:</span> {hasil.mapel}</p>
          <p><span>Kelas:</span> {hasil.kelas}</p>
          <p><span>Jam:</span> {hasil.jam}</p>
        </div>
      )}
    </div>
  );
};

export default ScanQR;