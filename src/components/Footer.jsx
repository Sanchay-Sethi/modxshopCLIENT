import { Facebook, Instagram, MailOutline, Phone, Room, Twitter, WhatsApp } from '@material-ui/icons';
import styled from 'styled-components'
import {mobile} from '../Responsive'
const Container = styled.div`
    display: flex;
    ${mobile({
        flexDirection: 'column',
    })}
`;
const Left = styled.div`
    flex :1;
    display: flex;
    flex-direction: column;
    padding: 20px
`;
const Logo = styled.h1`
   
`;
const Desc = styled.p`
    margin : 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
   width : 40px;
   height : 40px;
   border-radius :50%;
   color : white;
   background-color : #${props => props.color};
   display: flex;
   justify-content : center;
   align-items : center;
   margin-right: 20px;
   cursor: pointer;
`;
const Center = styled.div`
    flex :1;
    padding: 20px;
    ${mobile({
        display: "none"
    })}
    
`;
const Title = styled.h3`
    margin-bottom:  30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style : none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width : 50%;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.1s ease;
    &:hover{
        color: #6300aa;
        text-decoration: underline;
    }
`;
const Right = styled.div`
    flex :1;
    padding: 20px;
    ${mobile({
        backgroundColor: "#f6f6f6",
    })}
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const Payment = styled.img`
    width: 50%;
`;


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>ModXShop</Logo>
                <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam recusandae sunt quo labore similique hic laboriosam iure numquam temporibus minus.</Desc>
                <SocialContainer>
                    <SocialIcon color = "3B5999">
                        <Facebook/>
                    </SocialIcon>    
                    <SocialIcon color = "E4405F">
                        <Instagram/>
                    </SocialIcon>    
                    <SocialIcon color = "55ACEE">
                        <Twitter/>
                    </SocialIcon>    
                    <SocialIcon color = "36d921">
                        <WhatsApp/>
                    </SocialIcon>       
                </SocialContainer>
            </Left>
            <Center>
                <Title>Important Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Male Tshirts</ListItem>
                    <ListItem>Female Tshirts</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Track Order</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms And Conditions</ListItem>
                    <ListItem>Privacy Policy</ListItem>
                </List>
            </Center>
            <Right>
               <Title>Contact Us</Title> 
               <ContactItem>
                    <Room style={{marginRight:"10px"}}/> 123 A Gurgaon, Haryana, India
               </ContactItem>
               <ContactItem>
                    <Phone style={{marginRight:"10px"}}/> +91-98 7654 321
               </ContactItem>
               <ContactItem>
                    <MailOutline style={{marginRight:"10px"}}/> contact@modxshop.com
               </ContactItem>
               <Payment src = "https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer
