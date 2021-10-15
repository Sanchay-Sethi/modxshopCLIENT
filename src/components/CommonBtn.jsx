import styled from "styled-components"
import {mobile} from '../Responsive'
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;   
    margin-bottom : 20px;
    position: relative;
    &::after{
        content: '';
        position: absolute;
        top: -100px;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: #ffffffc8;
        border-radius: 50px 20px/ 30px 50px 60px;
        clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 100% 100%, 50% 100%, 0 100%, 0% 70%, 0% 35%, 20% 10%);

    }
`;
const Button = styled.button`
    z-index: 2;
    width: 150px;
    height: 50px;
    outline: none;
    border: 2px solid black;
    color: black;
    background-color:transparent;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.4s ease;
    &:hover{
        background-color: black;
        color: white;
    }
`;


const CommonBtn = () => {
    return (
        <Container>
            <Link to = {`/products/tshirt`}>
                <Button>Explore More!</Button>
            </Link>
        </Container>
    )
}

export default CommonBtn

