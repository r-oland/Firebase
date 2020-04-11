// Components==============
import firebase from "assets/firebase.svg";
import { Link } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../../firebase/index";
import Login from "../../single-components/Login";
import Register from "../../single-components/Register";
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

const Flex2 = styled.div`
  display: flex;
  justify-content: space-between;

  position: relative;
`;

const Mail = styled.p`
  color: white;
  position: absolute;
  top: 7.5px;
  right: 0;
  z-index: 200;
`;

export default function Nav() {
  const { user } = useContext(FirebaseContext);

  return (
    <NavWrap>
      <Container>
        <Flex2>
          <Flex>
            <img src={firebase} alt="firebase" />
            <Link to="/">
              <h2>Firebase project</h2>
            </Link>
          </Flex>
          <span style={{ display: "flex", alignItems: "center" }}>
            <Login />
            <Register />
          </span>
          <Mail>
            {user !== null &&
              user.username !== undefined &&
              `Hello ${user.username}!`}
          </Mail>
        </Flex2>
      </Container>
    </NavWrap>
  );
}
