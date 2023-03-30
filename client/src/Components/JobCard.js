import React, {useContext, useState} from "react";
import { UserContext } from "../App";

function JobCard({j}){
    const {user, setUser} = useContext(UserContext)
    const [showEdit, setShowEdit] = useState(false)
    const [jobDetails, setJobDetails] = useState({
        type_of_work:j.type_of_work,
        description:j.description
    })

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

    function handleRadio(e){
        setJobDetails({...jobDetails, type_of_work:e.target.value})
    }

    function handleEdit(){
        fetch(`/jobs/${j.id}/edit`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(jobDetails)
        })
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    setUser(user)
                    setShowEdit(false)
                })
            }
        })
    }
    
    function cancelJob(){
        fetch(`/jobs/${j.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
    }


    return(<div key={j.id} className="job-listing">
        <p>Job ID: {j.id}</p>
        <p>Location: {user.address}</p>
        <p>Date requested: {j.created_at.slice(0, 10)}</p>
        <p>Type: {jobDetails.type_of_work}</p>
        {showEdit ? <form className="edit-type-form">
        <div>
            <input id="r/i" checked={jobDetails.type_of_work === "Removal/Installation"} type="radio" name="type_of_work" value="Removal/Installation" onChange={handleRadio}/>
            <label htmlFor="r/i" >Removal/Installation</label>
        </div>
        <div>
            <input id="u/c" checked={jobDetails.type_of_work === "Unclogging/Cleaning"} type="radio" name="type_of_work" value="Unclogging/Cleaning" onChange={handleRadio}/>
            <label htmlFor="u/c" >Unclogging/Cleaning</label>
        </div>
        <div>
            <input id="repair" checked={jobDetails.type_of_work === "Repair"} type="radio" name="type_of_work" value="Repair" onChange={handleRadio}/>
            <label htmlFor="repair" >Repair</label>
        </div>
        <div>
            <input id="idk" checked={jobDetails.type_of_work === "Unknown"} type="radio" name="type_of_work" value="Unknown" onChange={handleRadio}/>
            <label htmlFor="idk" >Unknown</label>
        </div>
        </form> : <></>}
        <p>Description:</p>
        <textarea disabled={!showEdit} onChange={e => setJobDetails({...jobDetails, description:e.target.value})} value={jobDetails.description}/>
        <p>Status: <span id={statusColor(j)}>{j.status}</span></p>
        {j.status === "Requested" ? <></> : 
            <ul className="plumbers">Assigned plumbers:
                {j.plumbers.map(p => <li key={p.id}>{p.name} - {p.phone}</li>)}
            </ul>
        }
        {j.status === "Finished" ? <></> : <button className="cancel button" onClick={() => showEdit ? setShowEdit(false) : cancelJob()}>{showEdit ? "Cancel" : "Terminate Job"}</button>}
        {j.status === "Finished" ? <></> : (showEdit ?<button className="edit-button" onClick={() => handleEdit()}>Confirm Changes</button> : <button className="edit-button" onClick={() => setShowEdit(!showEdit)}>Edit</button>)}
    </div>)
}

export default JobCard