import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./ClientJobsPage.css"

function ClientJobsPage(){

    const {user, setUser} = useContext(UserContext)

    function statusColor(j){
        switch(j.status){
            case "Requested":
                return "orange"
            case "Accepted":
                return "green"
            case "In progress":
                return "yellow"
            case "Finished":
                return "blue"
            case "Canceled":
                return "red"
        }
    }

    function cancelJob(j){
        fetch(`/jobs/${j.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
    }

    return (
        <div className="job-page">
            <h1>My Jobs</h1>
            <div className="jobs-container">
                {user.jobs.length > 0 ? user.jobs.map(j => 
                <div key={j.id} className="job-listing">
                    <p>Job ID: {j.id}</p>
                    <p>Location: {user.address}</p>
                    <p>Date requested: {j.created_at.slice(0, 10)}</p>
                    <p>Type: {j.type_of_work}</p>
                    <p>Description:</p>
                    <textarea disabled={true} value={j.description || ""}/>
                    <p>Status: <span id={statusColor(j)}>{j.status}</span></p>
                    {j.status === "Requested" ? <></> : 
                        <ul className="plumbers">Assigned plumbers:
                            {j.plumbers.map(p => <li key={p.id}>{p.name} - {p.phone}</li>)}
                        </ul>
                    }
                    {j.status === "Finished" ? <></> : <button className="cancel button" onClick={() => cancelJob(j)}>Cancel</button>}
                </div>)
                : <p>Looks like you haven't had any jobs done. <Link to='/request'>Request one here.</Link></p>}
            </div>
        </div>
    )
}

export default ClientJobsPage