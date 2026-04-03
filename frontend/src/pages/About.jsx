import React from 'react';
import { FileText, Image, Table, FileSpreadsheet, Zap, Shield, RefreshCw, Globe as Github, User as Linkedin, Send as Twitter } from 'lucide-react';

const featureCards = [
  {
    icon: FileText,
    title: 'Documents',
    description: 'PDF, DOCX, TXT — convert between document formats with ease.',
    color: '#a78bfa'
  },
  {
    icon: Image,
    title: 'Images',
    description: 'PNG, JPG — transform image formats instantly.',
    color: '#f472b6'
  },
  {
    icon: Table,
    title: 'Spreadsheets',
    description: 'XLSX to CSV, JSON, DOCX, or PDF — your data, your format.',
    color: '#34d399'
  }
];

const highlights = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Conversions happen in seconds, not minutes. No waiting around.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your files are processed locally and never stored permanently.'
  },
  {
    icon: RefreshCw,
    title: 'Multi-Format',
    description: 'Support for documents, images, and spreadsheets — all in one place.'
  }
];

const About = () => {
  // Defensive icon check
  const icons = { FileText, Image, Table, FileSpreadsheet, Zap, Shield, RefreshCw, Github, Linkedin, Twitter };
  Object.entries(icons).forEach(([name, icon]) => {
    if (!icon) console.warn(`Convertra Debug: Icon "${name}" is missing or undefined!`);
  });

  try {
    return (
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem 3rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle gradient accent behind heading */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            About Convertra
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: 500,
            position: 'relative',
            zIndex: 1,
            lineHeight: 1.6
          }}>
            A modern, open-source file conversion tool built for speed and simplicity. 
            Convert documents, images, and spreadsheets — all from your browser.
          </p>
        </div>

        {/* Supported Format Cards */}
        <div className="container" style={{ paddingTop: 0 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {featureCards.map(({ icon: Icon, title, description, color }, idx) => (
              <div
                key={idx}
                className="glass"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid var(--accent-light)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = `0 0 25px ${color}33`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <Icon size={32} color={color} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Glowing Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '2rem 0'
          }}>
            <div style={{
              width: '60px',
              height: '4px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-hover))',
              boxShadow: '0 0 12px var(--accent-primary)'
            }} />
          </div>

          {/* How It Works */}
          <div style={{ textAlign: 'center', margin: '3rem 0 2rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '0.5rem'
            }}>
              Why Convertra?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Built with care, designed for everyone.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {highlights.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--accent-light)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon size={24} color="var(--accent-primary)" />
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Glowing Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '2rem 0'
          }}>
            <div style={{
              width: '60px',
              height: '4px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-hover))',
              boxShadow: '0 0 12px var(--accent-primary)'
            }} />
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '3rem 0 2rem',
            borderTop: '1px solid var(--accent-light)',
            marginTop: '2rem'
          }}>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              © {new Date().getFullYear()} Convertra. Built by Henry Ibeh.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <a href="https://linkedin.com/in/ibehhenry" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Linkedin size={22} />
              </a>
              <a href="https://github.com/HenryIbeh999" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Github size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Convertra: CRITICAL RENDER ERROR in About page:", error);
    return (
      <div className="container" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2 style={{ color: '#ef4444' }}>Something went wrong loading this page.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Check the developer console for details.</p>
        <button className="btn-primary" onClick={() => window.location.href = '/'}>Go Home</button>
      </div>
    );
  }
};

export default About;

