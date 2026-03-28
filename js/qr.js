function generateQR(){

const receiver = document.getElementById("receiver").value
const amount = parseFloat(document.getElementById("amount").value)

const tx = {
from: wallet.address,
to: receiver,
amount: amount,
timestamp: Date.now()
}

const data = JSON.stringify(tx)

// clear old QR
document.getElementById("qrcode").innerHTML = ""

QRCode.toDataURL(data, function(err, url){

document.getElementById("qrcode").innerHTML =
`<img src="${url}" style="width:200px"/>`

})

balance -= amount
updateBalance()
saveTransaction(tx,"sent")

}