import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Seekr = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("s_token")) {
                return <>
                    {/* <Route component={NavBar} /> */}
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props}/>} />
        <Route path="/register" render={props => <Register {...props}/>} />
    </>
)
