module.exports = class Birthday {
  constructor(members, role) {
    this.members = members;
    this.role = role;
  }

  getMemberIds(members) {
    return members.map(member => member.id);
  }

  getRemoveRoleMembers() {
    const memberIds = this.getMemberIds(this.members);
    return this.role.members.filter(member => !memberIds.includes(member.id));
  }

  getAddRoleMembers() {
    const memberIds = this.getMemberIds(this.role.members);
    return this.members.filter(member => !memberIds.includes(member.id));
  }

  async setRoles() {
    this.getRemoveRoleMembers().forEach(({ roles }) => roles.remove(this.role));
    this.getAddRoleMembers().forEach(({ roles }) => roles.add(this.role));
  }

  getMembersLog(members) {
    return members.map(member => member.user.tag).join(', ');
  }

  logMembers(type) {
    const resultSet = `result: ${this.getMembersLog(this.members)}`;
    const removeSet = `remove: ${this.getMembersLog(
      this.getRemoveRoleMembers()
    )}`;
    const addSet = `add: ${this.getMembersLog(this.getAddRoleMembers())}`;

    console.log(`${[type, resultSet, removeSet, addSet].join('\n')}\n`);
  }
};
