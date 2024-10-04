import { dataSource } from "./data-source";


const runMigration = async () => {
  try {
    await dataSource.initDatabase(); 
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

runMigration();