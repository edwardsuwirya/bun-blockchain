// Factory Function
function nodeRegistrationController(bitcoin, apiHelper) {
    const nodeRegistration = function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
        res.json({note: 'New node registered'})
    }
    const bulkRegistration = function (req, res) {
        const allNetworkNodes = req.body.allNetworkNodes;
        allNetworkNodes.forEach(networkNodeUrl => {
            const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1
            const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
            if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl)
        });
        res.json({note: 'Bulk registration successful'});
    }
    const broadcastRegistration = function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) bitcoin.networkNodes.push(newNodeUrl);
        const regNodesPromise = [];
        bitcoin.networkNodes.forEach(nodeUrl => {
            regNodesPromise.push(apiHelper.post(nodeUrl + '/registration/node', {
                newNodeUrl: newNodeUrl
            }));
        });
        Promise.all(regNodesPromise)
            .then(function (results) {
                return apiHelper.post(newNodeUrl + '/registration/bulk', {
                    allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
                })
            }).then(data => {
            res.success({}, res.responseStatuses.SUCCESS_NODE_REGISTRATION)
        });
    }
    return {
        nodeRegistration,
        bulkRegistration,
        broadcastRegistration
    }
}

module.exports = nodeRegistrationController;