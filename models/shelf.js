const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 
const shelfSchema = new Schema({
  
  books : [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  qty : { type: Number, required: true },

  

});

module.exports = mongoose.model('Shelf', shelfSchema);