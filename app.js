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
// -------- MODAL CONTROL --------

function openModal(id){
const modal = document.getElementById(id)
if(modal){
modal.classList.add('active')
}
}

function closeModal(id){
const modal = document.getElementById(id)
if(modal){
modal.classList.remove('active')
}

// reset QR when closing send modal
if(id === 'sendModal'){
const qr = document.getElementById('qrcode')
if(qr){
qr.style.display = 'none'
qr.innerHTML = ''
}
}
}

// close on outside click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
overlay.addEventListener('click', function(e){
if(e.target === this){
closeModal(this.id)
}
})
})
