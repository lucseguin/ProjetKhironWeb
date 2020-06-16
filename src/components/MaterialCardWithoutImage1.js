import React, { Component } from "react";
import styled, { css } from "styled-components";
import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";
import EditSectionBedArrangement from "./EditSectionBedArrangement";
import MaterialButtonPrimary6 from "./MaterialButtonPrimary6";
import MaterialButtonPrimary7 from "./MaterialButtonPrimary7";
import MaterialButtonPink from "./MaterialButtonPink";

function MaterialCardWithoutImage1(props) {
  return (
    <Container {...props}>
      <LoremIpsum>Configuration des étages</LoremIpsum>
      <Rect></Rect>
      <LoremIpsum2>1</LoremIpsum2>
      <Rect1></Rect1>
      <LoremIpsum3>2</LoremIpsum3>
      <Rect2></Rect2>
      <IoniconsIcon
        name="ios-add-circle-outline"
        style={{
          top: 95,
          left: 117,
          position: "absolute",
          color: "rgba(128,128,128,1)",
          fontSize: 29
        }}
      ></IoniconsIcon>
      <Etage>Étage</Etage>
      <TextInput placeholder="Identifiant de l'étage"></TextInput>
      <Descriptif>Descriptif</Descriptif>
      <Sections>Sections</Sections>
      <TextInput2 placeholder="Descriptif de l'étage"></TextInput2>
      <Rect3></Rect3>
      <Est>Est</Est>
      <Rect4></Rect4>
      <Ouest>Ouest</Ouest>
      <Rect5></Rect5>
      <IoniconsIcon
        name="ios-add-circle-outline"
        style={{
          top: 234,
          left: 155,
          position: "absolute",
          color: "rgba(128,128,128,1)",
          fontSize: 29
        }}
      ></IoniconsIcon>
      <Section2>Section</Section2>
      <Descriptif1>Descriptif</Descriptif1>
      <TextInput3 placeholder="Identifiant de la section"></TextInput3>
      <TextInput4 placeholder="Descriptif de la section"></TextInput4>
      <Etage2>Étage</Etage2>
      <Etage4>Étage</Etage4>
      <Section3>Section</Section3>
      <Etage5>1</Etage5>
      <Est2>Est</Est2>
      <EditSectionBedArrangement
        style={{
          position: "absolute",
          top: 79,
          left: 309,
          height: 430,
          width: 1000
        }}
      ></EditSectionBedArrangement>
      <AjoutDeLit>Ajout de lit</AjoutDeLit>
      <Format>Format</Format>
      <Quantite>Quantité</Quantite>
      <TextInput7 placeholder="7[0-9][1-9]-0[1-2]"></TextInput7>
      <TextInput8 placeholder="50"></TextInput8>
      <MaterialButtonPrimary6
        style={{
          height: 36,
          width: 122,
          position: "absolute",
          left: 379,
          top: 574
        }}
      ></MaterialButtonPrimary6>
      <TextInput5 placeholder="Descriptif de l'étage"></TextInput5>
      <TextInput6 placeholder="Descriptif de la section"></TextInput6>
      <MaterialButtonPrimary7
        style={{
          height: 36,
          width: 100,
          position: "absolute",
          left: 1209,
          top: 573
        }}
      ></MaterialButtonPrimary7>
      <MaterialButtonPink
        style={{
          height: 36,
          width: 100,
          position: "absolute",
          left: 1096,
          top: 574
        }}
      ></MaterialButtonPink>
    </Container>
  );
}

const Container = styled.div`
  background-color: #FFF;
  flex-wrap: nowrap;
  border-radius: 2px;
  border-color: #CCC;
  border-width: 1px;
  overflow: hidden;
  border-style: solid;
  position: relative;
  display: flex;
  box-shadow: 5px 5px 1.5px  0.1px #000 ;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  top: 19px;
  left: 9px;
  color: #121212;
  position: absolute;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
`;

const Rect = styled.div`
  top: 90px;
  left: 14px;
  width: 40px;
  height: 39px;
  background-color: rgba(74,144,226,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const LoremIpsum2 = styled.span`
  font-family: Roboto;
  top: 98px;
  left: 27px;
  color: rgba(255,255,255,1);
  position: absolute;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
