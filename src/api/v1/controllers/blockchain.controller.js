// Factory Function
function blockchainController(bitcoin) {
    const blockchain = function (req, res) {
        res.success(bitcoin, res.responseStatuses.ALL_CHAIN);
        // throw new Error("Wooow");
        // res.badRequest("", "")
    }

    const receiveNewBlock = function (req, res) {
        const newBlock = req.body.newBlock;
        const lastBlock = bitcoin.getLastBlock();
        const correctHash = lastBlock.hash === newBlock.prevBlockHash;
        const correctIndex = (lastBlock.index) + 1 === newBlock.index;

        if (correctHash && correctIndex) {
            bitcoin.chain.push(newBlock);
            bitcoin.pendingTransactions = [];
            res.success(newBlock, res.responseStatuses.DATA_FOUND);
        } else {
            res.badRequest(newBlock, res.responseStatuses.BLOCK_REJECTED);
        }
    }

    const getBlockByHash = function (req, res) {
        const blockhash = req.params.blockHash;
        const correctBlock = bitcoin.getBlock(blockhash);
        if (correctBlock) {
            res.success(correctBlock, res.responseStatuses.DATA_FOUND);
        } else {
            res.notFound(res.responseStatuses.BLOCK_NOT_FOUND);
        }
    }

    return {
        blockchain,
        receiveNewBlock,
        getBlockByHash
    }
}

module.exports = blockchainController;