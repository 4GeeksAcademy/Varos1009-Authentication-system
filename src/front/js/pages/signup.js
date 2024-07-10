import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const getIsFormValid = () => {
        return (
            email && password
        );
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        actions.signupUser({ email, password });
        alert("Account created!");
        clearForm();
        navigate("/login")
    };

    return (
        <div className="text-center">
                <div className=" mb-3">
                    <input type="email" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email" />
                </div>
            
            
                <div className="mb-3">
                    <input type="password" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password" />
               
            </div>
            
                <button
                    type="submit"
                    className="btn btn-primary  col-sm-2 col-12 my-3"
                    onClick={handleSubmit}
                    disabled={!getIsFormValid()}>
                        Register
                </button>
            
        </div>

    );
};

