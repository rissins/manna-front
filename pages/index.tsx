import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import {useEffect, useState, FunctionComponent} from "react";
import Link from "next/link";
import {useRouter} from "next/router";


const inter = Inter({subsets: ['latin']})


// const IndexPage: NextPage = () => {
//
//     useEffect(() => {
//         // alert('Finished loading');
//         const e1 = document.getElementById('test');
//         // @ts-ignore
//         e1.textContent = '1';
//     }, []);
//
//     return (
//         <>
//             <div>
//                 test
//             </div>
//             <button id={"plus"} onClick={Count} >숫자 -</button>
//             <button id={"minus"} >숫자 +</button>
//             <div id={"test"}>
//
//             </div>
//         </>
//     );
// };

const IndexPage: FunctionComponent = () => {
    const [count, setCount] = useState<number>(2);

    const router = useRouter()
    // const [route, setRoute] = useState()

    if (count < 2) {
        setCount(2)
    }

    const inc = () => {
        setCount(count + 1);
    };

    const dec = () => {
        setCount(count - 1);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        // router.push("https://naver.com");

        router.replace({
            pathname: "/list",
            query: {
                people: count,
                // toAcc: data.ProcessedData.toAcc,
                // preAmount: data.ProcessedData.preAmount,
                // sequenceNumber: data.ProcessedData.sequenceNumber,
                // fee: data.ProcessedData.fee,
                // fromTime: data.ProcessedData.fromTime,
                // toTime: data.ProcessedData.toTime,
                // postAmount: data.ProcessedData.postAmount,
                // status: data.ProcessedData.status,
                // fromAcc: data.ProcessedData.fromAcc,
                // selectPlatform: selectPlatform,
                // receivePlatform: receivePlatform,
            },
        });

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Image
                    src={'/images/minus.png'}
                    alt={""}
                    width={20}
                    height={20}
                    onClick={dec}>
                </Image>

                <p typeof={"number"}>{count}</p>

                <Image
                    src={'/images/plus.png'}
                    alt={""}
                    width={20}
                    height={20}
                    onClick={inc}>
                </Image>
            </div>
            <button type={"submit"}>시작하기</button>
        </form>


    )
}


export default IndexPage;

