import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import './index.css';
import { movies, tvShows, cartoons, newsArticles, reviews as initialReviews } from './data';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';
import { translations } from './i18n';

// Language Context
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  
  const t = (key) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

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
    <polygon points="12 2 15 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const AuthModal = ({ mode, setMode, onClose }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{mode === 'signin' ? t('signIn') : t('signUp')}</h2>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
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

          <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            {mode === 'signin' ? t('signIn') : t('signUp')}
          </button>
        </form>
      </div>
    </div>
  );
};

const MediaGrid = ({ title, items }) => {
  const navigate = useNavigate();
  return (
    <section className="section animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh' }}>
      <h1 className="section-title">{title}</h1>
      <div className="movie-grid">
        {items.map(item => (
          <div key={item.id} className="movie-card" onClick={() => navigate(`/media/${item.id}`)}>
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
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainApp = () => {
  const [authMode, setAuthMode] = useState(null);
  const [localReviews, setLocalReviews] = useState(initialReviews);
  const { t } = useContext(LanguageContext);

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar onAuth={(mode) => setAuthMode(mode)} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MediaGrid title={t('movies')} items={movies} />} />
        <Route path="/tvshows" element={<MediaGrid title={t('tvShows')} items={tvShows} />} />
        <Route path="/cartoons" element={<MediaGrid title={t('cartoons')} items={cartoons} />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/media/:id" element={<MediaDetails localReviews={localReviews} setLocalReviews={setLocalReviews} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<UserPanel />} />
        
        {/* Info Pages */}
        <Route path="/about" element={<InfoPage type="about" />} />
        <Route path="/contact" element={<InfoPage type="contact" />} />
        <Route path="/privacy" element={<InfoPage type="privacy" />} />
        <Route path="/terms" element={<InfoPage type="terms" />} />
      </Routes>
      
      <Footer />

      {authMode && (
        <AuthModal 
          mode={authMode} 
          setMode={setAuthMode} 
          onClose={() => setAuthMode(null)} 
        />
      )}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const heroMovie = movies[0];
  const inTheaters = [...movies, ...cartoons].filter(m => m.isInTheaters).slice(0, 5);
  const trending = [...movies, ...tvShows, ...cartoons].filter(m => m.isTrending).slice(0, 5);

  const getScoreIcon = (score) => score >= 80 ? <FreshPopcorn /> : <RottenTomato />;

  return (
    <>
      <div className="hero animate-fade-in" style={{ backgroundImage: `url(${heroMovie.backdrop})` }}>
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
          <button className="btn-primary" onClick={() => navigate(`/media/${heroMovie.id}`)}>{t('viewDetails')}</button>
        </div>
      </div>

      <section className="section animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title">{t('inTheatersNow')}</h2>
        <div className="movie-grid">
          {inTheaters.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/media/${movie.id}`)}>
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <div className="movie-scores">
                  <div className="score-container">
                    {getScoreIcon(movie.criticsScore)}
                    <span className={movie.criticsScore >= 80 ? 'score-fresh' : 'score-rotten'}>{movie.criticsScore}%</span>
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

      <section className="section animate-fade-in" style={{ animationDelay: '0.4s', background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="section-title">{t('trendingNow')}</h2>
        <div className="movie-grid">
          {trending.map(media => (
            <div key={media.id} className="movie-card" onClick={() => navigate(`/media/${media.id}`)}>
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

const NewsPage = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  return (
    <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh' }}>
      <h1 className="section-title">{t('latestNews')}</h1>
      <div className="news-grid">
        {newsArticles.map(news => (
          <div key={news.id} className="news-card" onClick={() => navigate(`/news/${news.id}`)} style={{ cursor: 'pointer' }}>
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
};

const NewsArticle = () => {
  const { id } = useParams();
  const article = newsArticles.find(n => n.id === id);

  if (!article) return <div style={{ padding: '8rem 4rem', textAlign: 'center' }}>Article not found</div>;

  return (
    <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
      <p style={{ color: 'var(--accent-fresh)', fontWeight: 'bold', marginBottom: '1rem' }}>{article.date}</p>
      <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem' }}>{article.title}</h1>
      <img src={article.image} alt={article.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem' }} />
      <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <p>{article.content}</p>
      </div>
    </div>
  );
};

const MediaDetails = ({ localReviews, setLocalReviews }) => {
  const { id } = useParams();
  const { t } = useContext(LanguageContext);
  const allMedia = [...movies, ...tvShows, ...cartoons];
  const selectedMedia = allMedia.find(m => m.id === id);
  const [reviewForm, setReviewForm] = useState({ text: '', score: 50 });

  if (!selectedMedia) return <div style={{ padding: '8rem 4rem', textAlign: 'center' }}>Media not found</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.text.trim()) return;
    
    const newReview = {
      id: Date.now(),
      mediaId: selectedMedia.id,
      author: "Danila Vier (You)",
      text: reviewForm.text,
      score: parseInt(reviewForm.score)
    };
    
    setLocalReviews([newReview, ...localReviews]);
    setReviewForm({ text: '', score: 50 });
  };

  const getScoreIcon = (score) => score >= 80 ? <FreshPopcorn /> : <RottenTomato />;

  return (
    <div className="details-container animate-fade-in">
      <div className="hero" style={{ backgroundImage: `url(${selectedMedia.backdrop})`, height: '50vh' }}>
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
              <span className="score-label">{t('criticsConsensus')}</span>
              <div className="score-value">
                {getScoreIcon(selectedMedia.criticsScore)}
                <span className={selectedMedia.criticsScore >= 80 ? 'score-fresh' : 'score-rotten'}>
                  {selectedMedia.criticsScore}%
                </span>
              </div>
            </div>
            <div className="score-item">
              <span className="score-label">{t('audienceScore')}</span>
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
            <span className="score-label">{t('director')}</span>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '5px' }}>{selectedMedia.director}</p>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <span className="score-label">{t('starring')}</span>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '5px' }}>{selectedMedia.cast.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="reviews-section" style={{ maxWidth: '1400px', margin: '4rem auto 0', padding: '3rem 4rem' }}>
        
        <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', borderLeft: '4px solid var(--accent-fresh)' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>{t('writeReview')}</h3>
          <form onSubmit={handleReviewSubmit}>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">{t('yourRating')}: <span style={{ color: reviewForm.score >= 80 ? 'var(--accent-fresh)' : 'var(--accent-rotten)', fontWeight: 'bold' }}>{reviewForm.score}%</span></label>
                <input 
                  type="range" min="0" max="100" 
                  value={reviewForm.score} 
                  onChange={(e) => setReviewForm({...reviewForm, score: e.target.value})}
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <textarea 
                className="form-input" rows="4" 
                placeholder="..." 
                value={reviewForm.text}
                onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                style={{ resize: 'vertical' }}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">{t('postReview')}</button>
          </form>
        </div>

        <h2 className="section-title">{t('verifiedReviews')}</h2>
        {localReviews.filter(r => r.mediaId === selectedMedia.id).length > 0 ? (
          <div className="reviews-grid">
            {localReviews.filter(r => r.mediaId === selectedMedia.id).map(review => (
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
          <p style={{ color: 'var(--text-muted)' }}>{t('noReviews')}</p>
        )}
      </div>
    </div>
  );
};

const InfoPage = ({ type }) => {
  const { t } = useContext(LanguageContext);
  const pageTitles = {
    'about': t('aboutUs'),
    'contact': t('contact'),
    'privacy': t('privacyPolicy'),
    'terms': t('termsOfService')
  };

  const renderInfoPage = () => {
    switch (type) {
      case 'about': return <div className="info-content">Our Mission: Provide authentic movie ratings.</div>;
      case 'contact': return <div className="info-content">Contact us at support@freshpopcorn.com</div>;
      case 'privacy': return <div className="info-content">We respect your privacy and secure your data.</div>;
      case 'terms': return <div className="info-content">By using the site, you agree to our rules.</div>;
      default: return null;
    }
  };

  return (
    <div className="details-container animate-fade-in" style={{ padding: '8rem 4rem 4rem', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>{pageTitles[type]}</h1>
      <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        {renderInfoPage()}
      </div>
    </div>
  );
};

const Navbar = ({ onAuth }) => {
  const { lang, setLang, t } = useContext(LanguageContext);
  
  return (
    <nav className="navbar">
      <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
        <span className="brand-icon">🍿</span>
        FreshPopcorn
      </Link>
      <div className="search-bar">
        <span>🔍</span>
        <input type="text" placeholder={t('searchPlaceholder')} />
      </div>
      <div className="nav-links">
        <Link to="/movies" className="nav-link">{t('movies')}</Link>
        <Link to="/tvshows" className="nav-link">{t('tvShows')}</Link>
        <Link to="/cartoons" className="nav-link">{t('cartoons')}</Link>
        <Link to="/news" className="nav-link">{t('news')}</Link>
      </div>
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <select 
          className="form-input" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '6px' }}
        >
          <option value="en">EN</option>
          <option value="uk">UK</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="es">ES</option>
          <option value="it">IT</option>
        </select>
        <Link to="/admin" className="btn-outline" style={{ textDecoration: 'none', padding: '6px 12px', fontSize: '0.8rem', borderColor: 'var(--accent-rotten)', color: 'var(--accent-rotten)' }}>{t('adminPanel')}</Link>
        <Link 
          to="/profile"
          style={{ textDecoration: 'none', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-fresh)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#000', cursor: 'pointer', border: '2px solid #fff' }}
          title={t('myProfile')}
        >
          DV
        </Link>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">{t('aboutUs')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <Link to="/privacy">{t('privacyPolicy')}</Link>
          <Link to="/terms">{t('termsOfService')}</Link>
        </div>
        <div className="footer-socials">
          <button className="social-btn">FB</button>
          <button className="social-btn">TW</button>
          <button className="social-btn">IG</button>
        </div>
      </div>
      <p>© 2026 FreshPopcorn. {t('allRightsReserved')}</p>
      <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>{t('tagline')}</p>
    </footer>
  );
};

export default App;
