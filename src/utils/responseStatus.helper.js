const responseStatus = {
    SUCCESS: {code: "S000", message: "Success"},
    ALL_CHAIN: {code: "S001", message: "All blockchain data"},
    SUCCESS_CHAIN_REPLACED: {code: "S002", message: "All chain has been replaced"},
    SUCCESS_BLOCK_ACCEPTED: {code: "S003", message: "New block received and accepted"},
    SUCCESS_MINING: {code: "S004", message: "New block mined successfully"},
    SUCCESS_NODE_REGISTRATION: {code: "S005", message: "New node registered successfully"},
    SUCCESS_TRANSACTION: {code: "S006", message: "Transaction created and broadcast successfully"},
    DATA_FOUND: {code: "S007", message: "Data is found"},
    BLOCK_REJECTED: {code: "X001", message: "New block rejected"},
    CHAIN_NOT_REPLACED: {code: "X002", message: "Current chain has not been replaced"},
    BLOCK_NOT_FOUND: {code: "X003", message: "Block is not found in chain"},
    GENERAL_ERROR: {code: "X006", message: "General Error"}
}

module.exports = responseStatus;