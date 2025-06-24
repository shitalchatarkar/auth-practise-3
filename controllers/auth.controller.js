const Auth = require("../model/Auth")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    await Auth.create({ ...req.body, password: hash })
    res.json({ massage: "register is success" })

}
const login = async (req, res) => {
    const { email, password } = req.body
    const result = await Auth.findOne({ email })
    if (!result) {
        return res.status(401).json({ massage: "email is not found" })

    }
    const varify = await bcrypt.compare(password, result.password)
    if (!varify) {
        return res.status(401).json({ massage: "invalid password" })
    }
    const token = jwt.sign({ _id: result._id, }, "securepassword", { expiresIn: "1m" })
    res.cookie("USER", token, { maxAge: 1000 * 60 })
    console.log(token);


    await res.json({ massage: "login is success" })

}
const logout = async (req, res) => {
    await res.json({ massage: "logout is success" })

}
module.exports = { register, login, logout }