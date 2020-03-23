// Components==============
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import Head from "../global-components/Layout/Head";
import { Container } from "../style/Mixins";
// =========================

const Card = styled.div`
  width: 100%;
  padding: ${({ theme: { spacing } }) => spacing.s7};
  background: ${({ theme: { white } }) => white};
  box-shadow: ${({ theme: { shadow } }) => shadow.medium};

  h3 {
    margin: ${({ theme: { spacing } }) => `${spacing.s4} 0 ${spacing.s4}`};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${({ theme: { spacing } }) => spacing.s6};
  margin-top: ${({ theme: { spacing } }) => spacing.s8};
  justify-items: center;

  grid-template-columns: 1fr;

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default function albumTemplate({ data }) {
  const d = data.allAlbum.nodes;

  const albums = d.map(e => {
    return (
      <Card key={e.name}>
        <Img fluid={e.localImage.childImageSharp.fluid} alt={e.name} />
        <h3>{e.name}</h3>
        <p>
          <Link to={`/${data.artist.id}`}>{e.artist.name}</Link>
        </p>
      </Card>
    );
  });

  return (
    <>
      <Head
        title={`${data.artist.name} albums`}
        description="Page description goes here"
        keywords="content"
      />

      <Container>
        <h1 style={{ paddingTop: `1em` }}>{data.artist.name} albums</h1>
        <Grid>{albums}</Grid>
      </Container>
    </>
  );
}

export const query = graphql`
  query AlbumPage($slug: String!) {
    artist(id: { eq: $slug }) {
      name
      id
    }
    allAlbum(filter: { artist: { id: { eq: $slug } } }) {
      nodes {
        name
        localImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        artist {
          name
        }
      }
    }
  }
`;
