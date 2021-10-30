import React from 'react';
import styled from 'styled-components';
import scapegoatbanner from '../assets/scapegoatbanner.png'

const LandingPage = styled.div`
  text-align: center;
`;

export default function Home() {
  return (
    <LandingPage>
      <img alt='scapegoat logo' src={scapegoatbanner} height="500px" width="1000px"></img>
    </LandingPage>
  );
}
