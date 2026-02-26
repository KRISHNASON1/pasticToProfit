// ============================================
// ANALYTICS / STATS DATA
// ============================================

export const overviewStats = [
    {
        id: 1,
        label: 'Plastic Collected',
        value: '12,450',
        unit: 'kg',
        trend: '+18%',
        trendUp: true,
        icon: '♻️',
        color: '#2d6a4f',
    },
    {
        id: 2,
        label: 'Active Users',
        value: '3,842',
        unit: '',
        trend: '+24%',
        trendUp: true,
        icon: '👥',
        color: '#52b788',
    },
    {
        id: 3,
        label: 'Marketplace Revenue',
        value: '₹4.2L',
        unit: '',
        trend: '+31%',
        trendUp: true,
        icon: '💰',
        color: '#40916c',
    },
    {
        id: 4,
        label: 'EPR Credits Earned',
        value: '856',
        unit: 'credits',
        trend: '+12%',
        trendUp: true,
        icon: '🏆',
        color: '#1a472a',
    },
    {
        id: 5,
        label: 'Campus Drives',
        value: '28',
        unit: 'completed',
        trend: '+5',
        trendUp: true,
        icon: '🎪',
        color: '#74c69d',
    },
    {
        id: 6,
        label: 'Up-Coins Distributed',
        value: '52,100',
        unit: 'coins',
        trend: '+8%',
        trendUp: true,
        icon: '🪙',
        color: '#a7c957',
    },
];

export const monthlyCollectionData = [
    { month: 'Jan', value: 820 },
    { month: 'Feb', value: 1050 },
    { month: 'Mar', value: 1380 },
    { month: 'Apr', value: 980 },
    { month: 'May', value: 1420 },
    { month: 'Jun', value: 1650 },
    { month: 'Jul', value: 1890 },
    { month: 'Aug', value: 2100 },
    { month: 'Sep', value: 1750 },
    { month: 'Oct', value: 2300 },
    { month: 'Nov', value: 2680 },
    { month: 'Dec', value: 2450 },
];

export const categoryRevenue = [
    { category: 'Luxury', value: 42, color: '#1a472a' },
    { category: 'Fashion', value: 28, color: '#2d6a4f' },
    { category: 'DIY Kits', value: 15, color: '#52b788' },
    { category: 'Construction', value: 8, color: '#74c69d' },
    { category: 'Industrial', value: 5, color: '#95d5b2' },
    { category: 'Consumables', value: 2, color: '#d8f3dc' },
];

export const recentActivities = [
    { id: 1, action: 'Campus drive completed', location: 'IIT Delhi', amount: '450 kg', time: '2 hours ago', icon: '🎪' },
    { id: 2, action: 'New seller verified', location: 'EcoArt Studio', amount: '', time: '3 hours ago', icon: '✅' },
    { id: 3, action: 'EPR credit claimed', location: 'Coca-Cola India', amount: '120 credits', time: '5 hours ago', icon: '🏆' },
    { id: 4, action: 'Bulk order placed', location: 'BuildGreen Ltd.', amount: '₹45,000', time: '8 hours ago', icon: '📦' },
    { id: 5, action: 'User milestone', location: '1000th sign-up', amount: '', time: '1 day ago', icon: '🎉' },
    { id: 6, action: 'Plastic classified', location: 'AI Vision API', amount: '890 items', time: '1 day ago', icon: '🤖' },
];

