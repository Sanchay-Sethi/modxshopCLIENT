import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import {store} from "../redux/store"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'

import styled from "styled-components";
import { useSelector } from "react-redux";
import { LocalPhone, Email, Edit } from '@material-ui/icons';
import avatar from "../assets/pictures/user.png"
import { useDispatch } from "react-redux";
import { update } from "../redux/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 20px;
`;
const Heading = styled.h1`
    font-weight: 900;
`
const Content = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 90%;
`
const ContentOne = styled.div`
    display : flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 500px;
    flex-direction: column;
    border-radius: 10px;
    padding: 15px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ContentTwo = styled.div`
    display : flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 700px;
    position: relative;
    flex-direction: column;
    border-radius: 10px;
    padding: 15px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const ContainerIMG = styled.div`
    width : 250px;
    height : 250px;
    display : flex;
    align-items : center;
    justify-content :center;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 15px;
`;
const Img = styled.img`
    /* &:hover{
        background-color: #0000008a;
        cursor : pointer;
    } */
`;

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height :  100%;
    position: absolute;
    top : 0px;
    left :0;
    background-color: #00000088;
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    color : white;
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 2px;
    transition: all 0.3s ease;

    &:hover{
        transform: scale(1.1);
    }
`;
const Button = styled.button`
     margin-top: 20px;
      border-radius: 5px;
      border: none;
      padding: 5px;
      cursor: ${props=>props.disabled===true ? `not-allowed` : `pointer`};
      background-color: ${props=>props.disabled===true ? `rgba(248, 183, 255, 0.5)` : `rgb(127, 0, 139)`};
      color: white;
      font-weight: 600;
`


const Profile = () => {
    const user = useSelector(state=>state.user.currentUser);
    const dispatch = useDispatch()
    const [disableBtn, setDisableBtn] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        id : (user._id).toString(),
        firstname : user.firstname,
        lastname : user.lastname,
        username : user.username,
        phone : user.phone,
        email : user.email,
        address : "",
        password : user.password
      })
    const handleChange =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUpdatedData({...updatedData,[name]:value})
      }

    const handleClick = async (e) =>{
        e.preventDefault();
        console.log(updatedData)
        await update(dispatch, updatedData)
        let updatedError = store.getState().user.error;
        console.log(updatedError)
        if(updatedError){
        return toast.error("Something Went Wrong", {
            position:"top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }else{
        return toast.success("Updated Successfull", {
            position:"top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }

    }  
    return (
        <div>
            <Announcement/>
            <Navbar/>
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
                <Content>
                    <ContentOne>
                        <ContainerIMG>
                        <Img src = {avatar} style = {{width : "100%",  height : "100%", borderRadius : "15px"}}/>
                        <Info>
                            <Icon >  
                                <Edit/> &nbsp;Choose
                            </Icon>
                            
                        </Info>
                        </ContainerIMG>
                        
                        <hr style = {{width : "80%"}}/>
                        <p style = {{marginBottom : "6px"}}>Account Details</p>
                        <h5>Username : {user.username}</h5>
                        <h5 style = {{marginBottom : "6px"}}>UserID : {user._id}</h5>
                        <hr style = {{width : "80%"}}/>
                        <br/>
                        <p style = {{marginBottom : "6px"}}>Contact Details</p>
                        <h5 style = {{display : "flex", alignItems : "center", justifyContent: "center"}}><Email/> {user.email}</h5>
                        <h5 style = {{display : "flex", alignItems : "center", justifyContent: "center", marginBottom : "6px"}}><LocalPhone/>{user.phone}</h5>
                        <hr style = {{width : "80%"}}/>
                    </ContentOne>
                    <ContentTwo>
                   
                        <span className="userUpdateTitle">Profile Details</span>
                        <form className="userUpdateForm" style = {{width : "80%"}}>
                            <div className="userUpdateLeft" style = {{width : "100%"}}>
                            <div className="userUpdateItem">
                                <label>UserName</label>
                                <input
                                name = "username"
                                value = {updatedData.username}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.username}
                                className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>First Name</label>
                                <input
                                name = "firstname"
                                value = {updatedData.firstname}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.firstname}
                                className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Last Name</label>
                                <input
                                name = "lastname"
                                value = {updatedData.lastname}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.lastname}
                                className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                name = "email"
                                value = {updatedData.email}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.email}
                                className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                name = "phone"
                                value = {updatedData.phone}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.phone}
                                className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                name = "address"
                                value = {updatedData.address}
                                onChange = {handleChange}
                                type="text"
                                placeholder={user.address ? user.address : "Enter Delivery Point Address"}
                                className="userUpdateInput"
                                />
                            </div>
                            </div>     
                        </form>
                        <Button disabled = {disableBtn} onClick={handleClick}>Update</Button>
                    </ContentTwo>
                </Content>
            </Container>
            <NewsLetter/>
            <Footer/>
        </div>
    )
}

export default Profile
