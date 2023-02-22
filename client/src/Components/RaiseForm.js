import React, {useState} from "react";

function RaiseForm({wage}){

    const [newWage, setNewWage] = useState(wage)

    return(
        <input type="number" value={newWage}/>
    )
}

export default RaiseForm