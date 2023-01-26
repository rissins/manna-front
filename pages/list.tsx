import React, {useEffect, useRef, useState} from 'react';
import type {NextPage} from 'next';
import styled from 'styled-components'
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css';

const callAPI = async () => {
    try {
        const res = await fetch(
            `http://localhost:8080/api/v1/test`,
            {
                method: 'POST',
                headers: {
                    // 'X-RapidAPI-Key': 'your-rapidapi-key',
                    // 'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
                },
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const list: NextPage = () => {



    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <button onClick={callAPI}>Make API call</button>
            </main>
        </div>

    );
};

// Styles
const MapBox = styled.div`
  //width: 100vh;
  height: 100vh;
`;

export default list;