import styled from "styled-components";

export const Container = styled.div`
  color: rgb(27, 27, 27);
  background-color: ${(props) => props.bgColor } ;
  font-size: 20px;
  display: flex;
  align-items: ${(props) => props.align ? props.align : 'center'};
  justify-content: ${(props) => props.justify ? props.justify : 'center'};
  border: 1px solid rgb(27, 27, 27);
  font-family: Avenir Next;
  height: ${(props) => props.height};
`;
