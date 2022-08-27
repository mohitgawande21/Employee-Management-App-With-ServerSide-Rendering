import React from 'react'
import Header from './Header/Header'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Footer from "./Footer/Footer"
import EmployeeItemDefault from "./EmployeeItemDefault/EmployeeItemDefault"
import { Overlay } from './OverlayStyle'
import Spinner from "./Loading/Spinner"
// import Employees from "./Employees/Employees"
// import AddEmployee from "./Modal/AddEmployee/AddEmployee"
// import EditEmployee from "./Modal/EditEmployee/EditEmployee"
// import PageNotFound from "./PageNotFound/PageNotFound"
const LazyEmployees=React.lazy(()=>import("./Employees/Employees"))
const LazyAddEmployee=React.lazy(()=>import("./Modal/AddEmployee/AddEmployee"))
const LazyEditEmployee=React.lazy(()=>import("./Modal/EditEmployee/EditEmployee"))
const LazyPageNotFound=React.lazy(()=>import("./PageNotFound/PageNotFound"))

export default function Employee() {
    return (
        <>
            <Router>
                <Header />
                <EmployeeItemDefault />
                <Routes>
                    <Route path="/" element={<React.Suspense fallback={
                    <Spinner/>}> <LazyEmployees /> </React.Suspense>} />

                    <Route path="/add" element={<React.Suspense fallback={
                    <Spinner/>}> <div style={Overlay}><LazyAddEmployee /></div> </React.Suspense>} />

                    <Route path="/edit/:id" element={<React.Suspense fallback={
                    <Spinner/>}> <div style={Overlay}><LazyEditEmployee /></div> </React.Suspense>} />
                    
                    <Route path="*" element={<React.Suspense fallback={
                    <Spinner/>}><LazyPageNotFound /></React.Suspense>} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}
