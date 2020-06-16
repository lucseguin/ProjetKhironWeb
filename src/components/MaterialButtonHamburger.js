import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialButtonHamburger(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name={props.caption || "menu"}
        style={{
          color: "#fff",
          fontSize: 24,
          fontFamily: "Roboto"
        }}
      ></MaterialCommunityIconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #3F51B5;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

export default MaterialButtonHamburger;
