import React, {useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Overlay } from './OverlayStyle'
import Spinner from "./Loading/Spinner"
import RegisterUser from './RegisterUser/RegisterUser'
import LoginUser from './RegisterUser/LoginUser'
import { Navigate  } from 'react-router-dom';
import DashBorad from '../components/DashBorad'
import {  useSelector } from 'react-redux'
const LazyAddEmployee = React.lazy(() => import("./Modal/AddEmployee/AddEmployee"))
const LazyEditEmployee = React.lazy(() => import("./Modal/EditEmployee/EditEmployee"))
const LazyPageNotFound = React.lazy(() => import("./PageNotFound/PageNotFound"))

export default function Employee() {

    // !logedIn
    const logedIn = useSelector((state) => {
        return state.logedIn
      })
      const token=sessionStorage.getItem('tokenlocal') ? true :false
      const [credentialValid,setCredentialValid]=useState(true)

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={(logedIn||token)?<React.Suspense fallback={
                        <Spinner />}> <DashBorad setCredentialValid={setCredentialValid}/> </React.Suspense> : <Navigate  to="/register" /> } />

                    <Route path="/add" element={(logedIn||token)?<React.Suspense fallback={
                        <Spinner />}><>{ReactDOM.createPortal(<div style={Overlay}><LazyAddEmployee/></div>,document.getElementById('register-root'))} </></React.Suspense>:<Navigate  to="/register" /> } />

                    <Route path="/edit/:id" element={(logedIn||token)?<React.Suspense fallback={
                        <Spinner />}><>{ReactDOM.createPortal(<div style={Overlay}><LazyEditEmployee/></div>,document.getElementById('register-root'))} </></React.Suspense>:<Navigate  to="/register" /> } />

                    <Route path="*" element={<React.Suspense fallback={
                        <Spinner />}><div style={Overlay}><LazyPageNotFound /></div></React.Suspense>} />

                    <Route path="/register" element={(logedIn||token)?<Navigate to="/"/>:<>{ReactDOM.createPortal(<div style={Overlay}><RegisterUser setCredentialValid={setCredentialValid}  credentialValid={credentialValid}/></div>,document.getElementById('register-root'))} </>} />

                    <Route path="/login" element={(logedIn||token)? <Navigate to="/"/>:<>{ReactDOM.createPortal(<div style={Overlay}><LoginUser setCredentialValid={setCredentialValid} credentialValid={credentialValid}/></div>,document.getElementById('register-root'))} </>} />
                </Routes>
                
            </Router>
        </>
    )
}
