import { useState } from 'react';

const ADMIN_OPTIONS = [
  // SECURITY
  { id: 1, label: "Enable Global 2FA for Admins", desc: "Require 2-factor auth for all dashboard access", category: "Security" },
  { id: 2, label: "Strict IP Whitelisting", desc: "Only allow access from corporate VPN", category: "Security" },
  { id: 3, label: "Auto-Ban Brute Force IPs", desc: "Ban IPs after 5 failed login attempts", category: "Security" },
  { id: 4, label: "Enable Geo-Blocking", desc: "Block traffic from restricted countries", category: "Security" },
  { id: 5, label: "Force HTTPS Only", desc: "Redirect all HTTP traffic to HTTPS", category: "Security" },
  { id: 6, label: "Encrypt User Data at Rest", desc: "Enable AES-256 for database volumes", category: "Security" },
  { id: 7, label: "Require Complex Passwords", desc: "Min 12 chars, special characters required", category: "Security" },
  { id: 8, label: "Enable CSRF Tokens", desc: "Protect against Cross-Site Request Forgery", category: "Security" },
  { id: 9, label: "Disable Concurrent Logins", desc: "Log out users active on multiple devices", category: "Security" },
  { id: 10, label: "Audit Logging", desc: "Track all admin actions globally", category: "Security" },

  // CONTENT
  { id: 11, label: "Auto-Approve Verified Critics", desc: "Publish critic reviews immediately", category: "Content" },
  { id: 12, label: "Profanity Filter", desc: "Asterisk profanity in audience reviews", category: "Content" },
  { id: 13, label: "Lock Content on Controversy", desc: "Freeze reviews on highly debated media", category: "Content" },
  { id: 14, label: "Enable Spoilers Tagging", desc: "Force users to tag potential spoilers", category: "Content" },
  { id: 15, label: "Enable AI Moderation", desc: "Use LLM to detect hate speech in reviews", category: "Content" },
  { id: 16, label: "Hide Rotten Scores < 20%", desc: "Bury extremely low scores by default", category: "Content" },
  { id: 17, label: "Auto-Scrape TMDB Metadata", desc: "Fetch missing posters and cast daily", category: "Content" },
  { id: 18, label: "Enable Rich Text Reviews", desc: "Allow bold/italics in user reviews", category: "Content" },
  { id: 19, label: "Feature Top Reviews", desc: "Pin highest rated reviews to the top", category: "Content" },
  { id: 20, label: "Enable GIF Comments", desc: "Allow users to post GIFs in replies", category: "Content" },

  // USERS
  { id: 21, label: "Allow Public Registration", desc: "Enable open signups for new users", category: "Users" },
  { id: 22, label: "Require Email Verification", desc: "Users must click link before reviewing", category: "Users" },
  { id: 23, label: "Enable Social Login (Google)", desc: "Allow login via Google OAuth", category: "Users" },
  { id: 24, label: "Enable Social Login (Apple)", desc: "Allow login via Apple ID", category: "Users" },
  { id: 25, label: "Enable Profile Avatars", desc: "Allow users to upload custom images", category: "Users" },
  { id: 26, label: "Display User Badges", desc: "Show 'Top Reviewer' badges publicly", category: "Users" },
  { id: 27, label: "Allow Account Deletion", desc: "Users can permanently delete data", category: "Users" },
  { id: 28, label: "Shadowban System", desc: "Hide troll reviews without notifying them", category: "Users" },
  { id: 29, label: "Enable Watchlists", desc: "Allow users to save media for later", category: "Users" },
  { id: 30, label: "Send Weekly Digest Emails", desc: "Newsletter containing top movies", category: "Users" },

  // SERVER & PERFORMANCE
  { id: 31, label: "Enable Edge Caching", desc: "Serve media assets from Cloudflare CDN", category: "Server" },
  { id: 32, label: "Aggressive Image Compression", desc: "Convert all posters to WebP automatically", category: "Server" },
  { id: 33, label: "Database Read Replicas", desc: "Route queries to read-only instances", category: "Server" },
  { id: 34, label: "Redis Session Storage", desc: "Store auth tokens in memory", category: "Server" },
  { id: 35, label: "GraphQL Rate Limiting", desc: "Limit API requests to 100/min per IP", category: "Server" },
  { id: 36, label: "Enable Server-Side Rendering", desc: "Prerender pages for SEO bots", category: "Server" },
  { id: 37, label: "Auto-Scaling", desc: "Spin up new instances on traffic spikes", category: "Server" },
  { id: 38, label: "Daily DB Snapshots", desc: "Backup Postgres DB every midnight", category: "Server" },
  { id: 39, label: "Enable WebSockets", desc: "Live updates for review scores", category: "Server" },
  { id: 40, label: "Maintenance Mode", desc: "Show 'Under Construction' to non-admins", category: "Server" },

  // MONETIZATION & ANALYTICS
  { id: 41, label: "Enable Display Ads", desc: "Show banner ads to free users", category: "Monetization" },
  { id: 42, label: "FreshPopcorn Pro Tier", desc: "Enable $4.99/mo premium subscription", category: "Monetization" },
  { id: 43, label: "Stripe Webhooks", desc: "Listen for payment success/failure", category: "Monetization" },
  { id: 44, label: "Affiliate Links (Amazon)", desc: "Append tag to 'Buy DVD' links", category: "Monetization" },
  { id: 45, label: "Google Analytics 4", desc: "Enable full user tracking", category: "Analytics" },
  { id: 46, label: "Hotjar Heatmaps", desc: "Record user mouse movements", category: "Analytics" },
  { id: 47, label: "A/B Testing Engine", desc: "Split traffic between UI variations", category: "Analytics" },
  { id: 48, label: "Crashlytics Reporting", desc: "Send frontend errors to Sentry", category: "Analytics" },
  { id: 49, label: "Export Monthly PDF", desc: "Email revenue reports to founders", category: "Analytics" },
  { id: 50, label: "Sell Anonymized Data", desc: "Enable API endpoint for data brokers", category: "Monetization" },
];

