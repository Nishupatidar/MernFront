import {useEffect, useRef, useState} from "react";
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import NewsletterForm from '../../components/Newsletter/NewsletterForm.jsx';
import Parallax from 'parallax-js';
import axios from "axios";

const Newsletter = () => {
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    const [Blog, setBlog] = useState([])
    const [randomPosts, setRandomPosts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    try{

       
        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await axios.get('http://localhost:4000/blog');
                setBlog((prevBlog) => response.data.blog);
        
                // Shuffle the posts
                const shuffledPosts = [...response.data.blog].sort(() => Math.random() - 0.5);
        
                // Set the random posts in the state
                setRandomPosts(shuffledPosts.slice(0, 1)); // Adjust the number of random posts as needed
              } catch (error) {
                console.log(error);
              }
            };
        
            fetchData(); // Initial call
        
            const intervalId = setInterval(() => {
              fetchData();
            }, 60000);
        
            // Clean up the interval when the component unmounts
            return () => {
              clearInterval(intervalId);
            };
          }, []);
         } // Run effect only once
catch(error){
console.log(error)
}
    return (
        <div className="section section-bg-image section-padding-t110-b120 newsletter-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/newsletter.jpg)`}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                    {randomPosts && randomPosts.map((items,index)=>{
                                // const slicedecription = items.decsription.slice(0,100)
                                if(items.status == 1){
                                return(
                        <div className="newsletter-content">
                            <SectionTitle
                                titleOption="color-light text-center"
                                title={items.title}
                                // subTitle={slicedecription}
                            />
                            <NewsletterForm mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" />
                        </div>
                         )
                        }
                    })}
                    </div>
                </div>
            </div>

            <div className="shape shape-1" id="scene" ref={sceneEl}>
                <span data-depth="1">
                    <img src={process.env.PUBLIC_URL + "/images/shape-animation/newsletter-shape.png"} alt="" />
                </span>
            </div>
        </div>
    )
}

export default Newsletter
