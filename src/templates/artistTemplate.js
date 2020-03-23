// Components==============
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import Head from "../global-components/Layout/Head";
import { SimpleButton } from "../single-components/SimpleButton";
import { Container, flexUnit } from "../style/Mixins";
// =========================

const Flex = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: ${({ theme: { spacing } }) => spacing.s11};

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

const ArtistCard = styled.div`
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  max-width: 600px;
  width: 100%;

  h1 {
    color: white;
    font-size: ${flexUnit(10, 27.5, 95, "vw", "font-size")};
  }

  p {
    margin-top: ${({ theme: { spacing } }) => spacing.s5};
    margin-bottom: ${({ theme: { spacing } }) => spacing.s6};
    background: white;
    display: grid;
    padding: ${({ theme: { spacing } }) => `${spacing.s2} ${spacing.s3} `};
    border-radius: ${({ theme: { borderRadius2 } }) => borderRadius2};
    width: 30%;
  }
`;

const Wrap = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Artist = styled(Img)`
  width: 100%;
  height: 100%;
  filter: blur(8px) grayscale(100%) contrast(50%);
`;

const Album = styled.div`
  position: relative;
  display: flex;
  padding: ${({ theme: { spacing } }) => spacing.s8};
  max-width: 550px;
  width: 100%;
  height: 100%;
  background: ${({ theme: { white } }) => white.replace("1)", "0.5)")};
  box-shadow: ${({ theme: { shadow } }) => shadow.medium};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
`;

const AlbumPic = styled(Img)`
  width: 60%;
  margin-left: ${({ theme: { spacing } }) => spacing.s10};
`;

export default function artistTemplate({ data }) {
  return (
    <>
      <Head
        title={data.artist.name}
        description="Page description goes here"
        keywords="content"
      />
      <Container>
        <Flex>
          <ArtistCard>
            <h1>{data.artist.name}</h1>
            <Wrap>
              <Artist
                fluid={data.artist.localImage.childImageSharp.fluid}
                alt={data.artist.picture}
              />
            </Wrap>
            <p>{data.artist.genre}</p>
            <p> {data.artist.stillActive ? `active` : `not active`}</p>
          </ArtistCard>
          <Album>
            <div>
              <h3>Favorite album</h3>
              <p>{data.artist.favoriteAlbum.name}</p>
              <Link
                to={`/albums${data.artist.id}`}
                style={{ position: "absolute", bottom: "2em" }}
              >
                <SimpleButton>Other albums</SimpleButton>
              </Link>
            </div>
            <AlbumPic
              fluid={data.artist.favoriteAlbum.localImage.childImageSharp.fluid}
              alt={data.artist.favoriteAlbum.picture}
            />
          </Album>
        </Flex>
      </Container>
    </>
  );
}

export const query = graphql`
  query ArtistPage($slug: String!) {
    artist(id: { eq: $slug }) {
      name
      id
      localImage {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      genre
      stillActive
      favoriteAlbum {
        name
        localImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
