import { Collection, Invite } from "discord.js";
import { invitesMap } from "../data/invitesMap";

export async function handleInviteCreateEvent(invite: Invite) {
  const guild = invite.guild;
  if (!guild) {
    console.warn("Invite guild is null");
    return;
  }

  const guildId = guild.id;
  const savedInvites = invitesMap.get(guildId);

  if (savedInvites) {
    savedInvites.set(invite.code, invite);
    console.log(
      `New invite created in guild ${guild.name}: ${invite.code} by ${invite.inviter?.tag}`
    );
  } else {
    invitesMap.set(
      guildId,
      new Collection<string, Invite>().set(invite.code, invite)
    );
    console.log(
      `New invite created in guild ${guild.name}: ${invite.code} by ${invite.inviter?.tag}`
    );
  }
}
