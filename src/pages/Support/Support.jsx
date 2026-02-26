import { useState } from 'react';
import Header from '../../components/Header/Header';
import { faqData } from '../../data/stats';
import './Support.css';

export default function Support() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="support-page">
                <h1 className="support-page-title">💬 Help & Support</h1>
                <p className="support-page-sub">Got questions? We're here to help you make the most of your circular economy journey.</p>

                <div className="live-indicator">
                    <span className="live-dot" />
                    Live Support Available
                </div>

                <div className="support-grid">
                    {/* FAQ */}
                    <div className="faq-card">
                        <h3 className="faq-title">❓ Frequently Asked Questions</h3>
                        {faqData.map((faq, i) => (
                            <div key={i} className="faq-item">
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    {faq.q}
                                    <span className={`faq-chevron ${openFaq === i ? 'open' : ''}`}>▼</span>
                                </button>
                                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact form */}
                    <div className="contact-card">
                        <h3 className="contact-title">✉️ Contact Us</h3>
                        <form className="contact-form" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" type="text" placeholder="Your name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea className="form-input form-textarea" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="form-submit" type="submit">Send Message 🚀</button>
                        </form>
                    </div>
                </div>

                {/* Quick links */}
                <div className="support-links">
                    <div className="support-link-card">
                        <div className="support-link-icon">📋</div>
                        <div className="support-link-info">
                            <h4>How to Sort Plastic</h4>
                            <p>Learn recycling codes and sorting best practices</p>
                        </div>
                    </div>
                    <div className="support-link-card">
                        <div className="support-link-icon">🔢</div>
                        <div className="support-link-info">
                            <h4>Understanding Recycling Codes</h4>
                            <p>PET, HDPE, LDPE — what does it all mean?</p>
                        </div>
                    </div>
                    <div className="support-link-card">
                        <div className="support-link-icon">📍</div>
                        <div className="support-link-info">
                            <h4>Find Collection Points</h4>
                            <p>Locate the nearest campus drive or drop-off</p>
                        </div>
                    </div>
                    <div className="support-link-card">
                        <div className="support-link-icon">📱</div>
                        <div className="support-link-info">
                            <h4>NFC Passport Guide</h4>
                            <p>How to scan and verify product origins</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
