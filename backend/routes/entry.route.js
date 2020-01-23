const express = require('express');
const app = express();
const entryRoute = express.Router();

let Entry = require('../model/List');
// Student model

// Add Student
entryRoute.route('/add-entry').post((req, res, next) => {
  Entry.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all student
entryRoute.route('/list').get((req, res,next) => {
  Entry.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single student
entryRoute.route('/read-entry/:id').get((req, res,next) => {
  Entry.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update student
entryRoute.route('/update/:id').put((req, res, next) => {
  Entry.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Entry was updated successfully')
    }
  })
})

// Delete student
entryRoute.route('/delete-entry/:id').delete((req, res, next) => {
  Entry.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = entryRoute;
