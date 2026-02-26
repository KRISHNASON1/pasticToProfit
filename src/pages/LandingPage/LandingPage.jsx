import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import './LandingPage.css';

/* ─── Animated counter hook ─── */
function useCountUp(end, duration = 2000, startOnVisible = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnVisible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, startOnVisible]);

  return [count, ref];
}

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Multiple reveals ─── */
function useMultiReveal(count) {
  const refs = useRef([]);
  if (refs.current.length !== count) {
    refs.current = Array(count).fill(null).map((_, i) => refs.current[i] || null);
  }

  useEffect(() => {
    const observers = [];
    refs.current.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [count]);

  const setRef = useCallback((index) => (el) => {
    refs.current[index] = el;
  }, []);

  return setRef;
}

/* ─── Star renderer ─── */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '½';
  return s;
}

/* ─── Badge class map ─── */
function getBadgeClass(badge) {
  if (!badge) return 'eco';
  const lower = badge.toLowerCase();
  if (lower.includes('nfc')) return 'nfc';
  if (lower.includes('campus')) return 'campus';
  if (lower.includes('artisan')) return 'artisan';
  return 'eco';
}

/* ============================================
   LANDING PAGE COMPONENT
   ============================================ */
export default function LandingPage() {
  // Counters
  const [plasticCount, plasticRef] = useCountUp(1240, 2200);
  const [royaltyCount, royaltyRef] = useCountUp(45000, 2400);
  const [sprintCount, sprintRef] = useCountUp(12, 1600);

  // Section reveals
  const ecosystemRef = useReveal();
  const marketplaceRef = useReveal();
  const diyRef = useReveal();
  const b2bRef = useReveal();
  const quoteRef = useReveal();
  const ctaRef = useReveal();

  // Card reveals
  const ecoCardRef = useMultiReveal(3);
  const productCardRef = useMultiReveal(4);

  // Top products for teaser
  const featuredProducts = products.filter(p =>
    ['luxury', 'handmade', 'diy', 'fashion'].includes(p.category)
  ).slice(0, 4);

  return (
    <div className="landing-page">
      {/* ─── HERO ─── */}
      <section className="lp-hero" id="hero">
        <div className="lp-hero-float-1" />
        <div className="lp-hero-float-2" />
        <div className="lp-hero-float-3" />

        <div className="lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-tag">
              <span className="lp-hero-tag-dot" />
              The Circular Economy Platform
            </div>
            <h1>
              From Single-Use<br />
              to <span>Heirloom.</span>
            </h1>
            <p className="lp-hero-sub">
              The complete circular economy platform connecting households, DIY artisans,
              and B2B corporations to exchange waste for tangible wealth.
            </p>
            <div className="lp-hero-ctas">
              <Link to="/marketplace">
                <button className="lp-btn-primary">
                  Explore the Marketplace
                  <span>→</span>
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="lp-btn-secondary">
                  🎟️ Start Recycling — Trash to Tickets
                </button>
              </Link>
            </div>
          </div>

          <div className="lp-hero-visual">
            <div className="lp-hero-3d-placeholder">
              <div className="lp-hero-3d-inner">
                <span className="lp-hero-3d-icon">🏺</span>
                <span className="lp-hero-3d-label">Interactive 3D Model</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT BANNER ─── */}
      <section className="lp-impact">
        <div className="lp-impact-inner">
          <div className="lp-impact-stat" ref={plasticRef}>
            <div className="lp-impact-number">{plasticCount.toLocaleString()} kg</div>
            <div className="lp-impact-label">Plastic Diverted</div>
          </div>
          <div className="lp-impact-stat" ref={royaltyRef}>
            <div className="lp-impact-number">₹{royaltyCount.toLocaleString()}</div>
            <div className="lp-impact-label">Fractional Royalties Paid</div>
          </div>
          <div className="lp-impact-stat" ref={sprintRef}>
            <div className="lp-impact-number">{sprintCount}</div>
            <div className="lp-impact-label">Campus Sprints Completed</div>
          </div>
        </div>
      </section>

      {/* ─── QUOTE / MANIFESTO ─── */}
      <section className="lp-quote" ref={quoteRef}>
        <div className="lp-quote-inner reveal" ref={quoteRef}>
          <div className="lp-quote-mark">"</div>
          <p className="lp-quote-text">
            We are not here to reduce that number. We are here to make it{' '}
            <em>profitable</em> — for <em>everyone</em> involved.
          </p>
          <span className="lp-quote-attr">
            Kabadiwala collects it. Recykal documents it. <strong>We elevate it.</strong>
          </span>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="lp-section lp-ecosystem" id="how-it-works" ref={ecosystemRef}>
        <div className="lp-section-header reveal" ref={ecosystemRef}>
          <div className="lp-section-tag">How It Works</div>
          <h2 className="lp-section-title">The 3-Layer Ecosystem</h2>
          <p className="lp-section-subtitle">
            A closed-loop system that turns waste into wealth at every stage —
            from collection to creation to commerce.
          </p>
        </div>

        <div className="lp-ecosystem-grid">
          {[
            {
              icon: '📍',
              label: 'Layer 01',
              title: 'Drop (Sell)',
              desc: 'Drop pre-sorted plastic at our campus smart-bins. Our AI scans and classifies it instantly, and you earn Up-Coins credited to your wallet.'
            },
            {
              icon: '🎨',
              label: 'Layer 02',
              title: 'Create (DIY Hub)',
              desc: 'Artisans claim raw recycled materials and learn upcycling techniques through our 3D interactive manufacturing guides and community.'
            },
            {
              icon: '🛍️',
              label: 'Layer 03',
              title: 'Shop (Marketplace)',
              desc: 'Buyers purchase luxury upcycled goods, triggering an automated 10% royalty payment back to the original plastic donor.'
            }
          ].map((step, i) => (
            <div
              key={i}
              className={`lp-ecosystem-card reveal reveal-delay-${i + 1}`}
              ref={ecoCardRef(i)}
            >
              <div className="lp-ecosystem-step">{step.icon}</div>
              <div className="lp-ecosystem-card-label">{step.label}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARKETPLACE TEASER ─── */}
      <section className="lp-section lp-marketplace" id="marketplace" ref={marketplaceRef}>
        <div className="lp-marketplace-header reveal" ref={marketplaceRef}>
          <div>
            <div className="lp-section-tag">The Marketplace</div>
            <h2 className="lp-section-title">Heirloom-Grade <br />Upcycled Goods</h2>
            <p className="lp-section-subtitle">
              From luxury decor to eco-bricks — every product carries an NFC digital passport
              tracing its journey from campus bin to your shelf.
            </p>
          </div>
          <div className="lp-marketplace-categories">
            <span className="lp-marketplace-cat active">All</span>
            <span className="lp-marketplace-cat">Luxury Decor</span>
            <span className="lp-marketplace-cat">rPET Tech</span>
            <span className="lp-marketplace-cat">Eco-Bricks</span>
          </div>
        </div>

        <div className="lp-products-scroll">
          {featuredProducts.map((product, i) => (
            <Link
              to="/marketplace"
              key={product.id}
              className={`lp-product-card reveal reveal-delay-${i + 1}`}
              ref={productCardRef(i)}
            >
              <div className="lp-product-img" style={{ background: product.gradient }}>
                {product.badge && (
                  <span className={`lp-product-badge ${getBadgeClass(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
                <span style={{ fontSize: 64 }}>{product.image}</span>
              </div>
              <div className="lp-product-info">
                <div className="lp-product-name">{product.name}</div>
                <div className="lp-product-rating">
                  <span className="lp-product-rating-stars">{renderStars(product.rating)}</span>
                  {product.rating} ({product.reviews})
                </div>
                <div className="lp-product-pricing">
                  <span className="lp-product-price">₹{product.price.toFixed(0)}</span>
                  {product.originalPrice && (
                    <span className="lp-product-original">₹{product.originalPrice.toFixed(0)}</span>
                  )}
                </div>
                {product.upCoins && (
                  <div className="lp-product-coins">
                    🪙 Save {product.upCoins} Up-Coins
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── DIY CREATOR HUB ─── */}
      <section className="lp-section lp-diy" id="creators" ref={diyRef}>
        <div className="lp-diy-inner">
          <div className="lp-diy-content reveal" ref={diyRef}>
            <div className="lp-section-tag">Creator Hub</div>
            <h2 className="lp-section-title">
              Build the Future.<br />We Supply the Bricks.
            </h2>
            <p className="lp-section-subtitle">
              Access our open-source 3D manufacturing guides, claim bulk plastic from
              local sprints, and list your creations on our verified storefront.
            </p>

            <div className="lp-diy-features">
              <div className="lp-diy-feature">
                <div className="lp-diy-feature-icon">📐</div>
                <div className="lp-diy-feature-text">
                  <h4>3D Manufacturing Guides</h4>
                  <p>Open-source blueprints for terrazzo trays, planters, and more</p>
                </div>
              </div>
              <div className="lp-diy-feature">
                <div className="lp-diy-feature-icon">🧱</div>
                <div className="lp-diy-feature-text">
                  <h4>Claim Raw Materials</h4>
                  <p>Access bulk sorted plastic from campus collection sprints</p>
                </div>
              </div>
              <div className="lp-diy-feature">
                <div className="lp-diy-feature-icon">🏪</div>
                <div className="lp-diy-feature-text">
                  <h4>Verified Storefront</h4>
                  <p>List and sell your upcycled creations with NFC provenance</p>
                </div>
              </div>
            </div>

            <Link to="/dashboard">
              <button className="lp-btn-primary">
                Join the Artisan Network
                <span>→</span>
              </button>
            </Link>
          </div>

          <div className="lp-diy-visual">
            <div className="lp-diy-grid">
              <div className="lp-diy-cell">
                <span className="lp-diy-cell-icon">🏺</span>
                <div className="lp-diy-cell-title">Terrazzo Collection</div>
                <div className="lp-diy-cell-desc">Low-heat micro-molding</div>
              </div>
              <div className="lp-diy-cell">
                <span className="lp-diy-cell-icon">🌿</span>
                <div className="lp-diy-cell-title">Self-Watering Planters</div>
                <div className="lp-diy-cell-desc">No-melt upcycling</div>
              </div>
              <div className="lp-diy-cell">
                <span className="lp-diy-cell-icon">👜</span>
                <div className="lp-diy-cell-title">Plarn Tote Bags</div>
                <div className="lp-diy-cell-desc">Flexible film solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── B2B CORPORATE EPR ─── */}
      <section className="lp-section lp-b2b" id="corporate" ref={b2bRef}>
        <div className="lp-b2b-inner">
          <div className="lp-b2b-visual reveal" ref={b2bRef}>
            <div className="lp-b2b-stat-row">
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon">📊</div>
                <div className="lp-b2b-stat-val">856</div>
                <div className="lp-b2b-stat-label">EPR Credits Earned</div>
              </div>
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon">🏫</div>
                <div className="lp-b2b-stat-val">28</div>
                <div className="lp-b2b-stat-label">Campus Drives</div>
              </div>
            </div>
            <div className="lp-b2b-stat-row">
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon">♻️</div>
                <div className="lp-b2b-stat-val">12.4T</div>
                <div className="lp-b2b-stat-label">Plastic Processed</div>
              </div>
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon">🌍</div>
                <div className="lp-b2b-stat-val">24.8T</div>
                <div className="lp-b2b-stat-label">CO₂ Offset</div>
              </div>
            </div>
            <div className="lp-b2b-logos">
              <div className="lp-b2b-logo-pill">🏢 Coca-Cola India</div>
              <div className="lp-b2b-logo-pill">🏗️ BuildGreen</div>
              <div className="lp-b2b-logo-pill">💻 HCL Tech</div>
            </div>
          </div>

          <div className="lp-b2b-content">
            <div className="lp-section-tag">Corporate Partners</div>
            <h2 className="lp-section-title">
              Fund the Loop.<br />Hit Your EPR Targets.
            </h2>
            <p className="lp-section-subtitle">
              Sponsor our weekend campus collection drives and receive verified,
              transparent data for your Extended Producer Responsibility mandates.
            </p>

            <div className="lp-b2b-checklist">
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon">✓</span>
                Real-time collection dashboards with NFC verification
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon">✓</span>
                Automated EPR credit generation & compliance reports
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon">✓</span>
                Brand visibility across all campus sprint events
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon">✓</span>
                Transparent waste traceability from bin to product
              </div>
            </div>

            <Link to="/support">
              <button className="lp-btn-primary">
                Partner With Us
                <span>→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <div className="lp-cta-banner" ref={ctaRef}>
        <div className="lp-cta-banner-inner reveal" ref={ctaRef}>
          <h2>Ready to Turn Trash into Treasure?</h2>
          <p>
            Join thousands of households, artisans, and corporations building the
            circular economy — one bottle at a time.
          </p>
          <div className="lp-cta-banner-actions">
            <Link to="/dashboard">
              <button className="lp-btn-primary">Get Started Free →</button>
            </Link>
            <a href="#about-us">
              <button className="lp-btn-secondary">Learn About Us</button>
            </a>
          </div>
        </div>
      </div>

      {/* ─── ABOUT US ─── */}
      <section className="lp-section lp-about" id="about-us">
        <div className="lp-about-inner">
          <div className="lp-section-tag">About Us</div>
          <h2 className="lp-section-title">
            We're Building India's <br />Circular Economy Engine
          </h2>
          <p className="lp-section-subtitle" style={{ maxWidth: 680 }}>
            PlasticToProfit was born from a simple idea: what if every piece of plastic
            waste could generate value for every person it touches — from the household
            that discards it to the artisan who transforms it?
          </p>

          <div className="lp-about-grid">
            <div className="lp-about-card">
              <div className="lp-about-card-icon">🎯</div>
              <h4>Our Mission</h4>
              <p>
                To make plastic recycling profitable for everyone in the chain —
                households, artisans, and corporations — through technology, transparency,
                and community.
              </p>
            </div>
            <div className="lp-about-card">
              <div className="lp-about-card-icon">🔗</div>
              <h4>Our Approach</h4>
              <p>
                A 3-layer ecosystem: AI-powered collection at campus sprints,
                artisan upcycling into premium products, and a verified marketplace
                with NFC-traced provenance.
              </p>
            </div>
            <div className="lp-about-card">
              <div className="lp-about-card-icon">🌍</div>
              <h4>Our Impact</h4>
              <p>
                12,400+ kg of plastic diverted, ₹45,000+ in artisan royalties paid,
                and 28 campus collection drives completed across Delhi-NCR — and growing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-footer-brand-name">
                ♻️ PlasticToProfit
              </div>
              <p className="lp-footer-brand-desc">
                The complete circular economy platform transforming household plastic
                waste into high-value heirloom products through AI-powered collection,
                artisan upcycling, and a premium marketplace.
              </p>
            </div>

            <div className="lp-footer-col">
              <h4>Platform</h4>
              <Link to="/marketplace">Marketplace</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/rewards">Rewards</Link>
              <Link to="/solutions">Solutions</Link>
            </div>

            <div className="lp-footer-col">
              <h4>Community</h4>
              <a href="#creators">Creator Hub</a>
              <a href="#corporate">Corporate EPR</a>
              <Link to="/support">Support</Link>
              <a href="#">Blog</a>
            </div>

            <div className="lp-footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">EPR Compliance</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">
              © 2026 PlasticToProfit. Built with purpose.
            </span>
            <div className="lp-footer-socials">
              <span className="lp-footer-social">𝕏</span>
              <span className="lp-footer-social">in</span>
              <span className="lp-footer-social">ig</span>
              <span className="lp-footer-social">yt</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
