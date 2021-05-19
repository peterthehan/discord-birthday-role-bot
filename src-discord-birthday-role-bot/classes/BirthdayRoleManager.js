module.exports = class BirthdayRoleManager {
  constructor(guild, rule) {
    this.guild = guild;
    this.rule = rule;
    this._setMembers();
    this._setDates();
  }

  _setMembers() {
    this.members = this.guild.members.cache.filter(
      (member) =>
        member &&
        member.user &&
        !member.user.bot &&
        member.joinedAt &&
        member.user.createdAt
    );
  }

  _setDates() {
    const now = Date.now();

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - this.rule.daysToLookBack);
    this.startDate = this._parseDate(startDate);

    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + this.rule.daysToLookForward);
    this.endDate = this._parseDate(endDate);
  }

  _parseDate(date) {
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      date: date.getUTCDate(),
    };
  }

  _getDate(member, type) {
    switch (type) {
      case "account":
        return member.user.createdAt;
      case "server":
        return member.joinedAt;
    }
  }

  _isInDateRange(member, type) {
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

  _setBirthdayRoles(roleId, type) {
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
      .map((memberId) => this.members.get(memberId));
    const membersToRemoveRole = [...existingMemberIds]
      .filter((memberId) => !birthdayMemberIds.has(memberId))
      .map((memberId) => this.members.get(memberId));

    membersToAddRole.forEach((member) => member.roles.add(roleId));
    membersToRemoveRole.forEach((member) => member.roles.remove(roleId));

    console.log(type);
    console.log(
      "result",
      [...birthdayMemberIds].map(
        (memberId) => this.members.get(memberId).user.tag
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

  setAccountBirthdayRoles() {
    this._setBirthdayRoles(this.rule.accountBirthdayRoleId, "account");
  }

  setServerBirthdayRoles() {
    this._setBirthdayRoles(this.rule.serverBirthdayRoleId, "server");
  }
};
