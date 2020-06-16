import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialHeader11(props) {
  return (
    <Container {...props}>
      <TextWrapper>
        <Title numberOfLines={1}>Brancarderie</Title>
      </TextWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(80,227,194,1);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

const TextWrapper = styled.div`
  flex-direction: column;
  display: flex;
  margin-left: 28px;
  align-self: center;
`;

const Title = styled.span`
  font-family: Roboto;
  background-color: transparent;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
`;

export default MaterialHeader11;
