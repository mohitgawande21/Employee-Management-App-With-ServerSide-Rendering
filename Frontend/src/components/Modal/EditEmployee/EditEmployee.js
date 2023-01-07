import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch, useParams,useNavigate } from 'react-router-dom'
import { saveEmployeefromDatabase} from '../../../Redux/ActionCreator'

export default function EditEmployee() {

    const params = useParams()
    // console.log('useParams',params)
    // const match = useMatch('/edit/:userId')
    // console.log('useMatch', match)

    // useEffect(()=>{
    //     // console.log('match',match)
    // },[])
    const dispatch = useDispatch()
    const Employee_List = useSelector((state) => {
        return state.Employee_List
    })
    
    const [inpuDataEdit, setInpuDataEdit] = useState({
        name:'',
        email:'',
        address:'',
        phone:'',
        idChecked:false})
    // useLayoutEffect(() => {
    //     Employee_List.map((item) => {
    //         if (item.Id === params.id) {
    //             setInpuDataEdit(item)
    //         }
    //         return 0
    //     })
    // }, [params.id])
    useEffect(()=>{
            Employee_List.map((item) => {
                if (item._id == params.id) {
                    setInpuDataEdit({...item,idChecked:true})
                }
                return 0
            })
    },[Employee_List.length,inpuDataEdit.idChecked])

    const inputOnchange = (e) => {
        e.preventDefault()
        setInpuDataEdit({
            ...inpuDataEdit, [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate()
    const saveEmployeeChanges = (e) => {
        e.preventDefault()
        dispatch(saveEmployeefromDatabase(inpuDataEdit))
        navigate('/')
    }
    
        return (
            <div className='flex-wrap d-inline-flex justify-content-center align-item-center  '>
                <form className='bg-white  w-100 p-4 '  onSubmit={saveEmployeeChanges}>
                    <div className=' d-flex justify-content-center flex-column align-item-center'>
                        <h5 >Edit Employee Details</h5>
                        <label>Name</label>
                        <input value={inpuDataEdit.name} type="text" className='' onChange={(e) => inputOnchange(e)} name="name" placeholder='Name' />
                        <label className='my-2' >Email</label>
                        <input value={inpuDataEdit.email} type="text" onChange={(e) => inputOnchange(e)} name="email" placeholder="Email" />
                        <label>Address</label>
                        <textarea value={inpuDataEdit.address} type="text" className="" onChange={(e) => inputOnchange(e)} name="address" placeholder="Address" />
                        <label className="my-2">Phone</label>
                        <input value={inpuDataEdit.phone} type="number" onChange={(e) => inputOnchange(e)} name="phone" placeholder="Phone" />
                    </div>
                    <div className='d-flex  justify-content-center mx-2 my-2' >
                        <Link to="/">
                            <div className="btn  mx-2 bg-white rounded-0" >Cancle</div>
                        </Link>
                        <button type="submit"  className="btn btn-primary  bg-success mx-2 rounded-0" >Save changes</button>
                    </div>
                </form >
            </div>
        )

}