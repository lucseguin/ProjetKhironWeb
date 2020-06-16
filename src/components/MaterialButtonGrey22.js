import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonGrey22(props) {
  return (
    <Container {...props}>
      <Caption>{props.caption || "BUTTON"}</Caption>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #999999;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Caption = styled.span`
  font-family: Roboto;
  color: #000000;
  font-size: 14px;
`;

export default MaterialButtonGrey22;
