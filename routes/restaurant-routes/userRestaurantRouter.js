const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const {
  tokenRecoveryPasswordRestaurant
} = require('../../middleware/tokenRecoveryPassword')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar
} = require('../../controllers/restaurant/userRestaurantController')
const { isAuthRestaurant } = require('../../middleware/isAuth')

ROUTER.post('/register/:restaurant', create) // NEW USER
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put(
  '/recovery-password/:token',
  tokenRecoveryPasswordRestaurant,
  newPassword
) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuthRestaurant, profile) // PROFILE USER
ROUTER.put(
  '/update-avatar',
  isAuthRestaurant,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR

module.exports = ROUTER
