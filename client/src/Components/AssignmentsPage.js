import React, {useContext} from "react";
import { UserContext } from "../App";
import {Link} from "react-router-dom"
import "./ClientJobsPage.css"

function AssignmentsPage(){

    const {user} = useContext(UserContext)

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

    return (
        <div className="job-page">
            <h1>My Assignments</h1>
            <div className="jobs-container">
                {user.jobs.length > 0 ? user.jobs.map(j => 
                <div key={j.id} className="job-listing">
                    <p>Job ID: {j.id}</p>
                    <p>Location: {j.client.address}</p>
                    <p>Date requested: {j.created_at.slice(0, 10)}</p>
                    <p>Type: {j.type_of_work}</p>
                    <p>Description:</p>
                    <textarea disabled={true} value={j.description || ""}/>
                    <p>Status: <span id={statusColor(j)}>{j.status}</span></p>
                    <ul>Assigned plumbers:
                        {j.plumbers.map(p => <li>{p.name} - {p.phone}</li>)}
                    </ul>
                </div>)
                : <p>Looks like you haven't had any assignments. Looking for work? Find it <Link to='/pending_requests'>here.</Link></p>}
            </div>
        </div>
    )
}

export default AssignmentsPage