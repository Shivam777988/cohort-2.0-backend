import React from 'react'
import "../style/form.scss";
import axios from "axios";
import { Link,useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Register() {
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
const navigate=useNavigate()
    const {user,handleRegister,loading}=useAuth()
    async function  handleFormSubmit(e) {
        e.preventDefault();
        await handleRegister(username,email,password)
      navigate("/")
    }
    if(loading){
        return(
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    return (
      <main>
        <div className="form-container">
            <h1>Register</h1>
                 <form onSubmit={handleFormSubmit}>
                            <input
                        onChange={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="text"
                        name='email'
                        placeholder='Enter email' />
                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button>Register</button>
                </form>
                <p>Already have an account?<Link className='toggleAuthForm'  to={"/login"}>Login</Link></p>
        </div>
      </main>
    )
}

export default Register
