import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import MaterialButtonPrimary22 from "../components/MaterialButtonPrimary22";
import EvilIconsIcon from "react-native-vector-icons/dist/EvilIcons";
import MaterialButtonGrey8 from "../components/MaterialButtonGrey8";
import MaterialButtonGrey10 from "../components/MaterialButtonGrey10";
import MaterialButtonGrey23 from "../components/MaterialButtonGrey23";
import MaterialButtonGrey7 from "../components/MaterialButtonGrey7";
import MaterialButtonGrey24 from "../components/MaterialButtonGrey24";
import MaterialButtonPrimary23 from "../components/MaterialButtonPrimary23";
import MaterialButtonTransparentHamburger1 from "../components/MaterialButtonTransparentHamburger1";
import FeatherIcon from "react-native-vector-icons/dist/Feather";
import MaterialButtonHamburger from "../components/MaterialButtonHamburger";
import MaterialButtonPink3 from "../components/MaterialButtonPink3";
import MaterialButtonPrimary21 from "../components/MaterialButtonPrimary21";

function SettingsStretcherBearer(props) {
  return (
    <>
      <LoremIpsum>Gestion de la brancarderie</LoremIpsum>
      <RectRow>
        <Rect>
          <Icon1Row>
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
            <LoremIpsum2>819-777-1234</LoremIpsum2>
            <Covid>COVID</Covid>
          </Icon1Row>
        </Rect>
        <LoremIpsum4Column>
          <LoremIpsum4>Stratégie d&#39;affectation de demandes</LoremIpsum4>
          <TextInput4 placeholder="Round Robin"></TextInput4>
          <MaterialButtonPrimary22
            style={{
              height: 36,
              width: 100,
              marginTop: 6,
              marginLeft: 127
            }}
            caption="Appliquer"
          ></MaterialButtonPrimary22>
        </LoremIpsum4Column>
        <LoremIpsum5>Lorem Ipsum</LoremIpsum5>
      </RectRow>
      <TextInput1Stack>
        <TextInput1 placeholder="Rechercher"></TextInput1>
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
      </TextInput1Stack>
      <MaterialButtonGrey8
        style={{
          height: 0,
          width: 0,
          marginTop: -130,
          marginLeft: 1
        }}
        caption="Nettoyage et salubrité"
      ></MaterialButtonGrey8>
      <MaterialButtonGrey5Row>
        <MaterialButtonGrey10
          style={{
            height: 36,
            width: 100
          }}
          caption="Home"
        ></MaterialButtonGrey10>
        <MaterialButtonGrey23
          style={{
            height: 36,
            width: 100,
            marginLeft: 3
          }}
          caption="Utilisateurs"
        ></MaterialButtonGrey23>
        <MaterialButtonGrey7
          style={{
            height: 36,
            width: 100,
            marginLeft: 3
          }}
          caption="Étages"
        ></MaterialButtonGrey7>
        <MaterialButtonGrey24
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Lits"
        ></MaterialButtonGrey24>
        <MaterialButtonGrey8
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Nettoyage"
        ></MaterialButtonGrey8>
        <MaterialButtonPrimary23
          style={{
            height: 36,
            width: 100,
            marginLeft: 4
          }}
          caption="Brancarderie"
        ></MaterialButtonPrimary23>
      </MaterialButtonGrey5Row>
      <LoremIpsum3>
        Propriété supplémentaires associer au brancardier
      </LoremIpsum3>
      <Rect2Row>
        <Rect2>
          <MaterialButtonTransparentHamburger1Row>
            <MaterialButtonTransparentHamburger1
              style={{
                height: 36,
                width: 36
              }}
            ></MaterialButtonTransparentHamburger1>
            <Specialization>Spécialization</Specialization>
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
        <MaterialButtonHamburger1Column>
          <MaterialButtonHamburger
            captionName="menu"
            style={{
              height: 36,
              width: 36,
              marginLeft: 1
            }}
            caption="plus"
          ></MaterialButtonHamburger>
          <Text2>Détail de la propriété capturés</Text2>
          <Identifiant1Row>
            <Identifiant1>Identifiant</Identifiant1>
            <TextInput2 placeholder="Identifiant"></TextInput2>
          </Identifiant1Row>
          <Type1Row>
            <Type1>Type</Type1>
            <TextInput3 placeholder="Type"></TextInput3>
          </Type1Row>
          <Valeurs1Row>
            <Valeurs1>Valeurs</Valeurs1>
            <Rect3></Rect3>
          </Valeurs1Row>
        </MaterialButtonHamburger1Column>
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
      </Rect2Row>
      <MaterialButtonPink3Row>
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
      </MaterialButtonPink3Row>
    </>
  );
}

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 24px;
  margin-top: 72px;
  margin-left: 17px;
`;

const Rect = styled.div`
  width: 663px;
  height: 244px;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
`;

const AlbertEinstein1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 9px;
  margin-top: 1px;
`;

const LoremIpsum2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 54px;
  margin-top: 1px;
`;

const Covid = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  margin-left: 60px;
  margin-top: 1px;
`;

const Icon1Row = styled.div`
  height: 20px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 303px;
  margin-left: 4px;
  margin-top: 3px;
`;

const LoremIpsum4 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const TextInput4 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 227px;
  height: 16px;
  background-color: rgba(230, 230, 230,1);
  margin-top: 4px;
  border: none;
  background: transparent;
`;

const LoremIpsum4Column = styled.div`
  width: 227px;
  flex-direction: column;
  display: flex;
  margin-left: 30px;
  margin-bottom: 166px;
`;

const LoremIpsum5 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  color: #121212;
  width: 395px;
  height: 60px;
  background-color: rgba(230, 230, 230,1);
  margin-left: 5px;
  margin-top: 20px;
`;

const RectRow = styled.div`
  height: 244px;
  flex-direction: row;
  display: flex;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 26px;
`;

const TextInput1 = styled.input`
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

const TextInput1Stack = styled.div`
  width: 663px;
  height: 30px;
  margin-top: -284px;
  margin-left: 20px;
  position: relative;
`;

const MaterialButtonGrey5Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 728px;
`;

const LoremIpsum3 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  margin-top: 364px;
  margin-left: 21px;
`;

const Rect2 = styled.div`
  width: 340px;
  height: 240px;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
`;

const Specialization = styled.span`
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

const Text2 = styled.span`
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

const TextInput2 = styled.input`
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

const TextInput3 = styled.input`
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

const Rect3 = styled.div`
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

const MaterialButtonHamburger1Column = styled.div`
  width: 348px;
  flex-direction: column;
  display: flex;
  margin-left: 12px;
  margin-top: 1px;
  margin-bottom: 42px;
`;

const Rect2Row = styled.div`
  height: 240px;
  flex-direction: row;
  display: flex;
  margin-top: 4px;
  margin-left: 20px;
  margin-right: 606px;
`;

const MaterialButtonPink3Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 9px;
  margin-left: 154px;
  margin-right: 1006px;
`;

export default SettingsStretcherBearer;
