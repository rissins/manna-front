import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    lat: string,
    lon: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        // Process a POST request
        try {
            const res = fetch(
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
            // const data = res.json();
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    } else {
        // Handle any other HTTP method
        console.log("error")
    }
}