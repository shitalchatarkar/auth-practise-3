const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
app.use(express.json())


app.use("/api/auth", require("./routes/auth.routes"))
mongoose.connect("mongodb://localhost:27017/roma")
mongoose.connection.once("open", () => {
    console.log("db connection success")

    app.listen(5000, console.log("server success"))
})
