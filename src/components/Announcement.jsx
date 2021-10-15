import styled from "styled-components"
import {mobile} from '../Responsive'
const Container = styled.div`
    height: 30px;
    background-color: #8000a7;
    color : white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:14px;
    font-weight: 500;
    letter-spacing: 1px;
    ${mobile({
        fontSize: "10px",
        textAlign: "center",
    })}
`;

const Announcement = () => {
    return (
        <Container>
            Great deals knock your doors, Get flat 30% off on every ₹5000 plus shopping
        </Container>
    )
}

export default Announcement
