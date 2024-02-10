const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('employees').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('employees').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
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

