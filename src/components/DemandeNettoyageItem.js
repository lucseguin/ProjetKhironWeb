import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialSpinner from "./MaterialSpinner";

function DemandeNettoyageItem(props) {
  return (
    <Container {...props}>
      <MaterialSpinner1Row>
        <MaterialSpinner
          style={{
            width: 22,
            height: 22
          }}
        ></MaterialSpinner>
        <LoremIpsum1>701-01</LoremIpsum1>
        <EricLapointe>Eric Lapointe</EricLapointe>
        <LoremIpsum2>12:15</LoremIpsum2>
        <LoremIpsum4>12:15</LoremIpsum4>
        <LoremIpsum3>12:15</LoremIpsum3>
      </MaterialSpinner1Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(230, 230, 230,1);
  flex-direction: row;
`;

const LoremIpsum1 = styled.span`
  font-family: Roboto;
  width: 60px;
  height: 14px;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 7px;
  margin-top: 3px;
`;

const EricLapointe = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 1px;
  margin-top: 3px;
`;

const LoremIpsum2 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 24px;
  margin-top: 4px;
`;

const LoremIpsum4 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 8px;
  margin-top: 3px;
`;

const LoremIpsum3 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 8px;
  margin-top: 4px;
`;

const MaterialSpinner1Row = styled.div`
  height: 22px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 6px;
  margin-top: 2px;
`;

export default DemandeNettoyageItem;
