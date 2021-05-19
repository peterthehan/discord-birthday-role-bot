const { CronJob } = require("cron");
const BirthdayRoleManager = require("../classes/BirthdayRoleManager");
const rules = require("../config");

module.exports = async (client) => {
  console.log("birthdayRole: ready");

  for (const rule of rules) {
    const guild = client.guilds.resolve(rule.guildId);

    new CronJob(
      rule.cronExpression,
      () => {
        const manager = new BirthdayRoleManager(guild, rule);
        manager.setAccountBirthdayRoles();
        manager.setServerBirthdayRoles();
      },
      null,
      true,
      rule.timezone
    );
  }
};
