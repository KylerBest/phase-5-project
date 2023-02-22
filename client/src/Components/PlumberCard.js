import React, {useState} from "react";
import RaiseForm from "./RaiseForm";


function PlumberCard({setPlumbers, p}){

    const [showRaiseForm, setShowRaiseForm] = useState(false)

    return(<div className="plumber-card">
        <h1>{p.name}</h1>
        <h3>Email: {p.email}</h3>
        <h3>Phone: {p.phone}</h3>
        <p>Wage: ${showRaiseForm ? <RaiseForm setShowRaiseForm={setShowRaiseForm} setPlumbers={setPlumbers} p={p}/> : p.wage}{showRaiseForm ? 
            <button onClick={() => setShowRaiseForm(!showRaiseForm)}>Cancel</button>
            : <button onClick={() => setShowRaiseForm(!showRaiseForm)} className="raise-button">Raise</button>}</p>
    </div>)
}

export default PlumberCard