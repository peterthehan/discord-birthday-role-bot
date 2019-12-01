const { guildRoleMap } = require('../config');
const Birthday = require('../classes/Birthday');
const getBirthdayMembers = require('../util/getBirthdayMembers');

const roleTypeDateFunctionMap = {
  account: member => member.user.createdAt,
  server: member => member.joinedAt
};

module.exports = client => {
  console.log(`${client.user.tag}: Ready`);
  for (const guildId of Object.keys(guildRoleMap)) {
    const guild = client.guilds.resolve(guildId);
    if (!guild) continue;

    for (const roleType of Object.keys(roleTypeDateFunctionMap)) {
      const birthdayRole = guild.roles.resolve(guildRoleMap[guildId][roleType]);
      if (!birthdayRole) continue;

      const birthdayMembers = getBirthdayMembers(
        guild.members,
        roleTypeDateFunctionMap[roleType]
      );

      const birthday = new Birthday(birthdayMembers, birthdayRole);
      birthday.setRoles();
      birthday.logMembers(roleType);
    }
  }

  process.exit(0);
};
