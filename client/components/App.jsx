import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Header from './Header'
import NotFound from './NotFound'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
  )
}

export default App
