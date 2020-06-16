import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonViolet(props) {
  return (
    <Container {...props}>
      <Caption>Aujourd&#39;hui</Caption>
      <Rect></Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(126,211,33,1);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 16px;
  padding-left: 16px;
  min-width: 88px;
  border-radius: 2px;
  position: relative;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Caption = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

const Rect = styled.div`
  top: 32px;
  left: 50px;
  width: 3px;
  height: 0px;
  background-color: rgba(230, 230, 230,1);
  position: absolute;
`;

export default MaterialButtonViolet;
