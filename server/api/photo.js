const Photo = require('../db/models/photos')
const User = require('../db/models/user')
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

const upload = multer({
  storage: multer.MemoryStorage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
})
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
router.post("/:id/:userId", upload.array('photo'), (req, res, next) => {
  if(!req.files) return next();
  req.files.forEach((file) => {
    const gcsname = req.params.id + '-' + file.originalname;
    const blob = bucket.file(gcsname);
    const stream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on('error', (err) => {
      file.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', () => {
      file.cloudStorageObject = gcsname;
      file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });

    stream.end(file.buffer);
    const url = 'https://storage.googleapis.com/'+ bucketName+ '/' + gcsname;
    blob.makePublic().then(() => {
      res.status(200).send('Success!\n Image uploaded to:' + url);
    });
    Photo.create({albumId: req.params.id,photoPath:url})
      .then(() => {
        res.status(201).redirect(`/users/${req.params.userId}`)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  })
});

// router.post("/profilephoto/:id", upload.single('photo'), (req, res, next) => {
//   if(!req.file) return next();
//   const gcsname = req.file.originalname;
//   const blob = bucket.file(gcsname);
//   const stream = blob.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype
//     }
//   });

//   stream.on('error', (err) => {
//     req.file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname;
//     req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
//     next();
//   });

//   stream.end(req.file.buffer);
//   const path = 'https://storage.googleapis.com/'+ bucketName+ '/' + gcsname;
//   blob.makePublic().then(() => {
//     res.status(200).send('Success!\n Image uploaded to:' + path);
//   });
//   // Photo.create({albumId: req.body.albumId,photoPath:path})
//   //   .then(result => {
//   //     console.log(result);
//   //     res.status(201).json({
//   //       message: "upload photo successfully"
//   //     });
//   //   })
//   //   .catch(err => {
//   //     console.log(err);
//   //     res.status(500).json({
//   //       error: err
//   //     });
//   //   });
//   User.
// });


/**
 * API Endpoint: http://localhost:8080/api/photo/photoId
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

// Only delete the picture from the db. Photo still remains on the cloud
router.delete('/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    Photo.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
    //Photo.destroy({where: {photoId: req.params.id}})
  } catch (err) {
    next(err);
  }
})










