import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonPrimary6(props) {
  return (
    <Container {...props}>
      <Ajoute>Ajouté</Ajoute>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #2196F3;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Ajoute = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

export default MaterialButtonPrimary6;
