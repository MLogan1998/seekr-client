import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationViews } from './ApplicationViews';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { NavBar } from './navigation/NavBar';
import { UserProvider } from './auth/UserProvider';

export const Seekr = () => (
    <>
        <Route render={() => {
          if (localStorage.getItem('s_token')) {
            return <>
                    <UserProvider>
                      <Route component={NavBar} />
                      <Route render={(props) => <ApplicationViews {...props} />} />
                    </UserProvider>
                </>;
          }
          return <Redirect to="/login" />;
        }} />

        <Route path="/login" render={(props) => <Login {...props}/>} />
        <Route path="/register" render={(props) => <Register {...props}/>} />
    </>
);
