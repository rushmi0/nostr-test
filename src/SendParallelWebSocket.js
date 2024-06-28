const WebSocket = require('ws');

// ไฟล์ที่ต้องการดึงข้อมูล : module.exports = data;
const files = [
    './backup/nostr-backup-0',
    './backup/nostr-backup-1',
    './backup/nostr-backup-2',
    './backup/nostr-backup-3',
    './backup/nostr-backup-4',
    './backup/nostr-backup-5',
    './backup/nostr-backup-6',
    './backup/nostr-backup-7',
    './backup/nostr-backup-8',
    './backup/nostr-backup-9',
    './backup/nostr-backup-10',
    './backup/nostr-backup-11',
    './backup/nostr-backup-12',
    './backup/nostr-backup-13',
    './backup/nostr-backup-14',
    './backup/nostr-backup-15',
    './backup/nostr-backup-16',
    './backup/nostr-backup-17',
    './backup/nostr-backup-18',
    './backup/nostr-backup-19',
];

// จำนวนของช่องการเชื่อมต่อ WebSocket
const numChannels = 200;

// ฟังก์ชันในการอ่านข้อมูลจากไฟล์
async function loadDataFromFile(file) {
    const data = require(file);
    return data;
}

// สร้าง WebSocket connections และส่งข้อมูลจากไฟล์ที่กำหนด
async function sendFileData(file) {
    const data = await loadDataFromFile(file);
    const channels = [];

    // สร้าง WebSocket connections
    for (let i = 0; i < numChannels; i++) {
        const ws = new WebSocket('ws://localhost:6724');
        channels.push(ws);
    }

    // ส่งข้อมูลไปยังทุกช่องพร้อมกัน
    function sendData() {
        data.forEach((item, index) => {
            setTimeout(() => {
                const selectedIndex = index % numChannels; // หา index ของ WebSocket ที่จะส่งข้อมูลไป
                const ws = channels[selectedIndex];
                const message = ["EVENT", item];
                ws.send(JSON.stringify(message));
                console.log(`Channel ${selectedIndex + 1} Sent:`, message);
            }, index * 10); // รอ 0.01 วินาที ก่อนที่จะส่งข้อมูลไปยังช่องถัดไป
        });
    }

    // เริ่มส่งข้อมูลหลังจากที่ทุกช่องเชื่อมต่อแล้ว
    await Promise.all(channels.map((ws, index) => new Promise((resolve) => {
        ws.on('open', function open() {
            console.log(`Channel ${index + 1} connected`);
            resolve();
        });
    })));

    sendData();

    // การตรวจสอบข้อผิดพลาด
    channels.forEach((ws, index) => {
        ws.on('message', function incoming(data) {
            console.log(`Channel ${index + 1} Received:`, data);
        });

        ws.on('close', function close() {
            console.log(`Channel ${index + 1} disconnected`);
        });
    });
}

// ส่งข้อมูลจากทุกไฟล์พร้อมกัน
async function sendAllFilesData() {
    const fileDataPromises = files.map(file => sendFileData(file));
    await Promise.all(fileDataPromises);
}

sendAllFilesData().catch(console.error);
