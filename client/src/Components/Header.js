import React, {useState, useContext} from "react";
import {UserContext} from "../App"
import {Link, useHistory} from "react-router-dom"
import "./Header.css"

function Header(){

    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const [page, setPage] = useState(history.location.pathname)


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
            <h1>{user.name} <p>{user.type}</p></h1>
            <button className="logout-button" onClick={() => onLogOut()}>Log Out</button>
            <div className="tabs">
                <Link to='/home' onClick={() => setPage('/home')} className={'tab' + (page == '/home' ? ' active-tab' : ' inactive-tab')}>My Jobs</Link>
                <Link to='/bills' onClick={() => setPage('/bills')} className={'tab' + (page == '/bills' ? ' active-tab' : ' inactive-tab')}>My Bills</Link>
            </div>
        </header>
    )
}

export default Header