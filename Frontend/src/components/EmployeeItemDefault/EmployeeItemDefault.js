import React, { useEffect, useState } from 'react'
import { loadEmployeefromDatabase, saveEmployeefromDatabase, AllcheckedCheckbox } from "../../Redux/ActionCreator"
import { useDispatch, useSelector } from 'react-redux'
export default function EmployeeItem() {

  const dispatch = useDispatch()
  const AllCheckboxValue = useSelector((state) => {
    return state.AllCheckboxValue
  })
  useEffect(() => {
    // localStorage.setItem("Employee_List_Local_Storage", JSON.stringify(Employee_List))
    dispatch(loadEmployeefromDatabase())
  }, [])
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

  // const [Allchecked, setAllchecked] = useState(false)
  // const [employee,setEmployee]=useState({})
  const handleCheckBox = (e) => {
    Employee_List.slice(firstIndex, lastindex + 1).map((Employee) => {
      if (e.target.checked) {
        // setAllchecked(true)
        // setEmployee({ ...Employee, Select: true, Allchecked: true })
        dispatch(AllcheckedCheckbox({ ...AllCheckboxValue, [`${ArrIndex}`]: true }))
        dispatch(saveEmployeefromDatabase({ ...Employee, Select: true, Allchecked: true }))
      }
      else {
        // setAllchecked(false)
        // setEmployee({ ...Employee, Select: true, Allchecked: false })
        dispatch(AllcheckedCheckbox({ ...AllCheckboxValue, [`${ArrIndex}`]: false }))
        dispatch(saveEmployeefromDatabase({ ...Employee, Select: false, Allchecked: false }))
      }
    })
  }

  return (
    <>
      <div>
        <div className='row p-2'>
          <input checked={AllCheckboxValue[ArrIndex]} type="checkbox" className='mx-3 col' onChange={handleCheckBox} />
          <div className='Employeeitem col'> <strong>Name</strong></div>
          <div className='Employeeitem col'> <strong>Email</strong></div>
          <div className='Employeeitem col'> <strong>Address</strong></div>
          <div className='Employeeitem col'> <strong>Phone</strong></div>
          <div className='Employeeitem col'> <strong>Action</strong></div>
        </div>
      </div>
      
    </>
  )
}
