import { ADD_EMPLOYEE, SEARCH_NAME, LOGIN, RGISTER_USER, LOGIN_USER, NUMBER, ALL_CHECKBOX, LOAD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, SAVE_EMPLOYEE, DELETE_EMPLOYEES } from "./ActionTypes"
import axios from 'axios'
export const addEmployee = (inpuDateAdd) => {
    return {
        type: ADD_EMPLOYEE,
        payload: inpuDateAdd
    }
}

export const deleteEmployee = (Id) => {
    return {
        type: DELETE_EMPLOYEE,
        payload: Id
    }
}

export const editEmployee = (Employee) => {
    return {
        type: EDIT_EMPLOYEE,
        payload: Employee
    }
}

export const saveEmployee = (inpuDataEdit) => {
    return {
        type: SAVE_EMPLOYEE,
        payload: inpuDataEdit
    }
}

export const deleteEmployees = (checkItem) => {
    return {
        type: DELETE_EMPLOYEES,
        payload: checkItem
    }
}


export const arrNo = (index) => {
    return {
        type: NUMBER,
        payload: index
    }
}

export const loadEmployee = (Employee_List) => {
    return {
        type: LOAD_EMPLOYEE,
        payload: Employee_List
    }
}
export const AllcheckedCheckbox = (Allchecked) => {
    return {
        type: ALL_CHECKBOX,
        payload: Allchecked
    }
}

export const registerUser = (inputUser) => {
    return {
        type: RGISTER_USER,
        payload: inputUser
    }
}

export const loginUser = (inputUser) => {
    return {
        type: LOGIN_USER,
        payload: inputUser
    }
}

export const SearchName = (inputName) => {
    return {
        type: SEARCH_NAME,
        payload: inputName
    }
}

export const login = (login) => {
    return {
        type: LOGIN,
        payload: login
    }
}

export const addRegisterUsertoDatabase = (inputdata) => {
    return (dispatch) => {
        axios(
            {
                method: 'post',
                url: 'http://localhost:2000/user/register',
                data: {
                    name: inputdata.name,
                    email: inputdata.email,
                    password: inputdata.password,
                }
            }
        );
        dispatch(registerUser(inputdata))
    }

}

export const loginUsertoDatabase = (inputdata) => {
    return async (dispatch) => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:2000/user/login',
            data: {
                name: inputdata.name,
                email: inputdata.email,
                password: inputdata.password,
            }
        });
        const { token, name } = await response.data
        dispatch(loginUser(inputdata))
        sessionStorage.setItem('tokenlocal', token)
        // sessionStorage.setItem('tokenlocal', token)
        sessionStorage.setItem('LoginTime', new Date().getTime())
        // setTimeout(()=>{
        //     const response =  axios({
        //         method: 'get',
        //         url: 'http://localhost:2000/employee',
        //     });
        //     dispatch(loadEmployee(response.data))
        // })
    }

}
export const addEmployeeFromDatabase = (inputdata) => {

    return (dispatch) => {

        axios(
            {
                method: 'post',
                url: 'http://localhost:2000/employee',
                data: {
                    name: inputdata.name,
                    email: inputdata.email,
                    address: inputdata.address,
                    phone: inputdata.phone,
                    Id: inputdata.id
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('tokenlocal')}`
                }
            }
        );
        dispatch(addEmployee(inputdata))
    }

}

export const loadEmployeefromDatabase = () => {

    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:2000/employee',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('tokenlocal')}`
                }
            });
            dispatch(loadEmployee(response.data))
        }
        catch (error) {
            console.log(window.navigator.onLine, error.response , error.code)
            if (window.navigator.onLine && error.response && error.code === "ERR_NETWORK") {
                // alert('Could Not Load The Data due to Server Error')
            } else {
                // alert('No internet connection or Invalid Credentials');
            }
        }
    }
}

export const deleteEmployeefromDatabase = (Id) => {
    return (dispatch) => {
        dispatch(deleteEmployee(Id))
        axios({
            method: 'delete',
            url: `http://localhost:2000/employee/${Id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('tokenlocal')}`
            }
        });
    }
}

export const deleteEmployeesfromDatabase = (Employee_List) => {
    return (dispatch) => {
        dispatch(deleteEmployees(Employee_List))
        Employee_List.map((item) => {
            if (item.Select === true) {
                axios({
                    method: 'delete',
                    url: `http://localhost:2000/employee/${item._id}`,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('tokenlocal')}`
                    }
                });
            }
            return 0

        })

    }
}

export const saveEmployeefromDatabase = (inpuDataEdit) => {
    return (dispatch) => {
        dispatch(saveEmployee(inpuDataEdit))
        axios({
            method: 'patch',
            url: `http://localhost:2000/employee/${inpuDataEdit._id}`,
            data: {
                name: inpuDataEdit.name,
                email: inpuDataEdit.email,
                address: inpuDataEdit.address,
                phone: inpuDataEdit.phone,
                Select: inpuDataEdit.Select
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('tokenlocal')}`
            }
        });
    }
}