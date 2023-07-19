import '../stylesheets/header.css'
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { UserContext } from './App'
import { useContext } from 'react'

export default function Header({ setUser, handleLogout }) {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <div className='header-div'>
        <h1 className='page-title'>vinyl trader🔊</h1>
        <div className='nav'>
        <Link to='/' className='header-text' onClick={() => window.scrollTo(0,0)}>feed</Link>
          {user ? (
              <Link to='/records/new' className='nav-link'>post record</Link>
          ) : (
            null
          )}
        </div>
          {user ? (
            <div className='user-menu'>
              <img src={user.image} className='header-user-img'/><br/>
              <div>
                <span className='glow'>hello, {user.name}</span><br/>
                <button className='button' onClick={() => navigate('/user')}>my profile</button>
                <button className='button' onClick={handleLogoutClick}>logout</button>
              </div>
            </div>
          ) : (
            <Link to='/login' className='button'>login/signup</Link>
          )}
      </div>
      <Outlet />
    </>
  )
}
