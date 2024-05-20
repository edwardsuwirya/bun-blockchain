const BlockData = require("../../../models/blockData.model.js");
// Factory Function
function mineController(bitcoin, nodeAddress, apiHelper) {
    const mine = function (req, res) {
        const lastBlock = bitcoin.getLastBlock();
        const previousBlockHash = lastBlock['hash'];

        // Bisa cuma pending transaction ???
        const currentBlockData =
            new BlockData(bitcoin.pendingTransactions, lastBlock['index'] + 1)
        const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
        const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
        const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

        const regPromise = [];
        bitcoin.networkNodes.forEach(nodeUrl => {
            regPromise.push(apiHelper.post(nodeUrl + '/blockchain/receive-new-block', {
                newBlock: newBlock
            }));
        });
        Promise.all(regPromise)
            .then(function (results) {
                return apiHelper.post(bitcoin.currentNodeUrl + '/transaction/broadcast', {
                    amount: 12.5,
                    sender: "00",
                    recipient: nodeAddress
                })
            }).then(data => {
            res.success(newBlock, res.responseStatuses.SUCCESS_MINING);
        });
    }

    return {
        mine
    }
}

module.exports = mineController;