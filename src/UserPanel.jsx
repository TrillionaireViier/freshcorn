import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const [activeMenu, setActiveMenu] = useState('profile');
  const navigate = useNavigate();

  return (
    <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0 }}>My Account</h1>
        <button className="btn-outline" onClick={() => navigate('/')}>Back to Home</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
        
        {/* Sidebar */}
        <div className="glass" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem', borderBottom: 'var(--glass-border)', paddingBottom: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-fresh)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#000' }}>
              DV
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Danila Vier</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>Pro Member</div>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['profile', 'security', 'watchlist', 'reviews', 'subscription'].map(menu => (
              <li key={menu} style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => setActiveMenu(menu)}
                  style={{ 
                    background: activeMenu === menu ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none', color: activeMenu === menu ? 'var(--text-main)' : 'var(--text-muted)',
                    padding: '10px', width: '100%', textAlign: 'left', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: activeMenu === menu ? 'bold' : 'normal', transition: 'background 0.2s'
                  }}
                >
                  {menu.charAt(0).toUpperCase() + menu.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="glass" style={{ padding: '3rem' }}>
          
          {activeMenu === 'profile' && (
            <div className="animate-fade-in">
              <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>Public Profile</h2>
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Display Name</label>
                  <input type="text" className="form-input" defaultValue="Danila Vier" />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Bio</label>
                  <textarea className="form-input" rows="4" defaultValue="Cinephile. Sci-Fi enthusiast. Always looking for the next masterpiece."></textarea>
                </div>
                <button className="btn-primary">Save Changes</button>
              </form>
            </div>
          )}

          {activeMenu === 'security' && (
            <div className="animate-fade-in">
              <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>Security Settings</h2>
              <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: 'var(--glass-border)' }}>
                <h4 style={{ marginBottom: '10px' }}>Change Password</h4>
                <input type="password" className="form-input" placeholder="Current Password" style={{ marginBottom: '10px' }} />
                <input type="password" className="form-input" placeholder="New Password" style={{ marginBottom: '10px' }} />
                <button className="btn-outline">Update Password</button>
              </div>
              <div>
                <h4 style={{ marginBottom: '10px' }}>Two-Factor Authentication</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Protect your account with an extra layer of security.</p>
                <button className="btn-primary">Enable 2FA App</button>
              </div>
            </div>
          )}

          {activeMenu === 'watchlist' && (
            <div className="animate-fade-in">
              <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>My Watchlist</h2>
              <p style={{ color: 'var(--text-muted)' }}>You haven't added any movies to your watchlist yet.</p>
              <button className="btn-outline" style={{ marginTop: '1rem' }} onClick={() => navigate('/movies')}>Explore Movies</button>
            </div>
          )}

          {activeMenu === 'reviews' && (
            <div className="animate-fade-in">
              <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>My Reviews</h2>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Inception (2010)</strong>
                  <span style={{ color: 'var(--accent-fresh)', fontWeight: 'bold' }}>98%</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>"A masterpiece that I watch every single year. Nolan is a genius."</p>
              </div>
            </div>
          )}

          {activeMenu === 'subscription' && (
            <div className="animate-fade-in">
              <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>Subscription</h2>
              <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0))', border: '1px solid var(--accent-gold)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>FreshPopcorn PRO</h3>
                <p style={{ marginBottom: '1rem' }}>Your subscription is active. Next billing date: <strong>September 14, 2026</strong>.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary" style={{ background: 'var(--accent-gold)', color: '#000', borderColor: 'var(--accent-gold)' }}>Manage Billing</button>
                  <button className="btn-outline">Cancel Plan</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserPanel;
