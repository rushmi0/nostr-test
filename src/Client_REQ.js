const WebSocket = require('ws');

const requests = [
    {
        data: ["REQ", "hsZEOtaDsENYkP5H-JIWp", { "kinds": [1], "limit": 2 }]
    },
    {
        data: ["REQ", "hsZEOtaDsENYkP5H-JIWp", { "authors": ["e4b2c64f0e4e54abb34d5624cd040e05ecc77f0c467cc46e2cc4d5be98abe3e3"], "kinds": [30002], "limit": 50 }]
    },
    {
        data: ["REQ", "KbyQRhDj7o1KLXvZN5nBN", { "kinds": [1985], "#r": ["ws://localhost:6724/"], "#l": ["review/relay"], "limit": 50 }]
    },
    {
        data: ["REQ", "O-czH3gqfk73WZf6roeTD", { "#a": ["30311:c580329df4f1f0dfe35121955ff6636601f780f4184dde206ff33fb50d0b67cb:cf613141-3d2e-4e68-b74e-c5167a79e2a8"], "kinds": [9041] }]
    },
    {
        data: ["REQ", "6Y92Rj5mPPvkyh9_pYBXD", { "#p": ["e4b2c64f0e4e54abb34d5624cd040e05ecc77f0c467cc46e2cc4d5be98abe3e3"], "kinds": [1, 6, 16, 7, 9735, 2004, 30023], "limit": 50 }]
    },
    {
        data: ["REQ", "6Y92Rj5mPPvkyh9_pYBXD", {"search": "purple", "kinds": [1], "since": 1715181359}]
    },
    {
        data: [
            "REQ",
            "8wHEWFsnIvKCWTb-4PMak",
            {
                "#d":[
                    "3425e3a156471426798b80c1da1f148343c5c5b4d2ac452d3330a91b4619af65",
                    "3425e3a156471426798b80c1da1f148343c5c5b4d2ac452d3330a91b4619af65",
                    "161498ed3277aa583c301288de5aafda4f317d2bf1ad0a880198a9dede37a6aa"
                ],
                "kinds":[1,6,16,7,9735,2004,30023],
                "limit":50
            },
            {
                "kinds": [4],
                "#p": ["161498ed3277aa583c301288de5aafda4f317d2bf1ad0a880198a9dede37a6aa"]
            }
        ]
    }

];

const round = 6000

async function performWebSocketRequest(requestData) {
    try {
        const ws = new WebSocket('ws://localhost:6724');

        ws.on('open', () => {
            ws.send(JSON.stringify(requestData));
        });

        ws.on('message', (message) => {
            console.log('Response:', message);
            ws.close();
        });

        await new Promise((resolve) => {
            ws.on('close', () => {
                console.log('Connection closed');
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendRequests(requests) {
    for (let i = 0; i < round; i++) {
        console.log(`Round ${i + 1}`);
        for (const request of requests) {
            await performWebSocketRequest(request.data);
        }
    }
}

async function main() {
    await sendRequests(requests);
}

main();
