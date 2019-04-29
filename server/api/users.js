const router = require('express').Router()
const {User} = require('../db/models')
const multer = require('multer')
module.exports = router


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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './user/profileUpload/');
  },
  filename: function(req, file, cb) {
    cb(null, req.params.userName + '-' + file.originalname);
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

router.post("/:id", upload.single('profilePic'), (req, res, next) => {
  User.create({userName: req.body.userName, email: req.body.email, profilePicture:req.body.path})
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Upload profile picture successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
