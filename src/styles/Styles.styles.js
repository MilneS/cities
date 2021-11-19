import styled from "styled-components";

export const Container = styled.div`
  color: rgb(27, 27, 27);
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  font-family: Avenir Next;
  height: ${(props) => props.height};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
`;

export const Title = styled.h1`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "25px")};
  color: rgb(95, 105, 196);
  font-weight: bold;
`;

export const Text = styled.p`
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "18px")};
`;
