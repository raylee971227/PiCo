const Photo = require('../db/models/photos')
const multer = require('multer')
const router = require('express').Router()
module.exports = router

//const Storage = require('@google-cloud/storage');

// Instantiate a storage client
//const storage = Storage();

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.params.albumId + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});
// const upload = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   },
//   fileFilter: fileFilter
// });


// A bucket is a container for objects (files).
//const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

/**
 * API Endpoint: http://localhost:8080/api/photo
 * Get all photo in the db
 */
router.get('/', async(req, res, next) => {
  try {
    const photo = await Photo.findAll({
      attributes: ['photoId','albumId','photoPath']
    })
    res.json(photo)
  } catch (err) {
    next(err)
  }
});

/**
 * API Endpoint: http://localhost:8080/api/photo
 * upload a picture to db
 */
router.post("/", upload.single('photo'), (req, res, next) => {
  console.log(req.file)
  Photo.create({albumId: req.body.albumId, photoPath:req.body.path})
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "upload photo successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


/**
 * API Endpoint: http://localhost:8080/api/photo
 * Get photo with photoId
 */
router.get('/:photoId', async (req, res, next) => {
  try {
    const photo = await Photo.findAll({
      where: {
        photoId: req.params.photoId
      }
    })
    res.json(photo)
  } catch (err) {
    next(err);
  }
});










