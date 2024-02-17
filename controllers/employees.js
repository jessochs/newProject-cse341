const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('employees')
    .find()
    .toArray((err, lists) => {
      if(err) {
        res.status(400).json({ message: err});
    
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid id.');
  }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('employees')
      .find({ _id: userId})
      .toArray((err, result) => {
        if(err) {
          res.status(400).json({ message: err});
      
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
};

const createEmployee = async (req, res) => {
    const employee = {
      fname: req.body.fname,
      lname: req.body.lname,
      employeeId: req.body.employeeId,
      jobPosition: req.body.jobPosition,
      startDate: req.body.startDate,
      birthday: req.body.birthday,
      address: req.body.address
      
    };
    const response = await mongodb.getDb().db().collection('employees').insertOne(employee);
    if(response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred trying to create the employee.');
    }
};

const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You need a vaild id to update an employee.')
  }
    const userId = new ObjectId(req.params.id);
    const employee = {
        fname: req.body.fname,
        lname: req.body.lname,
        employeeId: req.body.employeeId,
        jobPosition: req.body.jobPosition,
        startDate: req.body.startDate,
        birthday: req.body.birthday,
        address: req.body.address
      };
    const response = await mongodb.getDb().db().collection('employees').replaceOne({_id: userId}, employee);
    console.log(response);
    if(response.modifiedCount > 0){
      res.status(204).send();

    } else {
      res.status(500).json(response.error || 'An error occurred trying to update the employee.');
    }
  
};

const toDelete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You need a valid id to delete an employee');
  }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('employees').deleteOne({_id: userId}, true);
    console.log(response);
      if(response.deletedCount > 0){
        res.status(200).send();
  
      } else {
        res.status(500).json(response.error || 'An error occurred trying to delete the employee.');
      }
};

module.exports = { getAll, getSingle, createEmployee, updateEmployee, toDelete};

