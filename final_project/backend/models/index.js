const sequelize = require('../config/db');
const User = require('./user.model');
const Task = require('./task.model');

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task };
