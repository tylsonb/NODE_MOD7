'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { ToDo, User } = models
      // "UserId" -> llave foránea en ToDO
      User.hasMany(ToDo /* { foreignKey: 'llaveForanea' } */)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const formatDate = this.getDataValue("createdAt")
        // TODO: terminar de formatear la fecha
        return formatDate.getFullYear()
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};