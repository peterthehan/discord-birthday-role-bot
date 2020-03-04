const { guildRoleMap } = require('../config');
const Birthday = require('../classes/Birthday');
const getBirthdayMembers = require('../util/getBirthdayMembers');

const roleTypeDateFunctionMap = {
  account: member => member.user.createdAt,
  server: member => member.joinedAt
};

module.exports = async client => {
  console.log('birthdayRole: ready');
  for (const guildId of Object.keys(guildRoleMap)) {
    const guild = client.guilds.resolve(guildId);
    if (!guild) continue;

    for (const roleType of Object.keys(guildRoleMap[guildId])) {
      const birthdayRole = guild.roles.resolve(guildRoleMap[guildId][roleType]);
      if (!birthdayRole) continue;

      const dateFunction = roleTypeDateFunctionMap[roleType];
      const birthdayMembers = getBirthdayMembers(guild.members, dateFunction);

      const birthday = new Birthday(birthdayMembers, birthdayRole);
      birthday.logMembers(roleType);
      await birthday.setRoles();
    }
  }
};
