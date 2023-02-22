import React, {useContext} from "react";
import {UserContext} from "../App"
import {Link, useHistory, useLocation} from "react-router-dom"
import "./Header.css"

function Header(){

    const location = useLocation()
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    function onLogOut(){
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setUser(null)
                history.push('/sign_in')
            }
        })
    }

    return(
        <header>
            <h2>{user.name} <p>{user.type}</p></h2>
            <h1>Plumb and Proper</h1>
            <button className="logout-button" onClick={() => onLogOut()}>Log Out</button>
            <div className="tabs">
                <Link to='/home' className={'tab' + (location.pathname === '/home' ? ' active-tab' : ' inactive-tab')}>{user.type === "Client" ? 'Jobs' : 'Assignments'}</Link>
                {user.type === "Plumber" ? <Link to="/open_jobs" className={'tab' + (location.pathname === "/open_jobs" ? ' active-tab' : ' inactive-tab')}>Open Jobs</Link> : <></>}
                {user.type === "Plumber" && user.manager ? <Link to="/manage_plumbers" className={'tab' + (location.pathname === "/manage_plumbers" ? ' active-tab' : ' inactive-tab')} >Manage Plumbers</Link> : <></>}
                {user.type === "Client" ? <Link to='/bills' className={'tab' + (location.pathname === '/bills' ? ' active-tab' : ' inactive-tab')}>Bills</Link> : <></>}
                {user.type === "Client" ? <Link to="/request" className={'tab' + (location.pathname === '/request' ? ' active-tab' : ' inactive-tab')}>Request a job</Link> : <></>}
            </div>
        </header>
    )
}

export default Header