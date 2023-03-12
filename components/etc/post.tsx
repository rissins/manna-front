import React, {useState} from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import DaumPostcodeEmbed from 'react-daum-postcode';
import DaumPost from "@/components/Kakao/DaumPost";

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

const post: NextPage = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [route, setRoute] = useState()
    // @ts-ignore
    const queries = +router.query.people;

    const rendering = () => {
        const result = [];
        for (let i = 0; i < queries; i++) {
            result.push(
                <div key={"address" + i}>
                    {/*<input key={"address" + i} id={"address" + i} name={"address" + i}/>*/}
                    <DaumPost  inputAddress={"address"+i}/>
            </div>
        );
        }
        console.log(result)
        return result;
    };


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

        for (let i = 0; i < queries; i++) {
            const input = document.getElementById("address" + i) as HTMLInputElement | null;
            dataArr.push(
                {"address": input?.value}
            )
        }
        // dataArr.push(
        //     {address:},
        //     {lon: event.target.lon2.value, lat: event.target.lat2.value},
        // )


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
                'Accept': '*/*',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
            .then((res) => {
                return res;
            });

        const posts = await response.json();
        await router.push({
            pathname: '/map',
            query: {
                lat1: posts[0].lat[0], lon1: posts[0].lon[0],
                lat2: posts[0].lat[1], lon2: posts[0].lon[1],
                mdLat: posts[0].mdLat, mdLon: posts[0].mdLon
            },
        })
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        return posts;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id={"addressForm"}>
        {rendering()}
        <button type="submit">Submit</button>
        </form>
        </div>
);
};

export default post;
