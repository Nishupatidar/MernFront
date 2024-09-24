import React, { useState } from 'react';
import axios from 'axios';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function Monthlyfilter() {

  const [filteredData, setFilteredData] = useState([]);

  // const handleFilterClick = () => {
  //   const startDate = new Date('2024-02-01').toISOString(); // Start of January
  //   const endDate = new Date('2024-02-29T23:59:59').toISOString(); // End of January

  //   axios.get(`http://localhost:4000/data?startDate=${startDate}&endDate=${endDate}`)
  //     .then((response) => {
  //       setFilteredData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching filtered data:', error);
  //     });
  // };
const [selectedyear,setselectedyear] = useState('')
const handleyearchange = (year) =>{
  console.log(year)
  setselectedyear(year)
  handlefilteryear(year)
}
const handlefilteryear =  (year) => {
  try {
    const formattedDate = year.toLocaleString('en-US', { year: '1-digit', year: 'numeric' });
    console.log(formattedDate)
   axios.get(`http://localhost:4000/datayear?year=${formattedDate}`).then((response)=>{
    setFilteredData(response.data);
 })
  } catch (error) {
    console.error('Error fetching filtered data:', error);
  }
}

const [selectedMonth, setSelectedMonth] = useState('');
const handleMonthChange = (date) => {
setSelectedMonth(date);
handleFilterClicksss(date)
};
const handleFilterClicksss = (date) => {
  console.log(date)
  const formattedDate = date.toLocaleString('en-US', { month: '2-digit', year: 'numeric' });
  console.log(formattedDate)
    axios.get(`http://localhost:4000/datas?month=${formattedDate}`)
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  };
  // Render the filtered data
//   ____________________________________________ Weekly data Filter ________________________________________________

const [selectedWeek, setSelectedWeek] = useState('');
const handleWeekChange = (event) => {
setSelectedWeek(event.target.value);
};
const handleFilterClickweek = () => {
    axios.get(`http://localhost:4000/dataweek?week=${selectedWeek}`)
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
    };
    // ---------------------------------------------Last 7 Day Data Filter ------------------------------------------------
  const [selectedDay, setSelectedDay] = useState('');
  const handleDateChange = (date) => {
    // console.log(date)
    setSelectedDay(date);
    const endDate = new Date(date);
    
    console.log(endDate)
 const StartDate =    endDate.setDate(endDate.getDate() - 6); // 7 days later than the selected date
    // console.log(endDate.setDate(endDate.getDate()))
    fetchFilteredData(date.toISOString(), endDate.toISOString());
  };
  const fetchFilteredData = (startDate, endDate) => {
    // console.log(startDate)
  //  console.log( startDate,endDate)
        axios.get(`http://localhost:4000/data7day?startDate=${startDate}&endDate=${endDate}`)
          .then((response) => {
            setFilteredData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching filtered data:', error);
          });
      };
    const [selected30day,setselected30day] = useState("")
const handleDate30Change = (date)=>{
  console.log(date)
  setselected30day(date)
const endDate = new Date(date)
endDate.setDate(endDate.getDate() - 30)
fetchFilteredData30(date.toISOString(),endDate.toISOString())

} 
const fetchFilteredData30 = (startDate,endDate)=>{
  console.log(startDate,endDate)
  axios.get(`http://localhost:4000/data30day?startDate=${startDate}&endDate=${endDate}`)
  .then((response)=>{
setFilteredData(response.data)
})
}

    return (
    <div>
      {/* <button onClick={handleFilterClick} className = "btn border border-info">Filter Data for January</button><br></br> */}
      <div className = "mt-3">
      
    <br></br>  <strong className="ml-2 mr-4 ">Yearly data Filter:-</strong>
      <DatePicker selected={selectedyear} onChange={handleyearchange} showYearPicker  dateFormat="yyyy" className ="py-2" style={{"width":"30%"}}/>
      


        {/* Add options for other months */}
     
      {/* <button onClick={handleFilterClicksss} className = "btn btn-info btn-sm mb-1 border border-dark" style={{"height":"45px"}} >Filter Data</button> */}
      </div>
     <div className = "mt-3">

    <br></br>  <strong className="ml-2 mr-4 ">Monthly data Filter:-</strong>
      <DatePicker selected={selectedMonth} onChange={handleMonthChange} showMonthYearPicker  dateFormat="MM/yyyy" className ="py-2" style={{"width":"30%"}}/>
      


        {/* Add options for other months */}
     
      {/* <button onClick={handleFilterClicksss} className = "btn btn-info btn-sm mb-1 border border-dark" style={{"height":"45px"}} >Filter Data</button> */}
      </div>


      {/* _______________________________________Weekly Data filter ________________________________________________ */}
   <br></br>  <strong>Weakly data Filter:-</strong> <select value={selectedWeek} onChange={handleWeekChange} className ="py-2" style={{"width":"30%"}}>
        <option value="">Select Week</option>
        <option value="1">Week 1</option>
        <option value="2">Week 2</option>
        <option value="3">Week 3</option>
        <option value="4">Week 4</option>
        <option value="5">Week 5</option>
        
      </select>
      <button onClick={handleFilterClickweek} className = "btn btn-danger">Filter Data</button>
     
      {/* _______________________________________7 Day go  Data filter ________________________________________________ */}
   <br></br> <strong>Last 7 Day </strong>  <DatePicker selected={selectedDay} onChange={handleDateChange} />
      {/* Display filtered data */}
     <br></br> <strong>Last 30 day</strong><DatePicker selected={selected30day} onChange={handleDate30Change} />
      <ul>

        {filteredData.map((item) => (
          <li key={item.id}>{item.title}</li>  
        ))}
      </ul>
    </div>


  );
}

export default Monthlyfilter;
