import React from 'react'
const LazyHeader = React.lazy(() => import("./Header/Header"))
const LazyEmployeeItemDefault = React.lazy(() => import("./EmployeeItemDefault/EmployeeItemDefault"))
const LazyEmployees = React.lazy(() => import("./Employees/Employees"))
const LazyFooter = React.lazy(() => import("./Footer/Footer"))
export default function DashBorad({setCredentialValid}) {
  return (
    <>
      <LazyHeader setCredentialValid={setCredentialValid}/>
      <LazyEmployeeItemDefault />  
      <LazyEmployees />
      <LazyFooter />
    </>
  )
}
