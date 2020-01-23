const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let List = new Schema({
   _id: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone: {
    type: String
  },
  dob: {
    type: Date
  },
  email: {
    type: String
  }
}, {
  collection: 'list'
})

module.exports = mongoose.model('List', List)
