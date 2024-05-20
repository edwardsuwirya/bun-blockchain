// Constructor Function
function Transaction(id, amount, sender, recipient) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.transactionId = id;
}

module.exports = Transaction;