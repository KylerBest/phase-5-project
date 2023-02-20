import React, {useState, useContext} from "react";
import { UserContext } from "../App";
import {useHistory} from "react-router-dom";
import "./ClientRequestForm.css"

function ClientRequestForm(){

    const {setUser} = useContext(UserContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [jobDetails, setJobDetails] = useState({
        description: "",
        type_of_work: ""
    })

    function handleRadio(e){
        setJobDetails({...jobDetails, type_of_work:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/jobs", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(jobDetails)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(user => {
                    setUser(user)
                    history.push("/home")
                })
            }else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return(
        <div>
            <h1 className="title">Plumbing Request</h1>
            <form id="job-form" onSubmit={(e) => handleSubmit(e)}>
                <h1>I need: <p>If you're not sure, just select <span id="unknown">Unknown</span>.</p></h1>
                <div className="radio">
                    <div>
                        <input id="r/i" type="radio" name="type_of_work" value="Removal/Installation" onChange={handleRadio}/>
                        <label htmlFor="r/i" >Removal/Installation</label>
                    </div>
                    <div>
                        <input id="u/c" type="radio" name="type_of_work" value="Unclogging/Cleaning" onChange={handleRadio}/>
                        <label htmlFor="u/c" >Unclogging/Cleaning</label>
                    </div>
                    <div>
                        <input id="repair" type="radio" name="type_of_work" value="Repair" onChange={handleRadio}/>
                        <label htmlFor="repair" >Repair</label>
                    </div>
                    <div>
                        <input id="idk" type="radio" name="type_of_work" value="Unknown" onChange={handleRadio}/>
                        <label htmlFor="idk" >Unknown</label>
                    </div>
                </div>
                <label htmlFor="description">Describe the problem:</label>
                <textarea id="description" rows="4" cols="50" form="job-form" placeholder="No hot water, sink won't drain, busted pipe, etc." onChange={e => setJobDetails({...jobDetails, description:e.target.value})}/>
                {errors ? <ul>{errors.map(e => <li key={e} className="error">{e}</li>)}</ul> : <></>}
                <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Submit Request"}/>
            </form>
        </div>
    )
}

export default ClientRequestForm