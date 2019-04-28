const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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
