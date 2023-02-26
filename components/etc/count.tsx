import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState, FunctionComponent} from "react";
import Link from "next/link";
import {useRouter} from "next/router";


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
            },
        });

    }

    return (
        <form onSubmit={handleSubmit} className="items-center">
            <div className="items-center">
                <div className="flex items-center">
                    <Image
                        src={'/images/minus.png'}
                        alt={""}
                        width={20}
                        height={20}
                        onClick={dec}>
                    </Image>
                    <div className="text-9xl ml-8 mr-8" typeof={"number"}>{count}</div>
                    <Image
                        src={'/images/plus.png'}
                        alt={""}
                        width={20}
                        height={20}
                        onClick={inc}>
                    </Image>
                </div>
                <button type={"submit"}>시작하기</button>
            </div>
        </form>
    )
}


export default IndexPage;