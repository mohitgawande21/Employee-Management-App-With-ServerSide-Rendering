import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const LazyEmployeeItem = React.lazy(() => import('../EmployeeItem/EmployeeItem'))
export default function Employees() {

  const Employee_List = useSelector((state) => {
    return state.Employee_List.sort()
  })

  const Page_Limit = useSelector((state) => {
    return state.Page_Limit
  })

  const ArrIndex = useSelector((state) => {
    return state.ArrIndex
  })

  const [page, setPage] = useState(ArrIndex)

  useEffect(() => {
    setPage(ArrIndex)
  }, [ArrIndex])

  let firstIndex = (page - 1) * Page_Limit
  let lastindex = ((Page_Limit * page) - 1)

  return (
 
    <>
      {Employee_List.sort((x, y) => x._id - y._id).slice(firstIndex, lastindex + 1).map((Employee, index) => {
        return <LazyEmployeeItem key={Employee._id} Employee={Employee} />
      })}
    </>
  )
}
