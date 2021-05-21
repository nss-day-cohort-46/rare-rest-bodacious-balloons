import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { UserProvider } from "./users/UserProvider"

export const Rare = (props) => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_token")) {
                return <>
                <UserProvider>
                    <NavBar />
                </UserProvider>
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("rare_user_token")) {
                return <Redirect to="/" />
            } else {
                return <Register {...props} />
            }
        }} />
    </>
)
