import React, {useEffect, useRef, useState} from 'react';
import type {NextPage} from 'next';
import styled from 'styled-components'
import Loader from "react-loader-spinner";
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css';
import axios from "axios";

const callAPI = async (lat: any, lon: any) => {

    try {
        const res = await fetch(
            `http://localhost:8080/api/v1/test`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        lat: 1,
                        lon: 2
                    }
                ),
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

const list: NextPage = () => {

    // Handles the submit event on form submit.
    // @ts-ignore
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const dataArr = []
        // const data = {
        //     lat: event.target.lat.value,
        //     lon: event.target.lon.value,
        // }

        dataArr.push(
            {lat: event.target.lat.value, lon: event.target.lon.value},
            {lat: event.target.lat2.value, lon: event.target.lon2.value},
        )



        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(dataArr)

        // API endpoint where we send form data.
        const endpoint = 'http://localhost:8080/api/v1/test'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        // alert(`Is this your full name: ${result.data}`)
        console.log(result)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="lat">lat:</label>
            <input type="text" id="lat" name="lat"/>
            <label htmlFor="lon">lon:</label>
            <input type="text" id="lon" name="lon"/>
            <label htmlFor="lat2">lat:</label>
            <input type="text" id="lat2" name="lat2"/>
            <label htmlFor="lon2">lon:</label>
            <input type="text" id="lon2" name="lon2"/>
            {/*<input type="button" onClick={callAPI} value="전송"/>*/}
            <button type="submit">Submit</button>
        </form>

);
};

// Styles
const MapBox = styled.div`
//width: 100vh;
height: 100vh;
`;


export default list;