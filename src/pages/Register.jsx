import { useState } from "react";
import styled from "styled-components";
import {mobile} from "../Responsive"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {publicRequest} from "../requestMethods"
import Lottie from "react-lottie";
import mainloading from "../assets/animations/mainloading";
import redirectme from "../assets/animations/redirect";
import regisImg from "../assets/pictures/reg.jpeg";

import {
  Redirect,
  Link
} from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${regisImg})
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingAnim = styled.div`
  width: 100vw;
  height: 100vh;
  background-color : #000000a5;
  position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TakeToLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background-color : #000000c0;
  position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  ${mobile({
        width: "75%",
    })}
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Account = styled.span`
  font-size: 12px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #871edd;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [takeLogin, setTakeLogin] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: mainloading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: redirectme,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [registerData, setRegisterData] = useState({
    firstname : "",
    lastname : "",
    username : "",
    phone : "",
    email : "",
    password : "",
    cpassword : "",
  })
  const handleChange =(e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setRegisterData({...registerData,[name]:value})
  }
  const handleClick = async (e)=>{
    e.preventDefault();
    if(registerData.firstname === "" || registerData.lastname === "" ||registerData.username === "" || registerData.email === "" || registerData.phone === "" || registerData.password === "" || registerData.cpassword === ""){
      return toast.warn("Some fields are empty", {
        position:"top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(registerData.password !== registerData.cpassword){
      return toast.warn("Passwords dont match", {
        position:"top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } 
    setLoading(true);
    delete registerData.cpassword;
    console.log(registerData);
    try {
      const res = await publicRequest.post("/auth/register", registerData);
      setLoading(false);
      toast.success("Account is created", {
        position:"top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setRegisterData({
          firstname : "",
          lastname : "",
          username : "",
          phone : "",
          email : "",
          password : "",
          cpassword : "",
        })
        setTakeLogin(true);
        setTimeout(()=>{
          setTakeLogin(false);
          setRedirect(true)
        },4000)
    } catch (error) {
      setLoading(false);
      toast.error("User Already Exists", {
        position:"top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      console.log("error"+error)
    }
  }
  return (
    <Container>
      {
        takeLogin ? <TakeToLogin>
          <Lottie options={defaultOptions2} height= {400} width = {400}/>
          <h1 style = {{color: "white"}}>Redirecting to Login...</h1>
          </TakeToLogin> : null
      }
      {
        redirect ? <Redirect  to = "/login"/> : null
      }
      <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
      {loading ? <LoadingAnim>
        <Lottie options={defaultOptions} height= {200} width = {400}/>
      </LoadingAnim> : 
      <Wrapper>
        <Title>CREATE YOUR ACCOUNT</Title>
        <Form>
          <Input placeholder="Your Goodname" name = "firstname" value = {registerData.firstname} onChange = {handleChange}/>
          <Input placeholder="Your Sirname" name = "lastname" value = {registerData.lastname} onChange = {handleChange}/>
          <Input placeholder="Set Username"  name = "username" value = {registerData.username} onChange = {handleChange}/>
          <Input placeholder="Enter Valid Email" name = "email" value = {registerData.email} onChange = {handleChange}/>
          <Input type = "password" placeholder="Enter Strong Password" name = "password" value = {registerData.password} onChange = {handleChange}/>
          <Input type = "password" placeholder="Confirm Password" name = "cpassword" value = {registerData.cpassword} onChange = {handleChange}/>
          <Input placeholder="Enter Valid Phone Number" name = "phone" value = {registerData.phone} onChange = {handleChange}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b><br/><br/>
            <Link to = "/login" style = {{textDecoration : "none", color : "black"}}>
            <Account>
            <b>Already Have An Account ?</b>
            </Account>
            </Link>
          </Agreement>
          
          <Button onClick = {handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
      }
    </Container>
  );
};

export default Register;