const AdminPanel = ({ onClose }) => {
  const [toggles, setToggles] = useState({});

  const handleToggle = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [...new Set(ADMIN_OPTIONS.map(opt => opt.category))];

  return (
    <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0 }}>Command Center</h1>
        <button className="btn-outline" onClick={onClose}>Exit Panel</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
        
        {/* Sidebar */}
        <div className="glass" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Categories</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map(cat => (
              <li key={cat} style={{ marginBottom: '10px' }}>
                <a href={`#cat-${cat}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>{cat}</a>
              </li>
            ))}
          </ul>
          
          <div style={{ marginTop: '3rem', borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>System Status: <span style={{ color: 'var(--accent-fresh)' }}>ONLINE</span></div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Users: 14,204</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Server Load: 42%</div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {categories.map(cat => (
            <div key={cat} id={`cat-${cat}`} style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: 'var(--accent-fresh)', borderBottom: 'var(--glass-border)', paddingBottom: '10px', marginBottom: '1.5rem' }}>{cat}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                
                {ADMIN_OPTIONS.filter(opt => opt.category === cat).map(opt => (
                  <div key={opt.id} className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--text-main)' }}>{opt.label}</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</p>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div 
                      onClick={() => handleToggle(opt.id)}
                      style={{ 
                        width: '44px', height: '24px', 
                        background: toggles[opt.id] ? 'var(--accent-fresh)' : 'rgba(255,255,255,0.2)',
                        borderRadius: '12px', cursor: 'pointer', position: 'relative',
                        transition: 'background 0.3s'
                      }}
                    >
                      <div style={{
                        width: '20px', height: '20px', background: '#fff', borderRadius: '50%',
                        position: 'absolute', top: '2px', left: toggles[opt.id] ? '22px' : '2px',
                        transition: 'left 0.3s'
                      }}></div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
