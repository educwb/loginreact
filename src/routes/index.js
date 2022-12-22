import { Routes, Route} from 'react-router-dom'

import Home from '../pages/Home'
import Admin from '../pages/Admin'
import Register from '../pages/Register'

import Private from './Private'

import Login from '../pages/Login'
import Posts from '../pages/Posts'

function RoutesApp(){
  return(
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/register' element={ <Register/> } />
      
      <Route path='/admin' element={ 
        <Private>
          <Admin/>
        </Private>
      }/>

      <Route path='/login' element={ <Login/> } />
      <Route path='/posts' element={ <Posts/> } />
    </Routes>
  )
}

export default RoutesApp