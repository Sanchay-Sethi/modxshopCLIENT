import Lottie from "react-lottie";
import error from "../assets/animations/404"
import styled from "styled-components";
const Container = styled.div`
    width : 100%;
    height : 70vh;
    display: flex;
    justify-content : center;
    align-items : center;
`;
const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <Container>
            <Lottie options={defaultOptions} height= {500} width = {300}/>
        </Container>
    )
}

export default Error
