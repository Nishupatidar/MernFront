import React, { useEffect, useState } from 'react';
import IntroData from '../../data/intro/intro.json';
import Intro from '../../components/Intro/Intro.jsx';
import SwiperSlider, {SwiperSlide} from "../../components/swiper"
import axios from 'axios';
import Loader from '../../components/Blog/Loader';

const IntroSlider =  () => {
    const [blog,setblog] = useState([])
    const [loading ,setloading] = useState(true)
    useEffect(()=>{
        try{
            setloading(false)
axios.get('http://localhost:4000/blog').then((res)=>{
    setblog(res.data.blog)
}).finally(
    setloading(true)
)
        }
        catch(error){
            console.log(error)
        }
    },[blog])
    const swiperOption = {
        loop: true,
        speed: 750,
        spaceBetween: 0,
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: true,
    }
    return (
        <div className="intro-slider-wrap section">
            <SwiperSlider effect="fade" className="intro-slider" options={swiperOption}>
                {loading  ? 
                
                    blog.map((single, key) => {
                        return(
                            <SwiperSlide key={key}>
                                <Intro data={single} key={key} />
                            </SwiperSlide>
                        ); 
                    })
                    : <>
                    <Loader/>
                    </>
                }
                {/* <div className="home-slider-next main-slider-nav swiper-button-next">
                    <i className="fa fa-angle-right"></i>
                </div>
                <div className="home-slider-prev main-slider-nav swiper-button-prev">
                    <i className="fa fa-angle-left"></i>
                </div> */}
            </SwiperSlider>
        </div>
    )
}

export default IntroSlider