export const rewardsData = {
    balance: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    nextTierAt: 5000,
    totalEarned: 8200,
    totalRedeemed: 5750,
    transactions: [
        { id: 1, type: 'earned', action: 'Campus Drive Drop-off', amount: 350, date: '2026-02-25' },
        { id: 2, type: 'spent', action: 'Marketplace Discount', amount: -200, date: '2026-02-24' },
        { id: 3, type: 'earned', action: 'Referral Bonus', amount: 100, date: '2026-02-23' },
        { id: 4, type: 'earned', action: 'Plastic Classification', amount: 75, date: '2026-02-22' },
        { id: 5, type: 'spent', action: 'Cash Out to Wallet', amount: -500, date: '2026-02-20' },
        { id: 6, type: 'earned', action: 'Festival Drive Bonus', amount: 450, date: '2026-02-18' },
        { id: 7, type: 'earned', action: 'Daily Drop-off', amount: 50, date: '2026-02-17' },
        { id: 8, type: 'spent', action: 'Premium Listing Unlock', amount: -150, date: '2026-02-15' },
    ],
    earnMethods: [
        { icon: '🏫', title: 'Campus Drives', desc: 'Drop off sorted plastic at campus sprint events', reward: '50-500 coins' },
        { icon: '📸', title: 'AI Classification', desc: 'Snap photos of waste for auto-classification rewards', reward: '25-100 coins' },
        { icon: '👥', title: 'Referrals', desc: 'Invite friends to join the platform', reward: '100 coins each' },
        { icon: '🎯', title: 'Daily Drop-offs', desc: 'Regular waste contributions at collection points', reward: '10-50 coins' },
    ],
};

export const faqData = [
    {
        q: 'How do I earn Up-Coins?',
        a: 'You earn Up-Coins by dropping off sorted plastic at our campus drives, using our AI photo classification, referring friends, and through daily waste contributions. Points vary based on the type and quantity of plastic.',
    },
    {
        q: 'What types of plastic do you accept?',
        a: 'We accept PET (Type 1), HDPE (Type 2), LDPE (Type 4), and PP (Type 5). Our AI Vision automatically classifies the type when you snap a photo of the recycling triangle on the item.',
    },
    {
        q: 'How does the NFC Digital Passport work?',
        a: 'Premium products in our marketplace feature embedded NFC tags. Tap with your phone to see the exact origin story — which campus drive, what type of plastic, and the complete recycling journey.',
    },
    {
        q: 'Can I cash out my Up-Coins?',
        a: 'Yes! You can cash out Up-Coins directly to your digital wallet (UPI/Bank) or use them for exclusive discounts on our Recycled Marketplace. Minimum cashout is 500 coins.',
    },
    {
        q: 'What is EPR and how does it benefit me?',
        a: 'Extended Producer Responsibility (EPR) is an Indian regulatory mandate since 2022 requiring companies to manage plastic waste. When you contribute plastic through our platform, you help companies meet EPR targets, generating revenue that funds your rewards.',
    },
    {
        q: 'How are marketplace sellers verified?',
        a: 'All sellers undergo a verification process including material source documentation, quality samples, and sustainability certification review. Verified sellers receive a badge on their products.',
    },
];

// ============================================
// COLLECTION DRIVES DATA
// ============================================
export const collectionDrives = [
    {
        id: 1,
        name: 'IIT Delhi Green Sprint',
        location: 'IIT Delhi Main Campus',
        city: 'New Delhi',
        address: 'Hauz Khas, New Delhi 110016',
        dateStart: '2026-03-05',
        dateEnd: '2026-03-25',
        status: 'upcoming',
        capacity: 500,
        registered: 312,
        plasticTypes: ['PET', 'HDPE'],
        expectedKg: 2000,
        icon: '🏫',
        description: 'A 3-week recycling sprint at IIT Delhi. Drop off pre-sorted PET and HDPE at the central smart bin near the Main Gate.',
    },
    {
        id: 2,
        name: 'Cyber Hub Clean Drive',
        location: 'DLF Cyber Hub',
        city: 'Gurugram',
        address: 'DLF Cyber City, Gurugram 122002',
        dateStart: '2026-02-20',
        dateEnd: '2026-03-12',
        status: 'active',
        capacity: 300,
        registered: 287,
        plasticTypes: ['PET', 'HDPE', 'LDPE'],
        expectedKg: 1500,
        icon: '🏢',
        description: 'Active now! Bring your sorted plastic to the collection point at DLF Cyber Hub food court entrance.',
    },
    {
        id: 3,
        name: 'DTU Youth Fest Recycle',
        location: 'Delhi Technological University',
        city: 'New Delhi',
        address: 'Shahbad Daulatpur, Delhi 110042',
        dateStart: '2026-03-15',
        dateEnd: '2026-04-05',
        status: 'upcoming',
        capacity: 800,
        registered: 145,
        plasticTypes: ['PET', 'HDPE', 'PP'],
        expectedKg: 3500,
        icon: '🎪',
        description: 'Combined with DTU annual fest! Massive collection drive with festival vibes, music, and rewards.',
    },
    {
        id: 4,
        name: 'Connaught Place Community',
        location: 'CP Block A Central Park',
        city: 'New Delhi',
        address: 'Connaught Place, New Delhi 110001',
        dateStart: '2026-02-01',
        dateEnd: '2026-02-20',
        status: 'completed',
        capacity: 200,
        registered: 198,
        plasticTypes: ['PET', 'HDPE'],
        expectedKg: 800,
        collectedKg: 742,
        icon: '🏛️',
        description: 'Completed! 742 kg collected from 198 participants. Thank you CP community!',
    },
    {
        id: 5,
        name: 'Noida Sector 62 Tech Park',
        location: 'HCL Tech Park',
        city: 'Noida',
        address: 'Sector 62, Noida 201301',
        dateStart: '2026-03-10',
        dateEnd: '2026-03-30',
        status: 'upcoming',
        capacity: 400,
        registered: 89,
        plasticTypes: ['PET', 'HDPE', 'PP'],
        expectedKg: 1800,
        icon: '💻',
        description: 'Tech park sprint. Corporate-backed drive with bonus Up-Coins for IT professionals.',
    },
];

