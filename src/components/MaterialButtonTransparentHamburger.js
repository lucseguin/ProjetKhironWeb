import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialButtonTransparentHamburger(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name="menu"
        style={{
          color: "#3F51B5",
          fontSize: 24
        }}
      ></MaterialCommunityIconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
`;

export default MaterialButtonTransparentHamburger;
