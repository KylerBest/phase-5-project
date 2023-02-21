import "./SignUp.css"
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom"
import { UserContext } from "../App";

function SignUp(){
    const history = useHistory()
    const [credentials, setCredentials] = useState({
        type: "Client",
        name: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const {setUser} = useContext(UserContext)

    function onSignUp(e){
        e.preventDefault()
        setIsLoading(true)
        fetch('/create_account', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(user => {
                    setUser(user)
                    history.push('/home')
                })
            }else{
                r.json().then(e => setErrors(e.errors))
            }
    })
    }
    
    return(
        <form onSubmit={e => onSignUp(e)}>
            <h1>Sign Up</h1>
            <div className="type-tabs">
                <h3 className={credentials.type === 'Client' ? "active" : "inactive"} 
                onClick={() => {
                    setCredentials({...credentials, type:'Client'})
                    setErrors([])}}>Client</h3>
                <h3 className={credentials.type === 'Plumber' ? "active" : "inactive"} 
                onClick={() => {
                    setCredentials({...credentials, type:'Plumber'})
                    setErrors([])}}>Plumber</h3>
            </div>
            {credentials.type === 'Client' ? 
            <div className="credentials">
                <label htmlFor="name">Name:</label>
                <input type="text" value={credentials.name} onChange={e => setCredentials({...credentials, name: e.target.value})} placeholder="e.g. Liam Smith" id="name"/>
                <label htmlFor="phone">Phone:</label>
                <input type="text" value={credentials.phone} onChange={e => setCredentials({...credentials, phone: e.target.value})} placeholder="###-###-####" id="phone"/>
                <label htmlFor="address">Address:</label>
                <input type="text" value={credentials.address} onChange={e => setCredentials({...credentials, address: e.target.value})} placeholder="e.g. 123 Main St, Anytown, USA 12345" id="address"/>
                <label htmlFor="email">Email:</label>
                <input type="text" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} placeholder="e.g. john.doe@example.com" id="email"/>
                <label htmlFor="password">Password:</label>
                <input type="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} placeholder="Enter password" id="password"/>
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input type="password" value={credentials.password_confirmation} onChange={e => setCredentials({...credentials, password_confirmation: e.target.value})} placeholder="Confirm password" id="password_confirmation"/>
                {errors ? <ul>
                    {errors.map(e => <li key={e} className="error" >{e}</li>)}
                </ul> : <></>}
                <input className="submit" type="submit" value={isLoading ? 'Loading...' : 'Submit'}/>
            </div> : 
            <div className="credentials">
                <label htmlFor="name">Name:</label>
                <input type="text" value={credentials.name} onChange={e => setCredentials({...credentials, name: e.target.value})} placeholder="e.g. Liam Smith" id="name"/>
                <label htmlFor="phone">Phone:</label>
                <input type="text" value={credentials.phone} onChange={e => setCredentials({...credentials, phone: e.target.value})} placeholder="###-###-####" id="phone"/>
                <label htmlFor="email">Email:</label>
                <input type="text" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} placeholder="e.g. john.doe@example.com" id="email"/>
                <label htmlFor="password" >Password:</label>
                <input type="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} placeholder="Enter password" id="password"/>
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input type="password" value={credentials.password_confirmation} onChange={e => setCredentials({...credentials, password_confirmation: e.target.value})} placeholder="Confirm password" id="password_confirmation"/>
                {errors ? <ul>
                    {errors.map(e => <li key={e} className="error" >{e}</li>)}
                </ul> : <></>}
                <input className="submit" type="submit" value={isLoading ? 'Loading...' : 'Submit'}/>
            </div>}
                <p>Already have an account? <Link to="/sign_in">Sign in.</Link></p>
        </form>
    )
}

export default SignUp