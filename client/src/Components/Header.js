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
                <Link to='/home' 
                    data-tooltip={user.type === "Client" ? 
                    "View jobs you've requested. Track their progress, edit their description/job-type, or cancel them." 
                    : "View jobs you're involved in. Update a job's status, complete jobs, or leave them."} 
                    className={'tab' + (location.pathname === '/home' ? ' active-tab' : ' inactive-tab')}
                >{user.type === "Client" ? 'Jobs' : 'Assignments'}</Link>
                {user.type === "Plumber" ? <Link to="/open_jobs" 
                    data-tooltip="View potential work. Accept requested jobs or join ongoing ones." 
                    className={'tab' + (location.pathname === "/open_jobs" ? ' active-tab' : ' inactive-tab')}
                >Open Jobs</Link> : <></>}
                {user.type === "Plumber" && user.manager ? <Link to="/manage_plumbers" 
                    data-tooltip="As a manager, you have the ability to view all plumber accounts and adjust their hourly pay." 
                    className={'tab' + (location.pathname === "/manage_plumbers" ? ' active-tab' : ' inactive-tab')} 
                >Manage Plumbers</Link> : <></>}
                {user.type === "Client" ? <Link to='/bills' 
                    data-tooltip="View and pay the associated bills from your completed job requests." 
                    className={'tab' + (location.pathname === '/bills' ? ' active-tab' : ' inactive-tab')}
                >Bills</Link> : <></>}
                {user.type === "Client" ? <Link to="/request" 
                    data-tooltip="Fill out a Request Form if you need plumbing done. Select the type of job and describe what needs to be done." 
                    className={'tab' + (location.pathname === '/request' ? ' active-tab' : ' inactive-tab')}
                >Request a job</Link> : <></>}
            </div>
        </header>
    )
}

export default Header