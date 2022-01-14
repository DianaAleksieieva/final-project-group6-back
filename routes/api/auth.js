const express = require('express')

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiSignUpSchema, joiSignInSchema } = require("../../models/user");

const router = express.Router()

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.signup))

router.post('/signin', validation(joiSignInSchema), ctrlWrapper(ctrl.signin));

router.post("/signout", auth, ctrlWrapper(ctrl.signout));

module.exports = router
