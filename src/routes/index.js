import { Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import Posts from '../pages/Posts'

function RoutesApp(){
  return(
    <Routes>
      <Route path='/' element={ <Login/> } />
      <Route path='/posts' element={ <Posts/> } />
    </Routes>
  )
}

export default RoutesApp