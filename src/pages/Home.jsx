import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import CommonBtn from '../components/CommonBtn'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <CommonBtn/>
            <NewsLetter/>
            <Footer/>
        </div>
    )
}

export default Home
