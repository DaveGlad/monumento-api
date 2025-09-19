import { DataTypes, Sequelize } from 'sequelize';
import { AnecdoteInstance } from '../types/models';

export default (sequelize: Sequelize) => {
  const Anecdote = sequelize.define<AnecdoteInstance>('Anecdote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Anecdote content cannot be empty" },
        len: { args: [10, 1000], msg: "Content must be between 10 and 1000 characters" }
      }
    },
    monument_id: {
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
    updatedAt: 'updated'
  });

  return Anecdote;
};
