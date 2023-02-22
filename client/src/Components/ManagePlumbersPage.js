import React, {useContext} from "react";
import { UserContext } from "../App";
import PlumberCard from "./PlumberCard";
import "./ManagePlumbersPage.css"

function ManagePlumbersPage(){

    const {plumbers, setPlumbers} = useContext(UserContext)


    return(
        <div className="manage-plumbers-container">
            <h1>Manage Plumbers</h1>
            <div className="manage-plumbers-page">
                {plumbers.map(p => <PlumberCard setPlumbers={setPlumbers} p={p} />)}
            </div>
        </div>
    )
}

export default ManagePlumbersPage