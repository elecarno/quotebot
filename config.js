const Discord = require("discord.js")
const client = new Discord.Client()
// invite link - https://discord.com/oauth2/authorize?client_id=962268330197139486&scope=bot&permissions=8
// non admin link - https://discord.com/oauth2/authorize?client_id=962268330197139486&scope=bot&permissions=68672

const prefix = "q"
client.userData = require("./user-data.json")

const UBS = 1;

const fs = require("fs")
const { Z_PARTIAL_FLUSH } = require("zlib")
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

exports.allowed = ["957678839755067432", "812009321993994280"]

exports.client = client
exports.prefix = prefix