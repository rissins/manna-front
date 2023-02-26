import React, {useEffect, useRef, useState} from 'react';
import type {NextPage} from 'next';
import styled from 'styled-components';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router'


const IndexPage: NextPage = () => {
    const router = useRouter()

    // @ts-ignore
    const lon1 = +router.query.lon1;
    // @ts-ignore
    const lat1 = +router.query.lat1;

    // @ts-ignore
    const lon2 = +router.query.lon2;
    // @ts-ignore
    const lat2 = +router.query.lat2;

    // @ts-ignore
    const lon3 = +router.query.lon3;
    // @ts-ignore
    const lat3 = +router.query.lat3;

    // @ts-ignore
    const mdLon = +router.query.mdLon;
    // @ts-ignore
    const mdLat = +router.query.mdLat;

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

            let markers = [];
            var areaArr = [];
            areaArr.push(
                {lon: lon1, lat: lat1},
                {lon: lon2, lat: lat2},
                {lon: lon3, lat: lat3},
                {lon: mdLon, lat: mdLat},
            )




            var map = new naver.maps.Map('map', {
                // center: new naver.maps.LatLng(35.09187192552027, 129.04390965500988),
                center: new naver.maps.LatLng(lat1, lon1),
                zoom: 15
            });


            for (let i = 0; i < areaArr.length; i++) {
                var marker = new naver.maps.Marker({
                    // position: new naver.maps.LatLng(35.09187192552027, 129.04390965500988),
                    position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lon),
                    map: map
                });
            }

            // var marker = new naver.maps.Marker({
            //     // position: new naver.maps.LatLng(35.09187192552027, 129.04390965500988),
            //     position: new naver.maps.LatLng(lat1, lon1),
            //     map: map
            // });
            //
            // var marker1 = new naver.maps.Marker({
            //     // position: new naver.maps.LatLng(35.09187192552027, 129.04390965500988),
            //     position: new naver.maps.LatLng(lat1, lon1),
            //     map: map
            // });
        }
    }, [myLocation]);

    return (
            <MapBox id="map">
            </MapBox>

    );
};

// Styles
const MapBox = styled.div`
  height: 100vh;
`;

export default IndexPage;