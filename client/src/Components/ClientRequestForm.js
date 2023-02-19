import React, {useState} from "react";
import "./ClientRequestForm.css"

function ClientRequestForm(){

    const [jobDetails, setJobDetails] = useState({
        description: "",
        type_of_work: ""
    })

    function handleRadio(e){
        setJobDetails({...jobDetails, type_of_work:e.target.value})
    }

    return(
        <div>
            <h1 className="title">Job Request Form</h1>
            <form id="job-form">
                <label htmlFor="description">Describe the problem:</label>
                <textarea id="description" rows="4" cols="50" form="job-form" placeholder="No hot water, sink won't drain, etc." onChange={e => setJobDetails(e.target.value)}/>
                <h1>This job includes: <p>select all that apply</p></h1>
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
            </form>
        </div>
    )
}

export default ClientRequestForm