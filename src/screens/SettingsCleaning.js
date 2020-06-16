import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialButtonTransparentHamburger1 from "../components/MaterialButtonTransparentHamburger1";
import FeatherIcon from "react-native-vector-icons/dist/Feather";
import MaterialButtonHamburger from "../components/MaterialButtonHamburger";
import EvilIconsIcon from "react-native-vector-icons/dist/EvilIcons";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import MaterialButtonGrey10 from "../components/MaterialButtonGrey10";
import MaterialButtonGrey16 from "../components/MaterialButtonGrey16";
import MaterialButtonGrey12 from "../components/MaterialButtonGrey12";
import MaterialButtonGrey7 from "../components/MaterialButtonGrey7";
import MaterialButtonGrey22 from "../components/MaterialButtonGrey22";
import MaterialButtonPrimary17 from "../components/MaterialButtonPrimary17";
import MaterialButtonGrey9 from "../components/MaterialButtonGrey9";
import MaterialButtonPink3 from "../components/MaterialButtonPink3";
import MaterialButtonPrimary21 from "../components/MaterialButtonPrimary21";

function SettingsCleaning(props) {
  return (
    <>
      <Rect2StackRow>
        <Rect2Stack>
          <Rect2>
            <MaterialButtonTransparentHamburger1Row>
              <MaterialButtonTransparentHamburger1
                style={{
                  height: 36,
                  width: 36
                }}
              ></MaterialButtonTransparentHamburger1>
              <Specialization1>Spécialization</Specialization1>
              <FeatherIcon
                name="list"
                style={{
                  color: "rgba(128,128,128,1)",
                  fontSize: 20,
                  height: 20,
                  width: 20,
                  marginLeft: 192,
                  marginTop: 7
                }}
              ></FeatherIcon>
            </MaterialButtonTransparentHamburger1Row>
          </Rect2>
          <svg
            viewBox="0 0 18 0"
            style={{
              width: 18,
              height: 0,
              position: "absolute",
              top: 56,
              left: 331
            }}
          >
            <path
              strokeWidth="0"
              stroke="rgba(0,0,0,1)"
              type="path"
              d="M0.00 0.00 L18.00 0.00 Z"
            ></path>
          </svg>
          <svg
            viewBox="0 0 24.32 0"
            style={{
              width: 24,
              height: 0,
              position: "absolute",
              top: 55,
              left: 326
            }}
          >
            <path
              strokeWidth="0"
              stroke="rgba(0,0,0,1)"
              type="path"
              d="M5.32 0.00 C24.32 0.00 24.32 0.00 24.32 0.00 Z"
            ></path>
          </svg>
        </Rect2Stack>
        <MaterialButtonHamburger2Column>
          <MaterialButtonHamburger
            captionName="menu"
            style={{
              height: 36,
              width: 36,
              marginLeft: 1
            }}
            caption="plus"
          ></MaterialButtonHamburger>
          <Text4>Détail de la propriété capturés</Text4>
          <Identifiant1Row>
            <Identifiant1>Identifiant</Identifiant1>
            <TextInput3 placeholder="Identifiant"></TextInput3>
          </Identifiant1Row>
          <Type1Row>
            <Type1>Type</Type1>
            <TextInput2 placeholder="Type"></TextInput2>
          </Type1Row>
          <Valeurs1Row>
            <Valeurs1>Valeurs</Valeurs1>
            <Rect1></Rect1>
          </Valeurs1Row>
        </MaterialButtonHamburger2Column>
        <MaterialButtonHamburger
          captionName="menu"
          style={{
            height: 36,
            width: 36,
            marginLeft: 4,
            marginTop: 118
          }}
          caption="plus"
        ></MaterialButtonHamburger>
      </Rect2StackRow>
      <TextInput4Stack>
        <TextInput4 placeholder="Rechercher"></TextInput4>
        <EvilIconsIcon
          name="search"
          style={{
            top: 2,
            left: 631,
            position: "absolute",
            color: "rgba(128,128,128,1)",
            fontSize: 30
          }}
        ></EvilIconsIcon>
      </TextInput4Stack>
      <Rect3>
        <Icon3Row>
          <FontAwesomeIcon
            name="circle"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 20,
              height: 20,
              width: 17
            }}
          ></FontAwesomeIcon>
          <AlbertEinstein1>Albert Einstein</AlbertEinstein1>
          <Text6>819-777-1234</Text6>
          <Covid1>COVID</Covid1>
        </Icon3Row>
      </Rect3>
      <LoremIpsum>Configuration des équipes de nettoyage</LoremIpsum>
      <MaterialButtonGrey4StackRow>
        <MaterialButtonGrey4Stack>
          <MaterialButtonGrey10
            style={{
              height: 36,
              width: 100,
              position: "absolute",
              left: 1,
              top: 0
            }}
            caption="Home"
          ></MaterialButtonGrey10>
          <MaterialButtonGrey16
            style={{
              height: 36,
              width: 100,
              position: "absolute",
              left: 0,
              top: 0
            }}
            caption="Home"
          ></MaterialButtonGrey16>
        </MaterialButtonGrey4Stack>
        <MaterialButtonGrey12
          style={{
            height: 36,
            width: 100,
            marginLeft: 3
          }}
          caption="Utilisateur"
        ></MaterialButtonGrey12>
        <MaterialButtonGrey7
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Étages"
        ></MaterialButtonGrey7>
        <MaterialButtonGrey22
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Lits"
        ></MaterialButtonGrey22>
        <MaterialButtonPrimary17
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Nettoyage"
        ></MaterialButtonPrimary17>
        <MaterialButtonGrey9
          style={{
            height: 36,
            width: 100,
            marginLeft: 3
          }}
          caption="Brancarderie"
        ></MaterialButtonGrey9>
      </MaterialButtonGrey4StackRow>
      <MaterialButtonPink1Row>
        <MaterialButtonPink3
          style={{
            height: 36,
            width: 100
          }}
          caption="Annuler"
        ></MaterialButtonPink3>
        <MaterialButtonPrimary21
          style={{
            height: 36,
            width: 100,
            marginLeft: 6
          }}
          caption="Sauvegarder"
        ></MaterialButtonPrimary21>
      </MaterialButtonPink1Row>
      <Text5>Propriété supplémentaires associer au nettoyeur</Text5>
    </>
  );
}

