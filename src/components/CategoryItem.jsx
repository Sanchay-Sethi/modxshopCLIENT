import { Link } from "react-router-dom";
import styled from "styled-components"
import {mobile} from '../Responsive'
const Container = styled.div`
    flex : 1;
    margin : 3px;
    height: 60vh;
    position: relative;
    border-radius :12px;
`;
const Image = styled.img`
    width : 100%;
    height :  100%;
    object-fit: cover;
    border-radius :12px;
    ${mobile({
        height: "30vh"
    })}
`;
const Info = styled.div`
    position: absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    display : flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #32225852;
    border-radius :12px;
`;
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    ${mobile({
        fontSize: "20px"
    })}
    
`;
const Desc = styled.h4`
    color: white;
    margin-bottom: 5px;
    ${mobile({
        fontSize: "12px"
    })}
`;
const Gender = styled.p`
    color: white;
    margin-bottom: 10px;
    ${mobile({
        fontSize: "11px"
    })}
`;
const Button = styled.button`
    border: none;
    padding:10px;
    cursor: pointer;
    background-color: #fff;
    color: #272727;
    font-weight: 600;
    ${mobile({
        padding: "6px"
    })}
`;

const CategoryItem = ({item}) => {
    return (
        <Container>
            <Link to = {`/products/${item.cat}`}>
                <Image src = {item.img}/>
                <Info>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Gender>{item.gender}</Gender>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
