import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Home } from "./home/Home"

import { UserProvider } from './auth/UserProvider';

import { ProfileProvider } from "./profile/ProfileProvider"
import { ProfileForm } from "./profile/ProfileForm"

import { EmployerProvider } from './employer/EmployerProvider'
import { CompanyForm } from "./employer/CompanyForm"
import { EmployerProfileForm } from "./employer/EmployerProfileForm"
import { JobListingForm } from './employer/JobListingForm'

import { SeekerSwipe } from './swipe/SeekerSwipe'

export const ApplicationViews = () => {
        return <>   
                    <UserProvider>
                        <ProfileProvider>
                            <EmployerProvider>
                                <Route exact path="/seekerswipe" render={props => <SeekerSwipe {...props} />} />  
                                <Route exact path="/joblisting" render={props => <JobListingForm {...props} />} />
                                <Route exact path="/employerprofile" render={props => <EmployerProfileForm {...props} />} />
                                <Route exact path="/company" render={props => <CompanyForm {...props} />} />
                                <Route exact path="/profile" render={props => <ProfileForm {...props} />} />
                                <Route exact path="/home" render={props => <Home {...props} />} />
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                            </EmployerProvider>
                        </ProfileProvider>
                    </UserProvider>
                </>
}