const Rect2 = styled.div`
  top: 0px;
  left: 0px;
  width: 340px;
  height: 240px;
  position: absolute;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
`;

const Specialization1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 4px;
  margin-top: 10px;
`;

const MaterialButtonTransparentHamburger1Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 1px;
`;

const Rect2Stack = styled.div`
  width: 350px;
  height: 240px;
  position: relative;
`;

const Text4 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  margin-top: 16px;
  margin-left: 1px;
`;

const Identifiant1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
`;

const TextInput3 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 220px;
  height: 16px;
  background-color: rgba(230, 230, 230,1);
  margin-left: 65px;
  border: none;
  background: transparent;
`;

const Identifiant1Row = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 9px;
  margin-left: 1px;
`;

const Type1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-top: 3px;
`;

const TextInput2 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 220px;
  height: 16px;
  background-color: rgba(230, 230, 230,1);
  margin-left: 98px;
  border: none;
  background: transparent;
`;

const Type1Row = styled.div`
  height: 19px;
  flex-direction: row;
  display: flex;
  margin-top: 5px;
`;

const Valeurs1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-top: 8px;
`;

const Rect1 = styled.div`
  width: 220px;
  height: 80px;
  background-color: #E6E6E6;
  margin-left: 80px;
`;

const Valeurs1Row = styled.div`
  height: 80px;
  flex-direction: row;
  display: flex;
  margin-left: 1px;
`;

const MaterialButtonHamburger2Column = styled.div`
  width: 348px;
  flex-direction: column;
  display: flex;
  margin-left: 2px;
  margin-top: 1px;
  margin-bottom: 42px;
`;

const Rect2StackRow = styled.div`
  height: 240px;
  flex-direction: row;
  display: flex;
  margin-top: 441px;
  margin-left: 20px;
  margin-right: 606px;
`;

const TextInput4 = styled.input`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 663px;
  height: 30px;
  border-width: 1px;
  border-color: #000000;
  border-bottom-width: 1px;
  font-size: 18px;
  background-color: rgba(230, 230, 230,1);
  border-style: solid;
  background: transparent;
`;

const TextInput4Stack = styled.div`
  width: 663px;
  height: 30px;
  margin-top: -581px;
  margin-left: 20px;
  position: relative;
`;

const Rect3 = styled.div`
  width: 663px;
  height: 244px;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 20px;
`;

const AlbertEinstein1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 9px;
  margin-top: 1px;
`;

const Text6 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 54px;
  margin-top: 1px;
`;

const Covid1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 60px;
  margin-top: 1px;
`;

const Icon3Row = styled.div`
  height: 20px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 303px;
  margin-left: 4px;
  margin-top: 3px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 24px;
  width: 565px;
  height: 25px;
  margin-top: -313px;
  margin-left: 20px;
`;

const MaterialButtonGrey4Stack = styled.div`
  width: 101px;
  height: 36px;
  position: relative;
`;

const MaterialButtonGrey4StackRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: -77px;
  margin-left: 19px;
  margin-right: 728px;
`;

const MaterialButtonPink1Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 634px;
  margin-left: 154px;
  margin-right: 1006px;
`;

const Text5 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  margin-top: -305px;
  margin-left: 21px;
`;

export default SettingsCleaning;
