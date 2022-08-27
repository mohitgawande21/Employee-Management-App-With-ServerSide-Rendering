import React from 'react'
import { deleteEmployeesfromDatabase } from '../../Redux/ActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function Header() {

    const dispatch = useDispatch()
    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })

    const handleDeleteEmployees = () => {
        dispatch(deleteEmployeesfromDatabase(Employee_List))
    }

    return (
            <div  className=' bg-secondary d-flex flex-wrap justify-content-end align-items-center h-50 p-2 w-100'>
                <h3 className='my-1 ml-3 text-white flex-grow-1 '> Manage Employees</h3>
                <div  className=''>
                    <button onClick={() => handleDeleteEmployees()} type="submit" className="btn btn-danger my-1 rounded-0">- Delete</button>
                    <Link to="/add">
                        <button type="submit" className="btn btn-success my-1 mx-2 rounded-0">+ Add Employee</button>
                    </Link>
                </div>
            </div>
    )
}
