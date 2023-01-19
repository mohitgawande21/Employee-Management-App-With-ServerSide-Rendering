import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadEmployee } from '../../Redux/ActionCreator'
const LazyEmployeeItem = React.lazy(() => import('../EmployeeItem/EmployeeItem'))
export default function Employees() {

  let Employee_List = useSelector((state) => {
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
  const dispatch = useDispatch()
  const positionRefDrag = useRef()
  const positionRefDrop = useRef()
  const clickToStartDrag = (e, index) => {
    positionRefDrag.current = index
  }
  const clickToStartDragEnter = (e, index) => {
    positionRefDrop.current = index
  }
  const clickToStartDropEnter = (e, index) => {

    const CopyListItem = [...Employee_List]

    const dragItemContent = CopyListItem[positionRefDrag.current]

    CopyListItem.splice(positionRefDrag.current, 1)
 
    CopyListItem.splice(positionRefDrop.current, 0,dragItemContent)

    positionRefDrag.current = null
    positionRefDrag.current = null

    Employee_List = CopyListItem
    dispatch(loadEmployee(CopyListItem))
  }
  return (

    <>
      {Employee_List.slice(firstIndex, lastindex + 1).map((Employee, index) => {
        return <span  key={index}
          onDragStart={(e) => clickToStartDrag(e, index)}
          onDragEnter={(e) => clickToStartDragEnter(e, index)}
          onDragEnd={(e) => clickToStartDropEnter(e, index)}
          draggable='true'><LazyEmployeeItem Employee={Employee} /></span>
      })}
    </>
  )
}
