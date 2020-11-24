const fs=require('fs');
//var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const router = express.Router()

const {check , validationResult}  = require('express-validator');
const e = require('express');
var cors = require('cors')

app.use(cors())

//reading JSON file
var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);

var dataLab5 = fs.readFileSync('Lab5-subject-data.json', 'utf8');
var lab5data = JSON.parse(data)

//serving static files 
app.use('/', express.static('static'))
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//making connection to the database
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://stan229:Cheer931@lab3.nggdc.mongodb.net/lab-5?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then((results) => app.listen(port))
.catch((err) => console.log(err));

//creating schema for schedule
const Schema = mongoose.Schema;
const timetableSchema = new Schema({
    name: {
        type: String,
    },
    course: { type : Array , "default" : [] },
    numCourses:{
        type: Number,
    }
})

const courseReviewSchema = new Schema({
    reviewID: {type: String},
    subject: {type: String},
    catalog_nbr: {type: String},
    hidden: {type: Boolean},
    review: {type: String},
    rating: {type: Number}
  
})

const Timetable = mongoose.model('Timetable', timetableSchema)
module.exports = Timetable;

const Review = mongoose.model('Review', courseReviewSchema)
module.exports = Review;

//create a review
router.post('/auth/makereview/', (req, res)=>{
    let data = req.body;
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        console.log(data)
        const review = new Review(data)
        review.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }
    }) 

//show all reviews for admin
router.get('/admin/showreview', (req, res) =>{
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

//show all non hidden reviews to the user
router.get('/auth/showreview/',(req, res) =>{
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

//setting flag to hidden or clear hidden flag
router.put('/admin/togglereview', (req, res)=>{
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
      




//creates new schedule
router.post('/schedule/make/', [
    check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape()
    ], (req, res)=>{
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
    name = req.body.name
    Timetable.findOne(({"name": name}), function (err, timetable) {
        if (err || timetable){ 
            res.status(404).send(`Already Exists`);
        }
        else{
        const timetable = new Timetable({ "name": name })
        timetable.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }
      }) 
    }  
})

//updating schedule pairs
router.put('/schedule/updatepairs/',[
    check('schedule').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({ min: 1, max:20 }).escape(),
    check('courseNum').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({ min: 1, max:20 }).escape(),
    check('courseId').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({ min: 1, max:20 }).escape(),
], (req, res) =>{
    var err = validationResult(req);
    if(!err.isEmpty){
        console.log(err.mapped())
    } else{
    schedule = req.body.schedule
    courseNum = req.body.courseNum
    courseId = req.body.courseId

    let numArr = courseNum.split(" ");
    let idArr = courseId.split(" ");
   
    let arr = [];
    Timetable.findOne(({"name": schedule}), function (err, timetable) {
        if (err || !timetable || timetable.length <= 0){ 
            res.status(404).send(`not found`);
        }
        else{ 
            for (let i = 0; i < numArr.length; i++){ 
                //only allowing the user to enter a valid timetable
                   
                if(numArr[i] != "" && idArr[i] !="" && newdata.find(p => p.subject === numArr[i] && p.catalog_nbr === idArr[i])){
                    arr.push({courseName: numArr[i], courseID: idArr[i]});
                }
            } 

            if(arr.length == numArr.length){
            if(!timetable.course) //not found create new pairs
            {
                for (let i = 0; i < numArr.length; i++){   
                timetable.course.push(arr);
                }
                timetable.save()
               
            }else//already exists update pairs
            {
              timetable.course = arr;
              timetable.save()
        
            }
            res.send(timetable) 
        }
        else{
            res.status(404).send(`not found`);
        }
        }
      })  
    } 
})

//search for a schedule and find the course pairs 
router.get('/schedule/find/:sched',(req, res) =>{
    name = req.params.sched
    newarr = []

    Timetable.findOne(({"name": name}), function (err, timetable) {
        if (err || !timetable || timetable.length <= 0 || timetable.course.length <= 0){
            res.status(404).send(`not found`);
        }
        else {
            for (i = 0; i < timetable.course.length; i++){
                const data = newdata.filter(p => p.subject === timetable.course[i].courseName && p.catalog_nbr === timetable.course[i].courseID)
                let arr = data.map(function(e){
                newarr.push({'subject': e.subject, 'catalogueNumber': e.catalog_nbr, 'course_info': e.course_info});
                })
                
            }
            res.send(newarr);
            
        }
      })  
})

//finds all schedules and how many courses they have
router.get('/schedule/show', (req, res) =>{
   Timetable.find(function (err, timetable) {
    if (err || !timetable || timetable.length <= 0){
        res.status(404).send(`not found`);
    }
    else {
        let arr = timetable.map(function(e){   
            return{
                name: e.name,
                courses: e.course.length,
            }
        })
        res.send(arr);
    
    }
  })
})

//deletes all schedules
router.delete('/schedule/del', (req, res) =>{
    Timetable.countDocuments(function (err, count) {
        if (!err && count === 0) {
            res.status(404).send(`not found`);
        }else{
            Timetable.deleteMany()
            .then((result) => res.send(result))
            .catch((err) => console.log(err) )
        }
    });
})

//deletes schedules with a certain name
router.delete('/schedule/delwithname/:name', (req, res) =>{
    console.log(req.body)
    const name = req.params.name
    Timetable.findOne(({"name": name}), function (err, timetable) {
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

app.use((req, res, next) =>{
    console.log(`${req.method} request for ${req.url}`);
    next()
})

//getting all the subject and class names
router.get('/',(req, res) => {
    array = []
    let arr = newdata.map(function(e){
        
        return{
            CourseId: e.subject,
            CourseName: e.className,
            
        }
    })
    res.send(arr)
   
    
})

//searching for a subject
router.get('/:subject', (req,res)=> {
    const subject = req.params.subject;

    if (newdata.find(p => p.subject === subject)){
    const data = newdata.filter(p => p.subject === subject)
    let arr = data.map(function(e){
        return{
            subject: e.subject,
            catalog_nbr: e.catalog_nbr,
            courseInfo: e.course_info
        }
    })
    res.send(arr) 
   
    }
    else {
        res.status(404).send(`Subject id ${subject} was not found `)
    }
})

//searching for a component
router.get('/:subject/:catalog_nbr/:ssr_component?', (req,res) =>{
    const subject = req.params.subject;
    const courseNum = req.params.catalog_nbr;
    const component = req.params.ssr_component;

    //if there is no component specified search for subject and coursenum
    if (!component && newdata.find(p => p.subject === subject && p.catalog_nbr === courseNum)){
        const data = newdata.filter(p => p.subject === subject && p.catalog_nbr === courseNum)
        let arr = data.map(function(e){
            return{
                courseInfo: e.course_info,
                catalog_nbr: e.catalog_nbr,
                subject: e.subject
            }
        })
        res.send(arr)
    }
    //if component specified seach through subject, coursenum and component
    else if (newdata.find(p =>  p.subject === subject && p.catalog_nbr === courseNum && p.course_info[0].ssr_component === component)){
    const data = newdata.filter(p => p.subject === subject && p.catalog_nbr === courseNum && p.course_info[0].ssr_component === component)
    let arr = data.map(function(e){
        return{
            courseInfo: e.course_info,
            catalog_nbr: e.catalog_nbr,
            subject: e.subject
        }
      })
    res.send(arr)
    }   

    else{
        res.status(404).send(`Subject id ${subject} was not found `);
    }
}
)

app.use('/api/', router)