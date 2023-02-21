import React, {useContext} from "react";
import { UserContext } from "../App";
import "./ClientJobsPage.css"

function OpenJobsPage(){
    const {setUser, openJobs, setOpenJobs} = useContext(UserContext)

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
                    <p>Open Slots: {j.open_slots}</p>
                    <button className="accept button" onClick={() => handleAccept(j)}>Accept Job</button>
                </div>)
                : <p>Looks like there are no open jobs.</p>}
            </div>
        </div>
    )
}

export default OpenJobsPage