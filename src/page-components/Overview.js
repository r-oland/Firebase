// Components==============
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import Add from "../single-components/Add";
import CurvedImageCard from "../single-components/CurvedImageCard/CurverdImageCard";
import { SimpleButton } from "../single-components/SimpleButton";
import { Container } from "../style/Mixins";
// =========================

const Wrapper = styled(Container)`
  padding-top: ${({ theme: { spacing } }) => spacing.s8};
`;

const Grid = styled.div`
  padding-top: ${({ theme: { spacing } }) => spacing.s8};
  display: grid;
  grid-gap: ${({ theme: { spacing } }) => spacing.s6};
  grid-template-columns: 1fr;
  justify-content: center;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  }
`;

const Content = styled.div`
  height: 100%;
  text-align: center;
  h3 {
    margin-top: ${({ theme: { spacing } }) => spacing.s2};
    margin-bottom: ${({ theme: { spacing } }) => spacing.s2};
  }
`;

export default function Overview() {
  const data = useStaticQuery(graphql`
    query OverviewQuery {
      allArtist {
        nodes {
          name
          id
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
  `);

  const d = data.allArtist.nodes;

  const artists = d.map((edge) => {
    return (
      <CurvedImageCard
        img={edge.localImage.childImageSharp.fluid}
        key={edge.name}
      >
        <Content>
          <h3>{edge.name}</h3>
          <Link to={`/${edge.id}`}>
            <SimpleButton>Check it out!</SimpleButton>
          </Link>
        </Content>
      </CurvedImageCard>
    );
  });

  return (
    <Wrapper>
      <h1>Artists</h1>
      <Grid>{artists}</Grid>
      <Add />
    </Wrapper>
  );
}
