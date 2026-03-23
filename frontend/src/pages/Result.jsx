import React from 'react';
import { CheckCircle, ArrowLeft, Download, RefreshCcw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Result = () => {
  const { id } = useParams();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ color: '#10b981', marginBottom: '2rem' }}>
        <CheckCircle size={80} />
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Conversion Complete!</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
        Your file has been successfully converted and is ready for download.
      </p>

      <div className="card glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.25rem', fontSize: '1.2rem' }}>
            <Download size={24} />
            Download Converted File
          </button>
          
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.25rem', fontSize: '1.1rem', backgroundColor: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
              <ArrowLeft size={20} />
              Convert Another File
            </button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '3rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Files are automatically deleted after 24 hours for your security.
      </div>
    </div>
  );
};

export default Result;
