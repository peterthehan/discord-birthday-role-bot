module.exports = class Birthday {
  constructor(members, role) {
    this.members = members;
    this.role = role;
  }

  _getMemberIds(members) {
    return members.map(member => member.id);
  }

  _getRemoveRoleMembers() {
    const memberIds = this._getMemberIds(this.members);
    return this.role.members.filter(member => !memberIds.includes(member.id));
  }

  _getAddRoleMembers() {
    const memberIds = this._getMemberIds(this.role.members);
    return this.members.filter(member => !memberIds.includes(member.id));
  }

  setRoles() {
    this._getRemoveRoleMembers().forEach(member =>
      member.roles.remove(this.role)
    );
    this._getAddRoleMembers().forEach(member => member.roles.add(this.role));
  }

  _getLogMembersString(members) {
    return members.map(member => member.user.tag).join(', ');
  }

  logMembers(type) {
    console.log(`set ${type}:`, this._getLogMembersString(this.members));
    console.log(
      `remove ${type}:`,
      this._getLogMembersString(this._getRemoveRoleMembers())
    );
    console.log(
      `add ${type}:`,
      this._getLogMembersString(this._getAddRoleMembers())
    );
  }
};
