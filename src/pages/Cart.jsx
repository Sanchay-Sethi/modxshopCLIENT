import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from "../Responsive"
import {useSelector} from "react-redux"
import GoBackBtn from "../components/GoBackBtn";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import Lottie from "react-lottie";
import emptycart from "../assets/animations/emptycart"
import { Delete } from '@material-ui/icons';

const KEY = "pk_test_51JgrROSIjHxHGP78F0TB8vQHR88Rf09Kzje6VzvFTLSeIJOkF8GSffgdEIDXNk8NNXzDdeaCy1pY331QGhyyYmlE00Vjl64HuF";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
        padding: "10px"
    })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  ${mobile({
        fontSize: "25px"
    })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
   ${mobile({
        display: "none"
    })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
        flexDirection: "column"
    })}
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
        flexDirection: "column"
    })}
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  border-radius: 12px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border-radius: 1px solid black;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({
        margin: "5px 15px"
    })}
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
        marginBottom: "20px"
    })}
  
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const EmptyCart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin : 40px 0px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #ff004c;
`;

const Cart = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptycart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const cart = useSelector(state=>state.cart);
  const user = useSelector(state=>state.user.currentUser);
  const histroy = useHistory()
  const [stripeToken, setStripeToken] = useState(null)
  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(()=>{
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment",{
          tokenId: stripeToken.id,
          amount: cart.total*100,
        })
        histroy.push("/success", {data : res.data})
      } catch (error) {
      }
    };
    stripeToken && cart.total >= 1 && makeRequest()
  },[stripeToken, cart.total, histroy])

  const handleDelete = (product) =>{
    const deleteKey = product._id;
    cart.products.filter((item)=>{
      return item._id!==deleteKey;
    })
    console.log(cart.products)

  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick = {()=>histroy.goBack()}>BACK TO SHOPPING</TopButton>
          <TopTexts>
            <TopText>CART ITEMS({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {cart.quantity!==0 ? <TopButton type="filled">CHECKOUT NOW</TopButton> : null}
          
        </Top>
        {cart.quantity===0 ? 
          <EmptyCart>
              <h3>Your Cart Is Empty</h3>
              <Lottie options={defaultOptions} height= {250} width = {250}/>
          </EmptyCart> : 
        <Bottom>
          
          <Info>
            {
              cart.products.map((product)=>{
                return(
                  <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.sizes}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                    <DeleteButton onClick = {()=>handleDelete(product)}><Delete/>Delete</DeleteButton>
                      <ProductAmountContainer>
                        <Add />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>₹ {product.price * product.quantity}</ProductPrice> 
                    </PriceDetail>
            </Product>
            <Hr />
            <br/>
            </>
            
                )
              })
            }
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- ₹ 50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="ModXShop"
              image = "https://drive.google.com/uc?id=1UxO1vyOaR9OnKRFegxcfnit7j8Rehg6M"
              billingAddress
              shippingAddress
              description={`Only ₹ ${cart.total} to pay`}
              amount = {cart.total*100}
              token = {onToken}
              stripeKey={KEY}
            >
             <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
        }
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
