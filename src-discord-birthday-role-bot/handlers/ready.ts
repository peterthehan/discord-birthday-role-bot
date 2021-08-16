import { CronJob } from "cron";
import { Client } from "discord.js";
import configs from "../config.json";
import { BirthdayRoleManager } from "../classes/BirthdayRoleManager";

module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  for (const config of configs) {
    const guild = await client.guilds.fetch(config.guildId);
    if (!guild) {
      continue;
    }

    new CronJob(
      config.cronExpression,
      () => {
        const manager = new BirthdayRoleManager(guild, config);
        manager.setAccountBirthdayRoles();
        manager.setServerBirthdayRoles();
      },
      null,
      true,
      config.timezone
    );
  }
};
