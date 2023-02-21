import React, {useContext} from "react";
import { UserContext } from "../App";
import "./ClientJobsPage.css"

function BillsPage(){

    const {user, setUser} = useContext(UserContext)

    function handlePay(b){
        fetch(`/bills/${b.id}/pay`)
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }
        })
    }

    return (
        <div className="job-page">
            <h1>My Bills</h1>
            <div className="jobs-container">
                {user.bills.length > 0 ? user.bills.map(b => 
                <div key={b.id} className="job-listing">
                    <p>Job ID: {b.job.id}</p>
                    <p>Bill amount: ${b.amount}</p>
                    <p>Paid: {b.paid ? "Yes" : "No"}</p>
                    {b.paid ? <></> : <button className="pay-button" onClick={() => handlePay(b)}>Pay now</button>}
                </div>)
                : <p>You haven't had any bills.</p>}
            </div>
        </div>
    )
}

export default BillsPage