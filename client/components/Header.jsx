import { Link, Outlet } from 'react-router-dom'
import '../stylesheets/header.css'

function Header() {
  return (
    <>
      <div className='header-div'>
          <h1 className='header-text'>vinyl trader</h1>
          <Link to='/' className='header-text'>feed</Link>
          <Link to='/records/new' className='header-text'>post record</Link>
      </div>
      <Outlet />
    </>
  )
}

export default Header