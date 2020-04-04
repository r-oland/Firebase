// Components==============
import React from "react";
import styled from "styled-components";
// =========================

const Wrapper = styled.div`
  border-top: ${({ theme: { black } }) => `solid 2px ${black}`};
  width: 80%;
  padding-top: ${({ theme: { spacing } }) => spacing.s2};
  margin-bottom: ${({ theme: { spacing } }) => spacing.s4};
`;

export default function FavoriteAlbum({ name, album }) {
  return (
    <Wrapper>
      <p>
        <span> name: </span>
        {name}
      </p>
      <p>
        <span> album: </span>
        {album}
      </p>
    </Wrapper>
  );
}
