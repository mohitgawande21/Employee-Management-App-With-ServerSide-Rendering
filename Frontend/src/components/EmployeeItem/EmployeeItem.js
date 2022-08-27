import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEmployeefromDatabase } from '../../Redux/ActionCreator'
import { Link } from 'react-router-dom'
import Input from './Input'
import EditEmployee from '../Modal/EditEmployee/EditEmployee'
function EmployeeItem({ Employee }) {

    const dispatch = useDispatch()

    const handleDeleteEmployee = (Id) => {
        dispatch(deleteEmployeefromDatabase(Id))
    }
    const EmployeeItemStyle = {

        width: 'auto',

        // margin: 'auto'
    }
    const bg_color = {
        backgroundColor: Employee.Select ? "#c8c8d5" : "#f8f9fa"
    }

    return (
        <>
            <div style={bg_color} className='row'>
                <div className='col'><Input Employee={Employee} /></div>
                <div style={EmployeeItemStyle} className='col'> {Employee.name}</div>
                <div style={EmployeeItemStyle} className='col'> {Employee.email}</div>
                <div style={EmployeeItemStyle} className='col'> {Employee.address}</div>
                <div style={EmployeeItemStyle} className='col'> {Employee.phone}</div>
                <div className='col'>
                    <Link to={`/edit/${Employee._id}`}>
                        <button className="btn btn-outline-warning border-light mx-1" > <i className="fa-solid fa-pen" /></button>
                    </Link>
                    <button className="btn btn-outline-danger border-light" onClick={() => handleDeleteEmployee(Employee._id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>

        </>
    )
}
export default EmployeeItem