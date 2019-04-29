const Photo = require('../db/models/photos')
const {Storage} = require('@google-cloud/storage');
const multer = require('multer')
const router = require('express').Router()
const path = require('path')
module.exports = router


const gcs = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: './KEY.JSON'
});
const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

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
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, req.params.albumId + '-' + file.originalname);
//   }
// });
//
// const upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 5
//   // },
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// });

const upload = multer({
  storage: multer.MemoryStorage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
})


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
  if(!req.file) return next();
  const gcsname = req.params.albumId + '-' + req.file.originalname;
  const blob = bucket.file(gcsname);
  const stream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
  const path = 'https://storage.googleapis.com/'+ bucketName+ '/' + gcsname;
  blob.makePublic().then(() => {
    res.status(200).send('Success!\n Image uploaded to:' + path);
  });
  Photo.create({albumId: req.body.albumId,photoPath:path})
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
router.get('/:id', async (req, res, next) => {
  try {
    const photo = await Photo.findAll({
      where: {
        photoId: req.params.id
      }
    })
    res.json(photo)
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    Photo.destroy({where: {photoId: req.params.id}})
  } catch (err) {
    next(err);
  }
})










