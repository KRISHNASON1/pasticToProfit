import { useEffect, useRef } from 'react';
import {
    Recycle,
    Home,
    Store,
    Building2,
    Landmark,
    TrendingUp,
    RefreshCw,
    Layers,
} from 'lucide-react';
import './Solutions.css';

const solutionCards = [
    {
        icon: Home,
        title: 'Turn Your Waste Into Rewards',
        description:
            'Scan your plastic, earn Up-Coins, unlock real discounts. Our AI identifies your plastic type instantly — no sorting knowledge needed.',
        cta: 'Start Earning →',
        accent: 'var(--clr-primary-300)',
    },
    {
        icon: Store,
        title: 'Sell Your Recycled Products Here',
        description:
            'List your upcycled creations directly on our marketplace. Reach conscious buyers, earn verified income, and turn your craft into a sustainable business.',
        cta: 'Join as a Creator →',
        accent: 'var(--clr-accent)',
    },
    {
        icon: Building2,
        title: 'Meet Your EPR Targets With Verified Data',
        description:
            'Fully traceable, NFC-verified recycling certificates. Every gram documented — from community sprint to finished product.',
        cta: 'Get EPR Compliant →',
        accent: 'var(--clr-primary-400)',
    },
    {
        icon: Landmark,
        title: 'Host a Recycling Sprint. Zero Cost to You.',
        description:
            'We bring the collection infrastructure to your campus, tech park, or residential society. You get a cleaner space; we handle the rest.',
        cta: 'Partner With Us →',
        accent: 'var(--clr-primary-200)',
    },
];

const stakeholders = [
    'Households & Communities',
    'Artisans & Creators',
    'Brands & FMCG Companies',
    'Municipalities & Institutions',
];

const trustStats = [
    { icon: TrendingUp, value: '3.4M Tonnes', label: 'Plastic Generated Annually in India' },
    { icon: RefreshCw, value: '<30%', label: 'Currently Recycled Effectively' },
    { icon: Layers, value: '3 Layers', label: 'Community → AI → Marketplace' },
];

export default function Solutions() {
    const cardsRef = useRef([]);
    const trustRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('sol-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        cardsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        if (trustRef.current) observer.observe(trustRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="solutions-page">
                {/* ── Hero ── */}
                <section className="sol-hero">
                    <div className="sol-hero-icon-wrap">
                        <Recycle size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="sol-hero-title">
                        One Platform. Every Stakeholder.{' '}
                        <span className="sol-hero-highlight">Zero Waste.</span>
                    </h1>
                    <p className="sol-hero-sub">
                        We don't just recycle plastic — we turn it into opportunity for everyone
                        in the chain.
                    </p>
                </section>

                {/* ── Cards ── */}
                <section className="sol-cards">
                    {solutionCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={i}
                                className="sol-card sol-reveal"
                                style={{ '--sol-delay': `${i * 0.12}s`, '--card-accent': card.accent }}
                                ref={(el) => (cardsRef.current[i] = el)}
                            >
                                <span className="sol-card-tag">{stakeholders[i]}</span>
                                <div className="sol-card-icon">
                                    <Icon size={28} strokeWidth={1.8} />
                                </div>
                                <h3 className="sol-card-title">{card.title}</h3>
                                <p className="sol-card-desc">{card.description}</p>
                                <button className="sol-card-cta">{card.cta}</button>
                            </div>
                        );
                    })}
                </section>

                {/* ── Trust Bar ── */}
                <section
                    className="sol-trust sol-reveal"
                    ref={trustRef}
                    style={{ '--sol-delay': '0.48s' }}
                >
                    {trustStats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="sol-trust-item">
                                <div className="sol-trust-icon">
                                    <Icon size={22} strokeWidth={1.8} />
                                </div>
                                <span className="sol-trust-value">{stat.value}</span>
                                <span className="sol-trust-label">{stat.label}</span>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}
