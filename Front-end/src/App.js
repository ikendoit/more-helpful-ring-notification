import React from 'react';
import './App.css';
import LoginScreen from './Login-Component'
import LogoutButton from './Logout-Component'
import VideosListing from './VideosListing'

function App() {

  const refreshToken = localStorage.getItem('refreshToken')
  const [loggedIn, setLoggedIn] = React.useState(refreshToken != null)

  console.log(loggedIn)

  return (
    <div className="App">
      <header className="App-header">

        { loggedIn && (

            <div>
              <LogoutButton setLoggedIn={setLoggedIn}/>
              <VideosListing/>
            </div>

          ) || (

            <LoginScreen setLoggedIn={setLoggedIn}/>

          )
        }

      </header>
    </div>
  );
}

export default App;
