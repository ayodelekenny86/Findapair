import db from './connection';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db('users').insert({
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Admin User',
      email: 'admin@findapair.org',
      password_hash: adminPassword,
      avatar: '👑',
      role: 'admin',
      status: 'active',
      trust_score: 100,
      email_verified: true,
      items_posted: 0,
      items_matched: 0,
      items_given: 0,
      points: 0,
      settings: JSON.stringify({
        emailNotifications: true,
        pushNotifications: true,
        matchAlerts: true,
        weeklyDigest: false,
        theme: 'dark',
      }),
    });

    console.log('✅ Created admin user (admin@findapair.org / admin123)');

    // Create moderator user
    const modPassword = await bcrypt.hash('mod123', 10);
    await db('users').insert({
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Moderator User',
      email: 'moderator@findapair.org',
      password_hash: modPassword,
      avatar: '🛡️',
      role: 'moderator',
      status: 'active',
      trust_score: 95,
      email_verified: true,
    });

    console.log('✅ Created moderator user (moderator@findapair.org / mod123)');

    // Create demo users
    const demoUsers = [
      { name: 'Sarah K.', email: 'sarah@example.com', avatar: '👩', trust_score: 98 },
      { name: 'Mike R.', email: 'mike@example.com', avatar: '👨', trust_score: 95 },
      { name: 'Lisa M.', email: 'lisa@example.com', avatar: '👩‍🦰', trust_score: 92 },
      { name: 'Emma T.', email: 'emma@example.com', avatar: '👱‍♀️', trust_score: 97 },
      { name: 'David P.', email: 'david@example.com', avatar: '🧔', trust_score: 91 },
    ];

    const userPassword = await bcrypt.hash('user123', 10);
    for (let i = 0; i < demoUsers.length; i++) {
      const user = demoUsers[i];
      await db('users').insert({
        id: `00000000-0000-0000-0000-0000000000${i + 3}`,
        name: user.name,
        email: user.email,
        password_hash: userPassword,
        avatar: user.avatar,
        role: 'user',
        status: 'active',
        trust_score: user.trust_score,
        email_verified: true,
      });
    }

    console.log(`✅ Created ${demoUsers.length} demo users (password: user123)`);

    // Create demo items
    const pairItems = [
      {
        seller_id: '00000000-0000-0000-0000-000000000003',
        type: 'pair',
        title: 'Left Gold Hoop Earring - 14k',
        description: 'Lost the right one at a concert. 14k gold, medium size hoop. Looking for an identical match.',
        category: 'Earrings',
        emoji: '💎',
        location: 'Manhattan, NY',
        price: 85,
        original_price: 320,
        match_score: 94,
        verified: true,
        condition: 'Excellent',
        trust_score: 98,
        saves: 24,
        views: 156,
      },
      {
        seller_id: '00000000-0000-0000-0000-000000000004',
        type: 'pair',
        title: 'Right Nike Air Max - Size 10',
        description: 'My dog chewed the left one! Brand new Nike Air Max 90, black/white. Only worn twice.',
        category: 'Shoes',
        emoji: '👟',
        location: 'Brooklyn, NY',
        price: 45,
        original_price: 130,
        match_score: 88,
        verified: true,
        condition: 'Like New',
        trust_score: 95,
        saves: 18,
        views: 98,
      },
      {
        seller_id: '00000000-0000-0000-0000-000000000005',
        type: 'pair',
        title: 'Single Cashmere Glove - Left',
        description: 'Left behind on the subway. Pure cashmere, charcoal gray, women\'s medium. Brand: Everlane.',
        category: 'Gloves',
        emoji: '🧤',
        location: 'Chicago, IL',
        price: 25,
        original_price: 78,
        match_score: 91,
        verified: false,
        condition: 'Good',
        trust_score: 82,
        saves: 12,
        views: 67,
      },
    ];

    await db('items').insert(pairItems);
    console.log(`✅ Created ${pairItems.length} pair items`);

    const freeItems = [
      {
        seller_id: '00000000-0000-0000-0000-000000000006',
        type: 'free',
        title: 'IKEA Billy Bookshelf - White',
        description: 'Moving out! Must go today. Good condition, minor scratches. You pick up from Brooklyn.',
        category: 'Furniture',
        emoji: '📚',
        location: 'Brooklyn, NY',
        match_score: 0,
        verified: true,
        condition: 'Good',
        trust_score: 98,
        saves: 24,
        views: 156,
        donation_option: true,
        urgency: 'must-go',
      },
      {
        seller_id: '00000000-0000-0000-0000-000000000007',
        type: 'free',
        title: 'Kids Bicycle - Pink, Ages 6-9',
        description: 'Daughter outgrew this. Still rides great with training wheels and bell.',
        category: 'Toys',
        emoji: '🚲',
        location: 'Austin, TX',
        match_score: 0,
        verified: true,
        condition: 'Good',
        trust_score: 95,
        saves: 12,
        views: 89,
      },
    ];

    await db('items').insert(freeItems);
    console.log(`✅ Created ${freeItems.length} free items`);

    // Create site settings
    const settings = [
      { key: 'maintenance_mode', value: false },
      { key: 'registration_enabled', value: true },
      { key: 'max_items_per_user', value: 50 },
      { key: 'require_email_verification', value: false },
      { key: 'auto_approve_items', value: true },
    ];

    await db('site_settings').insert(settings);
    console.log('✅ Created site settings');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
