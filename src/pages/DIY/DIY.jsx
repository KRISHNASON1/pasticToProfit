import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, Store, BookOpen, Coins, UserPlus, Scissors, Clock, Plus, Minus, Sprout, Hammer, Award, Crown, ScanLine, Truck, ShieldCheck, Check } from 'lucide-react';
import beforeImg from '../../assets/images/diy/diy-before-bottle.png';
import afterImg from '../../assets/images/diy/diy-after-planter.jpg';
import './DIY.css';
import MakerModal from '../../components/MakerModal/MakerModal';
import { useAuth } from '../../context/AuthContext';

export default function DIY() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isMakerModalOpen, setIsMakerModalOpen] = useState(false);
    // Intersection Observer for fade-in animations
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
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const FAQItem = ({ question, answer, index }) => {
        const isOpen = openFaqIndex === index;
        return (
            <div className={`faq-item fade-up-element ${isOpen ? 'open' : ''}`}>
                <div className="faq-summary" onClick={() => toggleFaq(index)}>
                    <span className="faq-question">{question}</span>
                    <span className="faq-icon">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                </div>
                {isOpen && (
                    <div className="faq-content">
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        );
    };

    const handleStartCreating = () => {
        if (!user) {
            navigate('/login');
        } else {
            setIsMakerModalOpen(true);
        }
    };

    const handlePublishProduct = async (payload) => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        try {
            const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Submission failed');
            alert('Your creation is now live on the marketplace!');
            setIsMakerModalOpen(false);
            navigate('/marketplace');
        } catch (err) {
            console.error(err);
            alert('Failed to publish product. Please try again.');
        }
    };

    return (
        <div className="diy-page">
            {isMakerModalOpen && (
                <MakerModal
                    onClose={() => setIsMakerModalOpen(false)}
                    onSubmit={handlePublishProduct}
                />
            )}

            {/* SECTION 1 — HERO */}
            <section className="diy-hero section-dark fade-up-element">
                <div className="diy-container hero-grid">
                    <div className="hero-content">
                        <span className="hero-badge">DIY CREATOR HUB</span>
                        <h1 className="hero-title">Turn Plastic Into<br />Your Craft.</h1>
                        <p className="hero-desc">
                            You don't need a factory. You don't need experience. All you need is an idea and some recovered plastic. We'll handle everything else — raw material, marketplace, and recognition.
                        </p>
                        <div className="hero-ctas">
                            <button className="btn-primary" onClick={handleStartCreating}>Start Creating</button>
                            <button className="btn-outline-white">Browse Tutorials</button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <Users size={20} />
                                <span>500+ Creators</span>
                            </div>
                            <div className="stat-item">
                                <Package size={20} />
                                <span>Free Raw Material</span>
                            </div>
                            <div className="stat-item">
                                <Store size={20} />
                                <span>Your Own Storefront</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-illustration">
                        <div className="before-after-card">
                            <div className="half before-half">
                                <img src={beforeImg} alt="Before upcycling" className="half-bg-image" />
                                <span className="half-label">BEFORE</span>
                            </div>
                            <div className="divider-line"></div>
                            <div className="half after-half">
                                <img src={afterImg} alt="After upcycling" className="half-bg-image" />
                                <span className="half-label">AFTER</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — WHY JOIN */}
            <section className="diy-why section-light fade-up-element">
                <div className="diy-container">
                    <h2 className="section-title text-center">Three Reasons to Start Today</h2>

                    <div className="why-grid">
                        <div className="why-col fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <BookOpen className="why-icon" size={32} />
                            <h3 className="why-title">Learn</h3>
                            <p className="why-desc">Free step-by-step guides for every skill level. From simple bottle planters to luxury micro-molded decor. No experience needed to begin.</p>
                        </div>
                        <div className="why-col fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <Package className="why-icon" size={32} />
                            <h3 className="why-title">Make</h3>
                            <p className="why-desc">Order pre-sorted, clean, verified recycled plastic directly from our supply chain. PET, HDPE, and mixed plastics — delivered to your door.</p>
                        </div>
                        <div className="why-col fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <Coins className="why-icon" size={32} />
                            <h3 className="why-title">Earn</h3>
                            <p className="why-desc">List your finished products on the Upcycle marketplace and keep the majority of every sale. Your craft, your income, your impact.</p>
                        </div>
                    </div>

                    <p className="nfc-note text-center fade-up-element" style={{ transitionDelay: '0.4s' }}>
                        Every product you sell comes with an auto-generated NFC Digital Passport — your signature, verified on the blockchain.
                    </p>
                </div>
            </section>

            {/* SECTION 3 — HOW IT WORKS */}
            <section className="diy-how section-dark fade-up-element">
                <div className="diy-container">
                    <h2 className="section-title">From Zero to Selling in Four Steps</h2>

                    <div className="steps-flow">
                        <div className="flow-line"></div>

                        <div className="step-item fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <span className="step-bg-num">1</span>
                            <UserPlus className="step-icon" size={28} />
                            <h3 className="step-title">Join Free</h3>
                            <p className="step-desc">Sign up as a Creator in under two minutes. No fees, no approval needed to join.</p>
                        </div>

                        <div className="step-item fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <span className="step-bg-num">2</span>
                            <BookOpen className="step-icon" size={28} />
                            <h3 className="step-title">Pick a Project</h3>
                            <p className="step-desc">Browse our Learning Hub and choose a tutorial that matches your skill level and available tools.</p>
                        </div>

                        <div className="step-item fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <span className="step-bg-num">3</span>
                            <Scissors className="step-icon" size={28} />
                            <h3 className="step-title">Make It</h3>
                            <p className="step-desc">Order raw material from us or use plastic you've already collected. Follow the guide and create your product.</p>
                        </div>

                        <div className="step-item fade-up-element" style={{ transitionDelay: '0.4s' }}>
                            <span className="step-bg-num">4</span>
                            <Store className="step-icon" size={28} />
                            <h3 className="step-title">List & Earn</h3>
                            <p className="step-desc">Upload photos, set your price, and publish to the marketplace. Your first product is reviewed within 48 hours before going live.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — LEARNING HUB */}
            <section className="diy-learning section-light-alt fade-up-element">
                <div className="diy-container">
                    <div className="learning-header">
                        <h2 className="section-title">The Learning Hub</h2>
                        <p className="section-subtitle">Illustrated guides for every level. Pick a project and start today.</p>
                    </div>

                    <div className="tiers-list">
                        {/* TIER 1 */}
                        <div className="tier-group">
                            <div className="tier-info fade-up-element">
                                <span className="tier-badge badge-green">Beginner</span>
                                <p className="tier-desc">Perfect for beginners. Simple projects that require zero special equipment or workshop tools.</p>
                            </div>
                            <div className="tier-cards">
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Recycled PET</span>
                                        <h4 className="project-title">Auto-Bloom Self-Watering Planter</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Transform old bottles into an automated self-watering planter system for your indoor herbs.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 45 min</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Mixed Plastic Film</span>
                                        <h4 className="project-title">Woven Plastic Tote Bag</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Turn single-use grocery bags into durable "plarn" and weave a heavy-duty artisan tote.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 2 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Mixed Caps</span>
                                        <h4 className="project-title">Bottle Cap Mosaic Art Frame</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Sort bottle caps by color to create pixel-perfect pop art frames that brighten any room.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 1.5 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TIER 2 */}
                        <div className="tier-group">
                            <div className="tier-info fade-up-element">
                                <span className="tier-badge badge-orange">Intermediate</span>
                                <p className="tier-desc">Step up your crafting game. These projects use basic tools and safe, low-formational heat.</p>
                            </div>
                            <div className="tier-cards">
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616422285623-14631ab5bf35?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">HDPE Type 2</span>
                                        <h4 className="project-title">Terrazzo Micro-Molded Coaster</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Use our safe low-heat technique to melt down bottle caps into stunning faux-stone terrazzo coasters.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 3 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">HDPE Sheet</span>
                                        <h4 className="project-title">Pressed Plastic Geometric Wall Art</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Press recycled plastic into flat sheets to cut out and assemble striking modern gallery wall pieces.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 4 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Mixed HDPE</span>
                                        <h4 className="project-title">Marbled Plastic Decorative Bowl</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Swirl melted colors together in a mold to craft food-safe decorative entryway bowls.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 3.5 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TIER 3 */}
                        <div className="tier-group">
                            <div className="tier-info fade-up-element">
                                <span className="tier-badge badge-navy">Advanced</span>
                                <p className="tier-desc">For serious makers. These builds involve power tools to create true heirloom goods.</p>
                            </div>
                            <div className="tier-cards">
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Mixed Plastic</span>
                                        <h4 className="project-title">Upcycled Marbled Table Lamp</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Machine down hardened plastic blocks into a heavy, stunning geometric desk lamp base.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 6 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Mixed Waste</span>
                                        <h4 className="project-title">Eco-Brick Modular Stool</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Compress unsorted non-recyclables into structural bricks to assemble sturdy patio furniture.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 8 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                                <div className="project-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                                    <div className="card-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564982752979-3f7bc974d287?auto=format&fit=crop&q=80&w=600)' }}></div>
                                    <div className="card-content">
                                        <span className="plastic-pill">Premium HDPE</span>
                                        <h4 className="project-title">Luxury Terrazzo Serving Board Set</h4>
                                        <p className="project-desc" style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>Mill down fused blocks of high-end plastic to craft stunning faux-marble charcuterie boards.</p>
                                        <div className="project-meta">
                                            <span className="meta-time"><Clock size={14} /> 5 hours</span>
                                        </div>
                                        <Link to="/diy/tutorials" className="btn-start-project text-center" style={{ display: 'inline-block' }}>Start Project</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — CREATOR SPOTLIGHT */}
            <section className="diy-spotlight section-dark fade-up-element">
                <div className="diy-container">
                    <div className="spotlight-header text-center">
                        <h2 className="section-title">Creators Who Are Already Earning</h2>
                        <p className="section-subtitle">Real people. Real products. Real income.</p>
                    </div>

                    <div className="creator-grid">
                        <div className="creator-card fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <div className="creator-avatar">AM</div>
                            <h4 className="creator-name">Arjun Mehra</h4>
                            <span className="creator-city">Bhopal, MP</span>
                            <p className="creator-product">Marbled HDPE Coasters</p>
                            <div className="creator-stat">₹14,200 earned last month</div>
                            <div className="creator-works">
                                <div className="work-img thumb-1"></div>
                                <div className="work-img thumb-2"></div>
                                <div className="work-img thumb-3"></div>
                            </div>
                            <a href="#profile" className="creator-link">View Profile</a>
                        </div>

                        <div className="creator-card fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <div className="creator-avatar">PS</div>
                            <h4 className="creator-name">Priya Sharma</h4>
                            <span className="creator-city">Indore, MP</span>
                            <p className="creator-product">Jute-Wrapped Planters</p>
                            <div className="creator-stat">52 products sold</div>
                            <div className="creator-works">
                                <div className="work-img thumb-4"></div>
                                <div className="work-img thumb-5"></div>
                                <div className="work-img thumb-6"></div>
                            </div>
                            <a href="#profile" className="creator-link">View Profile</a>
                        </div>

                        <div className="creator-card fade-up-element" style={{ transitionDelay: '0.3s' }}>
                            <div className="creator-avatar">RK</div>
                            <h4 className="creator-name">Riya Kulkarni</h4>
                            <span className="creator-city">Pune, MH</span>
                            <p className="creator-product">Recycled Plastic Lamps</p>
                            <div className="creator-stat">4.9★ avg rating</div>
                            <div className="creator-works">
                                <div className="work-img thumb-7"></div>
                                <div className="work-img thumb-8"></div>
                                <div className="work-img thumb-9"></div>
                            </div>
                            <a href="#profile" className="creator-link">View Profile</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6 — RECOGNITION TIERS */}
            <section className="diy-tiers section-light fade-up-element">
                <div className="diy-container">
                    <div className="tiers-header text-center">
                        <h2 className="section-title">Grow as a Creator</h2>
                        <p className="tiers-subtitle">The more you make, the more you unlock. Our tier system rewards consistency, quality, and community impact.</p>
                    </div>

                    <div className="progression-path">
                        <div className="path-line"></div>

                        <div className="tier-node fade-up-element" style={{ transitionDelay: '0.1s' }}>
                            <div className="node-icon bg-teal">
                                <Sprout size={24} />
                            </div>
                            <div className="node-content">
                                <h4 className="node-title">Newcomer</h4>
                                <p className="node-condition">Join the platform</p>
                                <ul className="node-benefits">
                                    <li>List up to 5 products</li>
                                    <li>Access to all Learning Hub tutorials</li>
                                    <li>Basic creator profile page</li>
                                </ul>
                            </div>
                        </div>

                        <div className="tier-node fade-up-element" style={{ transitionDelay: '0.2s' }}>
                            <div className="node-icon bg-orange">
                                <Hammer size={24} />
                            </div>
                            <div className="node-content">
                                <h4 className="node-title">Maker</h4>
                                <p className="node-condition">Sell your first 5 products</p>
                                <ul className="node-benefits">
                                    <li>Unlimited product listings</li>
                                    <li>Order raw material from Upcycle directly</li>
                                    <li>Priority marketplace placement</li>
                                </ul>
                            </div>
                        </div>

                        <div className="tier-node fade-up-element muted" style={{ transitionDelay: '0.3s' }}>
                            <div className="node-icon bg-navy">
                                <Award size={24} />
                            </div>
                            <div className="node-content">
                                <h4 className="node-title">Artisan</h4>
                                <p className="node-condition">Reach ₹10,000 in total sales</p>
                                <ul className="node-benefits">
                                    <li>Bulk raw material orders at discount</li>
                                    <li>Featured in Creator Spotlight section</li>
                                    <li>Verified Artisan badge on all products</li>
                                </ul>
                            </div>
                        </div>

                        <div className="tier-node fade-up-element muted" style={{ transitionDelay: '0.4s' }}>
                            <div className="node-icon bg-gold">
                                <Crown size={24} />
                            </div>
                            <div className="node-content">
                                <h4 className="node-title">Master Creator</h4>
                                <p className="node-condition">Reach ₹50,000 in total sales</p>
                                <ul className="node-benefits">
                                    <li>Featured on the main landing page</li>
                                    <li>Direct brand collaboration opportunities</li>
                                    <li>Exclusive access to premium plastic grades</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7 — RAW MATERIAL ORDERING */}
            <section className="diy-materials section-dark fade-up-element">
                <div className="diy-container materials-grid">
                    <div className="materials-content">
                        <span className="section-label">RAW MATERIAL SUPPLY</span>
                        <h2 className="section-title">We Handle the Hard Part.</h2>
                        <p className="materials-desc">
                            Don't worry about sourcing plastic. Once you reach Maker tier, you can order pre-sorted, AI-verified, clean plastic directly from our supply chain. PET for filament and weaving. HDPE for molding and pressing. Mixed plastics for bricks and structural projects. Delivered to your door, ready to create.
                        </p>

                        <div className="feature-rows">
                            <div className="feature-row fade-up-element" style={{ transitionDelay: '0.1s' }}>
                                <ScanLine size={20} className="feature-icon" />
                                <span>AI-verified purity and plastic type</span>
                            </div>
                            <div className="feature-row fade-up-element" style={{ transitionDelay: '0.2s' }}>
                                <Truck size={20} className="feature-icon" />
                                <span>Delivered to your workshop or home</span>
                            </div>
                            <div className="feature-row fade-up-element" style={{ transitionDelay: '0.3s' }}>
                                <ShieldCheck size={20} className="feature-icon" />
                                <span>Every batch traceable to its collection sprint</span>
                            </div>
                        </div>

                        <button className="btn-outline-orange mt-6 fade-up-element" style={{ transitionDelay: '0.4s' }}>Learn About Raw Material &rarr;</button>
                    </div>

                    <div className="materials-illustration fade-up-element" style={{ transitionDelay: '0.2s' }}>
                        <div className="materials-card">
                            <div className="material-package">
                                <div className="pkg-graphic pkg-pet"></div>
                                <div className="pkg-info">
                                    <span className="pkg-name">PET Type 1</span>
                                    <span className="pkg-purity">98% Purity</span>
                                </div>
                            </div>
                            <div className="material-package">
                                <div className="pkg-graphic pkg-hdpe"></div>
                                <div className="pkg-info">
                                    <span className="pkg-name">HDPE Type 2</span>
                                    <span className="pkg-purity">95% Purity</span>
                                </div>
                            </div>
                            <div className="material-package">
                                <div className="pkg-graphic pkg-mixed"></div>
                                <div className="pkg-info">
                                    <span className="pkg-name">Mixed Flakes</span>
                                    <span className="pkg-purity">Assorted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8 — UPLOAD AND SELL CTA */}
            <section className="diy-cta section-noise fade-up-element">
                <div className="diy-container text-center">
                    <h2 className="cta-title">Ready to List Your First Product?</h2>
                    <p className="cta-desc">
                        Your first product is reviewed by our team within 48 hours. Once approved, it goes live to thousands of buyers who specifically want handcrafted upcycled products.
                    </p>

                    <div className="cta-buttons fade-up-element" style={{ transitionDelay: '0.1s' }}>
                        <button className="btn-primary-large">Become a Creator</button>
                        <button className="btn-outline-white-large">Browse Marketplace</button>
                    </div>

                    <div className="trust-signals fade-up-element" style={{ transitionDelay: '0.2s' }}>
                        <span><Check size={14} /> Free to join</span>
                        <span><Check size={14} /> No upfront cost</span>
                        <span><Check size={14} /> Keep the majority of every sale</span>
                    </div>
                </div>
            </section>

            {/* SECTION 9 — FAQ */}
            <section className="diy-faq section-light fade-up-element">
                <div className="diy-container">
                    <h2 className="section-title">Common Questions</h2>

                    <div className="faq-list">
                        <FAQItem
                            index={0}
                            question="Do I need any experience to join?"
                            answer="Not at all. Our Learning Hub has beginner tutorials that require zero tools and zero prior experience. If you can cut a bottle and wrap some rope, you can make your first product today."
                        />
                        <FAQItem
                            index={1}
                            question="Where do I get the plastic to work with?"
                            answer="You can use plastic you've already collected yourself, bring it from a Recycling Sprint, or order pre-sorted clean plastic directly from us once you reach Maker tier."
                        />
                        <FAQItem
                            index={2}
                            question="How much can I earn?"
                            answer="It depends on what you make and how much you sell. Beginners typically earn ₹2,000 to ₹8,000 a month with a few hours a week. Advanced creators earn significantly more. You keep the majority of every sale."
                        />
                        <FAQItem
                            index={3}
                            question="How does the product review work?"
                            answer="Your first product is reviewed by our quality team within 48 hours. We check that it matches the photos, uses genuine recycled plastic, and meets basic quality standards. After your first approval, subsequent listings go live faster."
                        />
                        <FAQItem
                            index={4}
                            question="How and when do I get paid?"
                            answer="Earnings are credited to your Upcycle wallet after each sale. You can withdraw to your bank account at any time with a minimum withdrawal of ₹500."
                        />
                        <FAQItem
                            index={5}
                            question="What is the NFC Digital Passport?"
                            answer="Every product you sell automatically gets a digital passport — a small NFC tag that buyers can tap with their phone to see the full story of the product. Where the plastic came from, when it was made, and who made it. It adds premium value to everything you create."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
