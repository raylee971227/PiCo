const Albums = require('./albums')
const Users = require('./user')
const Photos = require('./photos')

Users.hasMany(Albums, {foreignKey: 'userName'});

// Albums.hasMany(Photos)

Photos.belongsTo(Albums, {foreignKey:'albumId'});

module.exports = {
  Albums,
  Users,
  Photos
}

