const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const {check , validationResult}  = require('express-validator');
const fs = require('fs');
var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);
const Timetable = mongoose.model('Timetables');
const Users = mongoose.model('Users');
const Review = mongoose.model('Review');
const Policy = mongoose.model('Policy')

//show all the users schedules
router.get('/showschedule/:email', passport.authenticate('jwt', { session: false }), (req, res) =>{
    let newarr = []
    email = req.params.email;
    Timetable.find(({"email": email}), function (err, review) {
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
                    "hidden": e.hidden,
                    "timetables": e.timetable
                  })
              })
              const sorted = newarr.sort((a, b) => b.date - a.date)
              res.send(sorted);
            }    
    })           
})


//make a review
router.post('/makereview', passport.authenticate('jwt', { session: false }),[
    check('review').isLength({ min: 1, max:200 }).escape(),
    check('rating').isNumeric().isLength({min: 0, max:1})
],(req, res)=>{
    let subject = req.body.subject;
    let catalog_nbr = req.body.catalog_nbr;
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        if (newdata.find(p => p.subject == subject && p.catalog_nbr == catalog_nbr)){
        const review = new Review({
            "reviewID": Math.random().toString(36).substr(2, 9),
            "name": req.body.name,
            "subject": req.body.subject,
            "catalog_nbr": req.body.catalog_nbr,
            "hidden": req.body.hidden,
            "review": req.body.review,
            "rating": req.body.rating,
            "date": Date.now()
        })
        review.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }else{
            res.status(404).send("Please enter a valid timetable input")
        }
    }
}) 

//creates new schedule
router.post('/makeschedule', [
    check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape(),
    check('owner').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape(),
    check('description').isLength({ min: 0, max:100 }).escape()
    ], passport.authenticate('jwt', { session: false }), (req, res)=>{
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        console.log(req.body)
        let courseNum = req.body.courseNum.toUpperCase();
        let courseId = req.body.courseId.toUpperCase();
        let name = req.body.name;
        let owner = req.body.owner;
        let email = req.body.email
        let description = req.body.description;
        let hidden = req.body.hidden;

    if (typeof(hidden) == "undefined"){
        hidden = true;
    }
    Timetable.countDocuments({"owner": owner}, function(err, count){
        console.log( "Number of course lists from ",owner, " ", count+1);
        if (count > 20){
            res.status(404).send(`User has 20 timetables`);
        }
    })
    Timetable.findOne(({"name": name, "owner": owner}), function (err, timetable) {
        if (err || timetable || typeof courseNum == "undefined" || typeof courseId == "undefined"){ 
            res.status(404).send(`Already Exists`);
        }
        else{
        let numArr = courseNum.split(" ");
        let idArr = courseId.split(" ");
        let newarr = [];
        for (let i = 0; i < numArr.length; i++){ 
            //only allowing the user to enter a valid timetable        
            if(numArr[i] != "" && idArr[i] !="" && newdata.find(p => p.subject === idArr[i] && p.catalog_nbr.toString() === numArr[i])){
                const data = newdata.filter(p => p.subject === idArr[i] && p.catalog_nbr.toString() === numArr[i])
                data.map(function(e){
                    newarr.push({
                        "classname": e.className,
                        "class_section": e.course_info[0].class_section,
                        "ssr_component":e.course_info[0].ssr_component,
                        "descrlong": e.course_info[0].descrlong,
                        "start_time": e.course_info[0].start_time,
                        "end_time": e.course_info[0].end_time,
                        "campus": e.course_info[0].campus,
                        "days": e.course_info[0].days,
                        "catalog_nbr": e.catalog_nbr,
                        "subject": e.subject
                    });
                    })
            }
            else{
                res.status(404).send(`Please enter a valid timetable input`);
                return;
            }
        }
        const schedule = new Timetable({ 
            "owner": owner,
            "name": name,
            "description": description,
            "date": new Date(),
            "hidden": hidden,
            "email": email,
            "timetable": newarr
         })
        schedule.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }
      }) 
    }  
})

//update existing schedule
router.put('/updateschedule',  passport.authenticate('jwt', { session: false }),[
    check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape(),
    check('owner').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape(),
    check('description').isLength({ min: 0, max:100 }).escape()
    ], (req, res)=>{
    var err = validationResult(req);
    let name = req.body.name;
    let courseNum = req.body.courseNum.toUpperCase();
    let courseId = req.body.courseId.toUpperCase();
    let description = req.body.description;
    let hidden = req.body.hidden;
    let email = req.body.email;

    let numArr = courseNum.split(" ");
    let idArr = courseId.split(" ");
    let arr = []
    console.log(numArr)

    Timetable.findOne(({"name": name, "email": email}), function (err, timetable) {
        if (err || !timetable || timetable.length <= 0 || courseNum.length < 0 || courseId.length < 0 ){ 
            res.status(404).send(`not found`);
        }
         else{ 
            for (let i = 0; i < numArr.length; i++){   
                if(numArr[i] != "" && idArr[i] !="" && newdata.find(p => p.subject === idArr[i] && p.catalog_nbr.toString() === numArr[i])){
                   const data = newdata.filter(p => p.subject === idArr[i] && p.catalog_nbr.toString() === numArr[i])
                   data.map(function(e){
                       arr.push({
                        "classname": e.className,
                        "class_section": e.course_info[0].class_section,
                        "ssr_component":e.course_info[0].ssr_component,
                        "descrlong": e.course_info[0].descrlong,
                        "start_time": e.course_info[0].start_time,
                        "end_time": e.course_info[0].end_time,
                        "campus": e.course_info[0].campus,
                        "days": e.course_info[0].days,
                        "catalog_nbr": e.catalog_nbr,
                        "subject": e.subject
                       });
                       })
                }
                else{
                    res.status(404).send(`Please enter a valid timetable input`);
                    return;
                }
            }   
            timetable.timetable = arr;
            timetable.description = description;
            timetable.hidden = hidden;
            timetable.save() 
            res.send(timetable) 
            }  
        })
}) 

//delete a certain timetable
router.delete('/dellist/:email/:name',  passport.authenticate('jwt', { session: false }),(req, res) =>{
    const name = req.params.name;
    const email = req.params.email;
    Timetable.findOne(({"email":email,"name": name}), function (err, timetable) {
        if (err || !timetable || timetable.length <= 0){ 
            res.status(404).send(`not found`);
        }
        else{
        timetable.deleteOne({"name": name})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }
      })    
})

//showing timetables
router.get('/schedule/find/:sched/:email', passport.authenticate('jwt', { session: false }),(req, res) =>{
    name = req.params.sched
    email = req.params.email
    let newarr = []

  Timetable.findOne(({"name": name, "email": email}), function (err, list) {
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

module.exports = router ;