import { Send } from '@material-ui/icons';
import styled from 'styled-components'
import {mobile} from '../Responsive'

const Container = styled.div`
    height : 60vh;
    background-color : #e6ddff;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    ${mobile({
        height : "30vh",
    })}
`;
const Title = styled.h1`
    font-size: 70px;
    ${mobile({
        fontSize: "40px",
        textAlign: "center",
    })}
`;
const Desc = styled.p`
    font-size : 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({
        fontSize: "15px",
        textAlign: "center",
    })}
`;
const InputContainer = styled.div`
    width: 50%;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius:12px;
    overflow: hidden;
    ${mobile({
        width : "90%",
        height : "30px",
        borderRadius : "2px"
    })}
`;
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    outline: none;
    font-size: 17px;
    ${mobile({
        fontSize: "14px",
    })}
`;
const Button = styled.button`
    flex:1;
    border : none;
    background-color: #990099;
    color: white;
    cursor: pointer;
`;

const NewsLetter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get the daily updates of latest offers</Desc>
            <InputContainer>
                <Input placeholder="Enter Your Email"/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default NewsLetter
