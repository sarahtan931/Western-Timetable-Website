const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const express = require('express');
const app = express()
const fs = require('fs');
const stringSimilarity = require('string-similarity');
const {check , validationResult}  = require('express-validator');
var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);
const Users = mongoose.model('Users');
const Timetable = mongoose.model('Timetables');
const Review = mongoose.model('Review');
const Policy = mongoose.model('Policy');

//register a user
router.post('/register', [
  check("email").isEmail(),
  check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape()
], (req, res, next) => {
  const { body: { user } } = req;
  var err = validationResult(req);
  if (!err.isEmpty()) {
      res.status('404').send('please enter a valid email')
  } else {
  Users.findOne(({"email": user.email}), function (err, exists) {
    if (err || exists ){ 
        return res.status(404).send(`Already Exists`);
    }
    if (!user.email) {
      return res.status(422).send('Error')
    }
    if(!user.password) {
      return res.status(422).send('Error');
    }
    const finalUser = new Users({
      "name": user.name,
      "email": user.email,
      "active": true,
      "role": "BASIC"
    });
    finalUser.setPassword(user.password);
    finalUser.save();
    res.send(finalUser)
  })
}
});


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

//method to log in 
router.post('/login', (req, res, next) => {
 const { body: { user } } = req;
  if(!user.email) {
    return res.status(404).send('No email');
  }
  if(!user.password) {
    return res.status(404).send('no password');
  }
return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
     return res.status('404').send('Error')
    }
    if(passportUser.active == false){
      return res.status(422).send(new Error('User is deactive'))
    }
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.status(200).json({ success: true, token: "Bearer " + user.token, email: user.email, role: user.role, name: user.name});
    }
    return status(400).info;
  })(req, res, next);
});

//search by keyword softmatch
router.get('/searchkeyword/:keyword', (req, res) => {
  keyword = req.params.keyword;
  keyword = keyword.replace(/\s/g, '');
  keyword = keyword.toUpperCase();
  if (keyword.length > 4 && (newdata.find(p => stringSimilarity.compareTwoStrings(keyword, p.className) > .5))){
      const data = newdata.filter(p => stringSimilarity.compareTwoStrings(keyword, p.className) > .5)
      let arr = data.map(function(e){
        return{
          catalog_nbr: e.catalog_nbr,
          subject: e.subject
        }
      })
      res.send(arr)
      }
      else if (newdata.find(p => stringSimilarity.compareTwoStrings(keyword, p.catalog_nbr.toString()) > .8)) {
        {
        const data = newdata.filter(p => stringSimilarity.compareTwoStrings(keyword, p.catalog_nbr.toString()) > .8)
        let arr = data.map(function(e){
        return{
          catalog_nbr: e.catalog_nbr,
          subject: e.subject
        }
        })
        res.send(arr)
        }
      }
      else{   
        res.status(404).send(`not found`);
    }  
})

//shows all the lists
router.get('/showschedule/',(req, res) =>{
  let newarr = []
  Timetable.find(({"hidden": false}), function (err, timetable) {
    if (err || !timetable){
      res.status(404).send(`not found`);
    }
    else {
      timetable.map(function(e) {
        newarr.push({
          "owner": e.owner,
          "name": e.name,
          "description": e.description,
          "date": e.date,
          "courses": e.timetable.length,
          "timetables": e.timetable
        })
      })
      const sorted = newarr.sort((a, b) => b.date - a.date) 
      sorted.slice(0, 10);
      res.send(sorted);
      }    
  })           
})

//getting all policies
router.get(('/policies'), (req, res) => {
  Policy.find(function (err, policy) {
    if (err || !policy || policy.length <= 0){
        res.status(404).send(`not found`);
    }
    else {
         let arr = policy.map(function(e){   
            return{
                policyname: e.policyname,
                policy: e.policy,
                date: e.date,
            }
        })
        res.send(arr);
    
    }
  })

})
//search for a schedule and find the timetable
router.get('/schedule/find/:sched',(req, res) =>{
  name = req.params.sched
  let newarr = []

Timetable.findOne(({"name": name, "hidden":false}), function (err, list) {
  if (err || !list || list.length <= 0 || list.timetable.length <= 0){
      res.status(404).send(`not found`);
  }
  else {
    console.log(list)
    for (i = 0; i < list.timetable.length; i++){
              newarr.push({
              'classname': list.timetable[i].classname,
              'catalog_nbr': list.timetable[i].catalog_nbr,
              'subject': list.timetable[i].subject,
              'class_section': list.timetable[i].class_section,
              'ssr_component': list.timetable[i].ssr_component,
              'descrlong': list.timetable[i].descrlong,
              'class_section': list.timetable[i].class_section,
              'start_time': list.timetable[i].start_time,
              'end_time': list.timetable[i].end_time,
              'campus': list.timetable[i].campus,
              'days': list.timetable[i].days
              });
          }
      res.send(newarr);
          
    }
    })  
})

