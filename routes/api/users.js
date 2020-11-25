const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

//const { Timetable } = require('../../app.js');
const Users = mongoose.model('Users');
const Timetable = mongoose.model('Timetables')

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

router.get('/auth/showschedule/:owner', auth.required ,(req, res) =>{
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

module.exports = router;