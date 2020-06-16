import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialSpinner1 from "./MaterialSpinner1";

function BrancarderieDemandeItem(props) {
  return (
    <Container {...props}>
      <MaterialSpinner1Row>
        <MaterialSpinner1
          style={{
            width: 22,
            height: 22
          }}
        ></MaterialSpinner1>
        <Urg18>Urg-18</Urg18>
        <LoremIpsum>=&gt;</LoremIpsum>
        <Urg19>701-01</Urg19>
        <EricLapointe>Eric Lapointe</EricLapointe>
        <EricLapointe1>12:15</EricLapointe1>
        <EricLapointe2>12:20</EricLapointe2>
      </MaterialSpinner1Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(230, 230, 230,1);
  flex-direction: row;
`;

const Urg18 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 7px;
  margin-top: 3px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 9px;
  margin-top: 3px;
`;

const Urg19 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 9px;
  margin-top: 3px;
`;

const EricLapointe = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 6px;
  margin-top: 3px;
`;

const EricLapointe1 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 23px;
  margin-top: 3px;
`;

const EricLapointe2 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-weight: regular;
  font-style: normal;
  margin-left: 7px;
  margin-top: 3px;
`;

const MaterialSpinner1Row = styled.div`
  height: 22px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 5px;
  margin-top: 2px;
`;

export default BrancarderieDemandeItem;
