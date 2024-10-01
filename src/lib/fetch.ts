function urlGenerator(pathURL: string) {
    return `http://localhost:3000${pathURL}`;
}

export default async function jsonFetcher<T>(pathURL: string, data: T) {
    // Create full url
    const url = urlGenerator(pathURL);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
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