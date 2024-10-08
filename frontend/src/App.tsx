
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'
import PublishBlog from './pages/PublishBlog'
import SavedBlogs from './pages/SavedBlogs'
import MyBlogs from './pages/MyBlogs'
import SingleBlogMyBlogs from './pages/SingleBlogMyBlogs'




function App() {
  

  return (
    <>
    <BrowserRouter>       
        <Routes>
                  <Route path='/signin' element={<Signin />}></Route>
                  <Route path='/' element={<Signup />}></Route>
                  <Route path='/blogs' element={<Blog />}></Route>
                  <Route path={'/blog/:id'} element={<SingleBlog />}></Route>
                  <Route path={'/publish'} element={<PublishBlog />}></Route>
                  <Route path={'/savedblogs'} element={<SavedBlogs />}></Route>
                  <Route path={'/myblogs'} element={<MyBlogs />}></Route>
                  <Route path={'/blog/myblogs/:id'} element={<SingleBlogMyBlogs />}></Route>

        </Routes>   
    </BrowserRouter>
    </>
  )
}

export default App



