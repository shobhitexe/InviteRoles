import { Client, ActivityType } from "discord.js";
import { env } from "../config/env";
import { invitesMap } from "../data/invitesMap";

const enviroment = env();

export function handleReadyEvent(client: Client) {
  return () => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setPresence({ status: "online" });
    client.user?.setActivity(enviroment.STATUS, {
      type: ActivityType.Custom,
    });
    client.guilds.cache.forEach(async (guild) => {
      try {
        const invites = await guild.invites.fetch();
        invitesMap.set(guild.id, invites);
      } catch (error) {
        console.error(`Error fetching invites for guild ${guild.name}:`, error);
      }
    });
  };
}
