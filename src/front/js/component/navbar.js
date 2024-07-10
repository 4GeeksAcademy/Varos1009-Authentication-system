import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto ">
					{
						token ? <button className="btn btn-primary" onClick={handleLogout}>Logout</button>

							: <div><Link to="/signup" className="p-2">
								<button className="btn btn-primary">Signup</button>
							</Link>
								<Link to="/login">
									<button className="btn btn-primary">Login</button>
								</Link>
							</div>
							}
				</div>
			</div>
		</nav>
	);
};
