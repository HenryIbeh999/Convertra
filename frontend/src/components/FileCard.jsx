import React from 'react';
import { FileText, X, ArrowRight, Download, CheckCircle2 as CheckCircle, AlertCircle } from 'lucide-react';

const FileCard = ({ file, onRemove, onConvert, status, targetFormat, onFormatChange, downloadUrl }) => {
  const formats = {
    pdf: ['png', 'jpg', 'docx', 'txt', 'html'],
    png: ['pdf', 'jpg'],
    jpg: ['pdf', 'png'],
    jpeg: ['pdf', 'png'],
    docx: ['txt', 'html'],
    xlsx: ['csv', 'json', 'docx', 'pdf'],
    txt: ['pdf', 'html', 'docx']
  };

  const getExtension = (name) => name.split('.').pop().toLowerCase();
  const ext = getExtension(file.name);
  const allowedTargets = formats[ext] || ['pdf', 'png', 'jpg', 'docx', 'txt'];

  // Arrow path animation styles
  const arrowPathStyle = `
    @keyframes dashMove {
      to { stroke-dashoffset: 0; }
    }
    @keyframes pulseGlow {
      0%, 100% { filter: drop-shadow(0 0 3px var(--accent-primary)); }
      50% { filter: drop-shadow(0 0 8px var(--accent-primary)); }
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes spinnerRotate {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{arrowPathStyle}</style>
      <div className="glass" style={{
        padding: '1.5rem',
        borderRadius: '20px',
        marginBottom: '1rem',
        transition: 'all 0.3s ease',
        border: `1px solid ${status === 'done' ? 'rgba(34,197,94,0.4)' : status === 'error' ? 'rgba(239,68,68,0.4)' : 'var(--accent-light)'}`,
        boxShadow: status === 'done' ? '0 0 20px rgba(34,197,94,0.1)' : 'var(--shadow-sm)',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Top row: file info + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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

          {(!status || status === 'error') && (
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
                {status === 'error' ? 'Retry' : 'Convert'}
              </button>
              <button 
                onClick={onRemove}
                style={{ background: 'none', border: 'none', color: '#ef4444', marginLeft: '0.25rem', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
          )}

          {status === 'done' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a 
                href={downloadUrl}
                download
                className="btn-primary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.4rem 1rem', 
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <Download size={16} />
                Download
              </a>
              <button 
                onClick={onRemove}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', marginLeft: '0.25rem', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Animated arrow path during processing */}
        {status === 'processing' && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: 'var(--bg-secondary)',
            animation: 'fadeSlideIn 0.3s ease forwards'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Source format badge */}
              <div style={{
                padding: '0.3rem 0.7rem',
                borderRadius: '8px',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase'
              }}>
                {ext}
              </div>

              {/* Animated arrow path SVG */}
              <svg width="120" height="24" viewBox="0 0 120 24" style={{ flex: '0 0 120px' }}>
                <path 
                  d="M 0 12 Q 30 2, 60 12 Q 90 22, 110 12" 
                  fill="none" 
                  stroke="var(--accent-primary)" 
                  strokeWidth="2" 
                  strokeDasharray="8 4"
                  strokeDashoffset="48"
                  opacity="0.6"
                  style={{ animation: 'dashMove 1.5s linear infinite' }}
                />
                <polygon 
                  points="108,8 120,12 108,16" 
                  fill="var(--accent-primary)"
                  style={{ animation: 'pulseGlow 1.5s ease-in-out infinite' }}
                />
              </svg>

              {/* Target format badge */}
              <div style={{
                padding: '0.3rem 0.7rem',
                borderRadius: '8px',
                background: 'var(--accent-primary)',
                color: 'var(--text-on-accent)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase'
              }}>
                {targetFormat}
              </div>

              {/* Spinner */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spinnerRotate 1s linear infinite' }}>
                  <circle cx="9" cy="9" r="7" fill="none" stroke="var(--accent-light)" strokeWidth="2" />
                  <path d="M 9 2 A 7 7 0 0 1 16 9" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Converting...</span>
              </div>
            </div>
          </div>
        )}

        {/* Success indicator */}
        {status === 'done' && (
          <div style={{ 
            marginTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeSlideIn 0.3s ease forwards'
          }}>
            <CheckCircle size={16} color="#22c55e" />
            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>
              Converted to {targetFormat.toUpperCase()} successfully
            </span>
          </div>
        )}

        {/* Error indicator */}
        {status === 'error' && (
          <div style={{ 
            marginTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeSlideIn 0.3s ease forwards'
          }}>
            <AlertCircle size={16} color="#ef4444" />
            <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600 }}>
              Conversion failed — please try again
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FileCard;
