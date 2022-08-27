import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { arrNo } from "../../Redux/ActionCreator"
export default function Pagination() {
  const dispatch = useDispatch()

  const Employee_List = useSelector((state) => {
    return state.Employee_List
  })

  const Page_Limit = useSelector((state) => {
    return state.Page_Limit
  })

  const N = Math.ceil((Employee_List.length) / Page_Limit)

  const Arr = Array.from({ length: N }, () => Math.floor(Math.random() * N));

  const ArrIndex = useSelector((state) => {
    return state.ArrIndex
  })

  const sendArrIndex = (index) => {
    dispatch(arrNo(index))
    setPage(index)
  }

  const [page, setPage] = useState(ArrIndex)

  const previousPage = () => {
    setPage(pstate => page - 1)
    dispatch(arrNo(page - 1))
  }

  const nextPage = () => {
    setPage(pstate => page + 1)
    dispatch(arrNo(page + 1))
  }

  const bgStyle = {
    backgroundColor: "#00aaff"
  }

  return (
    <div className="">
      <button disabled={(ArrIndex === 1) ? true : false} className='btn mx-1 btn-outline-info text-dark border-0 rounded-0' onClick={() => previousPage()}>Previous</button>
      {Arr.map((ele, index) => {
        var val = (ArrIndex === index + 1)
        return <button key={index} style={val ? bgStyle : null} className='btn mx-1  text-dark border-light rounded-0' onClick={() => sendArrIndex(index + 1)}>{index + 1}</button>
      })}
      <button disabled={(ArrIndex === N || N === 0) ? true : false} className='btn btn-outline-info text-dark border-0 rounded-0' onClick={() => nextPage()}>Next</button>
    </div>
  )
}
