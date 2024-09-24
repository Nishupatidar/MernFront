import React, { useEffect, useState } from 'react';
import axios from 'axios';
 // Import the IntegrationForm component

// Import icons
import { FaWordpress } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaWix } from "react-icons/fa6";
import { SiWebflow } from "react-icons/si";
import { FaShopify } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { TbBrandZapier } from "react-icons/tb";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import IntegrationForm from './IntegrationFrom';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import IntegrationeditForm from './IntegrationeditFrom';

function Integrationedit() {
  const xid = useParams()
  const [gettitle, setgettitle] = useState([]);
  const [integartion,setintegrtion] = useState("")
  const [initialAutoblog, setInitialAutoblog] = useState({});
  const [selectedIntegration, setSelectedIntegration] = useState("Wordpress"); // State to track selected integration

  useEffect(() => {
      axios.get('http://localhost:4000/integrationview')
          .then((res) => {
              setgettitle(res.data.titlevalue);
          })
          .catch(error => console.error('Error fetching integration titles:', error));
  }, []);
useEffect(()=>{
  axios.get(`http://localhost:4000/integrationedit/${xid.id}`).then((res)=>{
    // console.log(res.data.integrationedit)
    setintegrtion(res.data.integrationedit)
    setInitialAutoblog(res.data.integrationedit)
  })
},[])
  const iconComponents = {
      fawordpress: FaWordpress,
      faregcircle: FaRegCircle,
      fawix: FaWix,
      fashopify: FaShopify,
      siwebflow: SiWebflow,
      fablogger: FaBlogger,
      tbapi: TbApi,
      tbbrandzapier: TbBrandZapier
      // Add more mappings as needed
  };
  const DefaultIcon = () => <span>Default Icon</span>;

  const handleIntegrationClick = (name) => {
      setSelectedIntegration(name);
  };

  return (
    <div>
    <Sidebar/>
    <Navbar/>
    <div className="container mt-5">
        <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
            <form className="form bg-light mt-2 p-5">
                <h6 className='alert alert-light text-center'>Integrations/Update</h6>

                <label>Integration Type</label>
                <div className="row">
                    {gettitle && gettitle.map((items, index) => {
                        const iconName = items.icon.toLowerCase();
                        const IconComponent = iconComponents[iconName] || DefaultIcon;
                        return (
                            <div key={index} className="col-lg-3 col-md-4 col-6 mb-2">
                                <button
                                    type="button"
                                    value = {items.name}
                                    className={`btn btn-light text-dark rounded b-integration ${selectedIntegration === items.name ? 'active' : ''}`}
                                    onClick={() => handleIntegrationClick(items.name)}>
                                    <span> {IconComponent && <IconComponent  />}</span>   
                                     {items.name}
                                    
                                </button>
                            </div>
                        )
                    })}
                </div>

                {selectedIntegration && <IntegrationeditForm integration={selectedIntegration} isActive={selectedIntegration !== null} setintegrtion ={setintegrtion} integartions={integartion} xid={xid.id} initialAutoblog={initialAutoblog}/>}
            </form>
        </div>
    </div>
    <Footer />
</div>
  )
}

export default Integrationedit
