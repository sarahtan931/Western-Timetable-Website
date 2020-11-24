const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const router = express.Router()
const stringSimilarity = require('string-similarity');
const {check , validationResult}  = require('express-validator');
const e = require('express');
var cors = require('cors')
app.use(cors())

//reading JSON file
var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);

//serving static files 
app.use('/', express.static('static'))
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

const userSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type:String},
    activated: {type: Boolean}
})

const courseReviewSchema = new Schema({
    reviewID: {type: String},
    subject: {type: String},
    catalog_nbr: {type: String},
    hidden: {type: Boolean},
    review: {type: String},
    rating: {type: Number}
  
})

const Timetable = mongoose.model('Timetables', timetables)
module.exports = Timetable;

const User = mongoose.model('userSchema', userSchema)
module.exports = User;

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
router.post('/auth/makeschedule', [
    check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape(),
    check('owner').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max:20 }).escape()
    ], (req, res)=>{
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.mapped())
        res.status(404).send(`Not valid input`);
    } else {
        let courseNum = req.body.courseNum;
        let courseId = req.body.courseId;
        let name = req.body.name;
        let owner = req.body.owner;
        let description = req.body.description;
        let hidden = req.body.hidden;

    if (typeof hidden == "undefined"){
        hidden = true;
    }
    Timetable.countDocuments({"owner": owner}, function(err, count){
        console.log( "Number of course lists from ",owner, " ", count);
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
            if(numArr[i] != "" && idArr[i] !="" && newdata.find(p => p.subject === idArr[i] && p.catalog_nbr === numArr[i])){
                const data = newdata.filter(p => p.subject === idArr[i] && p.catalog_nbr === numArr[i])
                data.map(function(e){
                    newarr.push({
                        "classname": e.className,
                        "class_section": e.course_info[0].class_section,
                        "ssr_component":e.course_info[0].ssr_component,
                        "course_info": e.course_info[0],
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
            "timetable": newarr
         })
        
        schedule.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
        }
      }) 
    }  
})

//show schedules 
router.get('/auth/showschedule/:owner',(req, res) =>{
    let newarr = []
    owner = req.params.owner;
    Timetable.find(({"owner": owner}), function (err, review) {
        if (err || !review ){
            res.status(404).send(`not found`);
        }
        else {
              let arr = review.map(function(e) {
                 newarr.push({
                    "owner": e.owner,
                    "name": e.name,
                    "description": e.description,
                    "date": e.date,
                  })
              })
              const sorted = newarr.sort((a, b) => b.date - a.date)
              res.send(sorted);
            }    
    })           
})

//deletes schedules with a certain name
router.delete('/auth/schedule/del/:owner/:name', (req, res) =>{
    const name = req.params.name;
    const owner = req.params.owner;
    Timetable.findOne(({"owner":owner,"name": name}), function (err, timetable) {
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

//searching for a component
router.get('/open/:subject/:catalog_nbr/', (req,res) =>{
    let subject = req.params.subject;
    let courseNum = req.params.catalog_nbr;
    subject = subject.toUpperCase();
    courseNum = courseNum.toUpperCase();

    //making sure the course number is a valid size
    if(courseNum.length < 4){
        res.status(404).send(`Please send a valid course number`);
    }
    //if there is no component specified search for subject and coursenum
    else if (newdata.find(p => p.subject.includes(subject) && p.catalog_nbr.includes(courseNum))){
        const data = newdata.filter(p => p.subject.includes(subject) && p.catalog_nbr.includes(courseNum))
        let arr = data.map(function(e){
            return{
                classname: e.className,
                class_section: e.course_info[0].class_section,
                ssr_component:e.course_info[0].ssr_component,
                course_info: e.course_info[0],
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


app.use('/api/', router)