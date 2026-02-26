import { useState } from 'react';
import Header from '../../components/Header/Header';
import { collectionDrives, userRegisteredDrives } from '../../data/stats';
import './CollectionDrives.css';

const filters = [
    { id: 'all', label: 'All Drives' },
    { id: 'active', label: '🟢 Active Now' },
    { id: 'upcoming', label: '📅 Upcoming' },
    { id: 'completed', label: '✅ Completed' },
];

export default function CollectionDrives() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [registeredIds, setRegisteredIds] = useState(new Set(userRegisteredDrives));

    const filteredDrives = activeFilter === 'all'
        ? collectionDrives
        : collectionDrives.filter(d => d.status === activeFilter);

    const myDrives = collectionDrives.filter(d => registeredIds.has(d.id));

    const handleJoin = (id) => {
        setRegisteredIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="drives-page">
                <h1 className="drives-page-title">📍 Collection Drives</h1>
                <p className="drives-page-sub">Find and join Recycling Sprints near you. Drop off pre-sorted plastic and earn Up-Coins!</p>

                {/* Sprint explainer */}
                <div className="sprint-explainer">
                    <span className="sprint-explainer-icon">🏃‍♂️</span>
                    <div className="sprint-explainer-text">
                        <h4>What's a Recycling Sprint?</h4>
                        <p>Instead of door-to-door pickups, we organize high-energy 3-week collection drives at campuses, tech parks, and community hubs. Hundreds of people bring pre-sorted plastic to one smart bin — creating massive clean supply with near-zero transport costs.</p>
                    </div>
                </div>

                {/* Filter bar */}
                <div className="drives-filter-bar">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            className={`drives-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Drive cards */}
                <div className="drives-list">
                    {filteredDrives.map((drive, i) => {
                        const isRegistered = registeredIds.has(drive.id);
                        const capacityPercent = Math.round((drive.registered / drive.capacity) * 100);

                        return (
                            <div
                                key={drive.id}
                                className={`drive-card ${drive.status}`}
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="drive-card-icon">{drive.icon}</div>
                                <div className="drive-card-body">
                                    <div className="drive-card-header">
                                        <span className="drive-card-name">{drive.name}</span>
                                        <span className={`drive-card-status ${drive.status}`}>
                                            {drive.status === 'active' ? '🟢 Active' : drive.status === 'upcoming' ? '📅 Upcoming' : '✅ Completed'}
                                        </span>
                                    </div>
                                    <div className="drive-card-location">📍 {drive.location} • {drive.address}</div>

                                    <div className="drive-plastics">
                                        {drive.plasticTypes.map(p => (
                                            <span key={p} className="drive-plastic-pill">{p}</span>
                                        ))}
                                    </div>

                                    <div className="drive-card-details">
                                        <span className="drive-card-detail">📆 <strong>{drive.dateStart}</strong> → <strong>{drive.dateEnd}</strong></span>
                                        <span className="drive-card-detail">👥 <strong>{drive.registered}</strong>/{drive.capacity} joined</span>
                                        <span className="drive-card-detail">📦 Target: <strong>{drive.expectedKg} kg</strong></span>
                                        {drive.collectedKg && (
                                            <span className="drive-card-detail">✅ Collected: <strong>{drive.collectedKg} kg</strong></span>
                                        )}
                                    </div>

                                    <div className="drive-card-desc">{drive.description}</div>

                                    <div className="drive-capacity-bar">
                                        <div className="drive-capacity-label">
                                            <span>Spots filled</span>
                                            <span>{capacityPercent}%</span>
                                        </div>
                                        <div className="drive-capacity-track">
                                            <div className="drive-capacity-fill" style={{ width: `${capacityPercent}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="drive-card-actions">
                                    {drive.status === 'completed' ? (
                                        <button className="drive-join-btn completed-btn">Completed</button>
                                    ) : (
                                        <button
                                            className={`drive-join-btn ${isRegistered ? 'joined' : 'join'}`}
                                            onClick={() => handleJoin(drive.id)}
                                        >
                                            {isRegistered ? '✅ Joined' : 'Join Drive'}
                                        </button>
                                    )}
                                    <span className="drive-expected">
                                        🪙 ~{Math.round(drive.expectedKg / drive.capacity * 50)} coins/person
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* My Registered Drives */}
                {myDrives.length > 0 && (
                    <div className="my-drives-section">
                        <h3 className="my-drives-title">✅ My Registered Drives ({myDrives.length})</h3>
                        <div className="drives-list">
                            {myDrives.map(drive => (
                                <div key={drive.id} className={`drive-card ${drive.status}`}>
                                    <div className="drive-card-icon">{drive.icon}</div>
                                    <div className="drive-card-body">
                                        <div className="drive-card-header">
                                            <span className="drive-card-name">{drive.name}</span>
                                            <span className={`drive-card-status ${drive.status}`}>
                                                {drive.status === 'active' ? '🟢 Active' : '📅 Upcoming'}
                                            </span>
                                        </div>
                                        <div className="drive-card-location">📍 {drive.location}</div>
                                        <div className="drive-card-details">
                                            <span className="drive-card-detail">📆 {drive.dateStart} → {drive.dateEnd}</span>
                                        </div>
                                    </div>
                                    <button className="drive-join-btn joined">✅ Joined</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
