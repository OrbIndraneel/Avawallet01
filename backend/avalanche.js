const crypto = require("crypto")

async function submitToAvalanche(tx){

// Simulate delay
await new Promise(res => setTimeout(res, 500))

// Fake tx hash (for demo)
const txHash = crypto
.createHash("sha256")
.update(JSON.stringify(tx) + Date.now())
.digest("hex")

console.log("Submitted TX:", txHash)

return {
success: true,
txHash
}

}

module.exports = { submitToAvalanche }