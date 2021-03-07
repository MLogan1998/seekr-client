import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Home } from "./home/Home"

import { ProfileProvider } from "./profile/ProfileProvider"
import { ProfileForm } from "./profile/ProfileForm"

export const ApplicationViews = () => {
        return <>   
                    <ProfileProvider>
                        <Route exact path="/profile" render={props => <ProfileForm {...props} />} />
                        <Route exact path="/home" render={props => <Home {...props} />} />
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                    </ProfileProvider>
                </>
}
