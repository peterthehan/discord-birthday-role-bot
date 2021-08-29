import { Snowflake } from "discord.js";

export interface Config {
  guildId: Snowflake;
  accountBirthdayRoleId: Snowflake;
  serverBirthdayRoleId: Snowflake;
  daysToLookBack: number;
  daysToLookForward: number;
  timezone: string;
  cronExpression: string;
}
