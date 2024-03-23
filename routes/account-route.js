const express = require('express')
const router = express.Router()
const { validationAccount, signUpAccount, signInAccount, signOutAccount, authenticationAccount, selectAccount, updateStatusAccount, updateUsername } = require('../controllers/account-controller')

router.post('/sign-up-validation', validationAccount)
router.post('/sign-up-account', signUpAccount)
router.post('/sign-in-account', signInAccount)
router.get('/sign-out-account', signOutAccount)
router.get('/authentication-account', authenticationAccount)
router.get('/select-account', selectAccount)
router.patch('/update-status-account/:email', updateStatusAccount)
router.patch('/update-username/:email', updateUsername)

module.exports = router