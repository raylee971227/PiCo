const Albums = require('./albums')
const User = require('./user')
const Photos = require('./photos')

User.hasMany(Albums, {foreignKey: 'userName'});

// Albums.hasMany(Photos)

Photos.belongsTo(Albums, {foreignKey:'albumId'});

module.exports = {
  Albums,
  User,
  Photos
}

