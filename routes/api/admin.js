const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
//const auth = require('../auth');
const {check , validationResult}  = require('express-validator');
const { nextTick } = require('process');
const jwt_decode = require('jwt-decode');
//importing models 
const Timetable = mongoose.model('Timetables');
const Users = mongoose.model('Users');
const Review = mongoose.model('Review');
const jwt = require('jsonwebtoken');

//checking the user role
/*
function userRole(req, res, next) {
    const email = req.decoded.email;
    if (email) {
      Users.find(({"email": email}),function (err, user){
        req.currentuser = user;
        if (err || !user || req.currentuser[0].role != "ADMIN"){
            res.status(404).send(`you do not have these permissions`); 
        } else{
            next();
        }
    })
}
}

//verifying the token
function verifyToken(req, res, next) {
   //var token = req.headers['x-access-token'];
   let token = req.cookies.access_token;
  // var token = req.decoded.token
   console.log(req.decoded.token)
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });   
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      var decoded = jwt_decode(token);
      req.decoded = decoded
      next();
    });
  }

const express = require('express')
const app = express()
app.use(userRole)*/

//showing all users
router.get('/showusers', passport.authenticate('jwt', { session: false }), (req, res) =>{
    console.log(req.decoded)
    Users.find(function (err, user){
        if (err || !user){
            res.status(404).send(`not found`); 
        }
        else{
            res.send(user)
        }
    })
})

//update user to be of type admin
router.put('/setadmin', passport.authenticate('jwt', { session: false }), (req, res)=>{
  //  var err = validationResult(req);
    let email = req.body.email;
    Users.findOne(({"email": email}), function (err, user) {
        if (err || !user || user.role == "ADMIN"){ 
            res.status(404).send(`User is already an admin`);
        }
         else{ 
        user.role = "ADMIN";
        user.save() 
        res.send(user) 
        }  
    })
}) 

//update user active status
router.put('/setactive', passport.authenticate('jwt', { session: false }), (req, res)=>{
    let email = req.body.email;
    Users.findOne(({"email": email}), function (err, user) {
        if (err || !user || user.active == true){ 
            res.status(404).send(`User is already active`);
        }
         else{  
        user.active = true;  
        user.save() 
        res.send(user) 
        }  
    })
}) 

//update user active status
router.put('/setdeactive', passport.authenticate('jwt', { session: false }), (req, res)=>{
     let email = req.body.email;
 
     Users.findOne(({"email": email}), function (err, user) {
         if (err || !user || user.active == false){ 
             res.status(404).send(`User is already deactivated`);
         }
          else{   
         user.active = false;   
         user.save() 
         res.send(user) 
         }  
     })
 }) 
  
router.get('/showreview', passport.authenticate('jwt', { session: false }), (req, res) =>{
    //console.log(req.user)
    Review.find(function (err, review) {
        if (err || !review || review.length <= 0){
            res.status(404).send(`not found`);
        }
        else {
            let arr = review.map(function(e){ return{
                reviewID: e.reviewID,
                subject: e.subject,
                catalog_nbr: e.catalog_nbr,
                hidden: e.hidden,
                review: e.review,
                rating: e.rating,
                date: e.date
            }
            })
            res.send(arr);
        }
    })
}) 

router.put('/togglereview', passport.authenticate('jwt', { session: false }), (req, res)=>{
    let review = req.body.review;
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        Review.findOne(({"reviewID": review}), function (err, review) {
            if (err || !review){ 
                res.status(404).send(`Cant find the review`);
            }
            else{
                if (review.hidden == true){ review.hidden = false;}
                else{ review.hidden = true;}
            review.save()
            .then((result) => res.send(result))
            .catch((err) => console.log(err))
            }
        })
    }
})

module.exports = router ;