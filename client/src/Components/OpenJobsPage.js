import React, {useContext} from "react";
import { UserContext } from "../App";
import "./ClientJobsPage.css"

function OpenJobsPage(){
    const {setUser, openJobs, setOpenJobs} = useContext(UserContext)

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
    
    function handleAccept(j){
        fetch(`/jobs/${j.id}/accept`)
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    setOpenJobs(openJobs.filter(pr => pr.id !== j.id))
                    setUser(user)
                })
            }
        })
    }

    return (
        <div className="job-page">
            <h1>Open Jobs</h1>
            <div className="jobs-container">
                {openJobs.length > 0 ? openJobs.map(j => 
                <div key={j.id} className="job-listing">
                    <p>Client: {j.client.name}</p>
                    <p>Phone: {j.client.phone}</p>
                    <p>Type of work: {j.type_of_work}</p>
                    <p>Address: {j.client.address}</p>
                    <p>Job description:</p>
                    <textarea disabled={true} value={j.description}/>
                    <p>Status: <span id={statusColor(j)}>{j.status}</span></p>
                    <p>Open Slots: {j.open_slots}</p>
                    <button className="accept button" onClick={() => handleAccept(j)}>{j.status === "Requested" ? "Accept Job" : "Join Job"}</button>
                </div>)
                : <p>Looks like there are no open jobs.</p>}
            </div>
        </div>
    )
}

export default OpenJobsPage