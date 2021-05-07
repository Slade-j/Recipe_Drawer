'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50] }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: { len: [60, 60] }
    },
    // defaultScope: {
    //   attributes: {
    //     exclude: ['hashedPassword']
    //   }
    // },
    // scopes: {
    //   currentUser: { attributes: { exclude: ['hashedPassword'] } },
    // }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
    User.hasMany(models.Book, { foreignKey: 'userId' });
  };

  User.prototype.toSafeObject = function() {
    const { id, username, createdAt } = this;
    return { id, username, createdAt };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.findByPk(id);
  };

  //this looks like it could use some cleaning...def refactoring
  User.login = async function ({ username, password }) {
    const user = await User.findOne({
      where: { username }
    });
    if (user && user.validatePassword(password)) {
      return await User.findByPk(user.id);
    }
  };

  User.signup = async function (signUpData) {
    const { username, password } = signUpData;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ username, hashedPassword });
    return await User.findByPk(user.id);
  };


  return User;
};
