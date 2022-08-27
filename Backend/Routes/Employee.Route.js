const express = require('express')
const router = express.Router()
const Employees = require('../Models/Employee.Model')
// const tokenVerifyMiddleware=require('../Middleware/tokenVerify.Middleware')
//get request to get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employees.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//get request to get a employee
router.get('/:id', async (req, res) => {
    try {
        let finduserbyId = await Employees.findById(req.params.id)
        res.status(200).json(finduserbyId)
    } catch (err) {
        res.status(500).json(err.message )
    }
})

//post request to add new employee
router.post('/', async (req, res) => {
    const employee = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }
    const Employee = new Employees(employee)
    try {
        const createdEmployee = await Employee.save()
        res.status(201).json(createdEmployee)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

//patch request to update employee

router.patch('/:id',async (req, res) => {
    const employeeupdate = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }
    try {
        await Employees.updateOne({_id:req.params.id},{$set:employeeupdate},{upsert: true})
        res.status(200).send(`Empolyee with id :${req.params.id} is updated`)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

//delete request for one employee
router.delete('/:id', async (req, res) => {
    
    try {
        let findemployeebyId = await Employees.findById(req.params.id)
        await findemployeebyId.remove()
        res.send(`Empolyee with id :${req.params.id} is deleted`)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

module.exports = router