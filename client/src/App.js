import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Redirect
} from 'react-router-dom'
import React, {useState, useEffect, createContext} from 'react';
import Header from './Components/Header'
import SignIn from './Components/SignIn';
import SignUp from "./Components/SignUp";
import ClientJobsPage from "./Components/ClientJobsPage";
import ClientRequestForm from "./Components/ClientRequestForm";
import AssignmentsPage from "./Components/AssignmentsPage";


function App() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [pendingRequests, setPendingRequests] = useState([])
  
  useEffect(() => {
    fetch('/auto_login')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          console.log(user)
          setUser(user)
          if(user.type === "Plumber"){
            fetch('/pending_requests')
              .then(r => {
                if(r.ok){
                  r.json().then(console.log)
                }
              })
          }
        })
      }else{
        history.push('/sign_in')
      }
    })
  }, [])
  
  return (
    <Router>
        <UserContext.Provider value={{user, setUser}}>
          {user ? <Header/> : <></>}
          <div className="main">
            <Switch>

              <Route path="/home">
                {user ? (user.type === "Client" ? <ClientJobsPage/> : <AssignmentsPage/>) : <h1>Loading...</h1>}
              </Route>

              <Route path="/pending_requests">
                {user ? (user.type === "Plumber" ? <h1>PENDING REQUESTS PAGE</h1> : <Redirect to="/home"/>) : <h1>Loading...</h1>}
              </Route>

              <Route path="/bills">
                {user ? (user.type === "Client" ? <h1>BILLS</h1> : <Redirect to="/home"/>) : <h1>Loading...</h1>}
              </Route>

              <Route path="/request">
                {user ? (user.type === "Client" ? <ClientRequestForm /> : <Redirect to="/home" />) : <h1>Loading...</h1>}
              </Route>

              <Route path="/sign_in">
                <SignIn />
              </Route>

              <Route path="/sign_up">
                <SignUp />
              </Route>

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route path="/404">
                <h1>ERROR 404: Page not found...</h1>
              </Route>

              <Route path="*">
                <Redirect to="/404" />
              </Route>

            </Switch>
          </div>
        </UserContext.Provider>
    </Router>
  )
}

export const UserContext = createContext()
export default App;
