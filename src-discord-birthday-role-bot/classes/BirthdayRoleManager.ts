import { Collection, Guild, GuildMember, Snowflake } from "discord.js";
import { Config } from "../types";

type ParsedDate = {
  year: number;
  month: number;
  date: number;
};

class BirthdayRoleManager {
  guild: Guild;
  config: Config;
  members: Collection<Snowflake, GuildMember>;
  startDate: ParsedDate;
  endDate: ParsedDate;

  constructor(guild: Guild, config: Config) {
    this.guild = guild;
    this.config = config;

    this.members = guild.members.cache.filter((member) =>
      Boolean(
        member &&
          member.user &&
          !member.user.bot &&
          member.joinedAt &&
          member.user.createdAt
      )
    );

    const now = Date.now();

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - this.config.daysToLookBack);
    this.startDate = this._parseDate(startDate);

    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + this.config.daysToLookForward);
    this.endDate = this._parseDate(endDate);
  }

  setAccountBirthdayRoles(): void {
    this._setBirthdayRoles(this.config.accountBirthdayRoleId, "account");
  }

  setServerBirthdayRoles(): void {
    this._setBirthdayRoles(this.config.serverBirthdayRoleId, "server");
  }

  private _setBirthdayRoles(roleId: Snowflake, type: string): void {
    const existingMemberIds = new Set(
      this.members
        .filter((member) => member.roles.cache.has(roleId))
        .map((member) => member.id)
    );
    const birthdayMemberIds = new Set(
      this.members
        .filter((member) => this._isInDateRange(member, type))
        .map((member) => member.id)
    );

    const membersToAddRole = [...birthdayMemberIds]
      .filter((memberId) => !existingMemberIds.has(memberId))
      .map((memberId) => this.members.get(memberId) as GuildMember);
    const membersToRemoveRole = [...existingMemberIds]
      .filter((memberId) => !birthdayMemberIds.has(memberId))
      .map((memberId) => this.members.get(memberId) as GuildMember);

    membersToAddRole.forEach((member) => member.roles.add(roleId));
    membersToRemoveRole.forEach((member) => member.roles.remove(roleId));

    console.log(type);
    console.log(
      "result",
      [...birthdayMemberIds].map(
        (memberId) => (this.members.get(memberId) as GuildMember).user.tag
      )
    );
    console.log(
      "add",
      membersToAddRole.map((member) => member.user.tag)
    );
    console.log(
      "remove",
      membersToRemoveRole.map((member) => member.user.tag)
    );
  }

  private _isInDateRange(member: GuildMember, type: string): boolean {
    const memberDate = this._getDate(member, type);
    const { year, month, date } = this._parseDate(memberDate);

    return (
      year < this.startDate.year &&
      this.startDate.month <= month &&
      month <= this.endDate.month &&
      this.startDate.date <= date &&
      date <= this.endDate.date
    );
  }

  private _getDate(member: GuildMember, type: string): Date {
    switch (type) {
      case "account":
        return member.user.createdAt;
      case "server":
        return member.joinedAt as Date;
    }

    // should be unreachable
    return new Date();
  }

  private _parseDate(date: Date): ParsedDate {
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      date: date.getUTCDate(),
    };
  }
}

export { BirthdayRoleManager };
