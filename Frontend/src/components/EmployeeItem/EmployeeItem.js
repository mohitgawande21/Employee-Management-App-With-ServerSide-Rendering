import React, { memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEmployeefromDatabase } from '../../Redux/ActionCreator'
import { Link } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
function EmployeeItem({ Employee }) {

    const dispatch = useDispatch()

    const handleDeleteEmployee = (Id) => {
        dispatch(deleteEmployeefromDatabase(Id))
    }
    const EmployeeItemStyle = {

        width: 'auto',

        // margin: 'auto'
    }
    const bg_color = {
        backgroundColor: Employee.Select ? "#c8c8d5" : "#f8f9fa"
    }
    const inputCSS = {
        display: 'none',
        opacity: '0',
        position: 'absolute',
        zIndex: '-1',
    }
    const [file, setfile] = useState()
    const selectFile = (e) => {
        setfile(e.target.files[0])
    }
    const handleUploadClick = () => {

        if (!file) {
            return;
        }

        axios({
            method: 'patch',
            url: `http://localhost:2000/employee/${Employee._id}`,
            data: {
                file: { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified, lastModifiedDate: file.lastModifiedDate },
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenlocal')}`
            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                alert(`Uploaded ${percentCompleted + '%'}`)
            }
        });
    }

    return (
        <>
            <div style={bg_color} className='border-bottom border-top d-flex flex-wrap justify-content-end align-items-center h-50 p-2 '>
                <div className='col d-flex justify-content-center '><Input Employee={Employee} /></div>
                <div style={EmployeeItemStyle} className='col d-flex justify-content-center align-items-center'> {Employee.name}</div>
                <div style={EmployeeItemStyle} className='col d-flex justify-content-center align-items-center'> {Employee.email}</div>
                <div style={EmployeeItemStyle} className='col d-flex justify-content-center align-items-center'> {Employee.address}</div>
                <div style={EmployeeItemStyle} className='col d-flex justify-content-center align-items-center'> {Employee.phone}</div>
                <div style={EmployeeItemStyle} className='col d-flex justify-content-center align-items-center'>
                    <a href="#" className="text-center" >{Employee.file?.name}</a>
                </div>
                <div className='col d-flex justify-content-center'>
                    <Link to={`/edit/${Employee._id}`}>
                        <button className="btn btn-outline-warning border-light mx-1" > <i className="fa-solid fa-pen" /></button>
                    </Link>
                    <button className="btn btn-outline-danger border-light" onClick={() => handleDeleteEmployee(Employee._id)}><i className="fa-solid fa-trash"></i></button>
                    <label htmlFor={`${Employee._id}`} className="btn btn-outline-secondary border-light mb-0">
                        <i className="fa-solid fa-paperclip"></i>
                        <input onChange={selectFile} type="file" style={inputCSS} name="photo" id={`${Employee._id}`} />
                    </label>
                    <button onClick={handleUploadClick} className="btn btn-outline-light btn-primary" ><i className="fa fa-upload" ></i></button>
                </div>
            </div>

        </>
    )
}
export default EmployeeItem