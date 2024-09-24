import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import { Select, Button } from "antd"; // "3.26.7" worked



function Categorysearch() {
  const [data, setData] = useState([]);
const [category,setcategory] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4000/categories").then((res)=>{
      setData(res.data.Categories)
    }).then((data)=>{
      const userData = data.map((item) => ({
        label: item.category_name,
        value: item._id,
        text: item.category_name
      }));
      setData(userData);
    }).catch((err)=>{
      console.log(err)
})

    
   
      
  }, []);
       const getvalue = (e)=>{
        console.log(e)
        // setcategory({...category,[e.target.name]:e.target.value})
       }

  // const [categories, setCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [filteredCategories, setFilteredCategories] = useState([]);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // // Fetch categories from the backend
  // const fetchCategories = async () => {
  //   try {
  //     axios.get('http://localhost:4000/categories').then((res) => {
  //       // setcategory(res.data.Categories)
  //     setCategories(res.data.Categories);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  // // Filter categories based on the search term
  // useEffect(() => {
  //   if (searchTerm.trim() === '') {
  //     setFilteredCategories(categories);
  //   } else {
  //     const filtered = categories.filter(item =>
  //       item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredCategories(filtered);
  //   }
  // }, [searchTerm, categories]);

  // // Handle changes in the search input field
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // // Handle selection of a category
  // const handleCategorySelect = (categoryId) => {
  //   setSelectedCategoryId(categoryId);
  //   setSearchTerm('');
  // };

  return (
    <>
    <br />
      <br />
      Static data (Search working)
      <br />
      <br />
      <Select mode="multiple" style={{ width: 120 }} onChange={getvalue} name="category">
        {data.map((items,index)=>{
          return(
            <>
        <Select.Option value={items.category_name}>{items.category_name}</Select.Option>
            </>
          )
        })}
        {/* <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="disabled" disabled>
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">yiminghe</Select.Option> */}
      </Select>
      <br />
      <br />
      <br />
      <br />
      Api Data (Search not working)
      <br />
      <br />
      {/* <Select mode="multiple" style={{ width: 120 }}>
        {data.map(({ label, value, text }) =>
          label ? (
            <Select.Option value={value || ""} key={label}>
              {text}
            </Select.Option>
          ) : null
        )}
      </Select> */}
    </>
    // <div className="col">
       
    //   <label>Select Category</label><br />
    //   <div style={{ position: 'relative' }}>
    //     <input
    //       type="text"
    //       placeholder="Search Category"
    //       value={searchTerm}
    //       onChange={handleSearchChange}
    //     />
    //     {filteredCategories.length > 0 && (
    //       <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, background: '#fff', border: '1px solid #ccc', borderTop: 'none', width: '100%' }}>
    //         {filteredCategories.map((item) => (
    //           <div
    //             key={item._id}
    //             onClick={() => handleCategorySelect(item._id)}
    //             style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ccc' }}
    //           >
    //             {item.category_name}
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    //   <br />
    //   <select
    //     className='form-control'
    //     style={{ paddingLeft: "65px", paddingRight: "65px" }}
    //     value={selectedCategoryId}
    //     onChange={(e) => setSelectedCategoryId(e.target.value)}
    //     name='category'
    //   >
    //     <option value="">Select a Category</option>
    //     {categories.map((item) => (
    //       <option key={item._id} value={item._id}>{item.category_name}</option>
    //     ))}
    //   </select>
    // </div>
  )
}

export default Categorysearch;
