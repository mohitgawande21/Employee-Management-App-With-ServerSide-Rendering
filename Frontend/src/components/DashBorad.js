import React from 'react'
import Header from './Header/Header'
import Footer from "./Footer/Footer"
import EmployeeItemDefault from "./EmployeeItemDefault/EmployeeItemDefault"
const LazyEmployees = React.lazy(() => import("./Employees/Employees"))
export default function DashBorad({setCredentialValid}) {
  return (
    <>
      <Header setCredentialValid={setCredentialValid}/>
      <EmployeeItemDefault />  
      <LazyEmployees />
      <Footer />
    </>
  )
}
