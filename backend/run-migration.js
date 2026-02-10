const knex = require('knex');
const path = require('path');

// Database configuration
const dbConfig = {
  client: 'postgresql',
  connection: {
    connectionString: 'postgres://theftDB_owner:KpusAZ6j7STf@ep-frosty-rain-a5h9if13.us-east-2.aws.neon.tech/theftDB?sslmode=require',
    host: 'ep-frosty-rain-a5h9if13.us-east-2.aws.neon.tech',
    port: 5432,
    database: 'theftDB',
    user: 'theftDB_owner',
    password: 'KpusAZ6j7STf',
    ssl: {
      rejectUnauthorized: true,
    },
    schema: 'public',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

async function runMigration() {
  const db = knex(dbConfig);
  
  try {
    console.log('Starting migration...');
    
    // Check if columns already exist
    const hasProductAvailibility = await db.schema.hasColumn('products', 'productAvailibility');
    const hasSize = await db.schema.hasColumn('products', 'size');
    
    if (!hasProductAvailibility) {
      console.log('Adding productAvailibility column...');
      await db.schema.table('products', table => {
        table.boolean('productAvailibility').defaultTo(true);
      });
      console.log('✅ productAvailibility column added successfully');
    } else {
      console.log('⚠️ productAvailibility column already exists');
    }
    
    if (!hasSize) {
      console.log('Adding size column...');
      await db.schema.table('products', table => {
        table.string('size').nullable();
      });
      console.log('✅ size column added successfully');
    } else {
      console.log('⚠️ size column already exists');
    }
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await db.destroy();
  }
}

runMigration(); 