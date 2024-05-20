// Factory Function
function consensusController(bitcoin, apiHelper) {
    const consensus = function (req, res) {
        const regPromise = [];
        bitcoin.networkNodes.forEach(nodeUrl => {
            regPromise.push(apiHelper.get(nodeUrl + '/blockchain'));
        });
        Promise.all(regPromise)
            .then(blockchains => {
                let maxChainLength = bitcoin.chain.length;
                let newLongestChain = null;
                let newPendingTransaction = null;
                blockchains.forEach(blockchain => {
                    const {data: chainData} = blockchain.data;
                    if (chainData.chain.length > maxChainLength) {
                        maxChainLength = chainData.chain.length;
                        newLongestChain = chainData.chain;
                        newPendingTransaction = chainData.pendingTransactions;
                    }
                    // console.log(blockchain);
                });

                if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
                    res.badRequest(bitcoin.chain, res.responseStatuses.CHAIN_NOT_REPLACED);
                } else {
                    bitcoin.chain = newLongestChain;
                    bitcoin.pendingTransactions = newPendingTransaction;
                    res.success(bitcoin.chain, res.responseStatuses.SUCCESS_CHAIN_REPLACED);
                }
            });
    }
    return {
        consensus
    }
}

module.exports = consensusController;