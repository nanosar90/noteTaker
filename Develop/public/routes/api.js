const router =require('express').Router();
const fs = require('fs');
const uuid = require('uuid');



router
//read
.get('/', (req,res)=>{
    
    fs.readFile('./develop/db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
        }else res.json(JSON.parse(data));
    })

})

//create
.post('/', (req,res)=>{ 

    fs.readFile('./develop/db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
        }else {
            const notes = JSON.parse(data);
            notes.push({...req.body, id: uuid.v1()});
            fs.writeFile('./develop/db/db.json', JSON.stringify(notes), error => {
                console.log(error);
            })
        }
    })
   

})

//delete
.delete('/:id', (req,res)=>{
    fs.readFile('./develop/db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
        }else {
            const notes = JSON.parse(data);
            /* notes.push(req.body); */
            const index = notes.findIndex(note=>note.id===req.params.id)
            notes.splice(index, 1);
            fs.writeFile('./develop/db/db.json', JSON.stringify(notes), error => {
                console.log(error);
            })
        }
    })
});

module.exports = router;