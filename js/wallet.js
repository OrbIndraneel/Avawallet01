let wallet
window.balance = 50

function createWallet(){

wallet = ethers.Wallet.createRandom()

localStorage.setItem("privateKey", wallet.privateKey)

console.log("New wallet created:", wallet.address)

}

function loadWallet(){

const key = localStorage.getItem("privateKey")

if(key){

wallet = new ethers.Wallet(key)

}else{

createWallet()

}
console.log("Loaded wallet:", wallet)
}

function displayAddress(){

const el = document.getElementById("address")

if(!el){
console.error("❌ Address element NOT FOUND")
return
}

if(!wallet){
console.error("❌ Wallet not initialized")
return
}

el.innerText = wallet.address

console.log("✅ Address displayed:", wallet.address)

}

function updateBalance(){

const el = document.getElementById("balance")

if(el){
el.innerText = balance + " AVAX"
}

}

function copyAddress(){

navigator.clipboard.writeText(wallet.address)

alert("Address copied!")

}
