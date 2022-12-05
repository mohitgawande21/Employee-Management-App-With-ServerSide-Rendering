import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRegisterUsertoDatabase, registerUser } from "../../Redux/ActionCreator"
import { Link, useNavigate } from "react-router-dom"
const { v4: uuidv4 } = require('uuid')
export default function RigisterUser() {

    const Register_User = useSelector((state) => {
        return state.Register_User
    })

    const [addUserData, setaddUserData] = useState({
        name:'',
        email:'',
        password:''
    })

    const addUser = (e) => {
        e.preventDefault()
        setaddUserData({
            ...addUserData, [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const AddUser = (e) => {
        e.preventDefault()
        dispatch(addRegisterUsertoDatabase({ ...addUserData, id: uuidv4() }))
        // dispatch(registerUser({...addUserData,id:uuidv4()}))
        navigate('/login')
    }

    const AlreadyUser = (e) =>{
        e.preventDefault()
        navigate('/login')
    }
    return (
        <div className=' d-inline-flex justify-content-center align-item-center '>
            <div className='bg-white p-4 mx-3 ' >
                <div className='d-flex justify-content-center flex-column align-item-center'>
                    <h5 className=''>Rgister User</h5>
                    <label>Name</label>
                    <input value={addUserData.name} type="text" className='' onChange={(e) => addUser(e)} name="name" placeholder='Name' />
                    <label className='my-1'>Email</label>
                    <input value={addUserData.email} type="text" onChange={(e) => addUser(e)} name="email" placeholder="Email" />
                    <label>Password</label>
                    <input value={addUserData.password} type="text" className="" onChange={(e) => addUser(e)} name="password" placeholder="Password" />
                </div>
                <div className='d-flex  justify-content-center mx-3 p-2' >
                    <button type="submit" className=" mx-3 btn btn-primary mx-2 bg-success rounded-0" onClick={AddUser} >Register</button>
                    <div className='my-1'>OR</div>
                    <button type="submit" className=" mx-3 btn btn-primary mx-2 bg-success rounded-0" onClick={AlreadyUser}>Already have Account</button>
                </div>
            </div >

        </div>
    )
}
