const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const {check , validationResult}  = require('express-validator');
//importing models 
const Users = mongoose.model('Users');
const Review = mongoose.model('Review');

//showing all users
router.get('/showusers', passport.authenticate('jwt', { session: false }), (req, res) =>{
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
router.put('/setadmin', passport.authenticate('jwt', { session: false }),[
    check("email").normalizeEmail().isEmail() 
], (req, res)=>{
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
router.put('/setactive', passport.authenticate('jwt', { session: false }),[
    check("email").normalizeEmail().isEmail()  
], (req, res)=>{
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
router.put('/setdeactive', passport.authenticate('jwt', { session: false }),[
    check("email").normalizeEmail().isEmail() 
], (req, res)=>{
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