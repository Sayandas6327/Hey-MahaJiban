const env  = require('dotenv').config();
const base_url = process.env.BASE_URL || "http://localhost:3000";
module.exports = base_url;
console.log("base url is working");