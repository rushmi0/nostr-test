const WebSocket = require('ws');
const Buffer = require('safe-buffer').Buffer;
const BigInteger = require('bigi');
const schnorr = require('bip-schnorr');
const convert = schnorr.convert;


const randomBytes = (length) => {
    let byteArray = [];
    for (let i = 0; i < length; i++) {
        byteArray.push(Math.floor(Math.random() * 256));
    }
    return byteArray;
}


// signing

// PrivateKey as BigInteger from bigi or valid hex string
const privateKey = BigInteger.fromHex('B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF');
const privateKeyHex = 'B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF';
const message = Buffer.from('243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89', 'hex');
const createdSignature = schnorr.sign(privateKey, message,  randomBytes(32));
const createdSignatureFromHex = schnorr.sign(privateKeyHex, message, randomBytes(32));
console.log('The signature is: ' + createdSignature.toString('hex') + " " + createdSignature.length);
console.log('The signature is: ' + createdSignatureFromHex.toString('hex') + " " + createdSignature.length);

// verifying
const publicKey = Buffer.from('DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659', 'hex');
const signatureToVerify = Buffer.from('6D461BEB2F2DA00027D884FD13A24E2AE85CAECCA8AAA2D41777217EC38FB4960A67D47BC4F0722754EDB0E9017072600FFE4030C2E73771DCD3773F46A62652', 'hex');
try {
    schnorr.verify(publicKey, message, signatureToVerify);
    console.log('The signature is valid.');
} catch (e) {
    console.error('The signature verification failed: ' + e);
}



const data = {
    id: "c39f6d202586cf2a681be13d538c6db4221da1167a046ffe72c130c00a002c25",
    pubkey: "d759eb0340d5ebd639b17d2796e8a416be9bbb9b5c56a0104e9b623aa86ef603",
    content: "ให้ลาบก้อย เยียวยา\n\nhttps://youtu.be/qOznMgZVSZ4?si=euTlinG8d-wfxfy2",
    kind: 1,
    created_at: 1715339538,
    tags: [],
    sig: "c5222b4e76c8303dd05d32ced3e8be6562a9263afda00ddc839d45768f6a251ae685461ae0b830d5428b60ca3031183bad7014bee8aa0a72341b07e19129783f"
};










// const payload = JSON.stringify(
//     ["EVENT", data]
// );
//
// const ws = new WebSocket('ws://localhost:8080');
//
// ws.on('open', function open() {
//     ws.send(payload);
// });
//
// ws.on('message', function incoming(data) {
//     const jsonData = JSON.parse(data.toString());
//     console.log(jsonData); // หรือส่วนที่ต้องการแสดง
// });
//
//
// ws.on('error', function error(err) {
//     console.error('WebSocket error: ', err);
// });
