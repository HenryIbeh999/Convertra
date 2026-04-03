import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import FileCard from '../components/FileCard';
import { convertFile } from '../services/api';

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilesSelected = (files) => {
    const newFiles = files.map(f => ({
      file: f,
      id: Math.random().toString(36).substr(2, 9),
      targetFormat: 'pdf',
      status: null,
      downloadUrl: null
    }));
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const handleRemove = (id) => {
    setSelectedFiles(selectedFiles.filter(f => f.id !== id));
  };

  const handleFormatChange = (id, format) => {
    setSelectedFiles(selectedFiles.map(f => f.id === id ? { ...f, targetFormat: format } : f));
  };

  const handleConvert = async (id) => {
    const fileToConvert = selectedFiles.find(f => f.id === id);
    if (!fileToConvert) return;

    setSelectedFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'processing' } : f));

    try {
      const response = await convertFile(fileToConvert.file, fileToConvert.targetFormat);
      
      // The backend returns { message: "success", download_url: "/api/download/..." }
      // We prefix with the backend port since we're in dev mode
      const downloadUrl = `http://localhost:5000${response.download_url}`;
      
      setSelectedFiles(prev => prev.map(f => f.id === id ? { 
        ...f, 
        status: 'done',
        downloadUrl: downloadUrl
      } : f));
    } catch (error) {
      console.error("Conversion failed:", error);
      setSelectedFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f));
      alert(error.response?.data?.error || "Conversion failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '2rem 0' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          Convert Anything. <br />
          <span style={{ 
            color: 'var(--accent-primary)',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Anywhere.</span>
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500
        }}>
          High-quality file conversion in seconds. <br />
          Simple, fast, and secure.
        </p>
      </div>

      <UploadBox onFilesSelected={handleFilesSelected} />

      <div style={{ marginTop: '3rem' }}>
        {selectedFiles.length > 0 && (
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Files to Convert</h2>
        )}
        {selectedFiles.map(fileData => (
          <FileCard 
            key={fileData.id}
            file={fileData.file}
            targetFormat={fileData.targetFormat}
            status={fileData.status}
            downloadUrl={fileData.downloadUrl}
            onRemove={() => handleRemove(fileData.id)}
            onFormatChange={(fmt) => handleFormatChange(fileData.id, fmt)}
            onConvert={() => handleConvert(fileData.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
