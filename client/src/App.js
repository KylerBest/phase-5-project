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
import BillsPage from "./Components/BillsPage";
import OpenJobsPage from "./Components/OpenJobsPage";
import ManagePlumbersPage from "./Components/ManagePlumbersPage";


function App() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [openJobs, setOpenJobs] = useState([])
  const [plumbers, setPlumbers] = useState([])
  const [isLoginLoading, setIsLoginLoading] = useState(true)
  
  useEffect(() => {
    fetch('/auto_login')
    .then(r => {
      if(r.ok){
        r.json().then(user => {
          setUser(user)
          if(user.type === "Plumber"){
            fetch('/open_jobs')
              .then(r => {
                if(r.ok){
                  r.json().then(jobs => {
                    setOpenJobs(jobs)
                    if(user.manager){
                      fetch('/plumbers')
                      .then(r => {
                        if(r.ok){
                          r.json().then(setPlumbers)
                        }
                      })
                    }
                  })
                }
              })
            }
            setIsLoginLoading(false)
            history.push("/home")
        })
      }else{
          setUser(null)
          setIsLoginLoading(false)
          history.push('/sign_in')
      }
    })
  }, [])
  
  return (
    <Router>
      <UserContext.Provider value={{user, setUser, openJobs, setOpenJobs, plumbers, setPlumbers}}>
        { user ? <Header/> : <></>}
        {isLoginLoading ? <div className="main"><h1>Loading...</h1></div> : <div className="main">
          <Switch>

            <Route path="/home">
              {user ? (user.type === "Client" ? <ClientJobsPage/> : <AssignmentsPage/>) : <Redirect to="/sign_in" />}
            </Route>

            <Route path="/open_jobs">
              {user && user.type === "Plumber" ? (openJobs ? <OpenJobsPage/> : <h1>Loading...</h1>) : <Redirect to="/home"/>}
            </Route>

            <Route path="/manage_plumbers">
              {user && user.type === "Plumber" && user.manager ? (plumbers ? <ManagePlumbersPage/> : <h1>Loading...</h1>) : <Redirect to="/home"/>}
            </Route>

            <Route path="/bills">
              {user && user.type === "Client" ? <BillsPage/> : <Redirect to="/home"/>}
            </Route>

            <Route path="/request">
              {user && user.type === "Client" ? <ClientRequestForm /> : <Redirect to="/home" />}
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
        </div>}
      </UserContext.Provider>
    </Router>
  )
}

export const UserContext = createContext()
export default App;
