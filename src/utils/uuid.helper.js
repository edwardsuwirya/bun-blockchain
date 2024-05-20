const {v4: uuidv4} = require('uuid');

function uuidHelper() {
    const generateUuid = function () {
        return uuidv4().split("-").join("");
    }
    return {
        generateUuid
    }
}


module.exports = uuidHelper;