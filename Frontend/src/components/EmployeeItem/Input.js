import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveEmployeefromDatabase, saveEmployeeChanges } from "../../Redux/ActionCreator"
function Input({ Employee }) {

    const dispatch = useDispatch()

    // const [checked, setChecked] = useState(false)

    const handleCheckBox = (e) => {
        console.log(e.target.checked)
        // setChecked(e.target.checked)
        if (e.target.checked) {
            dispatch(saveEmployeefromDatabase({ ...Employee, Select: true }))
        }
        else {
            dispatch(saveEmployeefromDatabase({ ...Employee, Select: false }))
        }
    }
    return (
        <input type="checkbox" checked={Employee.Select} className='mx-3' onChange={handleCheckBox} />
    )
}
export default Input