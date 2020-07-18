const router = require('express').Router();
const Users = require("./auth-model")
const bcrypt = require("bcryptjs")
const getToken = require("./getToken")

router.post('/register', async (req, res, next) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash
  
  try{
    user = await Users.add(user)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  let { username, password } = req.body

  try {
    user = await Users.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getToken(user)
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token
      })
    } else {
      res.status(401).json({
        message: "Invalid credentials"
      })
    }
  } catch (err) {
    next(err)
  }
});

module.exports = router;
