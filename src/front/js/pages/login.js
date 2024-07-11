import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const handleLogin = () => {
        actions.login({ email: email, password: password });
        navigate('/profile')
        
    }

    return (
        <div>
            <div className="text-center mt-5">
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>

        </div>

    )
}