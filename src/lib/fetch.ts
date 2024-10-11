import { API_V1 } from "@/config";

function urlGenerator(pathURL: string) {
    return `${API_V1}/api/v1${pathURL}`;
}

export default async function jsonFetcher<T>(pathURL: string, data?: T, options?: RequestInit) {
    // Create full url
    const url = urlGenerator(pathURL);

    const header: HeadersInit = {
        "Content-Type": "application/json"
    }

    const requestOpts = {
        ...options,
        headers: header,
    }

    // Add body if data is passed
    if (data) {
        requestOpts.body = JSON.stringify(data);
    }

    const res = await fetch(url, requestOpts);

    const jsonResponse = await res.json();

    // Throw error if response from server is not OK
    if (!res.ok) {
        throw new Error(jsonResponse.message || "Something went wrong");
    }

    return jsonResponse;
}

export function simulateFetch<T>(dummyData: T, timeOut: number): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyData);
        }, timeOut);
    });
}

// export default async function formDataFetcher<T>(pathURL: string, data: T) {
//     // Create full url
//     const url = urlGenerator(pathURL);

//     const res = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });

//     return res.json();
// }