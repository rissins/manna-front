import React, {useState} from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import DaumPostcodeEmbed, {useDaumPostcodePopup} from 'react-daum-postcode';

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


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const open = useDaumPostcodePopup();

    // @ts-ignore
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };


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
                    <input key={"address" + i} id={"address" + i} name={"address" + i}/>
                    <button type='button' onClick={handleClick}>
                        Open
                    </button>
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
                console.log(`first get request sent:`+ res);
                return res;
            });

        const posts = await response.json();

        console.log(posts[0].lat);
        console.log(posts[0].lon);
        await router.push({
            pathname: '/map',
            query: {
                lat1: posts[0].lat, lon1: posts[0].lon,
                lat2: posts[1].lat, lon2: posts[1].lon
            },
        })
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        return posts;
    }

    return (
        <form onSubmit={handleSubmit} id={"addressForm"}>
            {rendering()}
            <button type="submit">Submit</button>
        </form>

    );
};

export default list;