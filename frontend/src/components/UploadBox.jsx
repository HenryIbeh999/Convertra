import React, { useCallback, useState } from 'react';
import { Upload, File } from 'lucide-react';

const UploadBox = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  }, [onFilesSelected]);

  const handleSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className="glass"
      style={{
        border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--accent-light)'}`,
        borderRadius: '24px',
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: isDragging ? 'var(--accent-light)' : 'var(--glass-bg, rgba(255, 255, 255, 0.4))',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: isDragging ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    }}>
      <input 
        type="file" 
        multiple 
        onChange={handleSelect}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          zIndex: 10
        }}
      />
      <div style={{ 
        color: 'var(--accent-primary)', 
        marginBottom: '1.5rem',
        transform: isDragging ? 'translateY(-10px)' : 'none',
        transition: 'transform 0.3s ease'
      }}>
        <Upload size={64} strokeWidth={1.5} />
      </div>
      <h3 style={{ 
        marginBottom: '0.75rem', 
        fontSize: '1.75rem', 
        fontWeight: 700,
        fontFamily: "'Outfit', sans-serif",
        color: 'var(--text-primary)'
      }}>
        Drag & Drop Files Here
      </h3>
      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '1.1rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        or click to browse from your computer
      </p>
      <div style={{ 
        marginTop: '1.5rem', 
        color: 'var(--text-secondary)', 
        fontSize: '0.9rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <File size={16} />
        <span>Supported: PDF, Images, DOCX, TXT</span>
      </div>
    </div>
  );
};

export default UploadBox;
