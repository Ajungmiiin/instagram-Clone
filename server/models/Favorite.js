const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// 좋아요 
const favoriteSchema = new Schema({
  user: { type: Schema.ObjectId, required: true },
  article: { type: Schema.ObjectId, required: true }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


module.exports = mongoose.model('Favorite', favoriteSchema)