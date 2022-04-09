const Discord = require("discord.js")
const config = require("./config")
const token = require("./token")
const fs = require("fs")

config.client.once("ready", () => {
    console.log("quotebot is online")
})

config.client.on("message", message => { 
    let stop = false
    if(!config.allowed.includes(message.channel.id))
        stop = true
    if(message.guild.id === "938557874257399818")
        stop = false

    mID = message.mentions.users.first()
    if(message.content.startsWith("\"") && !stop){
        if(mID === undefined){
            message.channel.send("invalid quote - no user mentioned")
            return
        }
        if((message.content.match(/"/g) || []).length < 2){
            message.channel.send("invalid quote - missing second `\"`")
            return
        }
        if(config.client.userData[mID.id] === undefined)
            config.client.commands.get("enter").execute(mID)

        let d = new Date( message.createdTimestamp );
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
        }
        date = addZero(d.getHours()) + ":" + addZero(d.getMinutes())+ ":" + addZero(d.getSeconds()) + ", " + d.toDateString();
        let quote = [message.content.split("\"")[1], date, message.author.username + "#" + message.author.discriminator]
        config.client.userData[mID.id].quotes.push(quote)
        message.react("✅")

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => { if (err) throw err })
        
    }

    if (!message.content.startsWith(config.prefix) || message.author.bot ) return
    const args = message.content.slice(config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === "data"){
        let user = message.author
        if(mID !== undefined)
            user = mID

        if(config.client.userData[user.id] === undefined){
            message.channel.send("no data")
            return
        }

        dataEmbed = new Discord.MessageEmbed()
        .setColor("#e34242")
        .setTitle(user.username + "'s quotes")

        for(var i = 0; i < config.client.userData[user.id].quotes.length; i++){
            dataEmbed.addField("\"" + config.client.userData[user.id].quotes[i][0] + "\"", config.client.userData[user.id].quotes[i][1] + ", quoted by " + config.client.userData[user.id].quotes[i][2])
        }
        message.channel.send(dataEmbed)
    }

    if(command === "all"){
        for(var i in config.client.userData){
            dataEmbed = new Discord.MessageEmbed()
            .setColor("#e34242")
            .setTitle(config.client.userData[i].name + "'s quotes")
    
            for(var j = 0; j < config.client.userData[i].quotes.length; j++){
                dataEmbed.addField("\"" + config.client.userData[i].quotes[j][0] + "\"", config.client.userData[i].quotes[j][1] + ", quoted by " + config.client.userData[i].quotes[j][2])
            }
            message.channel.send(dataEmbed)
        }
        message.channel.send("all quotes sent")

    }
})
config.client.login(token.token)
