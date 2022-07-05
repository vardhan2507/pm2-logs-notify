const axios = require('axios');

module.exports.sendSlackMsg = function sendSlackMsg(url, payload) {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}