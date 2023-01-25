import React, {useEffect, useRef, useState} from 'react';
import type {NextPage} from 'next';
import styled from 'styled-components'
import useMap from '../hooks/useMap';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router'


const IndexPage: NextPage = () => {
    // useMap();
    const router = useRouter()

    console.log(router.query.latitude);
    let latitude = parseFloat(router.query.latitude as string);
    let longitude = parseFloat(router.query.latitude as string);
    console.log(Number(latitude));

    const mapRef = useRef<HTMLElement | null | any>(null);
    const [myLocation, setMyLocation] = useState<
        { latitude: number; longitude: number } | string
    >('');

    useEffect(() => {
        // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
            setMyLocation({latitude: 37.4862618, longitude: 127.1222903});
        }
    }, []);

    useEffect(() => {
        if (typeof myLocation !== 'string') {
            // 현재 위치 추적
            let currentPosition = [myLocation.latitude, myLocation.longitude];

            // Naver Map 생성
            // mapRef.current
            // mapRef.current = new naver.maps.Map('map', {
            //     center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
            //     zoom: 20,
            // });
            // var marker = new naver.maps.Marker({
            //     position: new naver.maps.LatLng(37.3595704, 127.105399),
            //     map: mapRef.current
            // });


            var map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                zoom: 20
            });

            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                map: map
            });
        }
    }, [myLocation]);


    return (
            <MapBox id="map">
            </MapBox>

    );
};

// Styles
const MapBox = styled.div`
  //width: 100vh;
  height: 100vh;
`;

export default IndexPage;