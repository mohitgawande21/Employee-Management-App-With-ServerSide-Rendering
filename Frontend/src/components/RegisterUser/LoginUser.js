import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUsertoDatabase, loadEmployeefromDatabase, loginUser,login } from "../../Redux/ActionCreator"
import { Link, useNavigate } from "react-router-dom"
const { v4: uuidv4 } = require('uuid')
export default function LoginUser({setCredentialValid,credentialValid}) {

    const Login_User = useSelector((state) => {
        return state.Login_User
    })

    const [loginUserData, setloginUserData] = useState({
        name:'',
        email:'',
        password:''
    })

    const loginUserForm = (e) => {
        e.preventDefault()
        setloginUserData({
            ...loginUserData, [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const LoginUser = (e) => {
        e.preventDefault()
        dispatch(loginUsertoDatabase({ ...loginUserData, id: uuidv4() }))
        // dispatch(loginUser({...loginUserData,id:uuidv4()}))
        setTimeout(() => {
            if(sessionStorage.getItem('tokenlocal')){
                dispatch((login(true)))
            }else{
                dispatch((login(false)))
                setCredentialValid(false)
            }
        }, 200)
        navigate('/')
    }

    return (
        <div className=' d-inline-flex justify-content-center align-item-center '>
            <form className='bg-white p-4 mx-3 ' onSubmit={LoginUser}>
                <div className='d-flex justify-content-center flex-column align-item-center'>
                    <h5 className=''>Login User</h5>
                    <label>Name</label>
                    <input value={loginUserData.name} type="text" className='' onChange={(e) => loginUserForm(e)} name="name" placeholder='Name' />
                    <label className='my-1 '>Email</label>
                    <input value={loginUserData.email} type="text" onChange={(e) => loginUserForm(e)} name="email" placeholder="Email" />
                    <label>Password</label>
                    <input value={loginUserData.password} type="text" className="" onChange={(e) => loginUserForm(e)} name="password" placeholder="Password" />

                </div>
                <div className='d-flex  justify-content-center mx-3 p-2' >
                    <button type="submit" className=" mx-3 btn btn-primary mx-2 bg-success rounded-0"  >Login</button>
                </div>
            </form >
        </div>
    )
}
