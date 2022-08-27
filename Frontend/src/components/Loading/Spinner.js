import React from 'react'

export default function Spinner() {
    return (
        <div data-test="spinnerCompo" className='d-flex justify-content-center align-items-center my-3'>
            <div className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
    )
}
