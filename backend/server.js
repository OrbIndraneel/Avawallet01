const express = require("express")
const fs = require("fs")
const path = require("path")
const { submitToAvalanche } = require("./avalanche")

const app = express()

app.use(express.json())

const DB_PATH = path.join(__dirname, "db.json")

// Load DB
function loadDB(){
return JSON.parse(fs.readFileSync(DB_PATH))
}

// Save DB
function saveDB(data){
fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// Health check
app.get("/", (req,res)=>{
res.send("Avalanche Sync Server Running")
})

// Sync transactions
app.post("/sync", async (req,res)=>{

try{

const txs = req.body

if(!Array.isArray(txs)){
return res.status(400).json({ error:"Invalid data" })
}

const db = loadDB()

for(let tx of txs){

// Basic validation
if(!tx.from || !tx.to || !tx.amount){
continue
}

// Prevent duplicate
const exists = db.transactions.find(t => t.timestamp === tx.timestamp)

if(exists) continue

// Submit to Avalanche (mock)
const result = await submitToAvalanche(tx)

// Store locally
db.transactions.push({
...tx,
status:"confirmed",
txHash: result.txHash
})

}

saveDB(db)

res.json({ status:"Synced Successfully" })

}catch(err){

console.error(err)
res.status(500).json({ error:"Server error" })

}

})

app.listen(3000, ()=>{
console.log("Server running on http://localhost:3000")
})