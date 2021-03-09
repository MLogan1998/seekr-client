import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Home } from "./home/Home"

import { ProfileProvider } from "./profile/ProfileProvider"
import { ProfileForm } from "./profile/ProfileForm"

import { EmployerProvider } from './employer/EmployerProvider'
import { CompanyForm } from "./company/CompanyForm"
import { EmployerProfileForm } from "./employer/EmployerProfileForm"

export const ApplicationViews = () => {
        return <>   
                    <ProfileProvider>
                        <EmployerProvider>
                            <Route exact path="/employerprofile" render={props => <EmployerProfileForm {...props} />} />
                            <Route exact path="/company" render={props => <CompanyForm {...props} />} />
                            <Route exact path="/profile" render={props => <ProfileForm {...props} />} />
                            <Route exact path="/home" render={props => <Home {...props} />} />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                        </EmployerProvider>
                    </ProfileProvider>
                </>
}
