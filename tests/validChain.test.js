const t = require("bun:test");
const Blockchain = require("../src/blockchain.js");

t.describe("Chain Validation Test", () => {
    t.test("Valid chain will return true", () => {
        const bitcoin = new Blockchain();
        const givenBlockchain = {
            "chain": [
                {
                    "index": 1,
                    "timestamp": 1715051102552,
                    "transactions": [],
                    "nonce": 100,
                    "hash": "0",
                    "prevBlockHash": "0"
                },
                {
                    "index": 2,
                    "timestamp": 1715051112242,
                    "transactions": [],
                    "nonce": 16441,
                    "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
                    "prevBlockHash": "0"
                },
                {
                    "index": 3,
                    "timestamp": 1715051133076,
                    "transactions": [
                        {
                            "amount": 12.5,
                            "sender": "00",
                            "recipient": "dc0841abb55c46f7b6eb4edc69e08b19",
                            "transactionId": "83f466d26bf54717aaeb4232dcc5fe70"
                        },
                        {
                            "amount": 0.0112,
                            "sender": "1243kldsfjisad",
                            "recipient": "0958asmdjfal"
                        }
                    ],
                    "nonce": 453985,
                    "hash": "00009ced5a0301f35a296247a9838218d085c4a62642a762412e96b31936df1a",
                    "prevBlockHash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
                }
            ],
            "pendingTransactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "dc0841abb55c46f7b6eb4edc69e08b19",
                    "transactionId": "86f802b32fe2423eb4733ff5e3a592da"
                }
            ],
            "currentNodeUrl": "http://localhost:3001",
            "networkNodes": []
        };
        const validChain = bitcoin.chainIsValid(givenBlockchain['chain']);
        t.expect(validChain).toBeTruthy();
    });
    t.test("Invalid chain will return false", () => {
        const bitcoin = new Blockchain();
        const givenBlockchain = {
            "chain": [
                {
                    "index": 1,
                    "timestamp": 1715051102552,
                    "transactions": [],
                    "nonce": 100,
                    "hash": "0",
                    "prevBlockHash": "0"
                },
                {
                    "index": 2,
                    "timestamp": 1715051112242,
                    "transactions": [],
                    "nonce": 16441,
                    "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
                    "prevBlockHash": "0"
                },
                {
                    "index": 3,
                    "timestamp": 1715051133076,
                    "transactions": [
                        {
                            "amount": 12.5,
                            "sender": "00",
                            "recipient": "dc0841abb55c46f7b6eb4edc69e08b19",
                            "transactionId": "83f466d26bf54717aaeb4232dcc5fe70"
                        },
                        {
                            "amount": 0.0112,
                            "sender": "1243kldsfjisad",
                            "recipient": "0958asmdjfal"
                        }
                    ],
                    "nonce": 453985,
                    "hash": "00009ced5a0301f35a296247a9838218d085c4a62642a762412e96b31936df1a",
                    "prevBlockHash": "00009b2ef664890"
                }
            ],
            "pendingTransactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "dc0841abb55c46f7b6eb4edc69e08b19",
                    "transactionId": "86f802b32fe2423eb4733ff5e3a592da"
                }
            ],
            "currentNodeUrl": "http://localhost:3001",
            "networkNodes": []
        };
        const validChain = bitcoin.chainIsValid(givenBlockchain['chain']);
        t.expect(validChain).toBeFalsy();
    });
})
