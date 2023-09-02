const crypto = require('crypto');

//Create Hash
const data = 'Hello, World'; // Replace with your data
const hash = crypto.createHash('sha256');
hash.update(data);

const hexDigest = hash.digest('hex');
console.log('SHA-256 Hash:', hexDigest);