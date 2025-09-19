import { DataTypes, Sequelize } from 'sequelize';
import { MonumentInstance } from '../types/models';

export default (sequelize: Sequelize) => {
  const Monument = sequelize.define<MonumentInstance>('Monument', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Monument title is required.'
        },
        notEmpty: {
          msg: 'Monument title is required.'
        },
        len: {
          args: [3, 70],
          msg: 'Monument title must be between 3 and 70 characters.'  
        },
        noForbiddenWords(value: string) {
          const forbiddenWords = ['test', 'fake', 'demo', 'example'];
          if(forbiddenWords.some(word => value.toLowerCase().includes(word))) {
            throw new Error('Title contains forbidden words.');
          }
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Country is required.'
        },
        notEmpty: {
          msg: "Country is required."
        },
        len: {
          args: [2, 100],
          msg: "Country name must be between 2 and 100 characters."
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'City is required.'
        },
        notEmpty: {
          msg: "City is required."
        },
        len: {
          args: [2, 100],
          msg: "City name must be between 2 and 100 characters."
        }
      }
    },
    buildYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "Build year must be an integer."
        },
        min: {
          args: [-3000],
          msg: "Build year cannot be earlier than -3000."
        },
        max: {
          args: [new Date().getFullYear()],
          msg: `Build year cannot be in the future.`
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Picture URL is not valid."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 2000],
          msg: "Description cannot exceed 2000 characters."
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    validate : { 
      cityNotEqualsCountry(this: MonumentInstance) {
        if(this.city && this.country && this.city.toLowerCase() === this.country.toLowerCase()) {
          throw new Error("City and country must be different.");
        }
      }
    }
  });

  return Monument;
};
