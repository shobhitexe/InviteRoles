import { Client, GatewayIntentBits } from "discord.js";
import { handleReadyEvent } from "./events/readyEvent";
import { env } from "./config/env";
import { handleMemberAddEvent } from "./events/memberAddEvent";
import { handleInviteCreateEvent } from "./events/inviteCreate";

const enviroment = env();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
  ],
});

client.once("ready", handleReadyEvent(client));
client.on("guildMemberAdd", (member) => handleMemberAddEvent(member));
client.on("inviteCreate", (invite) => handleInviteCreateEvent(invite));

client.login(enviroment.TOKEN);
