import React, {useState} from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';


type AddressProps = {
    inputAddress: string;
};

// const Postcode = () => {
const Postcode = ({ inputAddress }: AddressProps) => {
    const open = useDaumPostcodePopup();

    const [address, setAddress] = useState(''); // 주소

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

        setAddress(fullAddress);


        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };



    const handleClick = () => {
        open({ onComplete: handleComplete });
    };



    const [enroll_company, setEnroll_company] = useState({
        address:'',
    });

    const handleInput = (e: { target: { name: any; value: any; }; }) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name)
        console.log(e.target.value)

    }

    return (
        // <button type='button' onClick={handleClick}>
        //     Open
        // </button>
        <div>
            <input name={inputAddress} onChange={handleInput} value={address}/>
            <button onClick={handleClick}>우편번호 찾기</button>
        </div>
    );
};

export default Postcode;