//searching by subject and catalog_nbr
router.get('/findbyboth/:subject/:catalog_nbr/', (req,res) =>{
    let subject = req.params.subject;
    let courseNum = req.params.catalog_nbr;
    //converting it to uppercase to make the search case insensitive
    subject = subject.toUpperCase().toString();
    courseNum = courseNum.toUpperCase().toString();
    let newarr = []
  
    //making sure the course number is a valid size
    if(courseNum.length < 4){
        res.status(404).send(`Please send a valid course number`);
    }
    //if there is no component specified search for subject and coursenum
    else if (newdata.find(p => p.subject.includes(subject) &&  p.catalog_nbr.toString().includes(courseNum))){
        const data = newdata.filter(p => p.subject.includes(subject) &&  p.catalog_nbr.toString().includes(courseNum))
        Review.find(({"subject": subject,"catalog_nbr": data[0].catalog_nbr, "hidden": false}), function (err, review) 
        { review.map(function(e) {
              newarr.push({
              "name": e.name,
              "date": e.date,
              "review": e.review,
              "rating": e.rating
            })
        })   
        let arr = data.map(function(e){
            return{
                classname: e.className,
                class_section: e.course_info[0].class_section,
                ssr_component:e.course_info[0].ssr_component,
                course_info: e.course_info[0],
                catalog_nbr: e.catalog_nbr,
                subject: e.subject,
                reviews: newarr,
                start_time: e.course_info[0].start_time,
                end_time: e.course_info[0].end_time,
                descrlong: e.course_info[0].descrlong,
                campus: e.course_info[0].campus,
                days : e.course_info[0].days
            }
        }) 
        res.send(arr)
        })  
    }
    else{
        res.status(404).send(`Subject id ${subject} was not found `);
    }
}
)

router.get(('/reviews/:subject/:catalog_nbr'), (req,res) =>{
  let subject = req.params.subject;
  let catalog_nbr = req.params.catalog_nbr;
  let newarr = [];
  Review.find(({"subject": subject,"catalog_nbr": catalog_nbr, "hidden": false}), function (err, review) { 
        review.map(function(e) {
        newarr.push({
          "subject": e.subject,
          "catalog_nbr": e.catalog_nbr,
        "name": e.name,
        "date": e.date,
        "review": e.review,
        "rating": e.rating
      })
  }) 
  const sorted = newarr.sort((a, b) => b.date - a.date) 
  res.send(sorted)
  
})
  
})


//searching by subject
router.get('/findbysubject/:subject', (req,res) =>{
  let subject = req.params.subject;
  subject = subject.toUpperCase().toString();
  let newarr = []

  //if there is no component specified search for subject and coursenum
  if (newdata.find(p => p.subject.includes(subject))){
      const data = newdata.filter(p => p.subject.includes(subject))
      Review.find(({"subject": subject, "hidden": false}), function (err, review) 
      { review.map(function(e) {
            newarr.push({
            "name": e.name,
            "date": e.date,
            "review": e.review,
            "rating": e.rating
          })
      })   
      let arr = data.map(function(e){
          return{
              classname: e.className,
              class_section: e.course_info[0].class_section,
              ssr_component:e.course_info[0].ssr_component,
              course_info: e.course_info[0],
              catalog_nbr: e.catalog_nbr,
              subject: e.subject,
              reviews: newarr,
              start_time: e.course_info[0].start_time,
              end_time: e.course_info[0].end_time,
              descrlong: e.course_info[0].descrlong,
              campus: e.course_info[0].campus,
              days : e.course_info[0].days
          }
      }) 
      res.send(arr)
      })  
  }
  else{
      res.status(404).send(`Subject id ${subject} was not found `);
  }
}
)

//searching by catalog_nbr
router.get('/findbynum/:catalog_nbr/', (req,res) =>{
  let courseNum = req.params.catalog_nbr;
  courseNum = courseNum.toUpperCase().toString();
  let newarr = []

  //making sure the course number is a valid size
  if(courseNum.length < 4){
      res.status(404).send(`Please send a valid course number`);
  }
  //if there is no component specified search for subject and coursenum
  else if (newdata.find(p => p.catalog_nbr.toString().includes(courseNum))){
      const data = newdata.filter(p => p.catalog_nbr.toString().includes(courseNum))
      Review.find(({"catalog_nbr": data[0].catalog_nbr, "hidden": false}), function (err, review) 
      { review.map(function(e) {
            newarr.push({
            "name": e.name,
            "date": e.date,
            "review": e.review,
            "rating": e.rating
          })
      })   
      let arr = data.map(function(e){
          return{
              classname: e.className,
              class_section: e.course_info[0].class_section,
              ssr_component:e.course_info[0].ssr_component,
              course_info: e.course_info[0],
              catalog_nbr: e.catalog_nbr,
              subject: e.subject,
              reviews: newarr,
              start_time: e.course_info[0].start_time,
              end_time: e.course_info[0].end_time,
              descrlong: e.course_info[0].descrlong,
              campus: e.course_info[0].campus,
              days : e.course_info[0].days
          }
      }) 
      res.send(arr)
      })  
  }
  else{
      res.status(404).send(`Subject id ${subject} was not found `);
  }
}
)

module.exports = router;