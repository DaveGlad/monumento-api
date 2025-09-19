import { Sequelize } from 'sequelize';
import path from 'path';

// Database connection configuration
const sequelize = new Sequelize(
  'monumento',
  'root',
  'root',
  {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    logging: console.log
  }
);

// Database initialization function
export const initDb = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await sequelize.sync();
    console.log("Models have been synchronized with the database.");
    
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
};

export { sequelize };
