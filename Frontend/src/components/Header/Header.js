import React, { useEffect, useState } from 'react'
import { deleteEmployeesfromDatabase, SearchName, login, AllcheckedCheckbox } from '../../Redux/ActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
export default function Header({ setCredentialValid }) {

    const dispatch = useDispatch()
    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })
    const ArrIndex = useSelector((state) => {
        return state.ArrIndex
    })
    const AllCheckboxValue = useSelector((state) => {
        return state.AllCheckboxValue
    })
    const handleDeleteEmployees = () => {
        dispatch(AllcheckedCheckbox({ ...AllCheckboxValue, [`${ArrIndex}`]: false }))
        dispatch(deleteEmployeesfromDatabase(Employee_List))
    }
    const [searchName, setSearchNme] = useState('')
    const searchWithInputName = (e) => {
        e.preventDefault()
        setSearchNme(e.target.value)
        dispatch(SearchName(e.target.value.trim()))
    }
    const clearInput = (e) => {
        setSearchNme('')
        dispatch(SearchName(e.target.value.trim()))
    }
    const navigate = useNavigate()
    const handleLogoutEmployee = (e) => {
        e.preventDefault()
        navigate('/register')
        sessionStorage.setItem('tokenlocal', '')
        setCredentialValid(true)
        dispatch((login(false)))
    }

    const [sTime, setCtime] = useState(new Date())
    const [leftT,setleftT] = useState(0)
    useEffect(() => {
        var timer = setInterval(()=>setCtime(new Date()), 1000 )
        return ()=> clearInterval(timer)
    },[]);
    useEffect(() => {
            let miliseconds = sTime.getTime() - sessionStorage.getItem('LoginTime')
            let minutes = Math.round(miliseconds / 60000);
            setleftT(60-minutes)
        if (minutes >= 60) {
            sessionStorage.setItem('tokenlocal', '')
            window.location.reload(false);
            return;
        }
    }, [sTime])
    return (
        <>
        <div className=' bg-secondary d-flex flex-wrap justify-content-end align-items-center p-1 w-100'>
            <h6 className='my-1 ml-3 text-white flex-grow-1 '>Current Time: {sTime.toLocaleTimeString()} <span className='text-warning' >Session expires After: {leftT} min</span></h6>
            <h3 className='my-1 ml-3 text-white flex-grow-1 '> Manage Employees</h3>
            <div className=''>
                <input value={searchName} onChange={searchWithInputName} className='mx-3 rounded-2 p-1' placeholder='Search Name' />
                {searchName.length > 0 ? <button onClick={clearInput} className='border-0 bg-white' style={{ position: 'absolute', marginTop: '7px', marginLeft: '-40px' }}>X</button> : ''}
                <button onClick={() => handleDeleteEmployees()} type="submit" className="btn btn-danger my-1 rounded-0">- Delete</button>
                <Link to="/add">
                    <button type="submit" className="btn btn-success my-1 mx-2 rounded-0">+ Add Employee</button>
                </Link>
                <Link to='/register'>
                    <button onClick={handleLogoutEmployee} type="submit" className="btn btn-primary my-1 mx-2 rounded-0">Logout</button>
                </Link>
            </div>
        </div>
        </>
    )
}
