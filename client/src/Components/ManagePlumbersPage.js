import React from "react";
import PlumberCard from "./PlumberCard";
import "./ManagePlumbersPage.css"

function ManagePlumbersPage({plumbers, setPlumbers}){


    return(
        <div className="manage-plumbers-page">
            {plumbers.map(p => <PlumberCard p={p} />)}
        </div>
    )
}

export default ManagePlumbersPage