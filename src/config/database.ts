import { Sequelize } from 'sequelize';
import UserModel from '../models/user';
import MonumentModel from '../models/monument';
import AnecdoteModel from '../models/anecdote';
import FavoriteModel from '../models/favorite';

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

// Initialize models
const User = UserModel(sequelize);
const Monument = MonumentModel(sequelize);
const Anecdote = AnecdoteModel(sequelize);
const Favorite = FavoriteModel(sequelize);

// Define relationships
Monument.hasMany(Anecdote, { foreignKey: 'monument_id', as: 'anecdotes' });
Anecdote.belongsTo(Monument, { foreignKey: 'monument_id', as: 'monument' });

// Many-to-Many relationship between User and Monument via Favorite
User.belongsToMany(Monument, { through: Favorite, foreignKey: 'userId', as: 'favoriteMonuments' });
Monument.belongsToMany(User, { through: Favorite, foreignKey: 'monumentId', as: 'favoriteUsers' });

// Database initialization function
const initDb = async (): Promise<boolean> => {
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

export {
  sequelize,
  initDb,
  User,
  Monument,
  Anecdote,
  Favorite
};
