const express = require('express')
const passport = require('passport')
const Pot = require('../models/pot')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

router.get('/pots', requireToken, (req, res, next) => {
  Pot.find({ owner: req.user.id })
    .then(pots => {
      return pots.map(pot => pot.toObject())
    })
    .then(pots => res.status(200).json({ pots: pots }))
    .catch(next)
})

// router.get('/pots/:id', (req, res, next) => {
//   Pot.findById(req.params.id)
//     .then(handle404)
//     .then(pot => res.status(200).json({ pot: pot.toObject() }))
//     .catch(next)
// })

router.delete('/pots/:id', requireToken, (req, res, next) => {
  Pot.findById(req.params.id)
    .then(handle404)
    .then(pot => {
      requireOwnership(req, pot)
      pot.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/pots/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.pot.owner
  Pot.findById(req.params.id)
    .then(handle404)
    .then(pot => {
      requireOwnership(req, pot)
      return pot.update(req.body.pot)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/pots', requireToken, (req, res, next) => {
  req.body.pot.owner = req.user.id
  Pot.create(req.body.pot)
    .then(pot => {
      res.status(201).json({ pot: pot.toObject() })
    })
    .catch(next)
})

module.exports = router
