const Photo = require('../db/models/photos')
const multer = require('multer')
const router = require('express').Router()
module.exports = router

//const Storage = require('@google-cloud/storage');

// Instantiate a storage client
//const storage = Storage();

const fileFilter = (req, file, cb) => {
  if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png')
  {
    cb(null, true);
  } else {
    cb(new Error('File type is not acceptable, upload failed'), false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
 // fileFilter: fileFilter
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

router.post("/", upload.single('photo'), (req, res, next) => {
  console.log(req.file)
  Photo.create({albumId: req.body.albumId, photoPath:req.body.path})
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created photo successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});






