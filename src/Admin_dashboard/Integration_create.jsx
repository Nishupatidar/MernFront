

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';
import IntegrationForm from './IntegrationFrom/IntegrationFrom'; // Import the IntegrationForm component

// Import icons
import { FaWordpress } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaWix } from "react-icons/fa6";
import { SiWebflow } from "react-icons/si";
import { FaShopify } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { TbBrandZapier } from "react-icons/tb";

function Integration_create() {
    const [gettitle, setgettitle] = useState([]);
    const [selectedIntegration, setSelectedIntegration] = useState(null); // State to track selected integration

    useEffect(() => {
        axios.get('http://localhost:4000/integrationview')
            .then((res) => {
                setgettitle(res.data.titlevalue);
                if (res.data.titlevalue.length > 0) {
                    setSelectedIntegration(res.data.titlevalue[0].name);
                }
            })
            .catch(error => console.error('Error fetching integration titles:', error));
    }, []);

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
            <Sidebar />
            <Navbar />
            <div className="container mt-5">
                <div className="row " style={{ "marginLeft": "119px", "marginTop": "53px" }}>
                    <form className="form bg-light mt-2 p-5">
                        <h6 className='alert alert-light text-center'>Integrations/Create</h6>

                        <label>Integration Type</label>
                        <div className="row">
                            {gettitle && gettitle.map((items, index) => {
                                const iconName = items.icon.toLowerCase();
                                const IconComponent = iconComponents[iconName] || DefaultIcon;
                                return (
                                    <div key={index} className="col-lg-3 col-md-4 col-6 mb-2">
    <button
        type="button"
        style={{ "width": "100%", "textAlign": "start" }} // Align text to the left for better readability
        value={items.name}
        className={`btn btn-light text-dark rounded ${selectedIntegration === items.name ? 'active' : ''}`}
        onClick={() => handleIntegrationClick(items.name)}>
        {IconComponent && <IconComponent/>}
        {items.name}
    </button>
</div>
                                )
                            })}
                        </div>

                        {selectedIntegration && <IntegrationForm integration={selectedIntegration} isActive={selectedIntegration !== null} />}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Integration_create;





