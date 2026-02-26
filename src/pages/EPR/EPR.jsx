import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './EPR.css';
import {
    Building2, Ship, User, Trash2, ShieldCheck, Scissors, Landmark,
    Package, MapPin, ScanLine, BadgeCheck, CheckCircle, Check,
    ArrowRight
} from 'lucide-react';

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
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

export default function EPR() {
    const heroRef = useReveal();
    const vsRef = useReveal();

    return (
        <div className="epr-page">

            {/* ─── SECTION 1: HERO ─── */}
            <section className="epr-hero" id="hero">
                <div className="epr-hero-bg"></div>
                <div className="epr-hero-inner reveal" ref={heroRef}>
                    <div className="epr-hero-tag">
                        <span className="epr-hero-tag-dot" />
                        Extended Producer Responsibility
                    </div>
                    <h1>
                        Technology That Makes<br />
                        <span>EPR Compliance Effortless</span>
                    </h1>
                    <p className="epr-hero-sub">
                        Connecting producers, collectors, artisans, and regulators
                        into one verified circular economy platform.
                    </p>
                    <div className="epr-hero-ctas">
                        <Link to="/support">
                            <button className="epr-btn-primary">
                                Get Started
                                <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 2: COMPARISON BLOCK ─── */}
            <section className="epr-section epr-vs" id="comparison">
                <div className="epr-section-header">
                    <h2 className="epr-section-title">Traditional Waste Management vs EPR</h2>
                </div>
                <div className="epr-vs-grid reveal" ref={vsRef}>

                    {/* Traditional Card */}
                    <div className="epr-vs-card epr-vs-dark">
                        <div className="epr-vs-card-header">
                            <span className="epr-vs-card-badge">Old Way</span>
                            <h3>Traditional Approach</h3>
                        </div>
                        <ul className="epr-vs-list">
                            <li><div className="epr-vs-icon error">✕</div> Brands pay high compliance fines</li>
                            <li><div className="epr-vs-icon error">✕</div> No material traceability</li>
                            <li><div className="epr-vs-icon error">✕</div> Manual, paper-based reporting</li>
                            <li><div className="epr-vs-icon error">✕</div> Plastic remains unaccounted for</li>
                        </ul>
                        <div className="epr-vs-chart-placeholder">
                            <div className="epr-vs-bar" style={{ width: '30%', background: '#ef4444' }}>
                                <span>30% Visibility</span>
                            </div>
                        </div>
                    </div>

                    {/* EPR Platform Card */}
                    <div className="epr-vs-card epr-vs-light">
                        <div className="epr-vs-card-header">
                            <span className="epr-vs-card-badge success">Our Platform</span>
                            <h3>Tech-Enabled EPR</h3>
                        </div>
                        <ul className="epr-vs-list">
                            <li><div className="epr-vs-icon success"><Check size={16} /></div> Automated compliance & credits</li>
                            <li><div className="epr-vs-icon success"><Check size={16} /></div> NFC end-to-end traceability</li>
                            <li><div className="epr-vs-icon success"><Check size={16} /></div> Verified, immutable data</li>
                            <li><div className="epr-vs-icon success"><Check size={16} /></div> Real-time regulatory dashboards</li>
                        </ul>
                        <div className="epr-vs-chart-placeholder">
                            <div className="epr-vs-bar" style={{ width: '95%', background: '#10b981' }}>
                                <span>95% Visibility</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─── SECTION 3: HOW EPR WORKS ─── */}
            <section className="epr-section epr-how" id="how-it-works">
                <div className="epr-how-inner reveal" ref={useReveal()}>
                    <div className="epr-how-content">
                        <h2 className="epr-section-title" style={{ textAlign: 'left', marginBottom: 24 }}>
                            How Extended Producer Responsibility Works
                        </h2>
                        <p className="epr-section-subtitle" style={{ textAlign: 'left', marginBottom: 40 }}>
                            EPR mandates that producers, importers, and brand owners
                            are financially and physically responsible for the
                            end-of-life management of their plastic packaging.
                            Our platform automates collection, traceability,
                            and compliance reporting in one place.
                        </p>

                        <div className="epr-how-steps">
                            <div className="epr-how-step">
                                <div className="epr-how-step-icon"><Package size={20} /></div>
                                <div>
                                    <div className="epr-how-step-label">Step 1</div>
                                    <h4>Producer Registration</h4>
                                </div>
                            </div>
                            <div className="epr-how-step">
                                <div className="epr-how-step-icon"><MapPin size={20} /></div>
                                <div>
                                    <div className="epr-how-step-label">Step 2</div>
                                    <h4>Collection Sprint</h4>
                                </div>
                            </div>
                            <div className="epr-how-step">
                                <div className="epr-how-step-icon"><ScanLine size={20} /></div>
                                <div>
                                    <div className="epr-how-step-label">Step 3</div>
                                    <h4>AI Verification & Logging</h4>
                                </div>
                            </div>
                            <div className="epr-how-step">
                                <div className="epr-how-step-icon"><BadgeCheck size={20} /></div>
                                <div>
                                    <div className="epr-how-step-label">Step 4</div>
                                    <h4>Certificate Issued</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="epr-how-visual">
                        <div className="epr-how-visual-placeholder">
                            <div className="epr-how-visual-inner">
                                <ShieldCheck size={64} opacity={0.5} />
                                <div style={{ marginTop: 16, fontWeight: 600 }}>Automated <br />Compliance Engine</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 4: EPR FLOW DIAGRAM ─── */}
            <section className="epr-section epr-flow" id="flow-diagram">
                <div className="epr-section-header">
                    <h2 className="epr-section-title">EPR Flow</h2>
                    <p className="epr-section-subtitle" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        A unified ecosystem tracking material, credits, and data in real time.
                    </p>
                </div>

                <div className="epr-flow-container reveal" ref={useReveal()}>

                    {/* Legend */}
                    <div className="epr-flow-legend">
                        <div className="epr-flow-legend-item">
                            <span className="epr-flow-line material"></span> Material Flow
                        </div>
                        <div className="epr-flow-legend-item">
                            <span className="epr-flow-line credit"></span> Credit Flow
                        </div>
                        <div className="epr-flow-legend-item">
                            <span className="epr-flow-line data"></span> Data Flow
                        </div>
                        <div className="epr-flow-legend-note">
                            <strong>PRO</strong> Producer Responsibility Organisation
                        </div>
                        <div className="epr-flow-legend-note">
                            <strong>IEC</strong> Information Education & Communication
                        </div>
                    </div>

                    {/* Circular Layout */}
                    <div className="epr-flow-circle">

                        {/* Center Node (PRO) */}
                        <div className="epr-flow-node center-node">
                            <div className="epr-flow-icon"><ShieldCheck size={32} /></div>
                            <span>PRO / Platform</span>
                            <div className="epr-flow-pulse"></div>
                        </div>

                        {/* Surrounding Nodes (positioned via CSS) */}
                        <div className="epr-flow-node pos-producer">
                            <div className="epr-flow-icon"><Building2 size={24} /></div>
                            <span>Producer / Brand</span>
                        </div>

                        <div className="epr-flow-node pos-importer">
                            <div className="epr-flow-icon"><Ship size={24} /></div>
                            <span>Importer</span>
                        </div>

                        <div className="epr-flow-node pos-consumer">
                            <div className="epr-flow-icon"><User size={24} /></div>
                            <span>Consumer / Public</span>
                        </div>

                        <div className="epr-flow-node pos-collector">
                            <div className="epr-flow-icon"><Trash2 size={24} /></div>
                            <span>Collection Agent</span>
                        </div>

                        <div className="epr-flow-node pos-recycler">
                            <div className="epr-flow-icon"><Scissors size={24} /></div>
                            <span>Recycler / Artisan</span>
                        </div>

                        <div className="epr-flow-node pos-regulator">
                            <div className="epr-flow-icon"><Landmark size={24} /></div>
                            <span>Regulator (SPCB)</span>
                        </div>

                        {/* Background SVG for connector lines */}
                        <svg className="epr-flow-svg" viewBox="0 0 600 600">
                            <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                            {/* Data Flow (to center) */}
                            <line x1="300" y1="100" x2="300" y2="250" className="svg-line data" />
                            <line x1="473" y1="200" x2="343" y2="275" className="svg-line data" />
                            <line x1="473" y1="400" x2="343" y2="325" className="svg-line data" />
                            <line x1="300" y1="500" x2="300" y2="350" className="svg-line data" />
                            <line x1="127" y1="400" x2="257" y2="325" className="svg-line data" />
                            <line x1="127" y1="200" x2="257" y2="275" className="svg-line data" />

                            {/* Material Flow */}
                            <path d="M 473 400 A 200 200 0 0 1 300 500" className="svg-line material" />
                            <path d="M 300 500 A 200 200 0 0 1 127 400" className="svg-line material" />
                            <path d="M 127 400 A 200 200 0 0 1 127 200" className="svg-line material" />
                            <path d="M 127 200 A 200 200 0 0 1 300 100" className="svg-line material" />

                            {/* Credit Flow */}
                            <path d="M 127 400 A 150 150 0 0 0 300 250" className="svg-line credit" />
                            <path d="M 300 250 A 150 150 0 0 0 300 100" className="svg-line credit" />
                            <path d="M 300 100 A 150 150 0 0 0 127 200" className="svg-line credit" />
                        </svg>

                    </div>

                    {/* Bottom Bar Elements */}
                    <div className="epr-flow-bottom">
                        <div className="epr-flow-v-label left">Technology Support</div>
                        <div className="epr-flow-operator">
                            <div className="epr-flow-operator-pill">Platform Operator</div>
                            <div className="epr-flow-operator-connector"></div>
                            <div className="epr-flow-operator-badge">IEC Activities</div>
                        </div>
                        <div className="epr-flow-v-label right">Compliance Support</div>
                    </div>

                </div>
            </section>

            {/* ─── SECTION 5: EPR THROUGH NUMBERS ─── */}
            <section className="epr-section epr-numbers" id="numbers">
                <div className="epr-section-header">
                    <h2 className="epr-section-title">EPR Through Numbers</h2>
                </div>
                <div className="epr-numbers-grid reveal" ref={useReveal()}>

                    <div className="epr-number-card">
                        <div className="epr-number-val highlight-green">3.4M+ Tonnes</div>
                        <div className="epr-number-label">Plastic generated in India annually</div>
                    </div>

                    <div className="epr-number-card">
                        <div className="epr-number-val">60+</div>
                        <div className="epr-number-label">EPR registered producers on platform</div>
                    </div>

                    <div className="epr-number-card">
                        <div className="epr-number-val highlight-orange">₹841Cr+</div>
                        <div className="epr-number-label">EPR credit value tracked</div>
                    </div>

                    <div className="epr-number-card">
                        <div className="epr-number-val highlight-green">90%</div>
                        <div className="epr-number-label">Collection efficiency improvement</div>
                    </div>

                    <div className="epr-number-card">
                        <div className="epr-number-val">2x-4x</div>
                        <div className="epr-number-label">Faster compliance reporting</div>
                    </div>

                    <div className="epr-number-card">
                        <div className="epr-number-val highlight-green">75%</div>
                        <div className="epr-number-label">Reduction in compliance cost</div>
                    </div>

                </div>
            </section>

            {/* ─── SECTION 6: WHAT WE SOLVE ─── */}
            <section className="epr-section epr-solve" id="what-we-solve">
                <div className="epr-solve-inner reveal" ref={useReveal()}>
                    <div className="epr-solve-visual">
                        <div className="epr-solve-img-placeholder">
                            <Trash2 size={48} opacity={0.6} />
                            <div style={{ marginTop: 16, fontWeight: 500 }}>Unmanaged Waste Streams</div>
                        </div>
                    </div>
                    <div className="epr-solve-content">
                        <h2 className="epr-section-title" style={{ textAlign: 'left', marginBottom: 40 }}>
                            What We Solve
                        </h2>
                        <ul className="epr-solve-list">
                            <li><CheckCircle className="icon-green" size={24} /> <span>Untracked plastic entering landfills</span></li>
                            <li><CheckCircle className="icon-green" size={24} /> <span>Manual and error-prone EPR reporting</span></li>
                            <li><CheckCircle className="icon-green" size={24} /> <span>Low household incentive to sort waste</span></li>
                            <li><CheckCircle className="icon-green" size={24} /> <span>No verified link between brand and recycler</span></li>
                            <li><CheckCircle className="icon-green" size={24} /> <span>Compliance penalties due to data gaps</span></li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
}
