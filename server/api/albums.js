const Album = require('../db/models/albums')
const router = require('express').Router()
const multer = require('multer')
module.exports = router


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
    cb(null, './album/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.param.userName + '-' + file.originalname);
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

router.get('/', async (req, res, next) => {
  try {
    const users = await Album.findAll({
      attributes: ['albumName', 'thumbnail']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.post("/",upload.single('thumbnail'),(req, res, next) => {
  var newAlbum = Album.create();
  if (req.body.albumName == null) {
    newAlbum.albumName = newAlbum.albumId;
  } else {
    newAlbum.albumName = req.body.albumName;
  }
  newAlbum.thumbnail = req.body.path;
  newAlbum.then(result => {
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
