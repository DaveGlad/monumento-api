import { DataTypes, Sequelize } from 'sequelize';
import { UserInstance } from './types/models';

export default (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Username is required" },
        notEmpty: { msg: "Username cannot be empty" },
        len: { args: [3, 25], msg: "Username must be between 3 and 25 characters" }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password cannot be empty" },
        len: { args: [6, 100], msg: "Password must be at least 6 characters" },
      },
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
  });

  return User;
};
