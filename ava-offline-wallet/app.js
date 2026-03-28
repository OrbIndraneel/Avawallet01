window.onload = function(){

try{

if(typeof loadWallet === "function"){
loadWallet()
}

if(typeof displayAddress === "function"){
displayAddress()
}

if(typeof loadTransactions === "function"){
loadTransactions()
}

if(typeof updateBalance === "function"){
updateBalance()
}

updateNetworkStatus()

}catch(e){
console.error("Startup Error:", e)
}

}

// Network status
function updateNetworkStatus(){

const status = document.getElementById("networkStatus")

if(!status) return

if(navigator.onLine){
status.innerText = "Online"
status.style.background = "#22c55e"
}else{
status.innerText = "Offline Mode"
status.style.background = "#ef4444"
}

}

window.addEventListener("online", updateNetworkStatus)
window.addEventListener("offline", updateNetworkStatus)