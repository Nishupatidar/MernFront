import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../../components/Blog/Login'
import Admin_dashboard from '../Admin_dashboard'
// import Add_blog_post from "../Add_blog_post";
import User_details from "../User_details";
import Protected from "../protected";
import Comment_blog from "../Comment_blog";
import Reply_blog from "../Reply_blog";
import Edit_title from "../Edit_title";
import axios from "axios";
import Multipal_data_delete from '../Multipal_data_delete';
import Monthlyfilter from '../Monthliydatafilter/Monthlyfilter';
import Categorysearch from '../Monthliydatafilter/Categorysearch';
// import User_data_api from "../";
// const Login = lazy(() => import("./components/Blog/Login"))
const Add_Blog = lazy(() => import('../Add_blog_post'))
const Edit_blog_post = lazy(() => import('../Edit_blog_post'))
const Category = lazy(() => import('../Category'))
const Userdetails = lazy(() => import('../User_details'))
const Edit_category = lazy(() => import('../Edit_category'))
const Add_title = lazy(() => import('../Add_title_post'))
const role = lazy(() => import('../Role'))
const Autoblog = lazy(() => import('../Autoblog/Auto_blog'))
const Integration = lazy(() => import('../Integration'))
const Edit_Integration = lazy(() => import('../Edit_integration'))
const Create_integration = lazy(() => import('../Integration_create'))
const preset = lazy(() => import('../Preset/Preset'))
const preset_create = lazy(() => import('../Preset/Preset_create'))
const Autoblogcreate = lazy(() => import('../Autoblog/Autoblogcreate'))
const indexer = lazy(() => import('../Indexer/Indexer'))
const socialmedia = lazy(() => import('../Social Media/Social_media'))
const indexercreate = lazy(() => import('../Indexer/Indexercreate'))
const socialmediacreate = lazy(() => import('../Social Media/Socialmediacreate'))
const Knowledge = lazy(() => import('../Knowledge/Knowledge'))
const knowledgecreate = lazy(() => import('../Knowledge/Knowledge_create'))
const indexercreateedit = lazy(() => import('../Indexer/Editindexer'))
const socialmediaedit = lazy(() => import('../Social Media/Social_media_edit'))
const autoblogedit = lazy(() => import('../Autoblog/Autoblog_edit'))
const Integartionedit = lazy(() => import('../IntegrationFrom/Integrationedit'))
const presetedit = lazy(() => import('../Preset/Presetedit'))
const knowledgeEdit = lazy(() => import('../Knowledge/Knowledge_edit'))
const allarticle = lazy(() => import('../Articel/Articel'))
const Admin = () => {
    return (
        <>

            <Routes>

                <Route path='/login' element={<Login />}></Route>
                <Route path="/" element={<Protected Component={Admin_dashboard} />}></Route>
                <Route path="/addblogpost" element={<Protected Component={Add_Blog} />}></Route>
                <Route path='/editblog/:eid' element={<Protected Component={Edit_blog_post} />}></Route>
                <Route path='/category' element={<Protected Component={Category} />}></Route>
                <Route path='/userdetails' element={<Protected Component={User_details} />}></Route>
                <Route path='/editcategory/:eid' element={<Protected Component={Edit_category} />}></Route>
                <Route path="/comment" element={<Protected Component={Comment_blog} />}></Route>
                <Route path='/reply' element={<Protected Component={Reply_blog} />}></Route>
                <Route path="/mastertitle" element={<Protected Component={Add_title} />}></Route>
                <Route path="/edittitle/:eid" element={<Protected Component={Edit_title} />}></Route>
                <Route path="/role" element={<Protected Component={role} />}></Route>
                {/* <Route path="/admin/api" element={<User_data_api />}></Route> */}
                <Route path="/autoblog" element={<Protected Component={Autoblog} />}></Route>
                <Route path="/autoblogcreate" element={<Protected Component={Autoblogcreate} />}></Route>

                <Route path="/integration" element={<Protected Component={Integration} />}></Route>
                <Route path="/editintegration/:eid" element={<Protected Component={Edit_Integration} />}></Route>
                <Route path="/integration/create" element={<Protected Component={Create_integration} />}></Route>
                <Route path="/integartionedit/:id" element={<Protected Component={Integartionedit} />}></Route>
                <Route path="/preset" element={<Protected Component={preset} />}></Route>
                <Route path="/presetcreate" element={<Protected Component={preset_create} />}></Route>
                <Route path="/presetedit/:pid" element={<Protected Component={presetedit} />}></Route>


                <Route path="/indexer" element={<Protected Component={indexer} />}></Route>

                <Route path="/socialmedia" element={<Protected Component={socialmedia} />}></Route>
                <Route path="/indexcreate" element={<Protected Component={indexercreate} />}></Route>
                <Route path="/indexcreate/:id" element={<Protected Component={indexercreateedit} />}></Route>
                <Route path="/socialmediacreate" element={<Protected Component={socialmediacreate} />}></Route>
                <Route path="/socialmedia/:sid" element={<Protected Component={socialmediaedit} />}></Route>
                <Route path="/knowledge" element={<Protected Component={Knowledge} />}></Route>
                <Route path="/knowledgecreate" element={<Protected Component={knowledgecreate} />} ></Route>
                <Route path="/autoblog/:aid" element={<Protected Component={autoblogedit} />}></Route>
                <Route path='/knowledgeedit/:kid' element={<Protected Component={knowledgeEdit} />}></Route>
                <Route path='/allarticle' element={<Protected Component={allarticle} />}></Route>
 <Route path = "/multiple_data_delete" element={<Protected Component = {Multipal_data_delete}/>}></Route>
 <Route path ="/monthly_data_filter" element={<Protected Component = {Monthlyfilter}/>}></Route>
 <Route path='/categorysearch' element = {<Protected Component = {Categorysearch}/>}></Route>

            </Routes>
        </>
    )
}

export default Admin