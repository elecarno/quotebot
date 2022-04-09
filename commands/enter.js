const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "enter",
    description: "enters the Tanglements in a random instance",
    execute(user){
        config.client.userData[user.id] = {
            name: user.username,
            quotes: [],
        }
        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => { if (err) throw err })
    }
}