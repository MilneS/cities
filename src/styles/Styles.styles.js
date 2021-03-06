import styled from "styled-components";

export const Container = styled.div`
  color: rgb(27, 27, 27);
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  font-family: Avenir Next;
  height: ${(props) => props.height};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  font-weight: 500;
  width:${(props) => (props.width ? props.width : "")};
  position: ${(props) => (props.position ? props.position : "static")};
  @media(max-width:425px){
    margin: ${(props) => (props.marginSmall ? props.marginSmall : "0px")};
    height: ${(props) => props.heightSmall};
  }
`;

export const Title = styled.h1`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "25px")};
  color: rgb(95, 105, 196);
  font-weight: bold;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  @media(max-width:768px){
    font-size: 20px;
  }
`;

export const MapContainer = styled.div`
  height: 100%;
  width:100%;
`;

export const Text = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "20px")};
  line-height: 40px;
  margin-top:${(props) => (props.marginTop ? props.marginTop : "10px")};
  padding-right:${(props) => (props.paddingRight ? props.paddingRight : "20px")};
  display:flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: ${(props) => (props.width? props.width : 'fit-content')};
  @media(max-width:768px){
    font-size: ${(props) => (props.fontSizeSmall? props.fontSizeSmall : '10px')};
  }
`;

export const Label = styled.label`
  font-size: 20px;
  @media(max-width:768px){
    font-size: 16px;
  }
  @media(max-width:320px){
    font-size: ${(props) => (props.fontSizeSmall? props.fontSizeSmall : '10px')};
  }
`;

export const Select = styled.select`
  font-size: 20px;
  color: rgb(27, 27, 27);
  font-family: Avenir Next;
  margin-left: 10px;
  font-weight: 500;
  border: 3px solid rgb(194, 192, 192);
  border-radius: 3px;
  padding-left: 5px;
  padding-right: 5px;
  outline: none;
  @media(max-width:768px){
    font-size: 16px;
  }
  @media(max-width:320px){
    font-size: ${(props) => (props.fontSizeSmall? props.fontSizeSmall : '10px')};
  }
`;

