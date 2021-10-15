import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import {mobile} from "../Responsive"
import {publicRequest} from "../requestMethods"
import GoBackBtn from "../components/GoBackBtn"
import Error from "../components/Error"
import Lottie from "react-lottie";
import loadingAnim from "../assets/animations/loadingAnim"
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
        flexDirection: "column",
        padding:"10px"
    })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({
        height: "40vh",
    })}
  
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({
        padding: "10px",
    })}
  
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({
        width: "100%",
    })}
  
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
        width: "100%",
    })}
  
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;

`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid purple;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid purple;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;
const Text = styled.p`
  color: #000;
`;
const Animation = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Product = () => {
  const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnim,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(1);
  const[loading, setLoading] = useState(true);
  const[noProduct, setNoProduct] = useState(false);
  const[color, setColor] = useState("");
  const[sizes, setSizes] = useState("");
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.currentUser);
  
  useEffect(()=>{
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/"+id)
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setNoProduct(true);
      }
    }
    getProduct();
  })
  
  const handleQuantity = (type) => {
    if(type === "dec") {
      if(quantity > 1){ 
        setQuantity(quantity-1);
        setFinalPrice((quantity - 1) * product.price)
      }
    }else{
      setQuantity(quantity+1);
      setFinalPrice((quantity + 1) * product.price)
    }
  }

  const handleClick = () => {
    if(!user){
      return toast.warn("Login First Please", {
          position:"top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  }
    dispatch(addProduct({...product, quantity, color, sizes}))
    toast.success("Added To Cart", {
      position:"top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return (
    <Container>
       <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
      <Navbar />
      <Announcement />
      <GoBackBtn />
      {loading ?  
        <Animation>
        <Lottie options={defaultOptions} height= {400} width = {500}/>
        </Animation> : 
        noProduct ? <Error/> : 
        <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            We sell the branded latest products with long lasting and comfortable reviews.<br/> Product Description : {product.desc}
          </Desc>
          <Price>₹ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {
                product?.color?.map((item)=>(
                  <FilterColor color={item} key = {item} onClick = {()=>{setColor(item)}} />
                ))
              }
              
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange = {(e)=>setSizes(e.target.value)}>
              {
                product?.size?.map((item)=>(
                  <FilterSizeOption key = {item}>{item}</FilterSizeOption>
                ))
              }
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove style={{cursor : "pointer"}} onClick = {()=>handleQuantity("dec")}/>
                <Amount>{quantity}</Amount>
              <Add style={{cursor : "pointer"}} onClick = {()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Text>{quantity!==1 && `₹ ${finalPrice}`}</Text>
            <Button onClick = {handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper> }
      <NewsLetter/>
      <Footer />
    </Container>
  );
};

export default Product;