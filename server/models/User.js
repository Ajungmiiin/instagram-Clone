const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Schema (구조)
const userSchema = new Schema({ // user의 구조
  username: { type: String, required: true, minLength: 3, maxLength: 100 }, 
  password: { type: String, minLength: 5 },
  salt: { type: String },
  email: { type: String, required: true, maxLength: 100 },
  fullName: { type: String },
  avatar: { type: String, default: 'default.png' },
  bio: { type: String },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.virtual('isFollowing', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'following',
  justOne: true
})

userSchema.methods.generateJWT = function() {
  return jwt.sign({ username: this.username }, process.env.SECRET);
}

// 비밀번호 암호화
userSchema.methods.setPassword = function(password) {
  this.salt = crypto
      .randomBytes(16).toString("hex");
  this.password = crypto
      .pbkdf2Sync(password, this.salt, 310000, 32, "sha256") 
      .toString("hex")
}

// 비밀번호 확인 메서드
userSchema.methods.checkPassword = function(password) { 
  const hashedPassword = crypto
      .pbkdf2Sync(password, this.salt, 310000, 32, "sha256")
      .toString("hex")
  return this.password === hashedPassword;
}

module.exports = mongoose.model("User", userSchema); // 모듈 내보내기 
