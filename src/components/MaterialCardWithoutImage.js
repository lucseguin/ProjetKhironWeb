import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialButtonViolet from "./MaterialButtonViolet";
import MaterialButtonPrimary from "./MaterialButtonPrimary";

function MaterialCardWithoutImage(props) {
  return (
    <Container {...props}>
      <LoremIpsumRow>
        <LoremIpsum>801-01</LoremIpsum>
        <Depart>Départ</Depart>
        <MaterialButtonViolet
          style={{
            width: 111,
            height: 29,
            marginLeft: 14
          }}
        ></MaterialButtonViolet>
      </LoremIpsumRow>
      <PatientRow>
        <Patient>Patient</Patient>
        <AlbertEinstein>Albert Einstein</AlbertEinstein>
      </PatientRow>
      <DossierRow>
        <Dossier>Dossier</Dossier>
        <AlbertEinstein1>0123456789</AlbertEinstein1>
      </DossierRow>
      <AssigneLeRow>
        <AssigneLe>Assigné le</AssigneLe>
        <AlbertEinstein2>2020 05 11 11:30</AlbertEinstein2>
      </AssigneLeRow>
      <EstimeDuSejourRow>
        <EstimeDuSejour>Estimé du séjour</EstimeDuSejour>
        <AlbertEinstein3>2</AlbertEinstein3>
      </EstimeDuSejourRow>
      <DiagnostiqueStack>
        <Diagnostique>Diagnostique</Diagnostique>
        <TextInput placeholder="Lorem Ipsum"></TextInput>
      </DiagnostiqueStack>
      <NsaRow>
        <Nsa>NSA</Nsa>
        <Chsld>CHSLD</Chsld>
      </NsaRow>
      <IsoRow>
        <Iso>ISO</Iso>
        <Chsld1>Précaution de contact</Chsld1>
      </IsoRow>
      <Pathologie>Pathologie</Pathologie>
      <CasCritiqueColumnRow>
        <CasCritiqueColumn>
          <CasCritique>Cas Critique</CasCritique>
          <CasComplexe>Cas complexe</CasComplexe>
        </CasCritiqueColumn>
        <OuiColumn>
          <Oui>Oui</Oui>
          <Oui1>Oui</Oui1>
        </OuiColumn>
        <MaterialButtonPrimary
          style={{
            width: 115,
            height: 33,
            marginLeft: 69
          }}
        ></MaterialButtonPrimary>
      </CasCritiqueColumnRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #FFF;
  flex-wrap: nowrap;
  border-radius: 2px;
  border-color: #CCC;
  border-width: 1px;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  margin-top: 5px;
`;

const Depart = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
  margin-left: 99px;
  margin-top: 8px;
`;

const LoremIpsumRow = styled.div`
  height: 29px;
  flex-direction: row;
  display: flex;
  margin-top: 12px;
  margin-left: 16px;
  margin-right: 13px;
`;

const Patient = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const AlbertEinstein = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 82px;
`;

const PatientRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 19px;
  margin-left: 16px;
  margin-right: 124px;
`;

const Dossier = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const AlbertEinstein1 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 79px;
`;

const DossierRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 9px;
  margin-left: 16px;
  margin-right: 136px;
`;

const AssigneLe = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const AlbertEinstein2 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 61px;
`;

const AssigneLeRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 16px;
  margin-right: 107px;
`;

const EstimeDuSejour = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const AlbertEinstein3 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 21px;
`;

const EstimeDuSejourRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 16px;
  margin-right: 210px;
`;

const Diagnostique = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  color: #121212;
  position: absolute;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const TextInput = styled.input`
  font-family: Roboto;
  top: 14px;
  left: 0px;
  width: 327px;
  height: 38px;
  color: #121212;
  position: absolute;
  border-color: #000000;
  border-width: 1px;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
  border-style: solid;
  background: transparent;
`;

const DiagnostiqueStack = styled.div`
  width: 327px;
  height: 52px;
  margin-top: 13px;
  margin-left: 16px;
  position: relative;
`;

const Nsa = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const Chsld = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 98px;
`;

const NsaRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 16px;
  margin-right: 174px;
`;

const Iso = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const Chsld1 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-left: 103px;
`;

const IsoRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 16px;
  margin-right: 80px;
`;

const Pathologie = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
  margin-top: 11px;
  margin-left: 16px;
`;

const CasCritique = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
`;

const CasComplexe = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: regular;
  font-style: normal;
  margin-top: 10px;
`;

const CasCritiqueColumn = styled.div`
  width: 88px;
  flex-direction: column;
  display: flex;
`;

const Oui = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
`;

const Oui1 = styled.span`
  font-family: Roboto;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  margin-top: 10px;
`;

const OuiColumn = styled.div`
  width: 21px;
  flex-direction: column;
  display: flex;
  margin-left: 37px;
`;

const CasCritiqueColumnRow = styled.div`
  height: 42px;
  flex-direction: row;
  display: flex;
  margin-top: 13px;
  margin-left: 16px;
  margin-right: 13px;
`;

export default MaterialCardWithoutImage;
