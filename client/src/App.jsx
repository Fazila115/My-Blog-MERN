import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
const Login = lazy(() => import('./screens/auth/Login.jsx'));
const Signup = lazy(() => import('./screens/auth/Signup.jsx'));
const About = lazy(() => import('./screens/localPages/About.jsx'));
const AllPosts = lazy(() => import('./screens/localPages/AllPosts.jsx'));
const Contact = lazy(() => import('./screens/localPages/Contact.jsx'));
const SinglePost = lazy(() => import('./screens/localPages/SinglePost.jsx'));
const AddPost = lazy(() => import('./screens/user/AddPost.jsx'));
const Dashboard = lazy(() => import('./screens/user/Dashboard.jsx'));
const Posts = lazy(() => import('./screens/user/Posts.jsx'));
const Profile = lazy(() => import('./screens/user/Profile.jsx'));
const EditPost = lazy(() => import('./screens/user/EditPost.jsx'));

import LandingPage from './screens/localPages/LandingPage.jsx';
import PageNotFound from './screens/localPages/PageNotFound.jsx';

const App = () => {
  return (
    <Router>
      <ToastContainer />

      <Suspense>
        <Routes>
          {/* local pages */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/all-posts' element={<AllPosts />} />
          <Route path='/single-post/:id' element={<SinglePost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* user protected pages */}
          <Route path='/user/posts/add' element={<AddPost />} />
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/user/posts' element={<Posts />} />
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/posts/edit/:id' element={<EditPost />} />

          {/* route for unknown pages - page not found */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
