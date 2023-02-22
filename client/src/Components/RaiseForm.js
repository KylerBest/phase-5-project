import React, {useState} from "react";

function RaiseForm({setShowRaiseForm, setPlumbers, p}){

    const [newWage, setNewWage] = useState(p.wage)

    function handleRaise(){
        fetch(`/plumbers/${p.id}/raise`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                wage: newWage
            })
        })
        .then(r => {
            if(r.ok){
                r.json().then(plumbers => {
                    setPlumbers(plumbers)
                    setShowRaiseForm(false)
                })
            }
        })
    }

    return(
        <div>
            <p><input type="number" value={newWage} onChange={(e) => setNewWage(e.target.value)}/>/hr</p>
            <button onClick={() => handleRaise()}>Confirm</button>
        </div>
    )
}

export default RaiseForm