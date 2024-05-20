const axios = require('axios');

function apiHelper() {
    const post = function (path, data) {
        return axios.post(path, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const get = function (path) {
        return axios.get(path);
    }

    return {
        post, get
    }
}

module.exports = apiHelper;