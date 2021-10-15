import { useHistory } from "react-router";
import styled from "styled-components";

const ButtonBack = styled.button`
  position: relative;
  top: 10px;
  left : 20px;
  background-color: transparent;
  outline: none;
  border : 0;
  cursor: pointer;
  font-weight: 500;
  font-size : 15px;
  &:hover{
      color: #e01653;
  }
`;

const GoBackBtn = () => {
    const  history = useHistory();
    return (
        <ButtonBack onClick={()=>history.goBack()}>&larr; Back</ButtonBack>
    )
}

export default GoBackBtn
