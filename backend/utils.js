function validateTransaction(tx){

if(!tx.from || !tx.to || !tx.amount){
return false
}

if(tx.amount <= 0){
return false
}

return true
}

module.exports = { validateTransaction }