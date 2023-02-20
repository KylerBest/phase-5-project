import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./ClientJobsPage.css"

function ClientJobsPage(){

    const {user} = useContext(UserContext)

    return (
        <div className="job-page">
            <h1>My Jobs</h1>
            <div className="jobs-container">
                {user.jobs.length > 0 ? user.jobs.map(j => 
                <div key={j.id} className="job-listing">
                    <p>Job ID: {j.id}</p>
                    <p>Date requested: {j.created_at.slice(0, 10)}</p>
                    <p>Type: {j.type_of_work}</p>
                    <p>Description:</p>
                    <textarea disabled={true} value={j.description}/>
                    <p>Status: <span id="yellow">{j.status}</span></p>
                    <ul>Assigned plumbers:
                        {j.plumbers.map(p => <li>{p.name} - {p.phone}</li>)}
                    </ul>
                </div>)
                : <h1>Looks like you haven't had any jobs done. <Link to='/request'>Request one here.</Link></h1>}
            </div>
        </div>
    )
}

export default ClientJobsPage