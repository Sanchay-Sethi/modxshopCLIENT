import {popularProducts} from "../data"
import styled from 'styled-components'
import Product from "./Product";
import axios from "axios"
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import noProduct from "../assets/animations/noproduct";

const Container = styled.div`
    padding : 20px;
    display : flex;
    flex-wrap: wrap;
    justify-content : space-between;
`;
const Error = styled.div`
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items : center;
    width: 100%;
`;


const Products = ({cat, filters, sort}) => {
    //Animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: noProduct,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get(
              cat
                ? `http://localhost:5000/api/products?category=${cat}`
                : "http://localhost:5000/api/products"
            );
            setProducts(res.data);
          } catch (err) {}
        };
        getProducts();
      }, [cat]);

      useEffect(() => {
        cat &&
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      }, [products, cat, filters]);

      useEffect(()=>{
        if (sort === "newest") {
            setFilteredProducts((prev) =>
              [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
          } else if (sort === "asc") {
            setFilteredProducts((prev) =>
              [...prev].sort((a, b) => a.price - b.price)
            );
          } else {
            setFilteredProducts((prev) =>
              [...prev].sort((a, b) => b.price - a.price)
            );
          }
      },[sort])

    return (
        <Container>
        {cat
            ? filteredProducts.length===0 ? 
            <Error>
                <Lottie options={defaultOptions} height= {200} width = {400}/>
                <h2>No Product Found!</h2>
            </Error> : 
            filteredProducts.map((item) => <Product item={item} key={item.id} />)
            : products
                .slice(0, 8)
                .map((item) => <Product item={item} key={item.id} />)}
        </Container>
    )
}

export default Products
