import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import {store} from "../redux/store"
import {mobile} from "../Responsive"
import logImg from "../assets/pictures/log.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Link
} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${logImg})
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #b019ca;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    background-color: #ee8bff;
    color : #360044;
    cursor : not-allowed;
  }
`;

const Linked = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color : red;
`;
const Success = styled.span`
  color : green;
`;


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const {isFetching, error, isSuccess} = useSelector(state=>state.user)
  const handleLogin =async (e) => {
    e.preventDefault();
    await login(dispatch, {username, password})
    let loginError = store.getState().user.error;
    console.log(loginError)
    if(loginError){
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
      return toast.success("Login Successfull", {
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
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" onChange = { e => setUsername(e.target.value) }/>
          <Input type = "password" placeholder="Password" onChange = { e => setPassword(e.target.value) }/>
          <Button onClick = {handleLogin} disabled={isFetching}>LOGIN</Button>
          {error &&
            <Error>Invalid Credentials</Error>
          }
          {isSuccess &&
            <Success>Login Succesfull</Success>
          }
          <Link to = "/register" style = {{textDecoration : "none", color : "black"}}><Linked>DO NOT YOU REMEMBER THE PASSWORD?</Linked></Link>
          <Link to = "/register" style = {{textDecoration : "none", color : "black"}}><Linked>CREATE A NEW ACCOUNT</Linked></Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;