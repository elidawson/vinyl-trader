import { Outlet } from 'react-router-dom'

function Header() {
  return (
    <div>
        <div>Header</div>
        <Outlet />
    </div>
  )
}

export default Header