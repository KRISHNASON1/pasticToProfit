import { useEffect, useRef } from 'react';
import {
    Calendar, MapPin, ShieldCheck, Coins, Smartphone,
    Package, Box, Trash2, ScanLine, Wallet, Recycle,
    Gift, Banknote, PlusCircle, MinusCircle, Home, User,
    Phone, Search, Building2, Scissors, Check,
    GlassWater, CupSoda, Circle, WrapText, Cylinder, Droplet, Container, ShoppingBag
} from 'lucide-react';
import './Earn.css';

export default function Earn() {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-up-element');
        elements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="earn-page">

            {/* SECTION 1 — HERO */}
            <section className="earn-section earn-hero fade-up-element">
                <div className="earn-container">
                    <span className="hero-badge-pill">UPCYCLE AND EARN</span>
                    <h1>Your Plastic.<br />Real Rewards.</h1>
                    <p className="hero-desc">
                        That pile of bottles in your kitchen? It's worth more than you think.
                        Give us your single-use plastic and earn Up-Coins — redeemable for
                        marketplace discounts or real UPI cash.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-earn-primary">
                            <Calendar size={20} /> Schedule a Pickup
                        </button>
                        <button className="btn-earn-outline">
                            <MapPin size={20} /> Find Collection Point
                        </button>
                    </div>

                    <div className="hero-trust">
                        <span><ShieldCheck size={18} /> AI Verified Collection</span>
                        <span><Coins size={18} /> Instant Up-Coins</span>
                        <span><Smartphone size={18} /> UPI Withdrawal</span>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — WHAT WE ACCEPT */}
            <section className="earn-section earn-accepted">
                <div className="earn-container fade-up-element">
                    <h2>What Can You Give?</h2>
                    <p className="section-sub">
                        If it's plastic and single-use, we almost certainly want it.
                        Here are the most common items we collect from households.
                    </p>

                    <div className="plastic-grid">
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <GlassWater className="plastic-icon" size={32} />
                            <span className="plastic-name">Water Bottles</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <Package className="plastic-icon" size={32} />
                            <span className="plastic-name">Shampoo Bottles</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <Droplet className="plastic-icon" size={32} />
                            <span className="plastic-name">Milk Jugs</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.4s' }}>
                            <Circle className="plastic-icon" size={32} />
                            <span className="plastic-name">Bottle Caps</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.5s' }}>
                            <ShoppingBag className="plastic-icon" size={32} />
                            <span className="plastic-name">Plastic Bags</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.6s' }}>
                            <Box className="plastic-icon" size={32} />
                            <span className="plastic-name">Food Containers</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.7s' }}>
                            <CupSoda className="plastic-icon" size={32} />
                            <span className="plastic-name">Disposable Cups</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.8s' }}>
                            <WrapText className="plastic-icon" size={32} />
                            <span className="plastic-name">Plastic Wrappers</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                        <div className="plastic-card fade-up-element" style={{ transitionDelay: '0.9s' }}>
                            <Cylinder className="plastic-icon" size={32} />
                            <span className="plastic-name">Detergent Bottles</span>
                            <span className="accepted-badge">Accepted</span>
                        </div>
                    </div>

                    <p className="accepted-note fade-up-element">
                        Not sure if we accept something? Just bring it — our AI scanner
                        identifies and sorts everything on the spot.
                    </p>
                </div>
            </section>

            {/* SECTION 3 — HOW IT WORKS */}
            <section className="earn-section earn-steps">
                <div className="earn-container fade-up-element">
                    <h2>Four Steps to Real Rewards</h2>
                    <div className="steps-path">
                        <div className="step-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <span className="step-bg-num">1</span>
                            <div className="step-icon-circle"><Trash2 size={32} /></div>
                            <h3 className="step-title">Give Your Plastic</h3>
                            <p className="step-desc">Schedule a home pickup or drop your plastic at a partner collection point near you.</p>
                        </div>
                        <div className="step-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <span className="step-bg-num">2</span>
                            <div className="step-icon-circle"><ScanLine size={32} /></div>
                            <h3 className="step-title">We Scan and Verify</h3>
                            <p className="step-desc">Our AI identifies the plastic type and weight instantly. No manual sorting needed from you.</p>
                        </div>
                        <div className="step-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <span className="step-bg-num">3</span>
                            <div className="step-icon-circle"><Coins size={32} /></div>
                            <h3 className="step-title">Earn Up-Coins</h3>
                            <p className="step-desc">Coins land in your Upcycle wallet the moment your plastic is verified. No waiting.</p>
                        </div>
                        <div className="step-card fade-up-element" style={{ transitionDelay: '0.4s' }}>
                            <span className="step-bg-num">4</span>
                            <div className="step-icon-circle"><Wallet size={32} /></div>
                            <h3 className="step-title">Redeem Your Way</h3>
                            <p className="step-desc">Use coins for marketplace discounts on upcycled products, or withdraw directly to your UPI.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — HOW UP-COINS WORK */}
            <section className="earn-section earn-coins">
                <div className="earn-container">

                    {/* Part A: The Flow */}
                    <div className="fade-up-element">
                        <h2>How Up-Coins Work</h2>
                        <div className="flow-container">
                            <div className="flow-card flow-dark">
                                <Recycle className="flow-icon" size={40} />
                                <h3 className="flow-title">Give Plastic</h3>
                                <p className="flow-desc">Any single-use plastic accepted at pickup or collection point.</p>
                            </div>
                            <svg className="flow-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            <div className="flow-card flow-orange">
                                <Coins className="flow-icon" size={40} />
                                <h3 className="flow-title">Earn Up-Coins</h3>
                                <p className="flow-desc">Coins credited instantly to your wallet after AI verification.</p>
                            </div>
                            <svg className="flow-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            <div className="flow-card flow-green">
                                <Gift className="flow-icon" size={40} />
                                <h3 className="flow-title">Redeem</h3>
                                <p className="flow-desc">Spend on marketplace products at 30 to 50 percent off, or withdraw to UPI as real cash.</p>
                            </div>
                        </div>
                    </div>

                    {/* Part B: Wallet Mockup */}
                </div>

                <div className="wallet-mockup-section">
                    <div className="earn-container fade-up-element">
                        <h2>Your Up-Coins Wallet</h2>
                        <p className="section-sub">Everything in one place. Earn, track, and redeem.</p>

                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <div className="wallet-header">Up-Coins Wallet</div>

                                <div className="wallet-balance">
                                    <div className="balance-amount">
                                        <Coins size={32} /> 1,240 UP-COINS
                                    </div>
                                    <div className="wallet-btns">
                                        <button className="w-btn-green">
                                            <ShoppingBag size={18} /> Redeem on Marketplace
                                        </button>
                                        <button className="w-btn-outline">
                                            <Banknote size={18} /> Withdraw to UPI
                                        </button>
                                    </div>
                                </div>

                                <div className="wallet-history">
                                    <div className="history-item">
                                        <PlusCircle className="h-icon" color="#22c55e" size={20} />
                                        <div className="h-details">
                                            <div className="h-amt">+200 coins</div>
                                            <div className="h-desc">Pickup verified</div>
                                            <div className="h-date">Today</div>
                                        </div>
                                    </div>
                                    <div className="history-item">
                                        <PlusCircle className="h-icon" color="#22c55e" size={20} />
                                        <div className="h-details">
                                            <div className="h-amt">+150 coins</div>
                                            <div className="h-desc">Collection point drop</div>
                                            <div className="h-date">Yesterday</div>
                                        </div>
                                    </div>
                                    <div className="history-item">
                                        <MinusCircle className="h-icon" color="#f97316" size={20} />
                                        <div className="h-details">
                                            <div className="h-amt">-300 coins</div>
                                            <div className="h-desc">Marketplace discount used</div>
                                            <div className="h-date">3 days ago</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="wallet-footer">Min. withdrawal applies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — TWO WAYS TO GIVE */}
            <section className="earn-section earn-giving">
                <div className="earn-container fade-up-element">
                    <h2>Choose How You Give</h2>

                    <div className="giving-split">
                        {/* LEFT CARD */}
                        <div className="give-card give-pickup fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <Home className="g-icon" color="#f97316" size={48} />
                            <h3>Home Pickup</h3>
                            <p>
                                We come to you. Schedule a free pickup at your home and we'll collect
                                your plastic directly from your doorstep.
                            </p>

                            <div className="give-form">
                                <div className="give-input">
                                    <User size={18} />
                                    <input type="text" placeholder="Full Name" />
                                </div>
                                <div className="give-input">
                                    <Phone size={18} />
                                    <input type="tel" placeholder="Phone Number" />
                                </div>
                                <div className="give-input">
                                    <MapPin size={18} />
                                    <input type="text" placeholder="Address" />
                                </div>
                                <div className="give-input">
                                    <Calendar size={18} />
                                    <input type="text" placeholder="Preferred Date" />
                                </div>
                                <div className="give-input">
                                    <Package size={18} />
                                    <select defaultValue="">
                                        <option value="" disabled>Estimated Quantity</option>
                                        <option value="small">Less than 1kg</option>
                                        <option value="medium">1 to 5kg</option>
                                        <option value="large">More than 5kg</option>
                                    </select>
                                </div>

                                <button className="btn-earn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                                    Schedule My Pickup
                                </button>
                                <div className="form-note">We'll confirm via WhatsApp within 2 hours.</div>
                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="give-card give-point fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <MapPin className="g-icon" color="#22c55e" size={48} />
                            <h3>Collection Point</h3>
                            <p>
                                Drop your plastic at a partner collection point near you.
                                Open six days a week, no appointment needed.
                            </p>

                            <div className="loc-search">
                                <Search size={18} />
                                <input type="text" placeholder="Search your city..." />
                            </div>

                            <div className="loc-list">
                                <div className="loc-item">
                                    <Building2 className="l-icon" size={24} />
                                    <div className="l-info">
                                        <strong>GreenPoint Hub, Indore</strong>
                                        <div className="l-addr">Vijay Nagar, Indore MP</div>
                                        <div className="l-time">Mon–Sat, 9am–6pm</div>
                                    </div>
                                    <span className="loc-badge loc-open">Open Now</span>
                                </div>
                                <div className="loc-item">
                                    <Building2 className="l-icon" size={24} />
                                    <div className="l-info">
                                        <strong>EcoStore Partner, Bhopal</strong>
                                        <div className="l-addr">MP Nagar Zone 2, Bhopal MP</div>
                                        <div className="l-time">Mon–Sat, 10am–7pm</div>
                                    </div>
                                    <span className="loc-badge loc-open">Open Now</span>
                                </div>
                                <div className="loc-item">
                                    <Building2 className="l-icon" size={24} />
                                    <div className="l-info">
                                        <strong>Campus Collection, IIT Indore</strong>
                                        <div className="l-addr">Simrol Campus, Indore MP</div>
                                        <div className="l-time">Mon–Fri, 8am–5pm</div>
                                    </div>
                                    <span className="loc-badge loc-open">Open Now</span>
                                </div>
                                <div className="loc-item">
                                    <Building2 className="l-icon" size={24} />
                                    <div className="l-info">
                                        <strong>Recycle Hub, Pune</strong>
                                        <div className="l-addr">Koregaon Park, Pune MH</div>
                                        <div className="l-time">Mon–Sun, 9am–8pm</div>
                                    </div>
                                    <span className="loc-badge loc-open">Open Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6 — WHAT HAPPENS AFTER */}
            <section className="earn-section earn-after">
                <div className="earn-container fade-up-element">
                    <h2>What Happens to Your Plastic?</h2>
                    <p className="section-sub">
                        We believe in full transparency. Here is exactly what happens after you hand it over.
                    </p>

                    <div className="after-flow">
                        <div className="after-step fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <div className="a-icon-wrap"><ScanLine size={40} /></div>
                            <h3>AI Scans It</h3>
                            <p>Our computer vision identifies plastic type, weight, and purity score in seconds.</p>
                        </div>
                        <div className="after-step fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <div className="a-icon-wrap"><Scissors size={40} /></div>
                            <h3>Artisans Create</h3>
                            <p>Your sorted plastic goes directly to a verified DIY creator who transforms it into a premium product.</p>
                        </div>
                        <div className="after-step fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <div className="a-icon-wrap"><ShoppingBag size={40} /></div>
                            <h3>Product Gets Sold</h3>
                            <p>When the product sells on our marketplace, the full value chain closes — and your contribution is permanently recorded in its NFC Digital Passport.</p>
                        </div>
                    </div>

                    <div className="after-quote fade-up-element" style={{ transitionDelay: '0.4s' }}>
                        "Your bottle cap becomes someone's heirloom. And you get rewarded for it."
                    </div>
                </div>
            </section>

            {/* SECTION 7 — TESTIMONIALS */}
            <section className="earn-section earn-test">
                <div className="earn-container fade-up-element">
                    <h2>What Households Are Saying</h2>

                    <div className="test-grid">
                        <div className="test-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <span className="t-quote-mark">“</span>
                            <p className="t-body">
                                I had a bag full of bottles that had been sitting for months.
                                Scheduled a pickup and the coins were in my wallet the same evening.
                                Used them to get a beautiful planter at half the price.
                            </p>
                            <div className="t-author">Sunita Verma</div>
                            <div className="t-role">Homemaker</div>
                            <div className="t-city">Indore, MP</div>
                        </div>
                        <div className="test-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <span className="t-quote-mark">“</span>
                            <p className="t-body">
                                My college hostel generates so much plastic waste. We organized a group
                                drop and everyone earned coins together. It actually felt fun.
                            </p>
                            <div className="t-author">Rahul Tiwari</div>
                            <div className="t-role">College Student</div>
                            <div className="t-city">Bhopal, MP</div>
                        </div>
                        <div className="test-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <span className="t-quote-mark">“</span>
                            <p className="t-body">
                                The UPI withdrawal was the thing that convinced me this was real.
                                It's not just discount points — it's actual money.
                            </p>
                            <div className="t-author">Meena Joshi</div>
                            <div className="t-role">Working Professional</div>
                            <div className="t-city">Pune, MH</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8 — FINAL CTA */}
            <section className="earn-section earn-cta fade-up-element">
                <div className="earn-container">
                    <h2>That Pile of Bottles Is Worth More Than You Think.</h2>
                    <p className="cta-body">
                        Join thousands of households already earning real rewards from plastic
                        they were going to throw away anyway.
                    </p>

                    <div className="cta-actions">
                        <button className="btn-earn-primary">
                            <Calendar size={20} /> Schedule a Pickup
                        </button>
                        <button className="btn-earn-outline">
                            <MapPin size={20} /> Find Collection Point
                        </button>
                    </div>

                    <div className="cta-trust">
                        <span><Check size={16} color="#22c55e" /> Free service</span>
                        <span><Check size={16} color="#22c55e" /> Instant coin credit</span>
                        <span><Check size={16} color="#22c55e" /> Real UPI cashback</span>
                    </div>
                </div>
            </section>

        </div>
    );
}
