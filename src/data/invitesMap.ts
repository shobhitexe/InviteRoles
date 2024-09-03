import { Collection, Invite } from "discord.js";

export const invitesMap = new Map<string, Collection<string, Invite>>();
