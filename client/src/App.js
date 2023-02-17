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


function App() {
  
  const history = useHistory()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch('/auto_login')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          console.log(user)
          setUser(user)
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
                <h1>Home Page</h1>
              </Route>

              <Route path="/bills">
                {user ? <h1>BILLS</h1> : <h1>Loading bills...</h1>}
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
