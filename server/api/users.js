const router = require('express').Router()
const {User} = require('../db/models')
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

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './user/profileUpload/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, req.params.userName + '-' + file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 5
//   // },
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['accountSetUp','userName','id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const edit = req.body;
    const update = await User.update(edit, {
      where: {
        id: req.params.id
      }
    })
    res.json(update);
  } catch (err) {
    next(err);
  }
})

router.post("/:id", upload.single('photo'), (req, res, next) => {
  console.log('router hit!')
  if(!req.file) return next();
  const gcsname = req.params.id + '-' + req.file.originalname;
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
  User.update({profilePicture: path}, {
    where: {
      id: req.params.id
    }
  }).then(() => {
      // console.log(result);
      res.status(201).redirect('/updateuser')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
