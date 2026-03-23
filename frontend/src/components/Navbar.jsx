import React from 'react';
import { Layers, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <nav className="glass" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 2.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderRadius: '0 0 20px 20px',
      margin: '0 1rem'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-primary)', fontSize: '1.8rem' }}>
        <Layers size={36} strokeWidth={2.5} />
        <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Convertra</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Home</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>About</Link>
        </div>
        
        <button 
          onClick={onToggleTheme} 
          className="glass"
          style={{ 
            padding: '0.6rem', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            border: 'none',
            background: 'var(--bg-secondary)'
          }}
        >
          {theme === 'light' ? <Moon size={24} fill="currentColor" /> : <Sun size={24} fill="white" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
