import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonPink1(props) {
  return (
    <Container {...props}>
      <Anuller>Anuller</Anuller>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #E91E63;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Anuller = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

export default MaterialButtonPink1;
