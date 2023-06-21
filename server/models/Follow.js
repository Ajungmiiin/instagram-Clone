const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// 팔로워 데이터
const followSchema = new Schema({
  follower: { type: Schema.ObjectId, required: true, ref: 'User' },
  following: { type: Schema.ObjectId, required: true, ref: 'User' }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


module.exports = mongoose.model('Follow', followSchema);