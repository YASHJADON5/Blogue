import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>       
        <Routes>
                  <Route path='/signin' element={<Signin />}></Route>
                  <Route path='/' element={<Signup />}></Route>
                  <Route path='/blogs' element={<Blog />}></Route>
                  <Route path={'/blog/:id'} element={<SingleBlog />}></Route>
        </Routes>   
    </BrowserRouter>
    </>
  )
}

export default App
