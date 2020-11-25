const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: String,
  active: Boolean,
  email: String,
  hash: String,
  salt: String,
  type: String
});

const timetables = new Schema({
  owner: {type: String},
  name: {type: String},
  timetable: { type : Array , "default" : [] },
  numCourses:{ type: Number},
  description: {type: String},
  date: {type: Date},
  editdate: {type: Date},
  hidden: {type: Boolean}
})

const courseReviewSchema = new Schema({
  reviewID: {type: String},
  name: {type: String},
  subject: {type: String},
  catalog_nbr: {type: String},
  hidden: {type: Boolean},
  review: {type: String},
  rating: {type: Number},
  date: {type: Date}
})


UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

const Users = mongoose.model('Users', UsersSchema);
const Timetable = mongoose.model('Timetables', timetables);
const Review = mongoose.model('Review', courseReviewSchema);

module.exports = Review;
module.exports = Timetable;
module.exports = Users;
