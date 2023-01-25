import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components'
import useMap from '../hooks/useMap';


const IndexPage: NextPage = () => {
    useMap();

    return (
        <MapBox id="map"></MapBox>
    );
};

// Styles
const MapBox = styled.div`
  //width: 100vh;
  height: 100vh;
`;

export default IndexPage;