const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const { existTokenUser } = require('../../middleware/existToken')
const { isAuthUser } = require('../../middleware/isAuth')
const { existBox } = require('../../middleware/existBox')
const {
  create,
  confirmAccount,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar,
  buyBox
} = require('../../controllers/userController/userController')

ROUTER.post('/register', create) // NEW USER
ROUTER.put('/confirm-account/:id_user', confirmAccount) // CONFIRM - ACCOUNT
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', existTokenUser, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuthUser, profile) // PROFILE USER
ROUTER.put(
  '/update-avatar',
  isAuthUser,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR
ROUTER.put('/buy-box/:id_box', existBox, isAuthUser, buyBox)

module.exports = ROUTER
