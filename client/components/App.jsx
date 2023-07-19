import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './Header'
import React from 'react'
import Home from './Home'
import Login from './Login';
import Notfound from './Notfound'
import RecordForm from './RecordForm'
import Signup from './Signup'
import UserDetail from './UserDetail'

export const UserContext = React.createContext()

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/check_session')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((user) => {
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        alert((error.message));
      });
  }, []);

  const location = useLocation();

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(() => {
      setUser(null)
      if (location.pathname === '/') {
        window.location.reload();
      }
    })
  }

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path='/' element={<Header setUser={setUser} handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login user={user} setUser={setUser}/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/records/new' element={<RecordForm user={user} />} />
          <Route path='/user' element={<UserDetail />} />
          <Route path='*' element={<Notfound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}
