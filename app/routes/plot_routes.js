const express = require('express')
const passport = require('passport')
const Plot = require('../models/plot')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

router.get('/plots', requireToken, (req, res, next) => {
  Plot.find({ owner: req.user.id })
    .then(plots => {
      return plots.map(plot => plot.toObject())
    })
    .then(plots => res.status(200).json({ plots: plots }))
    .catch(next)
})

// router.get('/plots/:id', (req, res, next) => {
//   Plot.findById(req.params.id)
//     .then(handle404)
//     .then(plot => res.status(200).json({ plot: plot.toObject() }))
//     .catch(next)
// })

router.delete('/plots/:id', requireToken, (req, res, next) => {
  Plot.findById(req.params.id)
    .then(handle404)
    .then(plot => {
      requireOwnership(req, plot)
      plot.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/plots/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.plot.owner
  Plot.findById(req.params.id)
    .then(handle404)
    .then(plot => {
      requireOwnership(req, plot)
      return plot.update(req.body.plot)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/plots', requireToken, (req, res, next) => {
  req.body.plot.owner = req.user.id
  Plot.create(req.body.plot)
    .then(plot => {
      res.status(201).json({ plot: plot.toObject() })
    })
    .catch(next)
})

module.exports = router
