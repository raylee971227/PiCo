const Album = require('../db/models/albums')
const router = require('express').Router()
const {Storage} = require('@google-cloud/storage');
const multer = require('multer')
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
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({
  storage: multer.MemoryStorage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await Album.findAll({
      attributes: ['albumName', 'albumId','thumbnail']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.post("/", upload.single('thumbnail'), (req, res, next) => {
  if(req.file){
    const gcsname = req.body.albumName + '-' + req.file.originalname;
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
      res.status(200).send('Success!\n profilePic uploaded to:' + path);
    });
  }
  console.log(req.body)
  var newAlbum = Album.create();
  if (req.body.albumName == null) {
    newAlbum.albumName = newAlbum.albumId;
  } else {
    newAlbum.albumName = req.body.albumName;
  }
  newAlbum.thumbnail = req.body.path;
  newAlbum.create()
    .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Created a new album"
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})
