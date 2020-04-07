// Components==============
import { Link } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../firebase/index";
import { SimpleButton } from "./SimpleButton";
// =========================

const Wrapper = styled.div`
  margin-top: ${({ theme: { spacing } }) => spacing.s10};
  display: flex;
  justify-content: space-evenly;
`;

export default function Add() {
  const { user } = useContext(FirebaseContext);

  return (
    <>
      {user && user.isAdmin && (
        <Wrapper>
          <Link to="/addArtist">
            <SimpleButton>Add artist</SimpleButton>
          </Link>
          <Link to="/addAlbum">
            <SimpleButton>Add album</SimpleButton>
          </Link>
        </Wrapper>
      )}
    </>
  );
}