`;

const Rect1 = styled.div`
  top: 90px;
  left: 60px;
  width: 40px;
  height: 39px;
  background-color: rgba(74,144,226,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const LoremIpsum3 = styled.span`
  font-family: Roboto;
  top: 98px;
  left: 73px;
  color: rgba(255,255,255,1);
  position: absolute;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
`;

const Rect2 = styled.div`
  top: 90px;
  left: 109px;
  width: 40px;
  height: 39px;
  background-color: rgba(210,212,214,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const Etage = styled.span`
  font-family: Roboto;
  top: 148px;
  left: 14px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
`;

const TextInput = styled.input`
  font-family: Roboto;
  top: 139px;
  left: 79px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

const Descriptif = styled.span`
  font-family: Roboto;
  top: 165px;
  left: 14px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
`;

const Sections = styled.span`
  font-family: Roboto;
  top: 195px;
  left: 9px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 20px;
  font-weight: regular;
  font-style: normal;
`;

const TextInput2 = styled.input`
  font-family: Roboto;
  top: 162px;
  left: 86px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

const Rect3 = styled.div`
  top: 229px;
  left: 15px;
  width: 40px;
  height: 39px;
  background-color: rgba(144,19,254,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const Est = styled.span`
  font-family: Roboto;
  top: 238px;
  left: 20px;
  color: rgba(255,255,255,1);
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
`;

const Rect4 = styled.div`
  top: 229px;
  left: 64px;
  width: 70px;
  height: 40px;
  background-color: rgba(144,19,254,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const Ouest = styled.span`
  font-family: Roboto;
  top: 238px;
  left: 71px;
  color: rgba(255,255,255,1);
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
`;

const Rect5 = styled.div`
  top: 229px;
  left: 146px;
  width: 40px;
  height: 39px;
  background-color: rgba(210,212,214,1);
  position: absolute;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0px;
  border-style: solid;
`;

const Section2 = styled.span`
  font-family: Roboto;
  top: 279px;
  left: 16px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
`;

const Descriptif1 = styled.span`
  font-family: Roboto;
  top: 299px;
  left: 16px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
`;

const TextInput3 = styled.input`
  font-family: Roboto;
  top: 279px;
  left: 86px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

const TextInput4 = styled.input`
  font-family: Roboto;
  top: 299px;
  left: 86px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

const Etage2 = styled.span`
  font-family: Roboto;
  top: 59px;
  left: 9px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 20px;
  font-weight: regular;
  font-style: normal;
  width: 3.88%;
`;

const Etage4 = styled.span`
  font-family: Roboto;
  top: 29px;
  left: 309px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
`;

const Section3 = styled.span`
  font-family: Roboto;
  top: 55px;
  left: 309px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
`;

const Etage5 = styled.span`
  font-family: Roboto;
  top: 29px;
  left: 398px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
`;

const Est2 = styled.span`
  font-family: Roboto;
  top: 55px;
  left: 381px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
`;

const AjoutDeLit = styled.span`
  font-family: Roboto;
  top: 513px;
  left: 309px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  width: 165px;
`;

const Format = styled.span`
  font-family: Roboto;
  top: 533px;
  left: 309px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
`;

const Quantite = styled.span`
  font-family: Roboto;
  top: 553px;
  left: 309px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 53px;
`;

const TextInput7 = styled.input`
  font-family: Roboto;
  top: 533px;
  left: 379px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  width: 109px;
  height: 16px;
  border: none;
  background: transparent;
`;

const TextInput8 = styled.input`
  font-family: Roboto;
  top: 553px;
  left: 379px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
`;

const TextInput5 = styled.input`
  font-family: Roboto;
  top: 31px;
  left: 431px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

const TextInput6 = styled.input`
  font-family: Roboto;
  top: 57px;
  left: 432px;
  width: 187px;
  height: 20px;
  color: rgba(0,0,0,1);
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  border: none;
  background: transparent;
`;

export default MaterialCardWithoutImage1;
