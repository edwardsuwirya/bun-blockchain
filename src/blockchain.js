const sha256 = require('sha256');
const {v4: uuidv4} = require("uuid");
const Transaction = require("./models/transaction.model.js");
const BlockData = require("./models/blockData.model.js");
const TransactionBlock = require("./dtos/transactionBlock.dto.js");
const currentNodeUrl = process.argv[3];
const leadingZero = '0000';
const genesisNonce = 100;
const genesisPrevBlockHash = '0';
const genesisBlockHash = '0';

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(genesisNonce, genesisPrevBlockHash, genesisBlockHash);
}

Blockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        prevBlockHash: prevBlockHash
    }
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const id = uuidv4().split("-").join("");
    return new Transaction(id, amount, sender, recipient);
}

Blockchain.prototype.addPendingTransaction = function (transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function (prevBlockHash, currBlockData, nonce) {
    const dataString = prevBlockHash + nonce.toString() + JSON.stringify(currBlockData);
    return sha256(dataString);
}

Blockchain.prototype.proofOfWork = function (prevBlockHash, currBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(prevBlockHash, currBlockData, nonce);
    while (hash.substring(0, 4) !== leadingZero) {
        nonce++;
        hash = this.hashBlock(prevBlockHash, currBlockData, nonce);
    }
    return nonce;
}

Blockchain.prototype.chainIsValid = function (blockchain) {
    let validChain = true;
    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        const blockHash = this.hashBlock(prevBlock['hash'], new BlockData(currentBlock['transactions'], currentBlock['index']), currentBlock['nonce']);
        if (blockHash.substring(0, 4) !== leadingZero) validChain = false;
        if (currentBlock['prevBlockHash'] !== prevBlock['hash']) validChain = false;
    }

    const genesisBlock = blockchain[0];
    const validNonce = genesisBlock['nonce'] === genesisNonce;
    const validPrevBlockHash = genesisBlock['prevBlockHash'] === genesisPrevBlockHash;
    const validHash = genesisBlock['hash'] === genesisBlockHash;
    const validTrx = genesisBlock['transactions'].length === 0;

    if (!validNonce || !validPrevBlockHash || !validHash || !validTrx) validChain = false;

    return validChain;
}

Blockchain.prototype.getBlock = function (blockHash) {
    let correctBlock = null;
    for (let block of this.chain) {
        if (block.hash === blockHash) {
            correctBlock = block;
            break;
        }
    }
    return correctBlock;
}
Blockchain.prototype.getTransaction = function (transactionId) {
    let correctTransaction = null;
    let correctBlock = null;

    for (let block of this.chain) {
        for (let trx of block.transactions) {
            if (transactionId === trx.transactionId) {
                correctTransaction = trx;
                correctBlock = block;
                break;
            }
        }
    }
    return new TransactionBlock(correctTransaction, correctBlock);
}
module.exports = Blockchain