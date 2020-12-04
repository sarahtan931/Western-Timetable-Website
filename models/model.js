const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const PolicySchema = new Schema({
  policyname: {type: String},
  policy: {type:String},
  date: {type: Date},
})

const DisputeSchema = new Schema({
  type: {type:String},
  details: {type: String},
  date: {type: Date}
})

const UsersSchema = new Schema({
  name: {type: String},
  active: {type: Boolean},
  email: {type: String},
  hash: {type: String},
  salt: {type: String},
  role: {type: String}
});

const timetables = new Schema({
  owner: {type: String},
  name: {type: String},
  email: {type: String},
  timetable: { type : Array , "default" : [] },
  numCourses:{ type: Number},
  description: {type: String},
  date: {type: Date},
  editdate: {type: Date},
  hidden: {type: Boolean},
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

//these methods are from
// https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/
UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.getEmail = function() {
  return this.email 
}

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    role: this.role,
    email: this.email,
    id: this._id,
    name: this.name,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: 'Bearer ' + this.generateJWT(),
    role: this.role,
    name: this.name
  };
};

const Users = mongoose.model('Users', UsersSchema);
const Timetable = mongoose.model('Timetables', timetables);
const Review = mongoose.model('Review', courseReviewSchema);
const Policy = mongoose.model('Policy', PolicySchema)
const Dispute = mongoose.model('Dispute', DisputeSchema)

module.exports = Review;
module.exports = Timetable;
module.exports = Users;
module.exports = Policy;
module.exports = Dispute;
