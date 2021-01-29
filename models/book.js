const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  ShelfNumber: {
    type: Schema.Types.ObjectId,
    ref: 'Shelf'
  },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
});

module.exports = mongoose.model('Book', bookSchema);