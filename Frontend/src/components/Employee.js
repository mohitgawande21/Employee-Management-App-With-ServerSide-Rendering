import React, {useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={!logedIn?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <DashBorad/> </React.Suspense>} />

                    <Route path="/add" element={!logedIn?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <div style={Overlay}><LazyAddEmployee /></div> </React.Suspense>} />

                    <Route path="/edit/:id" element={!logedIn?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <div style={Overlay}><LazyEditEmployee /></div> </React.Suspense>} />

                    <Route path="*" element={<React.Suspense fallback={
                        <Spinner />}><div style={Overlay}><LazyPageNotFound /></div></React.Suspense>} />

                    <Route path="/register" element={logedIn?<Navigate to="/"/>:<div style={Overlay}> <RegisterUser /></div>} />

                    <Route path="/login" element={logedIn? <Navigate to="/"/>:<div style={Overlay}> <LoginUser /></div>} />
                </Routes>
                
            </Router>
        </>
    )
}
