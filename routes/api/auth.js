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