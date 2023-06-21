const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// 댓글 데이터
const commentSchema = new Schema({
  content: { type: String },
  article: { type: Schema.ObjectId, required: true },
  author: { type: Schema.ObjectId, required: true, ref: 'User' }, 
  created: { type: Date, default: Date.now }, // 댓글의 생성일자(작성일)
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('Comment', commentSchema);