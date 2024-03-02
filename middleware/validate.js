const validator = require('../helpers/validate');
const saveEmployee = (req, res, next) => {
    const validateRoute = {
        fname: 'required|string',
        lname: 'required|string',
        employeeId: 'required|string',
        jobPosition: 'required|string',
        startDate: 'required|string',
        birthday: 'string',
        address: 'required|string'
    };
    validator(req.body, validateRoute, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        
        }
    });
};

const saveProject = (req, res, next) => {
    const validateRoute = {
        projectName: 'required|string',
        projectDate: 'required|string',
        lead: 'required|string'
        
    };
    validator(req.body, validateRoute, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        
        }
    });
};


module.exports = {
    saveEmployee,
    saveProject
};