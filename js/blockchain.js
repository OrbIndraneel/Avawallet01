async function syncBlockchain(){

document.getElementById("syncStatus").innerText="Syncing..."

const txs = JSON.parse(localStorage.getItem("txs") || "[]")

fetch("https://your-backend-url/sync",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(txs)

})

document.getElementById("syncStatus").innerText="Synced to Avalanche"

}