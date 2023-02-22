import React, {useState} from "react";
import RaiseForm from "./RaiseForm";


function PlumberCard({p}){

    const [showRaiseForm, setShowRaiseForm] = useState(false)

    return(<div className="plumber-card">
        <h1>{p.name}</h1>
        <h3>Email: {p.email}</h3>
        <h3>Phone: {p.phone}</h3>
        <p>Wage: ${showRaiseForm ? <RaiseForm/> : p.wage}/hr {showRaiseForm ? 
            <button className="raise-button">Confirm</button>
            : <button onClick={() => setShowRaiseForm(!showRaiseForm)} className="raise-button">Raise</button>}</p>
    </div>)
}

export default PlumberCard