export const userRegisteredDrives = [2, 3]; // IDs of drives user has joined

// ============================================
// AI SCAN DATA
// ============================================
export const recentScans = [
    { id: 1, type: 'PET (Type 1)', item: 'Water Bottle', weight: '0.35 kg', coins: 25, time: '2 hours ago', confidence: 97 },
    { id: 2, type: 'HDPE (Type 2)', item: 'Milk Jug', weight: '0.50 kg', coins: 40, time: '1 day ago', confidence: 94 },
    { id: 3, type: 'PET (Type 1)', item: 'Soda Bottle', weight: '0.28 kg', coins: 20, time: '2 days ago', confidence: 98 },
    { id: 4, type: 'PP (Type 5)', item: 'Yogurt Container', weight: '0.15 kg', coins: 12, time: '3 days ago', confidence: 91 },
    { id: 5, type: 'HDPE (Type 2)', item: 'Detergent Bottle', weight: '0.85 kg', coins: 65, time: '5 days ago', confidence: 96 },
];

export const plasticTypeGuide = [
    { code: '1', name: 'PET', full: 'Polyethylene Terephthalate', examples: 'Water bottles, soda bottles, food containers', rate: '70 coins/kg', color: '#2d6a4f' },
    { code: '2', name: 'HDPE', full: 'High-Density Polyethylene', examples: 'Milk jugs, detergent bottles, pipes', rate: '85 coins/kg', color: '#1a472a' },
    { code: '4', name: 'LDPE', full: 'Low-Density Polyethylene', examples: 'Plastic bags, squeeze bottles, wraps', rate: '50 coins/kg', color: '#40916c' },
    { code: '5', name: 'PP', full: 'Polypropylene', examples: 'Yogurt cups, bottle caps, straws', rate: '60 coins/kg', color: '#52b788' },
];

// ============================================
// USER IMPACT STATS (for home dashboard)
// ============================================
export const userImpactStats = {
    plasticContributed: '12.4',
    co2Saved: '24.8',
    treesEquivalent: 3,
    drivesJoined: 5,
    totalScans: 47,
};

export const howItWorksSteps = [
    { step: 1, icon: '📍', title: 'Find a Drive', desc: 'Locate a Recycling Sprint near you — campuses, tech parks, or community hubs' },
    { step: 2, icon: '🚶', title: 'Drop Off Plastic', desc: 'Bring pre-sorted PET & HDPE to the central smart bin at the drive location' },
    { step: 3, icon: '📸', title: 'Snap & Classify', desc: 'Take a photo — our AI instantly identifies plastic type and estimates weight' },
    { step: 4, icon: '🪙', title: 'Earn & Spend', desc: 'Get Up-Coins in your wallet. Cash out or unlock 30-50% discounts on eco-products' },
];
