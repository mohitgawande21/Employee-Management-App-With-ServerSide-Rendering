import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployeeFromDatabase ,loadEmployeefromDatabase} from "../../../Redux/ActionCreator"
import { Link,useNavigate } from "react-router-dom"
const {v4 : uuidv4} = require('uuid')
export default function AddEmployee() {
    const Id = uuidv4()
    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })

    const [inpuDataAdd, setinpuDataEditAdd] = useState({
        name:'',
        email:'',
        address:'',
        phone:''
    })

    const inpuDataEditAdd = (e) => {
        e.preventDefault()
        setinpuDataEditAdd({
            ...inpuDataAdd, [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const AddEmployee = (e) => {
        e.preventDefault()
        dispatch(addEmployeeFromDatabase({...inpuDataAdd,id:Id,}, Employee_List))
        dispatch(loadEmployeefromDatabase())
        navigate('/')
    }
    return (
        <div className=' d-inline-flex justify-content-center align-item-center '>
            <form  className='bg-white p-4 mx-3 ' onSubmit={AddEmployee}>
                <div className='d-flex justify-content-center flex-column align-item-center'>
                    <h5 className=''>Add Employee Details</h5>
                    <label>Name</label>
                    <input value={inpuDataAdd.name} type="text" className='' onChange={(e) => inpuDataEditAdd(e)} name="name" placeholder='Name' />
                    <label className='my-1 '>Email</label>
                    <input value={inpuDataAdd.email} type="text" onChange={(e) => inpuDataEditAdd(e)} name="email" placeholder="Email" />
                    <label>Address</label>
                    <textarea value={inpuDataAdd.address} type="text" className="" onChange={(e) => inpuDataEditAdd(e)} name="address" placeholder="Address" />
                    <label className="my-1">Phone</label>
                    <input value={inpuDataAdd.phone} type="number" onChange={(e) => inpuDataEditAdd(e)} name="phone" placeholder="Phone" />
                </div>
                <div className='d-flex  justify-content-center mx-3 p-2' >
                    <Link to="/">
                        <div  className="btn  mx-3 bg-white rounded-0" >Cancle</div>
                    </Link>
                    <button type="submit" className=" mx-3 btn btn-primary mx-2 bg-success rounded-0"  >Add</button>
                </div>
            </form >
        </div>
    )
}
