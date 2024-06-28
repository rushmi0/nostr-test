// Import the package
const NDK = require('@nostr-dev-kit/ndk');

// Create a new NDK instance with explicit relays
const ndk = new NDK({
    explicitRelayUrls: ["wss://relay.notoshi.win", "wss://relay.damus.io"],
});
// Now connect to specified relays
ndk.connect();

const pablo = ndk.getUser({
    npub: "npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft",
});