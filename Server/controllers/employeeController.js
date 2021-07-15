const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    let emp;
    if(req && req.body.length){
          importEmp = [];
          req.body.forEach(element => {
              console.log(element);
             emp = {
                name: element[0],
                position: element[1],
                office: element[2],
                salary: element[3],
            };
            importEmp.push(emp);
           
          });
          console.log(importEmp);
          Employee.insertMany(importEmp, function(err, doc) {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Import :' + JSON.stringify(err, undefined, 2)); }
        });

    }else{
         emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary,
        });
        emp.save((err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
        });
    }
   
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    let emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.useFindAndModify(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;