function generateQR(){

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

}