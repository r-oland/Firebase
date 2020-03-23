// Components==============
import firebase from "assets/firebase.svg";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Container } from "../../style/Mixins";
// =========================

const NavWrap = styled.div`
  width: 100vw;

  background: ${({ theme: { black } }) => black};
  box-shadow: ${({ theme: { shadow } }) => shadow.small};

  img {
    width: 35px;
    margin-right: ${({ theme: { spacing } }) => spacing.s4};
  }

  h2 {
    color: ${({ theme: { primary } }) => primary.s4};
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  height: 85px;
`;

export default function Nav() {
  return (
    <NavWrap>
      <Container>
        <Flex>
          <img src={firebase} alt="firebase" />
          <Link to="/">
            <h2>Firebase project</h2>
          </Link>
        </Flex>
      </Container>
    </NavWrap>
  );
}
