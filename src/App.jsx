import { useState } from 'react';
import './index.css';
import { movies, tvShows, cartoons, newsArticles, reviews } from './data';

// SVG Icons
const FreshPopcorn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-fresh)' }}>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    <path d="M12 2v20"/>
  </svg>
);

const RottenTomato = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-rotten)' }}>
    <circle cx="12" cy="12" r="10"/>
    <path d="m4.9 4.9 14.2 14.2"/>
  </svg>
);

const AudiencePopcorn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-gold)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const AuthModal = ({ mode, setMode, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="John Doe" />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>

          {mode === 'signin' && (
            <div className="form-options">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="auth-switch">
            {mode === 'signin' ? (
              <p>Don't have an account? <span onClick={() => setMode('signup')}>Sign up</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setMode('signin')}>Sign in</span></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable grid component for displaying media cards
const MediaGrid = ({ title, items, onSelect }) => (
  <section className="section animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh' }}>
    <h1 className="section-title">{title}</h1>
    <div className="movie-grid">
      {items.map(item => (
        <div key={item.id} className="movie-card" onClick={() => onSelect(item)}>
          <img src={item.poster} alt={item.title} className="movie-poster" />
          <div className="movie-info">
            <div className="movie-scores">
              <div className="score-container">
                {item.criticsScore >= 80 ? <FreshPopcorn /> : <RottenTomato />}
                <span className={item.criticsScore >= 80 ? 'score-fresh' : 'score-rotten'}>{item.criticsScore}%</span>
              </div>
              <div className="score-container">
                <AudiencePopcorn />
                <span>{item.audienceScore}%</span>
              </div>
            </div>
            <h3 className="movie-title" style={{ marginTop: '10px' }}>{item.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.year} • {item.genre}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [authMode, setAuthMode] = useState(null); // 'signin', 'signup', or null
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'news', 'movies', 'tvshows'

  const heroMovie = movies[0]; // Inception
  const inTheaters = [...movies, ...cartoons].filter(m => m.isInTheaters);
  const trending = [...movies, ...tvShows, ...cartoons].filter(m => m.isTrending).slice(0, 5);

  const getScoreIcon = (score) => score >= 80 ? <FreshPopcorn /> : <RottenTomato />;

  const renderContent = () => {
    // If a specific movie or TV show is selected, show details
    if (selectedMedia) {
      return (
        <div className="details-container animate-fade-in">
          <div 
            className="hero" 
            style={{ backgroundImage: `url(${selectedMedia.backdrop})`, height: '50vh' }}
          >
            <div className="hero-overlay"></div>
          </div>
          
          <div className="details-header">
            <img src={selectedMedia.poster} alt={selectedMedia.title} className="details-poster" />
            
            <div className="details-info">
              <h1 className="hero-title">{selectedMedia.title}</h1>
              <div className="hero-meta">
                <span>{selectedMedia.year}</span>
                <span>•</span>
                <span>{selectedMedia.rating}</span>
                <span>•</span>
                <span>{selectedMedia.duration}</span>
                <span>•</span>
                <span>{selectedMedia.genre}</span>
              </div>
              
              <div className="score-board">
                <div className="score-item">
                  <span className="score-label">Critics Consensus</span>
                  <div className="score-value">
                    {getScoreIcon(selectedMedia.criticsScore)}
                    <span className={selectedMedia.criticsScore >= 80 ? 'score-fresh' : 'score-rotten'}>
                      {selectedMedia.criticsScore}%
                    </span>
                  </div>
                </div>
                <div className="score-item">
                  <span className="score-label">Audience Score</span>
                  <div className="score-value">
                    <AudiencePopcorn />
                    <span>{selectedMedia.audienceScore}%</span>
                  </div>
                </div>
              </div>
              
              <p className="hero-synopsis" style={{ fontSize: '1.1rem', color: '#ccc' }}>
                {selectedMedia.synopsis}
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <span className="score-label">{selectedMedia.id.startsWith('t') ? 'Creator' : 'Director'}</span>
                <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '5px' }}>{selectedMedia.director}</p>
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <span className="score-label">Starring</span>
                <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '5px' }}>{selectedMedia.cast.join(', ')}</p>
              </div>
            </div>
          </div>

          <div className="reviews-section" style={{ maxWidth: '1400px', margin: '4rem auto 0', padding: '3rem 4rem' }}>
            <h2 className="section-title">Verified Reviews</h2>
            {reviews.filter(r => r.mediaId === selectedMedia.id).length > 0 ? (
              <div className="reviews-grid">
                {reviews.filter(r => r.mediaId === selectedMedia.id).map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{review.author}</span>
                      <div className="review-score">
                        {review.score >= 80 ? <FreshPopcorn /> : <RottenTomato />}
                        <span className={review.score >= 80 ? 'score-fresh' : 'score-rotten'}>{review.score}%</span>
                      </div>
                    </div>
                    <p className="review-text">"{review.text}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No reviews available yet for this title.</p>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === 'news') {
      return (
        <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh' }}>
          <h1 className="section-title">Latest Entertainment News</h1>
          <div className="news-grid">
            {newsArticles.map(news => (
              <div key={news.id} className="news-card">
                <img src={news.image} alt={news.title} className="news-image" />
                <div className="news-content">
                  <p className="news-date">{news.date}</p>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'movies') {
      return <MediaGrid title="All Movies" items={movies} onSelect={setSelectedMedia} />;
    }

    if (activeTab === 'tvshows') {
      return <MediaGrid title="All TV Shows" items={tvShows} onSelect={setSelectedMedia} />;
    }

    if (activeTab === 'cartoons') {
      return <MediaGrid title="Animated Classics" items={cartoons} onSelect={setSelectedMedia} />;
    }

    if (['about', 'contact', 'privacy', 'terms'].includes(activeTab)) {
      const renderInfoPage = () => {
        switch (activeTab) {
          case 'about':
            return (
              <div className="info-content">
                <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80" alt="About Cinema" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem' }} />
                <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Our Mission</h2>
                <p style={{ marginBottom: '1rem' }}>FreshPopcorn was founded in 2026 with a single goal: to provide the most authentic, untampered, and transparent movie ratings on the web. We believe that cinema is an art form that deserves honest critique from both seasoned professionals and everyday viewers. In an era where algorithmic manipulation and review-bombing dictate what we watch, we wanted to build a sanctuary for true cinephiles.</p>
                <p>Our team consists of passionate film critics, data scientists, and engineers dedicated to ensuring that every score you see is a reflection of genuine human opinion. We partner directly with verified theaters and streaming platforms to validate our audience metrics, ensuring that every vote counts.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                  <div className="glass" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: 'var(--accent-fresh)', marginBottom: '10px' }}>Critics Consensus</h3>
                    <p style={{ fontSize: '0.9rem' }}>We aggregate reviews from thousands of top-tier, verified publications globally to give you a definitive score. Our editorial team handpicks featured reviews to provide nuanced perspectives on every release.</p>
                  </div>
                  <div className="glass" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Audience Voice</h3>
                    <p style={{ fontSize: '0.9rem' }}>Verified ticket buyers and streaming subscribers cast their votes, ensuring the audience score is never manipulated by bots. Real people, real opinions, real scores.</p>
                  </div>
                </div>
              </div>
            );
          case 'contact':
            return (
              <div className="info-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                  <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Get in Touch</h2>
                  <p style={{ marginBottom: '2rem' }}>Whether you have a technical issue, a business inquiry, or just want to talk about movies, our team is here for you. We aim to respond to all inquiries within 24 hours.</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <strong>📍 Headquarters:</strong><br/>
                    123 Cinema Boulevard, Suite 400<br/>Los Angeles, CA 90028<br/>
                    <em>Open Monday-Friday, 9AM-5PM PST</em>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <strong>📧 Email:</strong><br/>
                    <a href="mailto:support@freshpopcorn.com" style={{ color: 'var(--accent-blue)' }}>support@freshpopcorn.com</a><br/>
                    <a href="mailto:press@freshpopcorn.com" style={{ color: 'var(--accent-blue)' }}>press@freshpopcorn.com</a>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <strong>📞 Phone:</strong><br/>
                    +1 (555) 019-2026
                  </div>
                </div>
                <div className="glass" style={{ padding: '2rem' }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <input type="text" className="form-input" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-input" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                      <select className="form-input" style={{ appearance: 'none' }}>
                        <option value="">Select Topic</option>
                        <option value="support">Technical Support</option>
                        <option value="press">Press & Media</option>
                        <option value="business">Business Inquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea className="form-input" rows="5" placeholder="How can we help?" style={{ resize: 'vertical' }}></textarea>
                    </div>
                    <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Message</button>
                  </form>
                </div>
              </div>
            );
          case 'privacy':
            return (
              <div className="info-content">
                <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', display: 'inline-block', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent-fresh)' }}>Last Updated: August 14, 2026</div>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>1. Information We Collect</h3>
                <p style={{ marginBottom: '1rem' }}>We only collect information necessary to provide you with the best possible experience. This includes your email address when you sign up, your IP address for localized content, and your voting history to personalize recommendations.</p>
                <p>We do not collect sensitive personal data such as financial information or government-issued IDs. Any payment processing for premium features is handled by certified third-party vendors.</p>
                
                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>2. How We Use Your Data</h3>
                <p style={{ marginBottom: '1rem' }}>Your data is used strictly to improve our algorithms, secure your account, and provide customized movie suggestions based on your tastes. <strong>We do not sell your personal data to third-party ad networks under any circumstances.</strong></p>
                <p>Aggregated, anonymized data may be used to publish reports on general viewership trends, but these reports will never contain personally identifiable information.</p>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>3. Data Security</h3>
                <p style={{ marginBottom: '1rem' }}>We employ industry-standard AES-256 encryption for all user data stored on our servers. Passwords are hashed and salted using bcrypt algorithms, meaning even we cannot see your password.</p>
                <p>Our infrastructure undergoes regular penetration testing by independent cybersecurity firms to ensure your data remains secure against emerging threats.</p>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>4. Your Rights</h3>
                <p>You have the right to request a complete export of your personal data at any time. You may also request permanent deletion of your account and all associated data by contacting our privacy team.</p>
              </div>
            );
          case 'terms':
            return (
              <div className="info-content">
                <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', display: 'inline-block', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent-rotten)' }}>Effective Date: August 14, 2026</div>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>1. Acceptance of Terms</h3>
                <p>By accessing or using FreshPopcorn, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who access or use the Service.</p>
                
                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>2. User Conduct and Content</h3>
                <p style={{ marginBottom: '1rem' }}>You are solely responsible for the content of your reviews and comments. By posting on FreshPopcorn, you grant us a non-exclusive, royalty-free license to use, reproduce, and display that content.</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Reviews must be constructive and strictly relevant to the media being discussed.</li>
                  <li style={{ marginBottom: '8px' }}>Hate speech, harassment, discriminatory language, and spam will result in immediate and permanent account termination.</li>
                  <li style={{ marginBottom: '8px' }}>Review-bombing (coordinating mass negative or positive reviews without watching the media) is strictly prohibited.</li>
                  <li style={{ marginBottom: '8px' }}>Automated scraping of our scores, reviews, or metadata is strictly prohibited without an official API license.</li>
                </ul>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>3. Intellectual Property</h3>
                <p style={{ marginBottom: '1rem' }}>The FreshPopcorn logo, brand, layout, and proprietary scoring algorithms are the exclusive property of FreshPopcorn Inc. and are protected by international copyright laws.</p>
                <p>Movie posters, backdrops, and promotional materials displayed on the site remain the property of their respective studios and are used here strictly under fair use principles for the purpose of review and commentary.</p>
                
                <h3 style={{ color: 'var(--text-main)', marginBottom: '10px', marginTop: '20px' }}>4. Limitation of Liability</h3>
                <p>FreshPopcorn shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use the service.</p>
              </div>
            );
          default:
            return null;
        }
      };

      const pageTitles = {
        'about': 'About FreshPopcorn',
        'contact': 'Contact Support',
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service'
      };

      return (
        <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>{pageTitles[activeTab]}</h1>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {renderInfoPage()}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn-outline" onClick={() => setActiveTab('home')}>
              ← Back to Homepage
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Hero Section */}
        <div 
          className="hero animate-fade-in" 
          style={{ backgroundImage: `url(${heroMovie.backdrop})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div className="score-badge">
                {getScoreIcon(heroMovie.criticsScore)}
                <span className="score-fresh">{heroMovie.criticsScore}%</span>
              </div>
              <div className="score-badge">
                <AudiencePopcorn />
                <span>{heroMovie.audienceScore}%</span>
              </div>
            </div>
            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-synopsis">{heroMovie.synopsis}</p>
            <button className="btn-primary" onClick={() => setSelectedMedia(heroMovie)}>View Details</button>
          </div>
        </div>

        {/* In Theaters */}
        <section className="section animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">In Theaters Now</h2>
          <div className="movie-grid">
            {inTheaters.map(movie => (
              <div key={movie.id} className="movie-card" onClick={() => setSelectedMedia(movie)}>
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                  <div className="movie-scores">
                    <div className="score-container">
                      {getScoreIcon(movie.criticsScore)}
                      <span>{movie.criticsScore}%</span>
                    </div>
                    <div className="score-container">
                      <AudiencePopcorn />
                      <span>{movie.audienceScore}%</span>
                    </div>
                  </div>
                  <h3 className="movie-title" style={{ marginTop: '10px' }}>{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="section animate-fade-in" style={{ animationDelay: '0.4s', background: 'rgba(255,255,255,0.02)' }}>
          <h2 className="section-title">Trending Now</h2>
          <div className="movie-grid">
            {trending.map(media => (
              <div key={media.id} className="movie-card" onClick={() => setSelectedMedia(media)}>
                <img src={media.poster} alt={media.title} className="movie-poster" />
                <div className="movie-info">
                  <div className="movie-scores">
                    <div className="score-container">
                      {getScoreIcon(media.criticsScore)}
                      <span className={media.criticsScore >= 80 ? 'score-fresh' : 'score-rotten'}>{media.criticsScore}%</span>
                    </div>
                    <div className="score-container">
                      <AudiencePopcorn />
                      <span>{media.audienceScore}%</span>
                    </div>
                  </div>
                  <h3 className="movie-title" style={{ marginTop: '10px' }}>{media.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="app">
      <Navbar 
        onNavigate={(tab) => { setSelectedMedia(null); setActiveTab(tab); }}
        onAuth={(mode) => setAuthMode(mode)}
      />
      
      {renderContent()}
      
      <Footer onNavigate={(tab) => { setSelectedMedia(null); setActiveTab(tab); }} />

      {authMode && (
        <AuthModal 
          mode={authMode} 
          setMode={setAuthMode} 
          onClose={() => setAuthMode(null)} 
        />
      )}
    </div>
  );
}

const Navbar = ({ onNavigate, onAuth }) => (
  <nav className="navbar">
    <div className="brand" onClick={() => onNavigate('home')}>
      <span className="brand-icon">🍿</span>
      FreshPopcorn
    </div>
    <div className="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search movies, TV, actors..." />
    </div>
    <div className="nav-links">
      <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('movies'); }}>Movies</a>
      <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('tvshows'); }}>TV Shows</a>
      <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('cartoons'); }}>Cartoons</a>
      <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('news'); }}>News</a>
    </div>
    <div className="nav-actions">
      <button className="btn-outline" onClick={() => onAuth('signin')}>Sign In</button>
      <button className="btn-primary" style={{ marginTop: 0, padding: '8px 20px' }} onClick={() => onAuth('signup')}>Sign Up</button>
    </div>
  </nav>
);

const Footer = ({ onNavigate }) => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}>Privacy Policy</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}>Terms of Service</a>
      </div>
      <div className="footer-socials">
        <button className="social-btn">FB</button>
        <button className="social-btn">TW</button>
        <button className="social-btn">IG</button>
      </div>
    </div>
    <p>© 2026 FreshPopcorn. All rights reserved.</p>
    <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>A premium movie rating clone concept.</p>
  </footer>
);

export default App;
