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
    const albums = await Album.findAll({
      attributes: ['albumName', 'albumId','thumbnail', 'owner']
    })
    res.json(albums)
  } catch (err) {
    next(err)
  }
});

// router.get('/:albumName_or_id', async (req, res, next) => {
//   try {
//     console.log(req.params.albumName_or_id)
//     if(Number.isInteger(req.params.albumName_or_id)) {
//       const album = await Album.findAll({
//         where: {albumId: req.params.albumName_or_id}
//       })
//       res.json(album);
//     }
//     else {
//       const album = await Album.findAll({
//         where: {
//           albumName: req.params.albumName_or_id
//         }
//       })
//       res.json(album)
//     }
//   } catch (error) {
//     console.log('Could not fetch album');
//     console.log(error);
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    
      const album = await Album.findAll({
        where: {
          albumId: req.params.id
        }
      })
      res.status(201).json(album);
  } catch (error) {
    console.log('Could not GET album with id ' + req.params.id);
    console.log(error)
  }
})

// router.get('/name/:name', async (req, res, next) => {
//   try {
//     const album = Album.findAll({
//       where: {
//         albumName: req.params.name
//       }
//     })
//     res.status(201).json(album)
//   } catch (error) {
//     console.log('Could not GET album with name ' + req.params.name);
//     console.log(error)
//   }
// })

/**
 * API Endpoint: http://localhost:8080/api/albums
 *  POST: create a new album
 */
// router.route('/')
//   .post(function (req, res) {
//     var album = new Album();
//     if (req.body.albumName == undefined) {
//       album.albumName = album.albumId;
//     }
//     album.save(function (err, data) {
//       if (err) {
//         res.send(err);
//       }
//       res.send(data);
//     });
//   });


router.post('/', async (req, res, next) => {
  try {
    const newAlbum = await Album.create(req.body); 
    res.status(200).json(newAlbum)
  } catch (error) {
    res.status(500)
    next(error)
  }
})

/**
 *  API Endpoint: http://localhost:8080/api/:albumId
 *  POST: upload a thumbnail picture
 */
router.post("/:albumName", upload.single('thumbnail'), (req, res, next) => {
  if(!req.file) return next()
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
  Album.update({thumbnail: path}, {
    where: {
      albumName: req.params.albumName
    }
  }).then(result => {
    // console.log(result);
    res.status(201).json({
      message: "Upload thumbnail successfully"
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

router.put('/:id', async (req, res, next) => {
  try {
    const edit = req.body;
    const update = await Album.update(edit, {
      where: {
        albumName: req.params.id
      }
    })
    res.json(update);
  } catch (err) {
    next(err);
  }
})

router.put('/delete/:id', async (req, res, next) => {
  try {
    Album.destroy({where:{albumId: req.params.id}}) 
    res.status(200);
  } catch (error) {
    res.status(500);
    console.error(error)
    console.log("Could not delete album with id # " + req.params.id)
  }
})
