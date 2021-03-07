import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Seekr } from "./components/Seekr"
import "./styles/index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/components/flaticon.css'


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Seekr />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
