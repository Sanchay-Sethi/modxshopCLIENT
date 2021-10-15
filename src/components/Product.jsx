import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const Container = styled.div`
    flex : 1;
    margin : 5px;
    min-width : 280px;
    height : 350px;
    display : flex;
    align-items : center;
    justify-content :center;
    flex-direction : column;
    background-color : #f9efff;
    border-radius : 12px;
    position: relative;
`;
const Circle = styled.div`
    width : 200px;
    height : 200px;
    border-radius : 50%;
    background-color : white;
    position: absolute;
`;
const Image = styled.img`
    height : 75%;
    z-index: 2;
    border-radius : 12px;
`;
const Text = styled.p`
    margin-top: 10px;
    font-weight: ${props=>props.bold === "bold" ? "bold" : null};
`;
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height :  100%;
    position: absolute;
    bottom : 0px;
    left :0;
    background-color: #00000073;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }

`;
const Icon = styled.div`
    width : 40px;
    height : 40px;
    border-radius : 50%;
    background-color : white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        background-color: #dbfff7;
        transform: scale(1.1);
    }
`;

const Product = ({item}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("default");
    const [size, setSize] = useState("default");
    const user = useSelector(state=>state.user.currentUser);
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
        dispatch(addProduct({...item,quantity, color, size}))
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
            {/* <Circle/> */}
            <Image src = {item.img}/>
            <Info>
                <Icon onClick={handleClick}>  
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <Link to = {`/product/${item._id}`}>
                        <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
            <Text bold = "bold">{item.title}</Text>
            <Text>₹{item.price}</Text>
        </Container>
    )
}

export default Product
