// Factory Function
function transactionController(bitcoin, apiHelper) {
    const newTransactionFactory = function (reqBody) {
        const amount = reqBody.amount;
        const sender = reqBody.sender;
        const recipient = reqBody.recipient;
        return bitcoin.createNewTransaction(amount, sender, recipient);
    }
    const pendingTransaction = function (req, res) {
        const newTransaction = newTransactionFactory(req.body);
        const blockIndex = bitcoin.addPendingTransaction(newTransaction);
        res.success(null, `Transaction will be added in block ${blockIndex}`);
    }
    const broadcastTransaction = function (req, res) {
        const newTransaction = newTransactionFactory(req.body);
        bitcoin.addPendingTransaction(newTransaction);

        const requestPromise = [];
        bitcoin.networkNodes.forEach(nodeUrl => {
            requestPromise.push(apiHelper.post(nodeUrl + '/transaction', newTransaction));
        });
        Promise.all(requestPromise)
            .then(function (results) {
                res.success({}, res.responseStatuses.SUCCESS_TRANSACTION);
            });
    }

    const getTransactionById = function (req, res) {
        const trxId = req.params.transactionId;
        const transactionData = bitcoin.getTransaction(trxId);
        if (transactionData.transaction) {
            res.success(transactionData, res.responseStatuses.DATA_FOUND);
        } else {
            res.notFound(res.responseStatuses.BLOCK_NOT_FOUND);
        }
    }
    return {
        pendingTransaction,
        broadcastTransaction,
        getTransactionById
    }
}

module.exports = transactionController;