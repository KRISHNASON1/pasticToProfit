import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShoppingCart, Palette, RefreshCw, Building2, Coins, BookOpen, Handshake, Users, Factory, Store, ScanSearch, TrendingUp, Gem, Link2, Package, Brain, Sparkles, CalendarCheck, Megaphone, Truck, Smartphone, BarChart3, School, Globe2, Laptop, Target, Check } from 'lucide-react';
import { UpcycleLogo } from '../../components/Logo/UpcycleLogo';
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
  const b2bRef = useReveal();
  const quoteRef = useReveal();
  const whoWeAreRef = useReveal();
  const archRef = useReveal();
  const whoAreYouRef = useReveal();
  const growRef = useReveal();
  const campusRef = useReveal();
  const aiRef = useReveal();
  const winRef = useReveal();

  // Card reveals
  const whoWeAreStatRef = useMultiReveal(3);
  const whoAreYouCardRef = useMultiReveal(4);
  const growCardRef = useMultiReveal(4);
  const aiCardRef = useMultiReveal(4);
  const winCardRef = useMultiReveal(3);

  // Top products for teaser
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/products')
      .then(res => res.json())
      .then(data => {
        const prods = data.products || [];
        const featured = prods.filter(p =>
          p.name.includes('Watch') || p.name.includes('Vase') || p.name.includes('Tray') || p.name.includes('Frame')
        ).slice(0, 4);
        setFeaturedProducts(featured);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="landing-page">
      {/* ─── HERO ─── */}
      <section className="lp-hero" id="hero">
        {/* Background Video Layer */}
        <video autoPlay muted loop playsInline className="lp-hero-bg-video">
          <source src="/src/assets/videos/hero-transform.mp4" type="video/mp4" />
        </video>
        <div className="lp-hero-overlay"></div>
        <div className="lp-hero-bottom-gradient"></div>

        <div className="lp-hero-inner">
          <div className="lp-hero-content">
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
              <Link to="/earn">
                <button className="lp-btn-secondary">
                  UpCycle & Earn
                </button>
              </Link>
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

      {/* ─── WHO WE ARE — PROBLEM + ARCHITECTURE ─── */}
      <section className="lp-section lp-whoweare" id="who-we-are">
        {/* Problem Statement Block */}
        <div className="lp-wwa-problem reveal" ref={whoWeAreRef}>
          <div className="lp-wwa-problem-inner">
            <div className="lp-section-tag">Who We Are</div>
            <blockquote className="lp-wwa-blockquote">
              <span className="lp-wwa-quote-mark">"</span>
              India generates <strong>26,000 tonnes</strong> of plastic waste every single day.
              We are not here to reduce that number.{' '}
              We are here to make it <em>profitable.</em>
              <span className="lp-wwa-quote-mark lp-wwa-quote-close">"</span>
            </blockquote>

            <div className="lp-wwa-stats-row">
              <div className="lp-wwa-stat-card reveal reveal-delay-1" ref={whoWeAreStatRef(0)}>
                <div className="lp-wwa-stat-number">3.4 Million</div>
                <div className="lp-wwa-stat-unit">Tonnes Annually</div>
                <div className="lp-wwa-stat-accent terracotta">with <span>Terracotta</span></div>
              </div>
              <div className="lp-wwa-stat-divider" />
              <div className="lp-wwa-stat-card reveal reveal-delay-2" ref={whoWeAreStatRef(1)}>
                <div className="lp-wwa-stat-number">&lt; 30%</div>
                <div className="lp-wwa-stat-unit">Effectively Recycled</div>
                <div className="lp-wwa-stat-accent ocean">with <span>Ocean Plastic Blue</span></div>
              </div>
              <div className="lp-wwa-stat-divider" />
              <div className="lp-wwa-stat-card reveal reveal-delay-3" ref={whoWeAreStatRef(2)}>
                <div className="lp-wwa-stat-number">70%</div>
                <div className="lp-wwa-stat-unit">Lost to Landfills &amp; Burning</div>
                <div className="lp-wwa-stat-accent terracotta">with <span>Terracotta</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Layer System Architecture */}
        <div className="lp-wwa-architecture reveal" ref={archRef}>
          <h2 className="lp-wwa-arch-title">The 3-Layer System Architecture</h2>

          <div className="lp-wwa-arch-diagram">
            {/* Layer 1 */}
            <div className="lp-wwa-layer-node">
              <div className="lp-wwa-layer-circle terracotta">
                <Users className="lp-wwa-layer-icon-svg" size={44} strokeWidth={1.5} />
              </div>
              <div className="lp-wwa-layer-label">
                <strong>Layer 1:</strong><br />
                Community Supply Chain<br />
                <span>(Smart Collection)</span>
              </div>
            </div>

            {/* Arrow 1→2 */}
            <div className="lp-wwa-arch-arrow arrow-down-right">
              <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 C 20 20, 40 5, 75 20" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#555" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Layer 2 */}
            <div className="lp-wwa-layer-node">
              <div className="lp-wwa-layer-circle terracotta">
                <Factory className="lp-wwa-layer-icon-svg" size={44} strokeWidth={1.5} />
              </div>
              <div className="lp-wwa-layer-label">
                <strong>Layer 2:</strong><br />
                Processing Pipelines<br />
                <span>(Transformation)</span>
              </div>
            </div>

            {/* Arrow 2→3 */}
            <div className="lp-wwa-arch-arrow arrow-up-right">
              <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 C 20 20, 40 35, 75 20" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
                <defs>
                  <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#555" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Layer 3 */}
            <div className="lp-wwa-layer-node">
              <div className="lp-wwa-layer-circle ocean">
                <Store className="lp-wwa-layer-icon-svg" size={44} strokeWidth={1.5} />
              </div>
              <div className="lp-wwa-layer-label">
                <strong>Layer 3:</strong><br />
                The Mega Marketplace<br />
                <span>(Commerce)</span>
              </div>
            </div>
          </div>

          <p className="lp-wwa-arch-tagline">
            We control the entire lifecycle — transforming{' '}
            <em className="lp-wwa-waste">'waste'</em> into{' '}
            <em className="lp-wwa-heirloom">'heirloom'</em> products.
          </p>
        </div>
      </section>

      {/* ─── WHO ARE YOU ─── */}
      <section className="lp-section lp-whoareyou" id="who-are-you">
        <div className="lp-way-inner reveal" ref={whoAreYouRef}>
          <h2 className="lp-way-heading">Who Are You?</h2>
          <p className="lp-way-subtext">
            Find your place in the circular economy. Choose your role below.
          </p>

          <div className="lp-way-cards">
            <Link
              to="/marketplace"
              className="lp-way-card reveal reveal-delay-1"
              ref={whoAreYouCardRef(0)}
            >
              <div className="lp-way-card-icon"><ShoppingCart size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-way-card-title">Buyer</h3>
              <p className="lp-way-card-desc">
                Browse heirloom-grade upcycled goods on our marketplace.
              </p>
              <span className="lp-way-card-arrow">→</span>
            </Link>

            <Link
              to="/dashboard"
              className="lp-way-card reveal reveal-delay-2"
              ref={whoAreYouCardRef(1)}
            >
              <div className="lp-way-card-icon"><Palette size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-way-card-title">DIY Artist</h3>
              <p className="lp-way-card-desc">
                Access DIY guides, claim materials &amp; list your creations.
              </p>
              <span className="lp-way-card-arrow">→</span>
            </Link>

            <Link
              to="/support"
              className="lp-way-card reveal reveal-delay-3"
              ref={whoAreYouCardRef(2)}
            >
              <div className="lp-way-card-icon"><RefreshCw size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-way-card-title">Recycler</h3>
              <p className="lp-way-card-desc">
                Join our smart-collection network. Contact us to get started.
              </p>
              <span className="lp-way-card-arrow">→</span>
            </Link>

            <Link
              to="/epr"
              className="lp-way-card reveal reveal-delay-4"
              ref={whoAreYouCardRef(3)}
            >
              <div className="lp-way-card-icon"><Building2 size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-way-card-title">Industrial Organisation</h3>
              <p className="lp-way-card-desc">
                Meet your EPR mandates with transparent, verified data.
              </p>
              <span className="lp-way-card-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GROW WITH US ─── */}
      <section className="lp-section lp-grow" id="grow-with-us">
        <div className="lp-grow-inner reveal" ref={growRef}>
          <div className="lp-section-tag">For Individuals & Households</div>
          <h2 className="lp-grow-heading">
            How You Can <em>Grow</em> With Us
          </h2>
          <p className="lp-grow-subtext">
            Whether you're a single-head household or a curious individual —
            here's what you get from us, and how you can contribute.
          </p>

          <div className="lp-grow-pillars">
            {/* Pillar 1 — Upcycle & Earn */}
            <div className="lp-grow-pillar reveal reveal-delay-1" ref={growCardRef(0)}>
              <div className="lp-grow-pillar-icon"><Coins size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-grow-pillar-title">Upcycle &amp; Earn</h3>
              <p className="lp-grow-pillar-desc">
                Turn your household plastic waste into real income. Drop plastic at
                any smart-bin, earn Up-Coins instantly, and receive 10% fractional
                royalties every time your contributed material becomes a product.
              </p>
              <div className="lp-grow-journey">
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">01</span>
                  <span>Drop plastic at a smart-bin</span>
                </div>
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">02</span>
                  <span>Earn Up-Coins credited to your wallet</span>
                </div>
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">03</span>
                  <span>Receive royalties when products sell</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 — Learn & Sustain */}
            <div className="lp-grow-pillar reveal reveal-delay-2" ref={growCardRef(1)}>
              <div className="lp-grow-pillar-icon"><BookOpen size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-grow-pillar-title">Learn &amp; Sustain</h3>
              <p className="lp-grow-pillar-desc">
                Access guided learning paths on plastic upcycling, sustainability
                practices, and waste management best-practices — all for free.
                Empower yourself with knowledge to make a lasting impact.
              </p>
              <div className="lp-grow-journey">
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">01</span>
                  <span>Explore upcycling video guides</span>
                </div>
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">02</span>
                  <span>Learn sorting &amp; material science</span>
                </div>
                <div className="lp-grow-journey-step">
                  <span className="lp-grow-journey-num">03</span>
                  <span>Earn sustainability badges</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 — What You Give Back */}
            <div className="lp-grow-pillar lp-grow-pillar-give reveal reveal-delay-3" ref={growCardRef(2)}>
              <div className="lp-grow-pillar-icon"><Handshake size={32} strokeWidth={1.5} /></div>
              <h3 className="lp-grow-pillar-title">What You Give Back</h3>
              <p className="lp-grow-pillar-desc">
                By sorting and dropping your plastic responsibly, you fuel the
                entire circular loop — from artisan workshops to corporate
                EPR mandates. Your waste becomes someone's livelihood.
              </p>
              <div className="lp-grow-give-stats">
                <div className="lp-grow-give-stat">
                  <span className="lp-grow-give-val">12.4T</span>
                  <span className="lp-grow-give-label">Plastic Fed to Artisans</span>
                </div>
                <div className="lp-grow-give-stat">
                  <span className="lp-grow-give-val">850+</span>
                  <span className="lp-grow-give-label">Households Contributing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAMPUS INITIATIVE ─── */}
      <section className="lp-section lp-campus" id="campus-initiative">
        <div className="lp-campus-inner reveal" ref={campusRef}>
          <div className="lp-section-tag">For Campus Leaders</div>
          <h2 className="lp-campus-heading">
            Start an <em>Initiative</em> on Your Campus
          </h2>
          <p className="lp-campus-subtext">
            Rally your college community around sustainability. Two powerful
            ways to kick-start the circular economy right where you study.
          </p>

          <div className="lp-campus-cards">
            {/* Card 1 — Organize a Sprint */}
            <div className="lp-campus-card">
              <div className="lp-campus-card-icon">
                <CalendarCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="lp-campus-card-title">Organize a Sprint</h3>
              <p className="lp-campus-card-desc">
                Host a weekend collection drive during your college fest, cultural
                gathering, or tech summit. We provide smart-bins, AI scanners, and
                logistics — you bring the crowd.
              </p>
              <div className="lp-campus-card-tags">
                <span>College Fests</span>
                <span>Cultural Events</span>
                <span>Tech Summits</span>
                <span>NSS / NCC Drives</span>
              </div>
            </div>

            {/* Card 2 — Awareness Campaigns */}
            <div className="lp-campus-card">
              <div className="lp-campus-card-icon">
                <Megaphone size={32} strokeWidth={1.5} />
              </div>
              <h3 className="lp-campus-card-title">Awareness Campaigns</h3>
              <p className="lp-campus-card-desc">
                Run creative engagement programs that educate and excite. From
                hands-on DIY competitions to live upcycle bidding events, turn
                awareness into action.
              </p>
              <div className="lp-campus-card-tags">
                <span>DIY Competitions</span>
                <span>Upcycle Bidding</span>
                <span>Workshops</span>
                <span>Pledge Walls</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI UPCYCLE ENGINE ─── */}
      <section className="lp-section lp-ai" id="ai-engine">
        <div className="lp-ai-inner reveal" ref={aiRef}>
          <div className="lp-ai-header">
            <div className="lp-section-tag">Technology</div>
            <h2 className="lp-ai-title">
              AI Elevating the<br />
              <em>Upcycle Engine</em>
            </h2>
            <p className="lp-ai-subtitle">
              Our proprietary AI runs through every layer of the ecosystem —
              from recognising plastic types at drop-off to dynamically matching
              supply with demand across the marketplace.
            </p>
          </div>

          <div className="lp-ai-capabilities">
            {[
              {
                icon: <ScanSearch size={28} strokeWidth={1.5} />,
                title: 'Smart Scan & Classification',
                desc: 'Computer-vision classifies plastic types (PET, HDPE, PVC…) in real-time at the smart-bin, ensuring accurate sorting and instant Up-Coin credits.'
              },
              {
                icon: <TrendingUp size={28} strokeWidth={1.5} />,
                title: 'Predictive Analytics',
                desc: 'Forecasts collection volumes, seasonal trends, and optimal campus sprint schedules so the supply chain never stalls.'
              },
              {
                icon: <Gem size={28} strokeWidth={1.5} />,
                title: 'Automated Royalty Engine',
                desc: 'Tracks every gram of material from donor to final product, then auto-distributes fractional royalties — fully transparent, zero friction.'
              },
              {
                icon: <Link2 size={28} strokeWidth={1.5} />,
                title: 'Supply-Demand Matching',
                desc: 'Connects artisan material needs with available sorted plastic inventory, minimising waste-in-transit and maximising utilisation rates.'
              }
            ].map((cap, i) => (
              <div
                key={i}
                className={`lp-ai-cap-card reveal reveal-delay-${i + 1}`}
                ref={aiCardRef(i)}
              >
                <div className="lp-ai-cap-icon">{cap.icon}</div>
                <h4 className="lp-ai-cap-title">{cap.title}</h4>
                <p className="lp-ai-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* AI Pipeline Diagram */}
          <div className="lp-ai-pipeline">
            <div className="lp-ai-pipe-node lp-ai-pipe-input">
              <div className="lp-ai-pipe-icon"><Package size={40} strokeWidth={1.5} /></div>
              <div className="lp-ai-pipe-label">Raw Input</div>
              <div className="lp-ai-pipe-sub">Unsorted plastic waste</div>
            </div>

            <div className="lp-ai-pipe-connector">
              <div className="lp-ai-pipe-line" />
              <div className="lp-ai-pipe-pulse" />
            </div>

            <div className="lp-ai-pipe-node lp-ai-pipe-engine">
              <div className="lp-ai-pipe-icon"><Brain size={40} strokeWidth={1.5} /></div>
              <div className="lp-ai-pipe-label">AI Engine</div>
              <div className="lp-ai-pipe-stages">
                <span>Scan</span>
                <span>Classify</span>
                <span>Route</span>
                <span>Price</span>
              </div>
            </div>

            <div className="lp-ai-pipe-connector">
              <div className="lp-ai-pipe-line" />
              <div className="lp-ai-pipe-pulse" />
            </div>

            <div className="lp-ai-pipe-node lp-ai-pipe-output">
              <div className="lp-ai-pipe-icon"><Sparkles size={40} strokeWidth={1.5} /></div>
              <div className="lp-ai-pipe-label">Smart Output</div>
              <div className="lp-ai-pipe-sub">Sorted, priced & matched</div>
            </div>
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



      {/* ─── B2B CORPORATE EPR ─── */}
      <section className="lp-section lp-b2b" id="corporate" ref={b2bRef}>
        <div className="lp-b2b-inner">
          <div className="lp-b2b-visual reveal" ref={b2bRef}>
            <div className="lp-b2b-stat-row">
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon"><BarChart3 size={28} strokeWidth={1.5} /></div>
                <div className="lp-b2b-stat-val">856</div>
                <div className="lp-b2b-stat-label">EPR Credits Earned</div>
              </div>
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon"><School size={28} strokeWidth={1.5} /></div>
                <div className="lp-b2b-stat-val">28</div>
                <div className="lp-b2b-stat-label">Campus Drives</div>
              </div>
            </div>
            <div className="lp-b2b-stat-row">
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon"><Recycle size={28} strokeWidth={1.5} /></div>
                <div className="lp-b2b-stat-val">12.4T</div>
                <div className="lp-b2b-stat-label">Plastic Processed</div>
              </div>
              <div className="lp-b2b-stat-card">
                <div className="lp-b2b-stat-icon"><Globe2 size={28} strokeWidth={1.5} /></div>
                <div className="lp-b2b-stat-val">24.8T</div>
                <div className="lp-b2b-stat-label">CO₂ Offset</div>
              </div>
            </div>
            <div className="lp-b2b-logos">
              <div className="lp-b2b-logo-pill"><Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} /> Coca-Cola India</div>
              <div className="lp-b2b-logo-pill"><Factory size={16} style={{ display: 'inline', marginRight: '6px' }} /> BuildGreen</div>
              <div className="lp-b2b-logo-pill"><Laptop size={16} style={{ display: 'inline', marginRight: '6px' }} /> HCL Tech</div>
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
                <span className="lp-b2b-check-icon"><Check size={20} strokeWidth={2} /></span>
                Real-time collection dashboards with NFC verification
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon"><Check size={20} strokeWidth={2} /></span>
                Automated EPR credit generation & compliance reports
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon"><Check size={20} strokeWidth={2} /></span>
                Brand visibility across all campus sprint events
              </div>
              <div className="lp-b2b-check">
                <span className="lp-b2b-check-icon"><Check size={20} strokeWidth={2} /></span>
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



      {/* ─── WHY WE WIN ─── */}
      <section className="lp-section lp-why-we-win" id="why-we-win">
        <div className="lp-www-inner reveal" ref={winRef}>
          <h2 className="lp-www-heading">Why We Win</h2>

          <div className="lp-www-cards">
            {/* Column 1 */}
            <div className="lp-www-card reveal reveal-delay-1" ref={winCardRef(0)}>
              <div className="lp-www-card-icon">
                <Truck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="lp-www-card-title">Solved Logistics: Campus Sprints</h3>
              <p className="lp-www-card-desc">
                Efficient, localized collection and sorting networks on campuses. Optimizing the first mile.
              </p>
            </div>

            {/* Column 2 */}
            <div className="lp-www-card reveal reveal-delay-2" ref={winCardRef(1)}>
              <div className="lp-www-card-icon">
                <Smartphone size={36} strokeWidth={1.5} />
              </div>
              <h3 className="lp-www-card-title">Built Premium UX: AI Vision + Up-Coins</h3>
              <p className="lp-www-card-desc">
                Seamless, rewarding user experience powered by advanced AI and gamification.
              </p>
            </div>

            {/* Column 3 */}
            <div className="lp-www-card reveal reveal-delay-3" ref={winCardRef(2)}>
              <div className="lp-www-card-icon">
                <Recycle size={36} strokeWidth={1.5} />
              </div>
              <h3 className="lp-www-card-title">Closed-Loop Economy: Real-World Impact</h3>
              <p className="lp-www-card-desc">
                Connecting every stakeholder from household donor to corporate EPR outcomer, ensuring waste becomes wealth, not landfill.
              </p>
            </div>
          </div>

          <div className="lp-www-manifesto">
            The Kabadiwala collects it. Recykal documents it. <strong>WE ELEVATE IT.</strong>
          </div>
        </div>
      </section>

      {/* ─── ABOUT US ─── */}
      <section className="lp-section lp-about" id="about-us">
        <div className="lp-about-inner">
          <div className="lp-section-tag">About Us</div>
          <h2 className="lp-section-title">
            We're Building India's <br />Circular Economy Engine
          </h2>
          <p className="lp-section-subtitle" style={{ maxWidth: 680 }}>
            Upcycle was born from a simple idea: what if every piece of plastic
            waste could generate value for every person it touches — from the household
            that discards it to the artisan who transforms it?
          </p>

          <div className="lp-about-grid">
            <div className="lp-about-card">
              <div className="lp-about-card-icon"><Target size={32} strokeWidth={1.5} /></div>
              <h4>Our Mission</h4>
              <p>
                To make plastic recycling profitable for everyone in the chain —
                households, artisans, and corporations — through technology, transparency,
                and community.
              </p>
            </div>
            <div className="lp-about-card">
              <div className="lp-about-card-icon"><Link2 size={32} strokeWidth={1.5} /></div>
              <h4>Our Approach</h4>
              <p>
                A seamless ecosystem: AI-powered collection at campus sprints,
                artisan upcycling into premium products, and a verified marketplace
                with NFC-traced provenance.
              </p>
            </div>
            <div className="lp-about-card">
              <div className="lp-about-card-icon"><Globe2 size={32} strokeWidth={1.5} /></div>
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
                <UpcycleLogo size={32} theme="light" />
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
              © 2026 Upcycle. Built with purpose.
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
