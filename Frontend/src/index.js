import React from 'react'
import App from "./App"
import ReactDOM from 'react-dom/client'
import  {Provider}  from 'react-redux'
import { Store } from "./Store"
const ele = ReactDOM.createRoot(document.getElementById("root"))

ele.render(
    <Provider store={Store}>
        <App />
    </Provider>
)

