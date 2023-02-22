import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./ClientJobsPage.css"
import JobCard from "./JobCard";

function ClientJobsPage(){

    const {user} = useContext(UserContext)

    return (
        <div className="job-page">
            <h1>My Jobs</h1>
            <div className="jobs-container">
                {user.jobs.length > 0 ? user.jobs.map(j => <JobCard key={j.id} j={j} /> )
                : <p>Looks like you haven't had any jobs done. <Link to='/request'>Request one here.</Link></p>}
            </div>
        </div>
    )
}

export default ClientJobsPage