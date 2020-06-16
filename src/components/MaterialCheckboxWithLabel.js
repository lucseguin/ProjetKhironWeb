import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialCheckboxWithLabel(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name={props.checkIcon || "checkbox-blank-outline"}
        style={{
          color: "#3F51B5",
          fontFamily: "Roboto",
          fontSize: 20,
          lineHeight: "28px"
        }}
      ></MaterialCommunityIconsIcon>
      <Label>{props.label || "Label"}</Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: transparent;
  flex-direction: row;
`;

const Label = styled.span`
  font-family: Arial;
  margin-left: 2px;
  font-size: 14px;
  color: rgba(0,0,0,0.87);
`;

export default MaterialCheckboxWithLabel;
