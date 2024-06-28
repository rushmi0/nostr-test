import schnorr from "bip-schnorr";


const ShiftTo = () => {

    const randomBytes = (length) => {
        let byteArray = [];
        for (let i = 0; i < length; i++) {
            byteArray.push(Math.floor(Math.random() * 256));
        }
        return byteArray;
    }


    const eventSign = (privateKey, event) => {
        schnorr.sign(
            privateKey,
            JSON.stringify(event),
            randomBytes(32)
        ).toString('hex')
    }


    return {
        randomBytes,
        eventSign
    };

};

export default ShiftTo;