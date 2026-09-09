import db from './connection';

async function migrate() {
  console.log('🚀 Starting database migration...');

  try {
    // Create users table
    await db.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password_hash').notNullable();
      table.string('avatar').defaultTo('👤');
      table.integer('trust_score').defaultTo(50);
      table.enum('role', ['admin', 'moderator', 'user', 'guest']).defaultTo('user');
      table.enum('status', ['active', 'banned', 'suspended']).defaultTo('active');
      table.string('ban_reason');
      table.timestamp('ban_date');
      table.boolean('email_verified').defaultTo(false);
      table.integer('items_posted').defaultTo(0);
      table.integer('items_matched').defaultTo(0);
      table.integer('items_given').defaultTo(0);
      table.integer('points').defaultTo(0);
      table.jsonb('settings').defaultTo('{}');
      table.timestamp('last_login');
      table.timestamps(true, true);
    });

    console.log('✅ Created users table');

    // Create items table
    await db.schema.createTable('items', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('seller_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('type', ['pair', 'free']).notNullable();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('category').notNullable();
      table.string('emoji').defaultTo('📦');
      table.string('location').notNullable();
      table.decimal('price', 10, 2);
      table.decimal('original_price', 10, 2);
      table.integer('match_score').defaultTo(0);
      table.boolean('verified').defaultTo(false);
      table.boolean('featured').defaultTo(false);
      table.string('condition').defaultTo('Good');
      table.integer('trust_score').defaultTo(50);
      table.integer('saves').defaultTo(0);
      table.integer('views').defaultTo(0);
      table.boolean('donation_option').defaultTo(false);
      table.enum('urgency', ['normal', 'high', 'must-go']).defaultTo('normal');
      table.enum('status', ['active', 'matched', 'claimed', 'expired']).defaultTo('active');
      table.jsonb('images').defaultTo('[]');
      table.timestamps(true, true);
    });

    console.log('✅ Created items table');

    // Create messages table
    await db.schema.createTable('messages', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('item_id').references('id').inTable('items').onDelete('CASCADE');
      table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('receiver_id').references('id').inTable('users').onDelete('CASCADE');
      table.text('text').notNullable();
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    });

    console.log('✅ Created messages table');

    // Create activities table
    await db.schema.createTable('activities', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('type', ['match', 'free', 'donation', 'post', 'claim']).notNullable();
      table.text('message').notNullable();
      table.string('emoji').defaultTo('📝');
      table.timestamps(true, true);
    });

    console.log('✅ Created activities table');

    // Create reports table
    await db.schema.createTable('reports', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('item_id').references('id').inTable('items').onDelete('CASCADE');
      table.uuid('reporter_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('reason').notNullable();
      table.text('description');
      table.enum('status', ['pending', 'reviewed', 'resolved', 'dismissed']).defaultTo('pending');
      table.uuid('reviewed_by').references('id').inTable('users');
      table.timestamp('reviewed_at');
      table.timestamps(true, true);
    });

    console.log('✅ Created reports table');

    // Create audit_logs table
    await db.schema.createTable('audit_logs', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.string('action').notNullable();
      table.uuid('user_id').references('id').inTable('users');
      table.uuid('target_id');
      table.text('details');
      table.jsonb('metadata');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });

    console.log('✅ Created audit_logs table');

    // Create notifications table
    await db.schema.createTable('notifications', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('type', ['match', 'claim', 'message', 'system', 'referral']).notNullable();
      table.string('title').notNullable();
      table.text('message').notNullable();
      table.string('emoji').defaultTo('🔔');
      table.uuid('item_id').references('id').inTable('items');
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    });

    console.log('✅ Created notifications table');

    // Create referrals table
    await db.schema.createTable('referrals', (table) => {
      table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
      table.uuid('referrer_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('referred_email').notNullable();
      table.enum('status', ['pending', 'active', 'rewarded']).defaultTo('pending');
      table.integer('reward').defaultTo(0);
      table.timestamps(true, true);
    });

    console.log('✅ Created referrals table');

    // Create site_settings table
    await db.schema.createTable('site_settings', (table) => {
      table.string('key').primary();
      table.jsonb('value').notNullable();
      table.timestamps(true, true);
    });

    console.log('✅ Created site_settings table');

    // Create indexes for performance
    await db.raw('CREATE INDEX idx_items_seller_id ON items(seller_id)');
    await db.raw('CREATE INDEX idx_items_status ON items(status)');
    await db.raw('CREATE INDEX idx_items_type ON items(type)');
    await db.raw('CREATE INDEX idx_items_category ON items(category)');
    await db.raw('CREATE INDEX idx_messages_item_id ON messages(item_id)');
    await db.raw('CREATE INDEX idx_messages_sender_id ON messages(sender_id)');
    await db.raw('CREATE INDEX idx_messages_receiver_id ON messages(receiver_id)');
    await db.raw('CREATE INDEX idx_notifications_user_id ON notifications(user_id)');
    await db.raw('CREATE INDEX idx_activities_user_id ON activities(user_id)');
    await db.raw('CREATE INDEX idx_reports_status ON reports(status)');

    console.log('✅ Created indexes');

    console.log('🎉 Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
