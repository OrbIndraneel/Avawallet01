let transactions = []

function loadTransactions(){

const data = localStorage.getItem("txs")

if(data){

transactions = JSON.parse(data)

renderTransactions()

}

}

function saveTransaction(tx,type){

tx.type = type

transactions.push(tx)

localStorage.setItem("txs",JSON.stringify(transactions))

renderTransactions()

}

function renderTransactions(){

const list = document.getElementById("txList")

if(!list) return

list.innerHTML=""

transactions.forEach(tx=>{

const li = document.createElement("li")

li.innerText = `${tx.type} ${tx.amount} AVAX`

list.appendChild(li)

})

}
