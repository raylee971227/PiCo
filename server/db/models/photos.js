const Sequelize = require('sequelize');
const db = require('./../db');

const Photos = db.define('Photos',
{
	photoId:
	{
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},

	// //the albumId where the photo belong
	// albumId:
	// {
	//     type: Sequelize.INTEGER,
	//     AllowNull: false,
	//     notEmpty: true,
	//     references:
  //   	{
	//     	model: "Albums",
	//     	key: 'albumId',
	//     	deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   	}
  //   },
	photoPath: {
		type: Sequelize.STRING,
		AllowNull: true
	}
});

module.exports = Photos;
