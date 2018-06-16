const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("you", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (message.content === "bad bot" || message.content === "bad bot!") {
        message.channel.send("Am not!");
        return;
    }

    if (message.content === "sigh") {
        message.channel.send("NO SIGHING YOU LITTLE BITCH");
        return;
    }

    if (message.content === "LOL") {
        message.channel.send(`What's so god damn funny ${message.author} ?`);
        return;
    }

    // if (message.content === "ROFLCOPTER") {
    //     let roflCopter = new Discord.MessageEmbedVideo()
    //         .url("https: //media.giphy.com/media/sPgZeKwM6AVVe/giphy.gif");
    //     message.channel.send(roflCopter);
    //     return;
    // }

    if (cmd === `${prefix}report`) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if (!rUser) return message.channel.send("couldn't find user");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports:")
            .setColor("#3f2491")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel:", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);


        message.channel.send(reportEmbed);
        return;
    }

    if (cmd === `${prefix}serverinfo`) {
        let sicon = message.guild.displayAvatarURL;
        let serverembed = new Discord.RichEmbed()
            .setDescription("Server Information")
            .setColor("#3f2491")
            .setThumbnail(sicon)
            .addField("Server Name:", message.guild.name)
            .addField("Created on:", message.guild.createdAt)
            .addField(`You joined on:`, message.member.joinedAt)
            .addField("Total Members:", message.guild.memberCount);

        return message.channel.send(serverembed);

    }

    if (cmd === `${prefix}botinfo`) {

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor("#3f2491")
            .setThumbnail(bicon)
            .addField("Bot Name", bot.user.username)
            .addField("Created On", bot.user.createdAt);

        return message.channel.send(botembed);
    }

    if (cmd === `${prefix}hello`) {
        return message.channel.send(`${message.author} suck dicks.`);
    }
});

bot.login(botconfig.tokenId);