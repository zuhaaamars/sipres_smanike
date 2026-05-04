import React, { useState } from 'react';
import { FileText, Eye, Download } from 'lucide-react';

const GenerateSuratStaff = () => {

  const [selectedSurat, setSelectedSurat] = useState(null);

  const dataSurat = [
    {
      id: 1,
      nama: "Aditya Pratama",
      kelas: "XII RPL 1",
      jenis: "Surat Keterangan Sekolah",
      tanggal: "02 April 2026"
    },
    {
      id: 2,
      nama: "Siti Aminah",
      kelas: "XII RPL 1",
      jenis: "Surat Izin",
      tanggal: "01 April 2026"
    }
  ];

  const handleGenerate = (surat) => {
    setSelectedSurat(surat);
  };

  const handleDownload = () => {
    alert("Simulasi download PDF berhasil!");
  };

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Generate Surat</h1>
          <p>Buat dan cetak surat resmi sekolah</p>
        </div>
      </header>

      {/* TABLE */}
      <div className="dg-table-card">
        <table className="dg-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Jenis Surat</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {dataSurat.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.kelas}</td>
                <td>{item.jenis}</td>
                <td>{item.tanggal}</td>
                <td>
                  <button 
                    className="dg-btn"
                    onClick={() => handleGenerate(item)}
                  >
                    <Eye size={16} /> Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL PREVIEW */}
      {selectedSurat && (
        <div style={modalStyle}>
          <div style={modalContent}>

            {/* CLOSE */}
            <button 
              onClick={() => setSelectedSurat(null)}
              style={{ float: 'right', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ❌
            </button>

            {/* SURAT */}
            <div style={{ padding: '20px' }}>
              <h2 style={{ textAlign: 'center' }}>SMAN 1 Kedunggalar</h2>
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>
                {selectedSurat.jenis.toUpperCase()}
              </h3>

              <p style={{ marginTop: '20px' }}>
                Yang bertanda tangan di bawah ini, Kepala Sekolah SMAN 1 Kedunggalar menerangkan bahwa:
              </p>

              <table style={{ marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>: {selectedSurat.nama}</td>
                  </tr>
                  <tr>
                    <td>Kelas</td>
                    <td>: {selectedSurat.kelas}</td>
                  </tr>
                </tbody>
              </table>

              <p style={{ marginTop: '20px' }}>
                Adalah benar siswa yang terdaftar di SMAN 1 Kedunggalar.
                Surat ini dibuat untuk digunakan sebagaimana mestinya.
              </p>

              <div style={{ marginTop: '40px', textAlign: 'right' }}>
                <p>Kedunggalar, {selectedSurat.tanggal}</p>
                <p>Kepala Sekolah</p>
                <br /><br />
                <p><b>(TTD Digital)</b></p>
              </div>

              {/* DOWNLOAD */}
              <button 
                className="dg-btn"
                onClick={handleDownload}
                style={{ marginTop: '20px' }}
              >
                <Download size={16} /> Download PDF
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GenerateSuratStaff;


/* STYLE MODAL */
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalContent = {
  background: 'white',
  width: '700px',
  borderRadius: '10px',
  maxHeight: '90vh',
  overflowY: 'auto'
};
