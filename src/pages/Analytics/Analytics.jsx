import Header from '../../components/Header/Header';
import { overviewStats, monthlyCollectionData, categoryRevenue, recentActivities } from '../../data/stats';
import './Analytics.css';

export default function Analytics() {
    const maxCollection = Math.max(...monthlyCollectionData.map(d => d.value));

    return (
        <div className="page-wrapper">
            <Header showTabs={false} />
            <div className="analytics-page">
                <h1 className="analytics-page-title">📈 Analytics Overview</h1>
                <p className="analytics-page-sub">Track your circular economy impact in real-time</p>

                {/* Stat cards */}
                <div className="stats-grid">
                    {overviewStats.map((stat, i) => (
                        <div key={stat.id} className="stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="stat-card-header">
                                <span className="stat-card-icon">{stat.icon}</span>
                                <span className="stat-card-trend">{stat.trend}</span>
                            </div>
                            <div className="stat-card-value">
                                {stat.value}
                                {stat.unit && <span className="stat-card-unit">{stat.unit}</span>}
                            </div>
                            <div className="stat-card-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="charts-row">
                    {/* Bar chart — monthly collection */}
                    <div className="chart-card">
                        <h3 className="chart-card-title">♻️ Monthly Plastic Collection (kg)</h3>
                        <div className="bar-chart">
                            {monthlyCollectionData.map((d, i) => (
                                <div key={d.month} className="bar-chart-col">
                                    <div
                                        className="bar-chart-bar"
                                        style={{
                                            height: `${(d.value / maxCollection) * 100}%`,
                                            background: `linear-gradient(180deg, var(--clr-primary-300) 0%, var(--clr-primary-700) 100%)`,
                                            animationDelay: `${i * 0.05}s`,
                                        }}
                                        title={`${d.month}: ${d.value} kg`}
                                    />
                                    <span className="bar-chart-label">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category revenue */}
                    <div className="chart-card">
                        <h3 className="chart-card-title">💰 Revenue by Category</h3>
                        <div className="category-bars">
                            {categoryRevenue.map(cat => (
                                <div key={cat.category} className="category-bar-item">
                                    <span className="category-bar-dot" style={{ background: cat.color }} />
                                    <span className="category-bar-name">{cat.category}</span>
                                    <div className="category-bar-track">
                                        <div
                                            className="category-bar-fill"
                                            style={{ width: `${cat.value}%`, background: cat.color }}
                                        />
                                    </div>
                                    <span className="category-bar-value">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activity feed */}
                <div className="activity-card">
                    <h3 className="activity-card-title">⚡ Recent Activity</h3>
                    {recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <span className="activity-icon">{activity.icon}</span>
                            <div className="activity-info">
                                <div className="activity-action">{activity.action}</div>
                                <div className="activity-location">{activity.location}</div>
                            </div>
                            <div className="activity-meta">
                                <div className="activity-amount">{activity.amount}</div>
                                <div className="activity-time">{activity.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
