function generateQR(){

const tx = {
type: "payment",
id: Date.now() + "-" + Math.random(),   // 👈 UNIQUE ID
from: wallet.address,
to: receiver,
amount: amount,
timestamp: Date.now()
}
try{

if(!wallet){
alert("Wallet not initialized")
return
}

const receiver = document.getElementById("receiver").value
const amount = parseFloat(document.getElementById("amount").value)

if(!receiver){
alert("Enter receiver address")
return
}

if(!amount || amount <= 0){
alert("Enter valid amount")
return
}

// transaction object
const tx = {
type: "payment",
from: wallet.address,
to: receiver,
amount: amount,
timestamp: Date.now()
}

const data = JSON.stringify(tx)

console.log("Generating QR:", data)

// clear old QR
const qrDiv = document.getElementById("qrcode")
qrDiv.innerHTML = ""

// generate QR
QRCode.toDataURL(data, function(err, url){

if(err){
console.error("QR error:", err)
alert("QR generation failed")
return
}

qrDiv.innerHTML = `<img src="${url}" style="width:200px"/>`

})

// update balance
balance -= amount
updateBalance()

// save transaction
saveTransaction(tx,"sent")

}catch(e){
console.error("Generate QR Error:", e)
alert("Something went wrong")
}

}function startScanner(){

qrCodeMessage => {

console.log("Scanned:", qrCodeMessage)

try{
const tx = JSON.parse(qrCodeMessage)
receiveTransaction(tx)   // 👈 IMPORTANT
}catch(e){
console.error("Invalid QR format")
}

html5QrCode.stop()
}

console.log("Scanner started")

const scannerDiv = document.getElementById("scanner")
scannerDiv.innerHTML = ""

const html5QrCode = new Html5Qrcode("scanner")

Html5Qrcode.getCameras().then(devices => {

if(devices.length){

const backCamera = devices.find(device =>
device.label.toLowerCase().includes("back") ||
device.label.toLowerCase().includes("rear")
)

const cameraId = backCamera ? backCamera.id : devices[0].id

html5QrCode.start(
cameraId,
{
fps: 10,
qrbox: 250
},
qrCodeMessage => {

console.log("Scanned:", qrCodeMessage)

try{
const tx = JSON.parse(qrCodeMessage)
receiveTransaction(tx)
}catch(e){
console.error("Invalid QR")
}

html5QrCode.stop()

},
error => {}
)

}

}).catch(err => {
console.error("Camera error:", err)
})

}
function receiveTransaction(tx){

console.log("Received TX:", tx)

if(!tx || !tx.amount){
console.error("Invalid transaction")
return
}

// update balance
balance += parseFloat(tx.amount)

updateBalance()

// save transaction
saveTransaction(tx, "received")

}
