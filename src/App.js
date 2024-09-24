import { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import NavScrollTop from './components/NavScrollTop';
import axios from "axios";
import Admin from "./Admin_dashboard/Adminrouter/Admin";
import '../src/Admin_dashboard/Add_blog_post.css'
import Login from "./components/Blog/Login";
import Loader from "./components/Blog/Loader";

// import Add_title_post from "./Admin_dashboard/Add_title_post";
const HomeOne = lazy(() => import("./pages/HomeOne"));

const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const Work = lazy(() => import("./pages/Work"));
const WorkDetails = lazy(() => import("./pages/WorkDetails"));
const BlogGrid = lazy(() => import("./pages/BlogGrid"));
const BlogClassic = lazy(() => import("./pages/BlogClassic"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const BlogCategories = lazy(() => import("./pages/BlogCategories"));
const BlogTag = lazy(() => import("./pages/BlogTag"));
const Signup = lazy(() => import('./pages/Signup'))
const Contact = lazy(() => import("./pages/Contact"));


 const renderLoader = ()=>
  <p>Loading</p>

 


function App() {
  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 1000,
      once: true,
      easing: 'ease',
    });
    AOS.refresh();

  }, [])
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/blog')
      .then(response => setBlogPosts(response.data.blog))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);
  return (



    <Router>
      <NavScrollTop>
        <Suspense fallback={renderLoader()}>
          <Routes>
            <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<HomeOne />} />
            <Route path={`${process.env.PUBLIC_URL + "/home-one"}`} element={<HomeOne />} />
            
            <Route path={`${process.env.PUBLIC_URL + "/about"}`} element={<About />} />
            <Route path={`${process.env.PUBLIC_URL + "/service"}`} element={<Service />} />
            <Route path={`${process.env.PUBLIC_URL + "/work"}`} element={<Work />} />
            <Route path={`${process.env.PUBLIC_URL + "/work-details/:id"}`} element={<WorkDetails />} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} element={<BlogGrid />} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} element={<BlogClassic />} />
            <Route path={`${process.env.PUBLIC_URL + "/tag/:tid"}`} element={<BlogTag />} />
            <Route path={`${process.env.PUBLIC_URL + "/category/:cid"}`} element={<BlogCategories />} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-details/:sid"}`} element={<BlogDetails />} />
            <Route path={`${process.env.PUBLIC_URL + "/contact"}`} element={<Contact />} />
            <Route path={`${process.env.PUBLIC_URL + '/signup'}`} element={<Signup />} />
            <Route path='/admin/*' element ={<Admin/>}></Route>
            {/* <Route path='/admin/login' element={<Login />}></Route> */}
           


          </Routes>




            
        </Suspense>
      </NavScrollTop>

    </Router>

  );
}

export default App;
