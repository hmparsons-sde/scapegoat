import React from 'react';
import styled from 'styled-components';
import scapegoatbanner2 from '../assets/scapegoatbanner2.png'

const LandingPage = styled.div`
  text-align: center;
  background-color: #FDF1E9;
  color: #4B4F3F;
`;

export default function Home() {
  return (
    <LandingPage>
      <img alt='scapegoat logo' src={scapegoatbanner2} height="500px" width="1000px"></img>
    </LandingPage>
  );
}
