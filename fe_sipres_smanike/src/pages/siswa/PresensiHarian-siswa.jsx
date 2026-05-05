import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Camera, MapPin, Navigation, History, 
  CheckCircle2, Clock, RefreshCw, Map as MapIcon,
  ChevronRight, AlertCircle
} from 'lucide-react';

const TARGET_COORDS = { lat: -7.556146, lng: 111.659973 };
const MAX_RADIUS = 100;

const ScanPresensiHarian = () => {
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [presensiStatus, setPresensiStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const videoRef = useRef(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1) return 0;
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // FIXED: Memanggil fetchHistory agar riwayat muncul saat pertama load
  useEffect(() => {
    fetchHistory(); 

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const uLat = position.coords.latitude;
          const uLng = position.coords.longitude;
          setLocation({ lat: uLat, lng: uLng });
          const d = calculateDistance(uLat, uLng, TARGET_COORDS.lat, TARGET_COORDS.lng);
          setDistance(d);
          setIsWithinRadius(d <= MAX_RADIUS);
        },
        (err) => console.error("GPS Error:", err),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const fetchHistory = async () => {
    const userRaw = localStorage.getItem('user'); 
    if (userRaw) {
      try {
        const userData = JSON.parse(userRaw);
        const siswaId = userData.profile_id;
        const response = await axios.get(`http://localhost:5000/api/presensi/riwayat/${siswaId}`);
        if (response.data.status === 'success') {
          setHistory(response.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil riwayat:", err);
      }
    }
  };

  const handlePresensiAction = async () => {
    if (!isWithinRadius) {
      alert(`Anda berada di luar radius (${distance.toFixed(1)}m).`);
      return;
    }

    if (presensiStatus === 'idle') {
      setPresensiStatus('taking_photo');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert("Kamera tidak akses: " + err);
        setPresensiStatus('idle');
      }
    } else if (presensiStatus === 'taking_photo' && !capturedImage) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/png'));
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const submitPresensi = async () => {
    setLoading(true);
    const userRaw = localStorage.getItem('user'); 
    if (!userRaw) {
      alert("Sesi berakhir, silakan login kembali.");
      setLoading(false);
      return;
    }

    try {
      const userData = JSON.parse(userRaw);
      const idSiswa = userData.profile_id;

      const payload = {
        siswa_id: userData.profile_id, // ✅ FIX
        foto_bukti: capturedImage,
        latitude: location.lat,
        longitude: location.lng,
        status: 'Hadir'
      };

      console.log("USER DATA:", userData);
      console.log("SISWA ID YANG KIRIM:", idSiswa);

      const response = await axios.post('http://localhost:5000/api/presensi/harian', payload);

      if (response.data.status === 'success') {
        setPresensiStatus('success');
        fetchHistory(); // Langsung update riwayat setelah sukses
      }
    } catch (error) {
      console.error("Database Error:", error.response?.data);
      alert("Gagal: " + (error.response?.data?.message || "Kesalahan Database"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Header Section (Original Structure) */}
      <header className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Presensi Harian</h1>
          <p className="text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            SMAN 1 Kedunggalar Geofencing
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm transition-all ${
          isWithinRadius ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {isWithinRadius ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {isWithinRadius ? 'Dalam Area Sekolah' : 'Luar Area Sekolah'}
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Camera & Clock (Original Structure) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            <div className="p-6 text-center border-b border-slate-50 bg-slate-50/50">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <h2 className="text-5xl font-black text-slate-900 tabular-nums">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':')}
              </h2>
            </div>

            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
              {presensiStatus === 'success' ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="bg-emerald-500 p-4 rounded-full mb-4 shadow-lg shadow-emerald-200">
                    <CheckCircle2 size={64} className="text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Presensi Berhasil Dicatat</h3>
                </div>
              ) : presensiStatus === 'taking_photo' ? (
                <div className="w-full h-full relative">
                  {!capturedImage ? (
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  ) : (
                    <img src={capturedImage} alt="Preview" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none"></div>
                </div>
              ) : (
                <div className="text-center group">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera size={40} className="text-slate-500" />
                  </div>
                  <p className="text-slate-400 text-sm">Pastikan wajah terlihat jelas</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-white flex justify-center gap-4">
              {!capturedImage && presensiStatus !== 'success' && (
                <button 
                  onClick={handlePresensiAction}
                  className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
                >
                  <Camera size={20} />
                  {presensiStatus === 'idle' ? 'Mulai Presensi' : 'Ambil Foto'}
                </button>
              )}

              {capturedImage && presensiStatus === 'taking_photo' && (
                <div className="flex gap-3">
                  <button onClick={() => setCapturedImage(null)} className="bg-slate-100 text-slate-600 px-6 py-4 rounded-2xl font-bold">Ulangi</button>
                  <button 
                    onClick={submitPresensi}
                    disabled={loading}
                    className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all disabled:opacity-70"
                  >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <Navigation size={20} />}
                    {loading ? 'Mengirim...' : 'Kirim Sekarang'}
                  </button>
                </div>
              )}

              {presensiStatus === 'success' && (
                <button
                  onClick={() => { setCapturedImage(null); setPresensiStatus('idle'); }}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  Selesai
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Status & History (ORIGINAL DESIGN WITH IMPROVEMENTS) */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <MapIcon size={14} /> Jarak Lokasi
              </span>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isWithinRadius ? 'text-emerald-600' : 'text-rose-600'}`}>
                {distance.toFixed(1)}
              </span>
              <span className="text-slate-400 font-bold">meter</span>
            </div>
          </div>

          {/* Time Status Card (Original Style) */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Jam Datang</p>
                <p className="text-lg font-bold text-slate-700">{history[0]?.jam_masuk || '--:--'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Jam Pulang</p>
                <p className="text-lg font-bold text-slate-700">{history[0]?.jam_pulang || '--:--'}</p>
              </div>
            </div>
          </div>

          {/* History Section (ORIGINAL STYLE + SHOPEE FEATURES) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[300px]">
            <h4 className="text-sm font-black text-slate-900 mb-5 flex items-center justify-between">
              Riwayat Terakhir
              <History size={16} className="text-slate-400" />
            </h4>
            
            <div className="space-y-4">
              {history.length > 0 ? history.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex flex-col p-4 rounded-2xl bg-slate-50 group transition-all border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Foto Bukti Ala Shopee */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-white shadow-sm flex-shrink-0">
                        <img 
                          src={item.foto}  
                          alt="Bukti" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Photo' }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{item.status}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.jam_masuk} WIB • {item.tanggal}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500" />
                  </div>
                  
                  {/* Map Link ala Shopee */}
                  <a 
                    href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
                  >
                    <MapPin size={12} /> LIHAT TITIK LOKASI
                  </a>
                </div>
              )) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <History size={20} className="text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Belum ada data hari ini</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanPresensiHarian;