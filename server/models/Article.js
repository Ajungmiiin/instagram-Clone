const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { DateTime } = require("luxon")


// 게시물 데이터
const articleSchema = new Schema({
  photos: [{ type: String, required: true }],
  description: { type: String },
  author:  {type: Schema.ObjectId, required:true, ref:'User' },
  favoriteCount: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

articleSchema.virtual('displayDate').get(function () { 
  return DateTime
    .fromJSDate(this.created)
    .toLocaleString(DateTime.DATE_MED);
})

// 컬렉션 조인 (댓글 갯수)
articleSchema.virtual('commentCount', {
  ref: 'Comment', 
  localField: '_id',
  foreignField: 'article',
  count: true
})

// 컬렉션 조인 (좋아요 데이터)
articleSchema.virtual('isFavorite', {
  ref: 'Favorite',
  localField: '_id',
  foreignField: 'article',
  justOne: true
})

module.exports = mongoose.model("Article", articleSchema);