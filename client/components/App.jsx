import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login';
import Notfound from './Notfound'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/check_session")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("no user logged in");
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
  
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='*' element={<Notfound />} />
      </Route>
    </Routes>
  )
}

export default App
