require("dotenv").config();
const { Client, GatewayIntentBits, WebhookClient } = require("discord.js");
const fs = require("fs");
const { token, personToTag } = process.env;
const failureOnMainString = "GitHub Actions checks failure on main";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(token);

client.on("ready", () => {
  console.log(`${client.user.tag} is ready`);
});

client.on("messageCreate", (message) => {
  if (message.author.username === "GitHub" && message.webhookId) {
    const title = message.embeds[0].data.title;
    if (title?.includes(failureOnMainString)) {
      message.channel.send({
        content: `<@${personToTag}> -- CI FAILED ON MAIN`,
      });
    }
  }
});
