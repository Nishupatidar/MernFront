import React, { useState } from 'react';
import SidebarCategories from './SidebarCategories';

const SidebarSearch = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const search = (e)=>{

        setSearchQuery(e.target.value)
        onSearch(e.target.value)
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSearch(searchQuery);
    //   };
    return (
        <div className="sidebar-widget-content">
            {/* <SidebarCategories setsearchs={setsearchs}/> */}
            <div className="sidebar-widget-search">
                <form >
                    <input type="text" placeholder="Search..." name="search" value={searchQuery} onChange={search} />
                    <button><i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    )
}

export default SidebarSearch;
