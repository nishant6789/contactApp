const express = require('express')
const contactRoute = require('../service/contactService')
const router = express.Router()

router.get('/contacts', contactRoute.fetch)

router.get('/contacts/:id',contactRoute.fetchContactDetail)

router.post('/contacts', contactRoute.create)

router.put('/contacts/:id', contactRoute.updateContact)

router.delete('/contacts/:id', contactRoute.deleteContact)

module.exports = router



