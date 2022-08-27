import React from 'react'
import { useSelector } from 'react-redux'
import Pagination from "../Pagination/Pagination"
export default function Footer() {

    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })

    const ArrIndex = useSelector((state) => {
        return state.ArrIndex
    })
    const Page_Limit = useSelector((state) => {
        return state.Page_Limit
    })

    let result = 0
    const checkresult = ((Employee_List.length) - (Page_Limit * ArrIndex))
    if (checkresult > 0) {
        result = Page_Limit
    }
    else {
        result = Page_Limit - Math.abs(checkresult)
    }
    return (
        <div className="mt-5" >
            <footer className="position-fixed bg-light bottom-0 start-0 d-flex flex-wrap justify-content-center align-items-center w-100 p-1">
                <div className="text-dark flex-grow-1">Showing {result} Out Of {Employee_List.length} Entires</div>
                <span>
                    © Copyright 23 May 2022 Author-Mohit Gawande
                </span>
                <div>
                    <Pagination />
                </div>
            </footer>
        </div>
    )
}
