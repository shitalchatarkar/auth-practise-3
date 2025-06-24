const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()
const app = express()

app.use(express.json())
app.use(express.static("dist"))

app.use(cors({ origin: "https://auth-practise-3.onrender.com" }))
app.use("/api/auth", require("./routes/auth.routes"))
mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once("open", () => {
    console.log("db connection success")

    app.listen(process.env.PORT, console.log("server success"))
})
