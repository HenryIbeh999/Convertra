import React from 'react';
import { FileText, X, ArrowRight, Download } from 'lucide-react';

const FileCard = ({ file, onRemove, onConvert, status, targetFormat, onFormatChange }) => {
  const formats = {
    pdf: ['png', 'jpg', 'docx', 'txt'],
    png: ['pdf', 'jpg', 'webp'],
    jpg: ['pdf', 'png', 'webp'],
    docx: ['pdf', 'txt', 'html'],
    txt: ['pdf', 'html', 'docx']
  };

  const getExtension = (name) => name.split('.').pop().toLowerCase();
  const allowedTargets = formats[getExtension(file.name)] || ['pdf', 'png', 'jpg', 'docx', 'txt'];

  return (
    <div className="glass" style={{
      padding: '1.5rem',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      border: '1px solid var(--accent-light)',
      boxShadow: 'var(--shadow-sm)',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{ color: 'var(--accent-primary)' }}>
        <FileText size={24} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {(file.size / 1024).toFixed(1)} KB
        </div>
      </div>

      {!status && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowRight size={16} color="var(--text-secondary)" />
          <select 
            value={targetFormat} 
            onChange={(e) => onFormatChange(e.target.value)}
            className="glass"
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              border: '1px solid var(--accent-light)',
              fontSize: '0.9rem',
              color: 'var(--accent-primary)',
              fontWeight: 500
            }}
          >
            {allowedTargets.map(fmt => (
              <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
            ))}
          </select>
          <button 
            onClick={onConvert}
            className="btn-primary"
            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
          >
            Convert
          </button>
          <button 
            onClick={onRemove}
            style={{ background: 'none', border: 'none', color: '#ef4444', marginLeft: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
          Processing...
        </div>
      )}

      {status === 'done' && (
        <button 
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}
        >
          <Download size={16} />
          Download
        </button>
      )}
    </div>
  );
};

export default FileCard;
