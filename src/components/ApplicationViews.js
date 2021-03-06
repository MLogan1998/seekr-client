import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Home } from "./home/Home"

export const ApplicationViews = () => {
        return <>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" render={props => <Home {...props} />} />
           </>
}
