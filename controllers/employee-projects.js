const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    mongodb
      .getDb()
      .db()
      .collection('employee_projects')
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
        .collection('employee_projects')
        .find({ _id: userId})
        .toArray((err, result) => {
          if(err) {
            res.status(400).json({ message: err});
        
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
        });
  };

const createProject = async (req, res) => {
    const project = {
      projectName: req.body.projectName,
      projectDate: req.body.projectDate,
      lead: req.body.lead
      
    };
    const response = await mongodb.getDb().db().collection('employee_projects').insertOne(project);
    if(response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred trying to create the project');
    }
};

const updateProject = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('You need a vaild id to update a project.')
    }
      const userId = new ObjectId(req.params.id);
      const project = {
        projectName: req.body.projectName,
        projectDate: req.body.projectDate,
        lead: req.body.lead
      };
      const response = await mongodb.getDb().db().collection('employee_projects').replaceOne({_id: userId}, project);
      console.log(response);
      if(response.modifiedCount > 0){
        res.status(204).send();
  
      } else {
        res.status(500).json(response.error || 'An error occurred trying to update the project.');
      }
    
};

const toDelete = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('You need a valid id to delete a project');
    }
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('employee_projects').deleteOne({_id: userId}, true);
      console.log(response);
        if(response.deletedCount > 0){
          res.status(200).send();
    
        } else {
          res.status(500).json(response.error || 'An error occurred trying to delete the project.');
        }
  };

  module.exports = { getAll, getSingle, createProject, updateProject, toDelete};