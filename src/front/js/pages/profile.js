import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";




export const Profile = () => {
    const { actions } = useContext(Context)
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            actions.getUser()
        }
    }, [])
    return (
        <div>{token ? <h1>My Profile</h1> : null}

        </div>
    )
}