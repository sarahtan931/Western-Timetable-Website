const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const fs = require('fs');
const stringSimilarity = require('string-similarity');
const {check , validationResult}  = require('express-validator');

var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);


const Users = mongoose.model('Users');
const Timetable = mongoose.model('Timetables');
const Review = mongoose.model('Review');

//POST new user route (optional, everyone has access)
router.post('/register', [
  check("email").normalizeEmail().isEmail()
], auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  //const user = req.body;

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
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',  failureRedirect: '/login' }));

router.post('/login', auth.optional, (req, res, next) => {
 const { body: { user } } = req;
  if(!user.email) {
    return res.status(404).send('Error');
  }
  if(!user.password) {
    return res.status(404).send('Error');
  }
return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
     return res.status('404').send('Error')
    }
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      console.log(user.getEmail())
      return res.send(user.toAuthJSON());
    }
    return status(400).info;
  })(req, res, next);
});

//search by keyword softmatch
router.get('/searchkeyword/:keyword', (req, res) => {
    keyword = req.params.keyword;
    keyword = keyword.replace(/\s/g, '');
    keyword = keyword.toString().toUpperCase();
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

//showing all reviews
router.get('/showreview/',(req, res) =>{
    newarr = [];
    Review.find(({"hidden": false}), function (err, review) {
        if (err || !review ){
            res.status(404).send(`not found`);
        }
        else {
              let arr = review.map(function(e) {
                newarr.push({
                "reviewID": e.reviewID,
                "subject": e.subject,
                "catalog_nbr": e.catalog_nbr,
                "review": e.review,
                "rating": e.rating
                  })
              })
              res.send(newarr);
            }    
    })           
})

router.get('/showschedule/',(req, res) =>{
    let newarr = []
    Timetable.find(({"hidden": false}), function (err, review) {
        if (err || !review ){
            res.status(404).send(`not found`);
        }
        else {
            review.map(function(e) {
                 newarr.push({
                    "owner": e.owner,
                    "name": e.name,
                    "description": e.description,
                    "date": e.date,
                  })
              })
              const sorted = newarr.sort((a, b) => b.date - a.date) 
              sorted.slice(0, 10);
              res.send(sorted);
            }    
    })           
})

router.get('/allcourses',(req, res) => {
    array = []
    let arr = newdata.map(function(e){
        return{
            subject: e.subject,
            className: e.className,
            course_info: e.course_info[0]  
        }
    })
    res.send(arr)  
})

router.get('/:subject/:catalog_nbr/', (req,res) =>{
    let subject = req.params.subject;
    let courseNum = req.params.catalog_nbr;
    //converting it to uppercase to make the search case insensitive
    subject = subject.toUpperCase();
    courseNum = courseNum.toUpperCase();
    let newarr = []

    //making sure the course number is a valid size
    if(courseNum.length < 4){
        res.status(404).send(`Please send a valid course number`);
    }
    //if there is no component specified search for subject and coursenum
    else if (newdata.find(p => p.subject.includes(subject) && p.catalog_nbr.includes(courseNum))){
        const data = newdata.filter(p => p.subject.includes(subject) && p.catalog_nbr.includes(courseNum))
        Review.find(({"subject": subject,"catalog_nbr": courseNum, "hidden": false}), function (err, review) 
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
                reviews: newarr
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