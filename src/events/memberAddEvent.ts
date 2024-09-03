import { GuildMember } from "discord.js";
import { invitesMap } from "../data/invitesMap";
import { env } from "../config/env";

const enviroment = env();

export async function handleMemberAddEvent(member: GuildMember) {
  try {
    const savedInvites = invitesMap.get(member.guild.id);
    if (!savedInvites) {
      console.warn(`No saved invites found for guild ${member.guild.name}`);
      return;
    }

    const currentInvites = await member.guild.invites.fetch();

    invitesMap.set(member.guild.id, currentInvites);

    const usedInvite = currentInvites.find((invite) => {
      const savedInvite = savedInvites.get(invite.code);
      return (
        savedInvite &&
        invite.uses &&
        savedInvite.uses &&
        invite.uses > savedInvite.uses
      );
    });

    if (usedInvite) {
      console.log(
        `${member.user.tag} was invited by ${usedInvite.inviter?.tag} using the invite code ${usedInvite.code}`
      );
      if (usedInvite.inviter) {
        const inviter = await member.guild.members.fetch(usedInvite.inviter.id);

        const inviterInvites = (await member.guild.invites.fetch()).filter(
          (invite) => invite.inviter?.id === usedInvite.inviter?.id
        );

        if (inviterInvites.size >= 5) {
          const role = member.guild.roles.cache.get(enviroment.ROLE_ID);
          if (role) {
            await inviter.roles.add(role);
            console.log(`Role assigned to inviter ${inviter.user.tag}`);
          } else {
            console.warn(
              `Role with ID ${enviroment.ROLE_ID} not found in guild ${member.guild.name}`
            );
          }
        }
      }
    } else {
      console.log(
        `${member.user.tag} joined, but the invite used could not be determined.`
      );
    }
  } catch (error) {
    console.error(
      `Error handling guildMemberAdd for ${member.user.tag} in guild ${member.guild.name}:`,
      error
    );
  }
}
