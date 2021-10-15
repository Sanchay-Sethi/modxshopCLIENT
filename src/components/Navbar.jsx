import * as React from 'react';
import { useEffect, useState } from "react";
import styled from 'styled-components'
import { Search, ShoppingCartOutlined} from '@material-ui/icons';
import Avatar from "@material-ui/core/Avatar";
import { Badge } from '@material-ui/core';
import {mobile} from '../Responsive'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../assets/pictures/user.png"

const Container = styled.div`
    height: 60px;
    ${mobile({
        height: "50px"
    })}
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({
        padding: "10px 0px"
    })}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: "none"
    })}
`;
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding:5px;
`;
const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({
        width: "50px"
    })}
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    display : flex;
    text-decoration: none;
    color: black;
    font-weight: bold;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    ${mobile({
        fontSize: "24px"
    })}
     
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    position: relative;
    ${mobile({
        flex:2,
        justifyContent: "center"
    })}
`; 
const User = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    ${mobile({
        flex:2,
        justifyContent: "center"
    })}
`; 
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left : 25px;
    ${mobile({
        fontSize: "12px",
        marginLeft: "10px"
    })}
`;
const MenuItemList = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    &:hover{
        transform : scale(1.1)
    }
    ${mobile({
        fontSize: "12px",
    })}
`;
const UserWelcome = styled.div`
    display: flex;
    font-size: 14px;
    margin-left : 10px;
    cursor : pointer;
    ${mobile({
        fontSize: "12px",
        marginLeft: "10px"
    })}
`;
const WrapperMenu = styled.div`
    z-index: 5;
    position : absolute;
    top : 50px;
    right : 0;
    background-color: white;
    display: flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items: flex-start;
    padding: 15px 30px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border : 1px solid black;
    border-top: 0px;
    ${mobile({
        top : "40px"
    })}
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state=>state.user.currentUser);
    const [slideDown,setSlideDown] = useState("hidden");
    const handleDown = () => {
        setSlideDown(slideDown==="visible" ? "hidden" : "visible")
    }
    const logOut =() =>{
        localStorage.removeItem("persist:root");
        window.location.reload()
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="search"/>
                        <Search style = {{color : "gray", fontSize : "16px"}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link style={{ textDecoration: 'none'}} to = "/">
                        <Logo>ModXShop</Logo>
                    </Link>
                </Center>
                <Right>
                    {user ?<User style={{ position : "relative"}}>
                        <Avatar
                            style={{cursor : "pointer"}}
                            onClick = {handleDown}
                            alt="Evelyn Carnahan"
                            src={avatar}
                        />
                        <UserWelcome onClick = {handleDown}>{user.username}</UserWelcome>
                        <WrapperMenu style = {{ visibility : slideDown}}>
                            <Link to = "/profile" style = {{textDecoration : "none", color : "black"}}><MenuItemList>PROFILE</MenuItemList></Link>
                            <Link to = "/cart" style = {{textDecoration : "none", color : "black"}}><MenuItemList>CART</MenuItemList></Link>
                            <MenuItemList>ORDERS</MenuItemList>
                            <MenuItemList onClick = {logOut}>LOGOUT</MenuItemList>
                        </WrapperMenu>
                    </User>  : 
                    <>
                     <Link to = "/register" style = {{textDecoration : "none", color : "black"}}><MenuItem>SIGNUP</MenuItem></Link>
                     <Link to = "/login" style = {{textDecoration : "none", color : "black"}}><MenuItem>LOGIN</MenuItem></Link>
                    </>
                    }
                    <Link to = "/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="secondary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper> 
        </Container>
    )
}

export default Navbar
