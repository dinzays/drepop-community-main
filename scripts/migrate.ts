import { migrate } from 'drizzle-orm/mysql2/migrator';
import db from '@/lib/db';

// Attempting to run migration
async function runMigration() {
    console.log('Running migrations...');
    try {
        // This will run migrations from the 'drizzle' directory
        await migrate(db, { migrationsFolder: 'drizzle' });
        console.log('Migrations completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
