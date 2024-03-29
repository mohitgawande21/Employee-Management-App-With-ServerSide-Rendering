import { SEARCH_NAME, ADD_EMPLOYEE, LOGIN, RGISTER_USER, LOGIN_USER, NUMBER, ALL_CHECKBOX, LOAD_EMPLOYEE, DELETE_EMPLOYEE, SAVE_EMPLOYEE, DELETE_EMPLOYEES } from "./ActionTypes"

// const Employee_List_Local_Storage = localStorage.getItem("Employee_List_Local_Storage")
// Employee_List_Local_Storage ? JSON.parse(Employee_List_Local_Storage) :
const initialState = {
    Employee_List: [],
    ArrIndex: 1,
    Page_Limit: 10,
    AllCheckboxValue: {},
    Register_User: [],
    Login_User: [],
    Search_Name: '',
    Employee_List_Stored: [],
    logedIn: null

}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state, logedIn: action.payload
            }
        case LOGIN_USER:
            return {
                ...state, Login_User: [...state.Login_User, action.payload]
            }
        case RGISTER_USER:
            return {
                ...state, Register_User: [...state.Register_User, action.payload]
            }
        case LOAD_EMPLOYEE:
            return {
                ...state, Employee_List: action.payload, Employee_List_Stored: action.payload
            }
        case SEARCH_NAME:
            const SearchEmployee = state.Employee_List_Stored.filter((Employee) => {
                return Employee.name.toLowerCase().includes(action.payload.toLowerCase())
            })
            return {
                ...state, Employee_List: SearchEmployee
            }
        case ADD_EMPLOYEE:
            return {
                ...state, Employee_List: [...state.Employee_List, action.payload], Employee_List_Stored: [...state.Employee_List, action.payload]
            }

        case DELETE_EMPLOYEE:
            const remainingEmployee = state.Employee_List.filter((Employee) => {
                return Employee._id !== action.payload
            })
            return {
                ...state, Employee_List: remainingEmployee, Employee_List_Stored: remainingEmployee
            }

        case SAVE_EMPLOYEE:
            const SavedEmployee = state.Employee_List.map((Employee) => {
                if (Employee._id === action.payload._id) {
                    Employee = action.payload
                }
                return Employee
            })
            return {
                ...state, Employee_List: SavedEmployee, Employee_List_Stored: SavedEmployee
            }
        case DELETE_EMPLOYEES:
            var deletedEmployees = state.Employee_List.filter((Employee) => {
                return Employee.Select !== true
            })
            return {
                ...state, Employee_List: deletedEmployees, Checked_Items: [], Checked_Clear_Item: [], Employee_List_Stored: deletedEmployees
            }


        case NUMBER:
            return {
                ...state, ArrIndex: action.payload
            }
        case ALL_CHECKBOX: {
            return {
                ...state, AllCheckboxValue: action.payload
            }
        }
        default:
            return state;
    }
}