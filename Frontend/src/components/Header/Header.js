import React, { useState } from 'react'
import { deleteEmployeesfromDatabase, SearchName, login } from '../../Redux/ActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
export default function Header() {

    const dispatch = useDispatch()
    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })

    const handleDeleteEmployees = () => {
        dispatch(deleteEmployeesfromDatabase(Employee_List))
    }
    const [searchName, setSearchNme] = useState('')
    const searchWithInputName = (e) => {
        e.preventDefault()
        setSearchNme(e.target.value)
        console.log(searchName, searchName.length)
        dispatch(SearchName(e.target.value.trim()))
    }
    const clearInput = () => {
        setSearchNme('')
    }
    const navigate = useNavigate()
    const handleLogoutEmployee = (e) => {
        e.preventDefault()
        localStorage.setItem('tokenlocal', '')
        dispatch((login(false)))
        navigate('/register')
    }
    return (
        <div className=' bg-secondary d-flex flex-wrap justify-content-end align-items-center p-1 w-100'>
            <h6 className='my-1 ml-3 text-white flex-grow-1 '>Welcome {localStorage.getItem('name')}</h6>
            <h3 className='my-1 ml-3 text-white flex-grow-1 '> Manage Employees</h3>
            <div className=''>
                <input value={searchName} onChange={searchWithInputName} className='mx-3 rounded-2 p-1' placeholder='Search Name' />
                <button onClick={clearInput} className='border-0 bg-white' style={{ position: 'absolute', marginTop: '7px', marginLeft: '-40px' }}>X</button>
                <button onClick={() => handleDeleteEmployees()} type="submit" className="btn btn-danger my-1 rounded-0">- Delete</button>
                <Link to="/add">
                    <button type="submit" className="btn btn-success my-1 mx-2 rounded-0">+ Add Employee</button>
                </Link>
                <button onClick={handleLogoutEmployee} type="submit" className="btn btn-primary my-1 mx-2 rounded-0">Logout</button>
            </div>
        </div>
    )
}
