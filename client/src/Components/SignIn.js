import "./SignUp.css"
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom"
import { UserContext } from "../App";

function SignIn(){
    const history = useHistory()

    const [credentials, setCredentials] = useState({email: "", password: ""})
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const {setUser, setOpenJobs, setPlumbers} = useContext(UserContext)

    function onSignIn(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(user => {
                    setUser(user)
                    if(user.type === "Plumber"){
                        fetch('/open_jobs')
                        .then(r => {
                            if(r.ok){
                                r.json().then(jobs => {
                                    setOpenJobs(jobs)
                                    if(user.manager){
                                        fetch('/plumbers')
                                        .then(r => {
                                            if(r.ok){
                                                r.json().then(setPlumbers)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    history.push('/home')
                })
            }else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return(
        <form onSubmit={onSignIn}>
            <h1>Sign In</h1>
            <div className="credentials">
                <label htmlFor="email">Email:</label>
                <input id="email" type="text" placeholder="Enter email" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Enter password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
                {errors ? <ul>
                    {errors.map(e => <li key={e} className="error">{e}</li>)}
                </ul> : <></>}
                <input className="submit" type="submit" value={isLoading ? "Loading..." : "Sign in"} />
            </div>
            <p>Don't have an account? <Link to="/sign_up">Sign up.</Link></p>
        </form>
    )
}

export default SignIn