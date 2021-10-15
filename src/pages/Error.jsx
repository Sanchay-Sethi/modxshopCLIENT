import React from 'react'
import Announcement from '../components/Announcement'
import styled from "styled-components";
import Categories from '../components/Categories'
import CommonBtn from '../components/CommonBtn'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Lottie from "react-lottie";
import error from "../assets/animations/error";

const Container = styled.div`
    width: 100%;
    display : flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0px;
`;

const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Container>
             <Lottie options={defaultOptions} height= {500} width = {500}/>
            </Container>
            <Footer/>
        </div>
    )
}

export default Error
