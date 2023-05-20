const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "user"}
});

const Bot = sequelize.define('bot', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    group: {type: DataTypes.STRING, defaultValue: ""},
    status: {type: DataTypes.STRING},
    level: {type: DataTypes.INTEGER, defaultValue: 1},
    diamonds: {type: DataTypes.BIGINT, defaultValue: 200},
    stamina: {type: DataTypes.INTEGER, defaultValue: 120},
    power: {type: DataTypes.BIGINT, defaultValue: 4221},
    killedEnemies: {type: DataTypes.BIGINT, defaultValue: 0},
    guild: {type: DataTypes.STRING, defaultValue: ""},
    shiled: {type: DataTypes.INTEGER, defaultValue: 3}
});

const Resources = sequelize.define('resources', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    food: {type: DataTypes.INTEGER, defaultValue: 150000},
    rock: {type: DataTypes.INTEGER, defaultValue: 150000},
    wood: {type: DataTypes.INTEGER, defaultValue: 150000},
    ore: {type: DataTypes.INTEGER, defaultValue: 150000},
    gold: {type: DataTypes.INTEGER, defaultValue: 150000},
});

User.hasMany(Bot);
Bot.belongsTo(User);

Bot.hasOne(Resources);
Resources.belongsTo(Bot);

module.exports = {
    User, Bot, Resources
};