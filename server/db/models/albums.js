const Sequelize = require('sequelize');
const db = require('./../db');

const Albums = db.define('Albums', 
{
	//albumId, auto increments
	albumId:
	{
		type: Sequelize.INTEGER,
		AllowNull: false,
		notEmpty: true,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},

  albumName: {
	  type: Sequelize.STRING
  },

  thumbnail: {
    type: Sequelize.STRING
	}


  // // owner of the album
	// userName:
	// {
	//     type: Sequelize.STRING,
	//     AllowNull: false,
	//     notEmpty: true,
	//     references:
  //   	{
	//     	model: "Users",
	//     	key: 'userName',
	//     	deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   	}
  //   },

  //   //privacy field: wheather the album is public or private
  //   privacy:
  //   {
  //   	type: Sequelize.INTEGER,
  //   	AllowNull: false,
  //   	defaultValue: 1
  //   },

  //   //number of likes the album gets
  //   likes:
  //   {
  //   	type: Sequelize.INTEGER,
  //   	defaultValue: 0
  //   },
  //   //array of comments ids
  //   comments:
  //   {
  //   	type: Sequelize.ARRAY(Sequelize.BIGINT(11))
  //   },
  //   //User description about the album
  //   description:
  //   {
  //   	type: Sequelize.TEXT
  //   }

}, {
    timestamps: true,
    createdAt: 'albumCreateTime',
    updatedAt: 'albumsUpdateTime',
  });

module.exports = Albums;
