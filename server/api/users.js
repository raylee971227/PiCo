const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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