import React, { useState } from 'react'
import Header from './Header/Header'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Footer from "./Footer/Footer"
import EmployeeItemDefault from "./EmployeeItemDefault/EmployeeItemDefault"
import { Overlay } from './OverlayStyle'
import Spinner from "./Loading/Spinner"
import RegisterUser from './RegisterUser/RegisterUser'
import LoginUser from './RegisterUser/LoginUser'
// import Employees from "./Employees/Employees"
// import AddEmployee from "./Modal/AddEmployee/AddEmployee"
// import EditEmployee from "./Modal/EditEmployee/EditEmployee"
// import PageNotFound from "./PageNotFound/PageNotFound"
import { Navigate  } from 'react-router-dom';
const LazyEmployees = React.lazy(() => import("./Employees/Employees"))
const LazyAddEmployee = React.lazy(() => import("./Modal/AddEmployee/AddEmployee"))
const LazyEditEmployee = React.lazy(() => import("./Modal/EditEmployee/EditEmployee"))
const LazyPageNotFound = React.lazy(() => import("./PageNotFound/PageNotFound"))

export default function Employee() {

    // !localStorage.getItem('tokenlocal')


    return (
        <>
            <Router>
                <Header />
                <EmployeeItemDefault />
                <Routes>
                    {/* <Route path="/" element={login?<div style={Overlay}> <RegisterUser /></div>: <React.Suspense fallback={
                        <Spinner />}> <LazyEmployees /> </React.Suspense>} /> */}

                    <Route path='/' element={!localStorage.getItem('tokenlocal')?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <LazyEmployees /> </React.Suspense>} />

                    <Route path="/add" element={!localStorage.getItem('tokenlocal')?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <div style={Overlay}><LazyAddEmployee /></div> </React.Suspense>} />

                    <Route path="/edit/:id" element={!localStorage.getItem('tokenlocal')?<Navigate  to="/register" /> :<React.Suspense fallback={
                        <Spinner />}> <div style={Overlay}><LazyEditEmployee /></div> </React.Suspense>} />

                    <Route path="*" element={<React.Suspense fallback={
                        <Spinner />}><div style={Overlay}><LazyPageNotFound /></div></React.Suspense>} />

                    <Route path="/register" element={localStorage.getItem('tokenlocal')?<Navigate to="/"/>:<div style={Overlay}> <RegisterUser /></div>} />

                    <Route path="/login" element={localStorage.getItem('tokenlocal')? <Navigate to="/"/>:<div style={Overlay}> <LoginUser /></div>} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}
