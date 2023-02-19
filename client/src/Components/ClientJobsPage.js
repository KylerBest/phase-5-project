import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function ClientJobsPage(){

    const {user} = useContext(UserContext)

    return (
        <div className="jobs-container">
            {user.jobs.length > 0 ? user.jobs.map(j => <div className="job-listing">
                <li>Description: {j.description}</li>
                <li>Status: {j.status}</li>
                <ul>Assigned plumbers:
                    {j.plumbers.map(p => <li>{p.name} - {p.phone}</li>)}
                </ul>
            </div>) : <h1>Looks like you haven't had any jobs done. <Link to='/request'>Request one here.</Link></h1>}
        </div>
    )
}

export default ClientJobsPage