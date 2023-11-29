const router = require('express').Router();
const CreateUserController = require('../controllers/CreateUserController')

router.post('/createUser', CreateUserController.createUser);







module.exports = router
