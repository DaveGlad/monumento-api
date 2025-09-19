import { DataTypes, Sequelize } from 'sequelize';
import { FavoriteInstance } from './types/models';

export default (sequelize: Sequelize) => {
  const Favorite = sequelize.define<FavoriteInstance>('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    monumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Monuments',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'monumentId']
      }
    ]
  });

  return Favorite;
};
