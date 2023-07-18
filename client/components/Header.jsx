import { Outlet, Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './App'
import '../stylesheets/header.css'
import { useNavigate } from 'react-router'

export default function Header({ setUser }) {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(
      console.log('log out successful'),
      setUser(null),
      navigate('/')

    )
  }

  return (
    <>
      <div className='header-div'>
        <h1 className='page-title'>vinyl trader</h1>
        <div className='nav'>
          <Link to='/' className='header-text'>feed</Link>
          {user ? (
            <Link to='/records/new' className='nav-link'>post record</Link>
          ) : (
            null
          )}
        </div>
        <div className='user-header'>
          {user ? (
            <>
              <span>hello, {user.name}</span><br/>
              <Link to='/user'>edit profile</Link><br/>
              <button className='button' onClick={handleLogout}>logout</button>
            </>
          ) : (
            <Link to='/login' className='button'>login/signup</Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}
