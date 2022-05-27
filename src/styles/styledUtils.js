import styled from "styled-components";
import { colors } from "../components/colors";

const SecondaryBtn = styled.button`
  outline: none;
  border: 2px solid ${colors.black};
  background-color: ${colors.secondary};
  width: 100%;
  height: 50px;
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 50px;
  margin: 20px 0;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
`;

const WhiteBtn = styled(SecondaryBtn)`
  background-color: ${colors.white};
`;

const Container = styled.div`
  padding: 20px;
  width: 97%;
`;

const StyledInput = styled.input`
  outline: none;
  padding: 10px;
  width: 100%;
  height: 50px;
  color: ${colors.black};
  border-radius: 50px;
  margin: 10px 0;
  border: 2px solid ${colors.black};
  padding-right: 50px;
  font-weight: 400;
`;

export { SecondaryBtn, WhiteBtn, Container, StyledInput };
