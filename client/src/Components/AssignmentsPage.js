import React, {useContext} from "react";
import { UserContext } from "../App";
import {Link} from "react-router-dom"
import "./ClientJobsPage.css"

function AssignmentsPage(){

    const {user, setUser, openJobs, setOpenJobs} = useContext(UserContext)

    function statusColor(j){
        switch (j.status) {
        case "Accepted":
            return "green";
        case "In progress":
            return "yellow";
        case "Finished":
            return "blue";
        case "Canceled":
            return "red";
        default:
            return "orange";
        }
    }

    function handleStartJob(j){
        fetch(`/jobs/${j.id}/start`)
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
    }

    function handleFinishJob(j){
        fetch(`/jobs/${j.id}/finish`)
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
    }

    function handleLeaveJob(j){
        fetch(`/jobs/${j.id}/leave`)
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    setUser(user)
                    setOpenJobs([...openJobs, {...j, open_slots: j.open_slots + 1}])
                })
            }
        })
    }

    function handleAddSlot(j){
        fetch(`/jobs/${j.id}/add_slot`)
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
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
                    <ul className="plumbers">Assigned plumbers:
                        {j.plumbers.map(p => <li key={p.id}>{p.name} - {p.phone}</li>)}
                    </ul>
                    <p>Open Slots: {j.open_slots}</p>
                    {j.status === "Finished" ? <></> : <p>Need help? <button onClick={() => handleAddSlot(j)}>Add a slot</button></p>}
                    {j.status === "Finished" ? <></> : <button className="leave-button" onClick={() => handleLeaveJob(j)}>Leave job</button>}
                    {j.status === "Accepted" ? <button className="start button" onClick={() => handleStartJob(j)}>Start Job</button> : <></>}
                    {j.status === "In progress" ? <button className="finish button" onClick={() => handleFinishJob(j)}>Finish Job</button> : <></>}
                </div>)
                : <p>Looks like you haven't had any assignments. Looking for work? Find <Link to='/open_jobs'>open jobs.</Link></p>}
            </div>
        </div>
    )
}

export default AssignmentsPage