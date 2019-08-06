const express = require('express')
const passport = require('passport')
const Plant = require('../models/plant')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

router.get('/plants', (req, res, next) => {
  Plant.find()
    .then(plants => {
      return plants.map(plant => plant.toObject())
    })
    .then(plants => res.status(200).json({ plants: plants }))
    .catch(next)
})

router.get('/plants/:id', (req, res, next) => {
  Plant.findById(req.params.id)
    .then(handle404)
    .then(plant => res.status(200).json({ plant: plant.toObject() }))
    .catch(next)
})

router.delete('/plants/:id', requireToken, (req, res, next) => {
  Plant.findById(req.params.id)
    .then(handle404)
    .then(plant => {
      // needs the req to get the user to compare against the owner of the book resource
      requireOwnership(req, plant)
      plant.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/plants/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.plant.owner
  Plant.findById(req.params.id)
    .then(handle404)
    .then(plant => {
      requireOwnership(req, plant)
      return plant.update(req.body.plant)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/plants', requireToken, (req, res, next) => {
  req.body.plant.owner = req.user.id
  Plant.create(req.body.plant)
    .then(plant => {
      res.status(201).json({ plant: plant.toObject() })
    })
    .catch(next)
})

module.exports = router
