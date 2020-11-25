const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
//const authUser = require('../auth')
const {check , validationResult}  = require('express-validator');
//const fs = require('fs');
//var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
//var newdata=JSON.parse(data);

const Timetable = mongoose.model('Timetables');
const Users = mongoose.model('Users');
const Review = mongoose.model('Review');

function authRole() {
    return (req, res, next) => {
        console.log(getUserFromHeaders)
      if (req.user.role !== "ADMIN") {
        res.status(401)
        return res.send('Not allowed')
      }
      next()
    }
}

//showing all users
router.get('/showusers', auth.required, (req, res) =>{
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
router.put('/updateadmin', (req, res)=>{
    var err = validationResult(req);
    let email = req.body.email;

    Users.findOne(({"email": email}), function (err, user) {
        if (err || !user){ 
            res.status(404).send(`not found`);
        }
         else{ 
        user.role = "ADMIN";
        user.save() 
        res.send(user) 
        }  
    })
}) 

//update user active status
router.put('/updateactive', (req, res)=>{
    var err = validationResult(req);
    let email = req.body.email;

    Users.findOne(({"email": email}), function (err, user) {
        if (err || !user){ 
            res.status(404).send(`not found`);
        }
         else{ 
            if (user.active == false){
                user.active = true;
            }else{
                user.active = false;
            }
       
        user.save() 
        res.send(user) 
        }  
    })
}) 
  
router.get('/showreview', auth.required, (req, res) =>{
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
                rating: e.rating}
            })
            res.send(arr);
        }
    })
}) 

router.put('/togglereview',auth.required, (req, res)=>{
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        Review.findOne(({"reviewID": "1"}), function (err, review) {
            if (err || !review){ 
                res.status(404).send(`Cant find the review`);
            }
            else{
                if (review.hidden == true){ review.hidden = false;}
                else{ review.hidden = true;}
            console.log('updating review')
            review.save()
            .then((result) => res.send(result))
            .catch((err) => console.log(err))
            }
        })
    }
})

module.exports = router ;