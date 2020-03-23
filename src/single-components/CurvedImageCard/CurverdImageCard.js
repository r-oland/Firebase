// Components==============
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import CurveImp from "./Curve.inline.svg";

// =========================

const Card = styled.div`
  position: relative;
  background-color: ${({ theme: { white } }) => white};
  border-radius: ${({ theme: { borderRadius2 } }) => borderRadius2};
  box-shadow: ${({ theme: { shadow } }) => shadow.medium};
  width: 100%;
  max-width: ${({ theme: { spacing } }) => spacing.s14};
  height: 325px;
  margin: 0 auto;
  overflow: hidden;
`;

const Image = styled(Img)`
  height: 65%;
`;

const CurveSvg = styled(CurveImp)`
  position: absolute;
  right: -5%;
  height: 10%;
  width: 110%;
  transform: translateY(-50%);

  #changeColor {
    fill: ${({ theme: { white } }) => white};
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 35%;
`;

export default function CurvedImageCard({ img, children }) {
  return (
    <Card>
      <Image fluid={img} alt="StockImg" />
      <CurveSvg />
      <Content>{children}</Content>
    </Card>
  );
}
